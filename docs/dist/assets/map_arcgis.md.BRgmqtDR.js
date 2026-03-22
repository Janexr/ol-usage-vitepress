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
</style>`,f=JSON.parse('{"title":"ArcGIS 服务","description":"","frontmatter":{},"headers":[],"relativePath":"map/arcgis.md","filePath":"map/arcgis.md"}'),B={name:"map/arcgis.md"},I=Object.assign(B,{setup(v){const t=F(!0),n=p();return r(async()=>{n.value=(await k(async()=>{const{default:e}=await import("./chunks/Arcgis.CAKZXVlw.js");return{default:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]))).default}),(e,s)=>{const h=E("ClientOnly");return g(),d("div",null,[s[1]||(s[1]=y(`<h1 id="arcgis-服务" tabindex="-1">ArcGIS 服务 <a class="header-anchor" href="#arcgis-服务" aria-label="Permalink to &quot;ArcGIS 服务&quot;">​</a></h1><h2 id="tilearcgisrest" tabindex="-1">TileArcGISRest <a class="header-anchor" href="#tilearcgisrest" aria-label="Permalink to &quot;TileArcGISRest&quot;">​</a></h2><p>OpenLayers 提供了TileArcGISRest类用来加载ArcGIS切片数据源。使用起来很方便，像其它图层和数据源一样，将创建好的切片数据源放于切片图层中即可</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 创建ArcGIS Server Rest 瓦片图层</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arcgisSource</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ol.source.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">TileArcGISRest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ArcGIS世界影像图</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    url: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    wrapX:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arcgisLayer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ol.layer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Tile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    source:arcgisSource</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addLayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arcgisLayer)</span></span></code></pre></div><h2 id="imagearcgisrest" tabindex="-1">ImageArcGISRest <a class="header-anchor" href="#imagearcgisrest" aria-label="Permalink to &quot;ImageArcGISRest&quot;">​</a></h2><p>对于没切片的ArcGIS服务，使用ImageArcGISRest来加载，它会动态生成当前视图范围的图层图片</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arcgisSource</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ol.source.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ImageArcGISRest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // ArcGIS世界影像图</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    url: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arcgisLayer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ol.layer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    source:arcgisSource</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addLayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arcgisLayer)</span></span></code></pre></div><h2 id="arcgis-矢量数据" tabindex="-1">ArcGIS 矢量数据 <a class="header-anchor" href="#arcgis-矢量数据" aria-label="Permalink to &quot;ArcGIS 矢量数据&quot;">​</a></h2><p>相比前两种加载栅格图层的方式，该方式的缺点是只能一个图层一个图层的加载，优点是可以在前端自定义样式。<br> 加载ArcGIS Server的REST服务矢量地图：使用ol.layer.Vector+ol.source.Vector实现，通过Vector数据源的loader参数设置加载矢量要素的函数，然后通过请求矢量数据服务，再通过ol.format.EsriJSON解析数据，调用readFeatures方法解析和读取要素，最后调用矢量数据源对象的addFeatures方法加载要素，添加到矢量图层中进行渲染和显示。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vsource</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> VectorSource</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    format: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> EsriJSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    strategy: olLoadingstrategy.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">createXYZ</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        tileSize: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">512</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })),</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    loader</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">extent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">resolution</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">projection</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/0/query/?f=json&amp;&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &#39;returnGeometry=true&amp;spatialRel=esriSpatialRelIntersects&amp;geometry=&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            encodeURIComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;{&quot;xmin&quot;:&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> extent[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;,&quot;ymin&quot;:&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                extent[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;,&quot;xmax&quot;:&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> extent[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;,&quot;ymax&quot;:&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> extent[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                &#39;,&quot;spatialReference&quot;:{&quot;wkid&quot;:102100}}&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &#39;&amp;geometryType=esriGeometryEnvelope&amp;inSR=102100&amp;outFields=*&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &#39;&amp;outSR=102100&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        fetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(url)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">response</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) { </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> response.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(); })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            .</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">                const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> features</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> vsource.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getFormat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readFeatures</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(json, {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                    featureProjection: projection</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                vsource.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addFeatures</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(features);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> arcgisVectorLayer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> VectorLayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    source: vsource,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    style: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        fill: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Fill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            color: [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">255</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        stroke: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Stroke</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            color: [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">255</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            width: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addLayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(arcgisVectorLayer);</span></span></code></pre></div><h2 id="离线瓦片" tabindex="-1">离线瓦片 <a class="header-anchor" href="#离线瓦片" aria-label="Permalink to &quot;离线瓦片&quot;">​</a></h2><p>有些项目不能使用ArcGIS在线服务，需要把瓦片文件下载下来，使用 Nginx 或者其他工具发布静态资源服务。<br> ol5 中 tileUrlFunction 中的代码有所不同，<code>const y = &#39;R&#39; + zeroFill(-coordinate[2]-1, 8, 16);</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> zeroFill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">num</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">len</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">radix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> num.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(radix </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (str.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> len) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        str </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;0&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> str;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ol.source.XYZ添加瓦片地图的层</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tileLayer </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ol.layer.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Tile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    source: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ol.source.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">XYZ</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        tileUrlFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">coordinate</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> x</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;C&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> zeroFill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(coordinate[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> y</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;R&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> zeroFill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(coordinate[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> z</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;L&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> zeroFill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(coordinate[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;hefei/&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> z </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> y </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/&#39;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> +</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//这里可以修改地图路径</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        projection: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;EPSG:3857&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">map.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addLayer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(tileLayer);</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//添加到map里面</span></span></code></pre></div>`,13)),o(i(a(m),null,null,512),[[c,t.value]]),i(h,null,{default:l(()=>[i(a(C),{title:"",description:"",locale:"",select:"vue",order:"vue,react,html",github:"",gitlab:"",theme:"",lightTheme:"",darkTheme:"",stackblitz:"%7B%22show%22%3Atrue%7D",codesandbox:"%7B%22show%22%3Atrue%7D",codeplayer:"%7B%22show%22%3Afalse%7D",files:"%7B%22vue%22%3A%7B%7D%2C%22react%22%3A%7B%7D%2C%22html%22%3A%7B%7D%7D",scope:"",htmlWriteWay:"write",background:"undefined",visible:!0,onMount:s[0]||(s[0]=()=>{t.value=!1}),vueCode:a(A)},u({_:2},[n.value?{name:"vue",fn:l(()=>[i(a(n))]),key:"0"}:void 0]),1032,["vueCode"])]),_:1})])}}});export{f as __pageData,I as default};
