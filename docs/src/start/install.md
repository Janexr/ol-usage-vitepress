# 安装

推荐使用安装包的形式使用 OpenLayers 

## NPM
最新版安装命令：

````bash
npm install ol
````

## CDN
如果你想在不下载任何内容的情况下试用OpenLayers（不推荐用于生产环境），请将以下代码包含在你的HTML页面的头部中:  

````js
<script src="https://cdn.jsdelivr.net/npm/ol@v10.7.0/dist/ol.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.7.0/ol.css">
````
库的完整构建不包含所有依赖项: ```geotiff``` 和 ```ol-mapbox-style``` 包被省略。如果你使用这些包，需要添加额外的脚本标签。  

## 完整版本列表
可查看 github 发布页 [release page](https://github.com/openlayers/openlayers/releases)  
[ol npm仓库](https://www.npmjs.com/package/ol)

## 浏览器兼容
OpenLayers 可在所有现代浏览器上运行（全球使用率超过 1%）。这包括 Chrome、Firefox、Safari 和 Edge。对于较旧的浏览器，可能需要添加 polyfills（[Fastly](https://polyfill-fastly.io/) 或 [Cloudflare](https://cdnjs.cloudflare.com/polyfill)）。

该库适用于桌面/笔记本电脑和移动设备，并支持指针和触摸交互。