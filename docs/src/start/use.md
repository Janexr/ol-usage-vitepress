# 快速上手

**输入**

````html
<style>
  #map {
    width: 100%;
    height: 600px;
  }
</style>

<div id="map"></div>

<script setup>
import 'ol/ol.css'
import { Map, View } from 'ol'
import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import { onMounted } from 'vue'

function createMap() {
  new Map({
    target: 'map', // 绑定html元素
    layers: [ // 图层
      new Tile({
        source: new XYZ({
          url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
        }) 
      })
    ],
    view: new View({ // 地图视图
      projection: "EPSG:3857", // 坐标系，有EPSG:4326和EPSG:3857
      center: transform([120, 30], 'EPSG:4326', 'EPSG:3857'), // 杭州坐标
      zoom: 12 // 地图缩放级别（打开页面时默认级别）
    })
  })
}

onMounted(() => {
  createMap();
})
</script>
````

**输出**

<style>
  #map {
    width: 100%;
    height: 600px;
  }
</style>

<div id="map"></div>

<script setup>
import 'ol/ol.css'
import { Map, View } from 'ol'
import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import { onMounted } from 'vue'

function createMap() {
  new Map({
    target: 'map', // 绑定html元素
    layers: [ // 图层
      new Tile({
        source: new XYZ({
          url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
        }) 
      })
    ],
    view: new View({ // 地图视图
      projection: "EPSG:3857", // 坐标系，有EPSG:4326和EPSG:3857
      center: transform([120, 30], 'EPSG:4326', 'EPSG:3857'), // 杭州坐标
      zoom: 12 // 地图缩放级别（打开页面时默认级别）
    })
  })
}

onMounted(() => {
  createMap();
})
</script>

