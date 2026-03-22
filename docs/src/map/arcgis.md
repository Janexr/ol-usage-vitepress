# ArcGIS 服务

## TileArcGISRest

OpenLayers 提供了TileArcGISRest类用来加载ArcGIS切片数据源。使用起来很方便，像其它图层和数据源一样，将创建好的切片数据源放于切片图层中即可
```` js
// 创建ArcGIS Server Rest 瓦片图层
const arcgisSource = new ol.source.TileArcGISRest({
    // ArcGIS世界影像图
    url: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
    wrapX:false
})
const arcgisLayer = new ol.layer.Tile({
    source:arcgisSource
})
map.addLayer(arcgisLayer)
````

## ImageArcGISRest

对于没切片的ArcGIS服务，使用ImageArcGISRest来加载，它会动态生成当前视图范围的图层图片
```` js
const arcgisSource = new ol.source.ImageArcGISRest({
    // ArcGIS世界影像图
    url: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer"
})
const arcgisLayer = new ol.layer.Image({
    source:arcgisSource
})
map.addLayer(arcgisLayer)
````

## ArcGIS 矢量数据
相比前两种加载栅格图层的方式，该方式的缺点是只能一个图层一个图层的加载，优点是可以在前端自定义样式。  
加载ArcGIS Server的REST服务矢量地图：使用ol.layer.Vector+ol.source.Vector实现，通过Vector数据源的loader参数设置加载矢量要素的函数，然后通过请求矢量数据服务，再通过ol.format.EsriJSON解析数据，调用readFeatures方法解析和读取要素，最后调用矢量数据源对象的addFeatures方法加载要素，添加到矢量图层中进行渲染和显示。
```` js
const vsource = new VectorSource({
    format: new EsriJSON(),
    strategy: olLoadingstrategy.tile(createXYZ({
        tileSize: 512
    })),
    loader: function (extent, resolution, projection) {
        const url = 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/0/query/?f=json&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
                extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
                ',"spatialReference":{"wkid":102100}}') +
            '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
            '&outSR=102100';
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (json) {
                const features = vsource.getFormat()!.readFeatures(json, {
                    featureProjection: projection
                });
                vsource.addFeatures(features);
            });
    }
})
const arcgisVectorLayer = new VectorLayer({
    source: vsource,
    style: new Style({
        fill: new Fill({
            color: [255, 0, 0, 0.1]
        }),
        stroke: new Stroke({
            color: [255, 0, 0, 1],
            width: 0.5,
        }),
    })
})
map.addLayer(arcgisVectorLayer);
````

## 离线瓦片
有些项目不能使用ArcGIS在线服务，需要把瓦片文件下载下来，使用 Nginx 或者其他工具发布静态资源服务。  
ol5 中 tileUrlFunction 中的代码有所不同，`const y = 'R' + zeroFill(-coordinate[2]-1, 8, 16);`
```` js
function zeroFill(num, len, radix) {
    var str = num.toString(radix || 10);
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}

// ol.source.XYZ添加瓦片地图的层
let tileLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        tileUrlFunction: function (coordinate) {
            const x = 'C' + zeroFill(coordinate[1], 8, 16);
            const y = 'R' + zeroFill(coordinate[2], 8, 16);
            const z = 'L' + zeroFill(coordinate[0], 2, 10);
            return 'hefei/' + z + '/' + y + '/' + x + '.png';//这里可以修改地图路径
        },
        projection: 'EPSG:3857'
    })
});
map.addLayer(tileLayer);//添加到map里面
````
<demo vue="./Arcgis.vue" />