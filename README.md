# 时时彩 DEMO

### 简介
> 时时彩是一种地区性的彩票，每个地区分为不同的玩法，可以参考[重庆时时彩规则](https://baike.baidu.com/item/%E9%87%8D%E5%BA%86%E6%97%B6%E6%97%B6%E5%BD%A9/9645048?fr=aladdin)，以及[360彩票](http://cp.360.cn/ssccq/?menu&r_a=VneyAn)

时时彩模块仅是一个移动端H5的demo，技术栈采用了Vue + Vue-Router + less + webpack，本身作为一个单页应用，不算很复杂，所以这里去掉了 Vuex；实际项目中采用了组件库是 vux ，demo 中代码结构是按照实际项目走的，不过没有线上数据，所以无法从接口获取。

```html
├── build
├── config
├── src
    ├── api      接口
    ├── common   样式/字体/图片
        ├── css
        ├── font
        ├── imgs
        ├── js
    ├── components    组件
    ├── pages         页面
    ├── router        路由
    ├── App.vue
    ├── main.js
├── static
    ├── reset.css

```

### 效果
<div>
  <img style='margin-right:5px' src="https://upload-images.jianshu.io/upload_images/1394028-18b4bc5427235b90.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/275"/>
  <img src="https://upload-images.jianshu.io/upload_images/1394028-3d01c685440bd980.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/275"/>
  <img src="https://upload-images.jianshu.io/upload_images/1394028-44c8ba3b4e677058.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/275"/>
</div>
</div>





### 使用方式
```
git clone git@github.com:suminhohu/SSC.git

npm install

npm run dev
```
