const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/Online.BxvH9H35.js","assets/chunks/TileImage.CvpbwlI0.js","assets/chunks/UrlTile.BPyjzXtI.js","assets/chunks/Map.CMggeVBg.js","assets/chunks/common.pjn4DBvU.js","assets/chunks/index.Db6roMHy.js","assets/chunks/framework.sL2pcHsl.js","assets/chunks/XYZ.DdOj2u-7.js"])))=>i.map(i=>d[i]);
import{v as s,V as p,E as c,C as m,c as d,o as u,ag as T,ah as E,G as e,ai as y,p as f,k as t,w as l,aj as h}from"./chunks/framework.sL2pcHsl.js";import{I as L,$ as R}from"./chunks/index.xlq-uQqE.js";const g="/assets/image.CmBzrGAS.png",v="/assets/image-1.CDwrmFWL.png",_=`<template>\r
    <div id="map"></div>\r
    <div class="radio-outer">\r
        <ElRadioGroup v-model="currentMap" @change="toggleLayer">\r
            <ElRadioButton v-for="(value, key) in mapList" :value="key"> {{ key }} </ElRadioButton>\r
        </ElRadioGroup>\r
    </div>\r
</template>\r
\r
<script lang="ts" setup>\r
import { Map as OlMap, View } from 'ol';\r
import TileLayer from 'ol/layer/Tile';\r
import { XYZ } from 'ol/source';\r
import { transform } from 'ol/proj'\r
import { ElRadioGroup, ElRadioButton } from 'element-plus';\r
import { onMounted, ref } from 'vue';\r
import { addBdMercatorProjection, addGcj02MercatorProjection } from './proj';\r
import { TileGrid } from 'ol/tilegrid';\r
import { applyTransform } from 'ol/extent';\r
import * as projzh from 'projzh';\r
\r
const tdtTk = '59d3a78163c2741d6aa0cb12f77fa62a'; // 在此处填写您的天地图密钥\r
const mapList: Record<string, string[]> = {\r
    '天地图': [\r
        'http://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk,\r
        'http://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk\r
    ],\r
    '天地图-影像图': [\r
        'http://t{0-7}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk,\r
        'http://t{0-7}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk\r
    ],\r
    '天地图-地形图': [\r
        'http://t{0-7}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk,\r
        'http://t{0-7}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk\r
    ],\r
    '高德地图': [\r
        'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'\r
    ],\r
    '百度地图': [\r
        'http://online{0-3}.map.bdimg.com/onlinelabel/qt=tile&x={x}&y={y}&z={z}&v=009&styles=pl&udt=20170301&scaler=1&p=1'\r
    ]\r
}\r
\r
let map: OlMap | null = null;\r
const LayerMap = new Map<string, TileLayer[]>();\r
function createMap() {\r
    return new OlMap({\r
        target: 'map', // 绑定html元素\r
        view: new View({ // 地图视图\r
            projection: "EPSG:3857", // 坐标系，有EPSG:4326和EPSG:3857\r
            center: transform([120, 30], 'EPSG:4326', 'EPSG:3857'), // 杭州坐标\r
            zoom: 12 // 地图缩放级别（打开页面时默认级别）\r
        })\r
    })\r
}\r
\r
const currentMap = ref('高德地图');\r
function addLayer(name: string) {\r
    const urls = mapList[name];\r
    const layers = urls.map(url => {\r
        let source = new XYZ({\r
            url: url,\r
            projection: name === '高德地图' ? 'GCJ02' : 'EPSG:3857',\r
            crossOrigin: 'anonymous'\r
        });\r
        if (name === '百度地图') {\r
            const extent = [72.004, 0.8293, 137.8347, 55.8271];\r
            addBdMercatorProjection();\r
\r
            const bmercResolutions = new Array(19);\r
            for (let i = 0; i < 19; ++i) {\r
                bmercResolutions[i] = Math.pow(2, 18 - i);\r
            }\r
            source = new XYZ({\r
                projection: 'baidu',\r
                maxZoom: 18,\r
                tileUrlFunction: function (tileCoord) {\r
                    const urls = [0, 1, 2, 3, 4].map(function (sub) {\r
                        return 'http://online' + sub +\r
                            '.map.bdimg.com/onlinelabel/qt=tile&x={x}&y={y}&z={z}&v=009&styles=pl&udt=20170301&scaler=1&p=1';\r
                    });\r
                    const x = tileCoord[1];\r
                    const y = -tileCoord[2] - 1;\r
                    const z = tileCoord[0];\r
                    const hash = (x << z) + y;\r
                    let index = hash % urls.length;\r
                    index = index < 0 ? index + urls.length : index;\r
                    return urls[index].replace('{x}', x+'').replace('{y}', y+'').replace('{z}', z+'');\r
                },\r
                tileGrid: new TileGrid({\r
                    resolutions: bmercResolutions,\r
                    origin: [0, 0],\r
                    extent: applyTransform(extent, projzh.ll2bmerc),\r
                    tileSize: [256, 256]\r
                }),\r
                crossOrigin: 'anonymous'\r
            })\r
        }\r
        const layer = new TileLayer({\r
            source\r
        });\r
        map!.addLayer(layer);\r
        return layer;\r
    });\r
    LayerMap.set(name, layers);\r
}\r
\r
function removeLayer(name: string) {\r
    const layers = LayerMap.get(name);\r
    if (layers) {\r
        layers.forEach(layer => {\r
            map!.removeLayer(layer);\r
        });\r
        LayerMap.delete(name);\r
    }\r
}\r
\r
let previousName = '';\r
function toggleLayer() {\r
    if (LayerMap.has(previousName)) {\r
        removeLayer(previousName);\r
    }\r
    addLayer(currentMap.value);\r
    previousName = currentMap.value;\r
}\r
\r
onMounted(() => {\r
    map = createMap();\r
    addBdMercatorProjection();\r
    addGcj02MercatorProjection();\r
    toggleLayer();\r
})\r
\r
<\/script>\r
\r
\r
<style scoped>\r
#map {\r
    width: 100%;\r
    height: 400px;\r
}\r
\r
.radio-outer {\r
    position: absolute;\r
    bottom: 10px;\r
    left: 10px;\r
}\r
</style>`,b=JSON.parse('{"title":"在线地图","description":"","frontmatter":{},"headers":[],"relativePath":"map/online.md","filePath":"map/online.md"}'),S={name:"map/online.md"},x=Object.assign(S,{setup(M){const a=f(!0),n=c();return s(async()=>{n.value=(await p(async()=>{const{default:o}=await import("./chunks/Online.BxvH9H35.js");return{default:o}},__vite__mapDeps([0,1,2,3,4,5,6,7]))).default}),(o,r)=>{const i=m("ClientOnly");return u(),d("div",null,[r[1]||(r[1]=T("",2)),E(e(t(L),null,null,512),[[y,a.value]]),e(i,null,{default:l(()=>[e(t(R),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Atrue%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",background:"undefined",visible:!0,onMount:r[0]||(r[0]=()=>{a.value=!1}),vueCode:t(_)},h({_:2},[n.value?{name:"vue",fn:l(()=>[e(t(n))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])}}});export{b as __pageData,x as default};
