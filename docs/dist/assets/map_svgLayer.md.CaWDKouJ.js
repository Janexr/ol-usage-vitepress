const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/SvgLayer.BC__UsL5.js","assets/chunks/Map.BwrX5Jh7.js","assets/chunks/framework.dxdiOovJ.js"])))=>i.map(i=>d[i]);
import{v as c,V as d,C as g,o as u,c as v,j as n,a as t,ah as p,ai as h,E as r,k as a,w as l,aj as f,G as w,p as y}from"./chunks/framework.dxdiOovJ.js";import{I as x,$ as E}from"./chunks/index.B6hEiStf.js";const C=`<template>\r
    <div id="map"></div>\r
</template>\r
\r
<script lang="ts" setup>\r
import { Map as OlMap, View } from 'ol';\r
import { Layer } from 'ol/layer';\r
import { onMounted, ref } from 'vue';\r
import { composeCssTransform } from 'ol/transform';\r
import { transform } from 'ol/proj';\r
\r
let map: OlMap | null = null;\r
function createMap() {\r
    return new OlMap({\r
        target: 'map', // 绑定html元素\r
        view: new View({\r
            center: [0, 0],\r
            zoom: 2,\r
        }),\r
    })\r
}\r
\r
function getBase64(img: string) {\r
    const image = new Image()\r
    image.crossOrigin = ''\r
    image.src = img\r
    return new Promise<{ width: number; height: number }>((resolve, reject) => {\r
        image.onload = function () {\r
            const { width, height } = image\r
            resolve({ width, height })\r
        }\r
    })\r
}\r
\r
async function createSvgLayer(options: {\r
    url: string, \r
    imgExtent: number[],\r
    className: string,\r
}) {\r
    const { url, imgExtent, className } = options;\r
    let oLayer;\r
    const svgContainer = document.createElement('div');\r
\r
    const xhr = new XMLHttpRequest();\r
    xhr.open('GET', url);\r
    xhr.addEventListener('load', function () {\r
        const svg = xhr.responseXML!.documentElement;\r
        svgContainer.ownerDocument.importNode(svg);\r
        svgContainer.appendChild(svg);\r
    });\r
    xhr.send();\r
\r
    const res = await getBase64(url);\r
    const width = res.width;\r
    const height = res.height;\r
    svgContainer.style.width = width + 'px';\r
    svgContainer.style.height = height + 'px';\r
    svgContainer.style.transformOrigin = 'top left';\r
    svgContainer.className = className;\r
    const viewProjection = map!.getView().getProjection();\r
    const svgProjection = 'EPSG:4326';\r
    const transformExtent = transform([imgExtent[0], imgExtent[1]], svgProjection, viewProjection ).concat(transform([imgExtent[2], imgExtent[3]], svgProjection, viewProjection));\r
    const svgResolution = (transformExtent[2] - transformExtent[0]) / width;\r
    // 根据范围计算中心点\r
    const extentCenter = [(transformExtent[2] - transformExtent[0]) / 2 + transformExtent[0], (transformExtent[3] - transformExtent[1]) / 2 + transformExtent[1]];\r
\r
    oLayer = new Layer({\r
        render: function (frameState) {\r
            const scale = svgResolution / frameState.viewState.resolution;\r
            const center = frameState.viewState.center;\r
            const size = frameState.size;\r
            const cssTransform = composeCssTransform(\r
                size[0] / 2,\r
                size[1] / 2,\r
                scale,\r
                scale,\r
                frameState.viewState.rotation,\r
                (extentCenter[0] / svgResolution) - (center[0] / svgResolution) - width / 2,\r
                (center[1] / svgResolution) - (extentCenter[1] / svgResolution) - height / 2\r
            );\r
            svgContainer.style.transform = cssTransform;\r
            svgContainer.style.opacity = this.getOpacity()+'';\r
            return svgContainer;\r
        }\r
    });\r
\r
    return oLayer;\r
}\r
\r
onMounted(async () => {\r
    map = createMap();\r
    const svgLayer = await createSvgLayer({\r
        url: "https://openlayers.org/en/latest/examples/data/world.svg",\r
        imgExtent: [-180, -90, 180, 90],\r
        className: 'svg-layer',\r
    }); \r
    map.addLayer(svgLayer);\r
})\r
\r
<\/script>\r
\r
<style scoped>\r
#map {\r
    width: 100%;\r
    height: 400px;\r
}\r
</style>`,M=JSON.parse('{"title":"SVG 图层","description":"","frontmatter":{},"headers":[],"relativePath":"map/svgLayer.md","filePath":"map/svgLayer.md"}'),_={name:"map/svgLayer.md"},j=Object.assign(_,{setup(L){const o=y(!0),s=w();return c(async()=>{s.value=(await d(async()=>{const{default:i}=await import("./chunks/SvgLayer.BC__UsL5.js");return{default:i}},__vite__mapDeps([0,1,2]))).default}),(i,e)=>{const m=g("ClientOnly");return u(),v("div",null,[e[1]||(e[1]=n("h1",{id:"svg-图层",tabindex:"-1"},[t("SVG 图层 "),n("a",{class:"header-anchor",href:"#svg-图层","aria-label":'Permalink to "SVG 图层"'},"​")],-1)),e[2]||(e[2]=n("p",null,[t("利用 "),n("strong",null,"Layer"),t(" 的 "),n("strong",null,"render"),t(" 函数渲染")],-1)),p(r(a(x),null,null,512),[[h,o.value]]),r(m,null,{default:l(()=>[r(a(E),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Atrue%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",background:"undefined",visible:!0,onMount:e[0]||(e[0]=()=>{o.value=!1}),vueCode:a(C)},f({_:2},[s.value?{name:"vue",fn:l(()=>[r(a(s))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])}}});export{M as __pageData,j as default};
