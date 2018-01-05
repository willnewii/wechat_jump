# wechat_jump 微信跳一跳手动版
没有使用adb screencap &pull 感觉截图加上传这个过程就要3s左右。后来想到用Vysor,更便捷一些.

[跳一跳演示视频](http://obfmtiyt5.bkt.clouddn.com/img/%E8%B7%B3%E4%B8%80%E8%B7%B3%E6%BC%94%E7%A4%BA.mp4)

## 操作
1. npm i 
2. npm run star
3. 电脑&手机安装Vysor,并运行,打开跳一跳
4. 将鼠标移动至小人位置,在命令行输入0,然后回车,获取起点坐标
5. 将鼠标移动至下一个方块位置,在命令行输入0,然后回车,获取终点坐标,然后会自动跳入下一格.
6. 重复4，5

## 注意
1. 根据分辨率不同，需要调整一下系数(COEFFICIENT)
2. 如果命令行打印‘计算距离为:XXX,跳’,小人确没动,请到开发者模式去查看,是否有类似‘允许模拟键盘操作’,请打开


## 
1. 没有找到监听鼠标点击事件的库,所以只能每次通过命令行触发,手动获取鼠标位置,这点很麻烦.
