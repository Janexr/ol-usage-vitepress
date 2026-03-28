const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/VectorTile.D7ZhSOh6.js","assets/chunks/Map.BwrX5Jh7.js","assets/chunks/hitdetect.B1gkqJ4l.js","assets/chunks/common.DJhZ-xgw.js","assets/chunks/UrlTile.BH1UFsTT.js","assets/chunks/Feature.DizeSurO.js","assets/chunks/framework.dxdiOovJ.js"])))=>i.map(i=>d[i]);
import{v as m,V as c,C as u,o as d,c as p,j as a,a as f,ah as y,ai as v,E as r,k as t,w as s,aj as _,G as h,p as w}from"./chunks/framework.dxdiOovJ.js";import{I as T,$ as b}from"./chunks/index.B6hEiStf.js";const x=`<template>\r
    <div id="map"></div>\r
</template>\r
\r
<script lang="ts" setup>\r
import { Map as OlMap, View } from 'ol';\r
import { VectorTile as VectorTileLayer } from 'ol/layer';\r
import { VectorTile as VectorTileSource } from 'ol/source';\r
import { MVT } from 'ol/format';\r
import Fill from 'ol/style/Fill.js';\r
import Stroke from 'ol/style/Stroke.js';\r
import Text from 'ol/style/Text.js';\r
import Style from 'ol/style/Style.js';\r
import { onMounted, ref } from 'vue';\r
\r
const style = new Style({\r
  fill: new Fill({\r
    color: 'rgba(255, 255, 255, 0.6)',\r
  }),\r
  stroke: new Stroke({\r
    color: '#319FD3',\r
    width: 1,\r
  }),\r
  text: new Text({\r
    font: '12px Calibri,sans-serif',\r
    fill: new Fill({\r
      color: '#000',\r
    }),\r
    stroke: new Stroke({\r
      color: '#fff',\r
      width: 3,\r
    }),\r
  }),\r
});\r
\r
let map: OlMap | null = null;\r
let vtLayer: VectorTileLayer | null = null;\r
function createMap() {\r
    return new OlMap({\r
        target: 'map', // 绑定html元素\r
        view: new View({\r
            center: [0, 6000000],\r
            zoom: 4,\r
        }),\r
    })\r
}\r
\r
function addLayer() {\r
    vtLayer = new VectorTileLayer({\r
        declutter: true,\r
        source: new VectorTileSource({\r
            maxZoom: 15,\r
            format: new MVT(),\r
            url:\r
                'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +\r
                'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',\r
        }),\r
        style: function (feature) {\r
            style.getText()!.setText(feature.get('name'));\r
            return style;\r
        },\r
    });\r
    map!.addLayer(vtLayer);\r
}\r
\r
onMounted(() => {\r
    map = createMap();\r
    addLayer();\r
})\r
\r
<\/script>\r
\r
<style scoped>\r
#map {\r
    width: 100%;\r
    height: 400px;\r
}\r
</style>`,L=JSON.parse('{"title":"矢量切片","description":"","frontmatter":{},"headers":[],"relativePath":"map/vectorTile.md","filePath":"map/vectorTile.md"}'),k={name:"map/vectorTile.md"},M=Object.assign(k,{setup(V){const l=w(!0),n=h();return m(async()=>{n.value=(await c(async()=>{const{default:o}=await import("./chunks/VectorTile.D7ZhSOh6.js");return{default:o}},__vite__mapDeps([0,1,2,3,4,5,6]))).default}),(o,e)=>{const i=u("ClientOnly");return d(),p("div",null,[e[1]||(e[1]=a("h1",{id:"矢量切片",tabindex:"-1"},[f("矢量切片 "),a("a",{class:"header-anchor",href:"#矢量切片","aria-label":'Permalink to "矢量切片"'},"​")],-1)),e[2]||(e[2]=a("p",null,"矢量切片技术是一种将空间坐标系中的矢量数据映射到瓦片中的过程，主要用于高效的地图渲染和数据存储。 优势在于：数据量小，加载快，支持高分辨率显示，样式可定制。",-1)),y(r(t(T),null,null,512),[[v,l.value]]),r(i,null,{default:s(()=>[r(t(b),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Atrue%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",background:"undefined",visible:!0,onMount:e[0]||(e[0]=()=>{l.value=!1}),vueCode:t(x)},_({_:2},[n.value?{name:"vue",fn:s(()=>[r(t(n))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])}}});export{L as __pageData,M as default};
