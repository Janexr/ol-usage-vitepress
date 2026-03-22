const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/StaticImage.CAuvdQCA.js","assets/chunks/Image.DoBcDfeV.js","assets/chunks/Map.CMggeVBg.js","assets/chunks/hitdetect.2E0wUd-6.js","assets/chunks/common.pjn4DBvU.js","assets/chunks/index.Db6roMHy.js","assets/chunks/framework.sL2pcHsl.js"])))=>i.map(i=>d[i]);
import{v as c,V as m,E as p,C as u,c as d,o as y,j as r,ah as f,G as n,a as g,ai as w,p as v,k as t,w as i,aj as x}from"./chunks/framework.sL2pcHsl.js";import{I as h,$ as _}from"./chunks/index.xlq-uQqE.js";const P=`<template>\r
    <div id="map"></div>\r
    <div class="radio-outer">\r
        <ElRadioGroup v-model="currentType" @change="toggleType">\r
            <ElRadioButton v-for="type in types" :value="type"> {{ type }} </ElRadioButton>\r
        </ElRadioGroup>\r
    </div>\r
</template>\r
\r
<script lang="ts" setup>\r
import { Map as OlMap, View } from 'ol';\r
import ImageLayer from 'ol/layer/Image.js';\r
import Static from 'ol/source/ImageStatic.js';\r
import Projection from 'ol/proj/Projection.js';\r
import { onMounted, ref } from 'vue';\r
import { transform } from 'ol/proj';\r
import { ElRadioGroup, ElRadioButton } from 'element-plus';\r
import { getCenter } from 'ol/extent';\r
import Feature from 'ol/Feature.js';\r
import Point from 'ol/geom/Point.js';\r
import { Polygon } from 'ol/geom';\r
import VectorLayer from 'ol/layer/Vector.js';\r
import VectorSource from 'ol/source/Vector.js';\r
import Icon from 'ol/style/Icon.js';\r
import Style from 'ol/style/Style.js';\r
import IconPng from './icon.png';\r
import Fill from 'ol/style/Fill';\r
import Stroke from 'ol/style/Stroke';\r
\r
const currentType = ref('地理坐标');\r
const types = ['地理坐标', '像素坐标'];\r
\r
let map: OlMap | null = null, pixelMap: OlMap | null = null;\r
let imgLayer: ImageLayer<Static> | null = null;\r
function createMap() {\r
    map = new OlMap({\r
        target: 'map', // 绑定html元素\r
        view: new View({\r
            projection: 'EPSG:3857', // 坐标系，有EPSG:4326和EPSG:3857\r
            center: transform([120, 30], 'EPSG:4326', 'EPSG:3857'),\r
            zoom: 18,\r
        }),\r
    })\r
    imgLayer = new ImageLayer({\r
        source: new Static({\r
            url: 'https://imgs.xkcd.com/comics/online_communities.png',\r
            imageExtent: [119.995, 29.998, 120.005, 30.005],\r
            projection: 'EPSG:4326',\r
        }),\r
    });\r
    map.addLayer(imgLayer);\r
\r
    const centerIcon = new Feature(new Point(transform([120, 30], 'EPSG:4326', 'EPSG:3857')));\r
    const vectorLayer = new VectorLayer({\r
        style: new Style({\r
            image: new Icon({\r
                anchor: [0.5, 0.96],\r
                crossOrigin: 'anonymous',\r
                src: IconPng,\r
            }),\r
        }),\r
        source: new VectorSource({ \r
            features: [centerIcon] \r
        }),\r
    })\r
    map.addLayer(vectorLayer);\r
}\r
\r
function createPixelMap() {\r
    const extent = [0, 0, 1024, 968];\r
    const projection = new Projection({\r
        code: 'xkcd-image',\r
        units: 'pixels',\r
        extent: extent,\r
    });\r
    const center = getCenter(extent);\r
\r
    pixelMap = new OlMap({\r
        layers: [\r
            new ImageLayer({\r
                source: new Static({\r
                    url: 'https://imgs.xkcd.com/comics/online_communities.png',\r
                    projection: projection,\r
                    imageExtent: extent,\r
                }),\r
            }),\r
        ],\r
        target: 'map',\r
        view: new View({\r
            projection: projection,\r
            center,\r
            zoom: 2,\r
            maxZoom: 8,\r
        }),\r
    });\r
\r
    const centerIcon = new Feature(new Point(center));\r
    const originIcon = new Feature(new Point([0, 0]));\r
    const vectorLayer = new VectorLayer({\r
        style: new Style({\r
            image: new Icon({\r
                anchor: [0.5, 0.96],\r
                crossOrigin: 'anonymous',\r
                src: IconPng,\r
            }),\r
        }),\r
        source: new VectorSource({ features: [centerIcon, originIcon] }),\r
    })\r
    pixelMap.addLayer(vectorLayer);\r
}\r
\r
function toggleType() {\r
    if (currentType.value === '地理坐标') {\r
        if (pixelMap) {\r
            pixelMap.setTarget(undefined);\r
        }\r
        if (!map) {\r
            createMap();\r
        } else {\r
            map.setTarget('map');\r
        }\r
    } else {\r
        if (map) {\r
            map.setTarget(undefined);\r
        }\r
        if (!pixelMap) {\r
            createPixelMap();\r
        } else {\r
            pixelMap.setTarget('map');\r
        }\r
    }\r
}\r
\r
onMounted(() => {\r
    createMap();\r
})\r
<\/script>\r
\r
<style scoped>\r
#map {\r
    width: 100%;\r
    height: 400px;\r
}\r
</style>`,M=JSON.parse('{"title":"静态图片","description":"","frontmatter":{},"headers":[],"relativePath":"map/staticImg.md","filePath":"map/staticImg.md"}'),S={name:"map/staticImg.md"},L=Object.assign(S,{setup(j){const a=v(!0),o=p();return c(async()=>{o.value=(await m(async()=>{const{default:l}=await import("./chunks/StaticImage.CAuvdQCA.js");return{default:l}},__vite__mapDeps([0,1,2,3,4,5,6]))).default}),(l,e)=>{const s=u("ClientOnly");return y(),d("div",null,[e[1]||(e[1]=r("h1",{id:"静态图片",tabindex:"-1"},[g("静态图片 "),r("a",{class:"header-anchor",href:"#静态图片","aria-label":'Permalink to "静态图片"'},"​")],-1)),e[2]||(e[2]=r("p",null,"有时我们需要将一些静态图片整体的添加到地图上，分为两种情况：",-1)),e[3]||(e[3]=r("ol",null,[r("li",null,"需要把手绘地图放置在真实地图上，这时候就赋给图片真实的经纬度"),r("li",null,"直接把静态图片当做底图，用像素坐标开发底图，需要注意的是坐标(0,0)在左下角")],-1)),f(n(t(h),null,null,512),[[w,a.value]]),n(s,null,{default:i(()=>[n(t(_),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Atrue%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",background:"undefined",visible:!0,onMount:e[0]||(e[0]=()=>{a.value=!1}),vueCode:t(P)},x({_:2},[o.value?{name:"vue",fn:i(()=>[n(t(o))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])}}});export{M as __pageData,L as default};
