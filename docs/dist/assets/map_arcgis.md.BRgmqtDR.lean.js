const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/Arcgis.CAKZXVlw.js","assets/chunks/Image.DoBcDfeV.js","assets/chunks/Map.CMggeVBg.js","assets/chunks/hitdetect.2E0wUd-6.js","assets/chunks/common.pjn4DBvU.js","assets/chunks/UrlTile.BPyjzXtI.js","assets/chunks/index.Db6roMHy.js","assets/chunks/framework.sL2pcHsl.js","assets/chunks/TileImage.CvpbwlI0.js","assets/chunks/Feature.Dtb55IPK.js"])))=>i.map(i=>d[i]);
import{v as r,V as k,E as p,C as E,c as d,o as g,ag as y,ah as o,G as i,ai as c,p as F,k as a,w as l,aj as u}from"./chunks/framework.sL2pcHsl.js";import{I as m,$ as C}from"./chunks/index.xlq-uQqE.js";const A=`<template>\r
    <div id="map"></div>\r
    <div class="radio-outer">\r
        <ElRadioGroup v-model="currentType" @change="toggleType">\r
            <ElRadioButton v-for="type in types" :value="type"> {{ type }} </ElRadioButton>\r
        </ElRadioGroup>\r
    </div>\r
    <div id="mouse-position"></div>\r
</template>\r
\r
<script lang="ts" setup>\r
import { Map as OlMap, View } from 'ol';\r
import * as olLoadingstrategy from 'ol/loadingstrategy';\r
import { Tile, Image, Vector as VectorLayer, Layer } from 'ol/layer';\r
import { TileArcGISRest, ImageArcGISRest, Vector as VectorSource } from 'ol/source';\r
import { transform } from 'ol/proj';\r
import { EsriJSON } from 'ol/format';\r
import Fill from 'ol/style/Fill.js';\r
import Stroke from 'ol/style/Stroke.js';\r
import Style from 'ol/style/Style.js';\r
import { ElRadioGroup, ElRadioButton } from 'element-plus';\r
import { onMounted, ref } from 'vue';\r
import { createXYZ } from 'ol/tilegrid';\r
\r
const currentType = ref('TileArcGISRest');\r
const types = ['TileArcGISRest', 'ImageArcGISRest', 'EsriJSON'];\r
\r
let map: OlMap | null = null;\r
function createMap() {\r
    return new OlMap({\r
        target: 'map', // 绑定html元素\r
        view: new View({ // 地图视图\r
            projection: 'EPSG:3857', // 坐标系，有EPSG:4326和EPSG:3857\r
            center: transform([117.064, 36.675], 'EPSG:4326', 'EPSG:3857'),\r
            zoom: 10 // 地图缩放级别（打开页面时默认级别）\r
        })\r
    })\r
}\r
\r
const layerMap = new Map<string, Layer>();\r
function addLayer(type: string) {\r
    if (type === 'TileArcGISRest') {\r
        const arcgisSource = new TileArcGISRest({\r
            // ArcGIS世界影像图\r
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',\r
            wrapX: false\r
        })\r
        const arcgisLayer = new Tile({\r
            source: arcgisSource\r
        })\r
        map!.addLayer(arcgisLayer);\r
        layerMap.set('TileArcGISRest', arcgisLayer);\r
    } else if (type === 'ImageArcGISRest') {\r
        const arcgisSource = new ImageArcGISRest({\r
            // ArcGIS世界影像图\r
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'\r
        })\r
        const arcgisLayer = new Image({\r
            source: arcgisSource\r
        })\r
        map!.addLayer(arcgisLayer);\r
        layerMap.set('ImageArcGISRest', arcgisLayer);\r
    } else {\r
        // const arcgisVectorSource = new VectorSource({\r
        //     format: new EsriJSON(),\r
        //     url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/0/query?where=1=1&f=json'\r
        // })\r
        const vsource = new VectorSource({\r
            format: new EsriJSON(),\r
            strategy: olLoadingstrategy.tile(createXYZ({\r
                tileSize: 512\r
            })),\r
            loader: function (extent, resolution, projection) {\r
                const url = 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/0/query/?f=json&' +\r
                    'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +\r
                    encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +\r
                        extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +\r
                        ',"spatialReference":{"wkid":102100}}') +\r
                    '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +\r
                    '&outSR=102100';\r
                fetch(url)\r
                    .then(function (response) { return response.json(); })\r
                    .then(function (json) {\r
                        const features = vsource.getFormat()!.readFeatures(json, {\r
                            featureProjection: projection\r
                        });\r
                        vsource.addFeatures(features);\r
                    });\r
            }\r
        })\r
        const arcgisVectorLayer = new VectorLayer({\r
            source: vsource,\r
            style: new Style({\r
                fill: new Fill({\r
                    color: [255, 0, 0, 0.1]\r
                }),\r
                stroke: new Stroke({\r
                    color: [255, 0, 0, 1],\r
                    width: 0.5,\r
                }),\r
            })\r
        })\r
        map!.addLayer(arcgisVectorLayer);\r
        layerMap.set('EsriJSON', arcgisVectorLayer);\r
    }\r
}\r
\r
function removeLayer(type: string) {\r
    if (layerMap.has(type)) {\r
        map?.removeLayer(layerMap.get(type)!);\r
        layerMap.delete(type);\r
    }\r
}\r
\r
let prevType: string = '';\r
function toggleType() {\r
    if (layerMap.has(prevType)) {\r
        removeLayer(prevType);\r
    }\r
    addLayer(currentType.value);\r
    prevType = currentType.value;\r
}\r
\r
onMounted(() => {\r
    map = createMap();\r
    toggleType();\r
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
#mouse-position {\r
    position: absolute;\r
    top: 5px;\r
    left: 10px;\r
}\r
\r
.radio-outer {\r
    position: absolute;\r
    bottom: 10px;\r
    left: 10px;\r
}\r
</style>`,f=JSON.parse('{"title":"ArcGIS 服务","description":"","frontmatter":{},"headers":[],"relativePath":"map/arcgis.md","filePath":"map/arcgis.md"}'),B={name:"map/arcgis.md"},I=Object.assign(B,{setup(v){const t=F(!0),n=p();return r(async()=>{n.value=(await k(async()=>{const{default:e}=await import("./chunks/Arcgis.CAKZXVlw.js");return{default:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]))).default}),(e,s)=>{const h=E("ClientOnly");return g(),d("div",null,[s[1]||(s[1]=y("",13)),o(i(a(m),null,null,512),[[c,t.value]]),i(h,null,{default:l(()=>[i(a(C),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Atrue%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",background:"undefined",visible:!0,onMount:s[0]||(s[0]=()=>{t.value=!1}),vueCode:a(A)},u({_:2},[n.value?{name:"vue",fn:l(()=>[i(a(n))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])}}});export{f as __pageData,I as default};
