const prompt = require('prompt');
prompt.message = '';
const robot = require("robotjs");
const exec = require('child_process').exec;

const COEFFICIENT = 3.4;

let startMouse = null;
let endMouse = null;

const run_commandA = function (command, callback) {
    console.log(command);
    let child = exec(command, function (error, stdout, stderr) {
        //console.log(error, stdout, stderr);
        if (!error) {
            if (callback)
                callback(stdout, stderr);
        }
    });
    child.on('exit', function (code) {
        if (code != 0) {
            console.log('Failed: ' + code);
        }
    });
};

/**
 * 获取输入内容
 * @param tip
 * @returns {Promise<any>}
 */
async function getInput(tip) {
    let schema = {
        properties: {
            name: {
                description: tip,
                required: true
            }
        }
    };

    return await new Promise(function (resolve, reject) {
        prompt.start();
        prompt.get(schema, (error, result) => {
            if (!error) {
                resolve(result.name);
            } else {
                reject(error);
            }
        });
    });
}

/**
 * 计算距离并执行跳操作
 */
function calculate() {
    let length1 = Math.abs(startMouse.x - endMouse.x);
    let length2 = Math.abs(startMouse.y - endMouse.y);

    let distance = parseInt(Math.sqrt(Math.pow(length1, 2) + Math.pow(Math.abs(length2, 2), 2)));

    console.log('计算距离为:' + distance + ',跳');
    run_commandA('adb shell input swipe 500 501 500 501 ' + parseInt(distance * COEFFICIENT));

    startMouse = null;
    endMouse = null;
}

/**
 * 获取鼠标坐标
 */
function getMousePos() {
    let mouse = robot.getMousePos();

    if (!startMouse) {
        startMouse = mouse;
    } else {
        endMouse = mouse;
    }
}

async function waitCommand() {
    let key = await getInput('请输入你的指令');

    switch (key) {
        case '0'://获取坐标
            if (!startMouse) {
                console.log('获取起点');
            }
            getMousePos();

            if (startMouse && endMouse) {
                calculate();
            }
            waitCommand();
            break;
        default:
            console.log('命令结束');
            prompt.stop();
    }
}

waitCommand();