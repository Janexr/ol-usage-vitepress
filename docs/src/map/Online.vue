<template>
    <div id="map"></div>
    <div class="radio-outer">
        <ElRadioGroup v-model="currentMap" @change="toggleLayer">
            <ElRadioButton v-for="(value, key) in mapList" :value="key"> {{ key }} </ElRadioButton>
        </ElRadioGroup>
    </div>
</template>

<script lang="ts" setup>
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { transform } from 'ol/proj'
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import { onMounted, ref } from 'vue';
import { addBdMercatorProjection, addGcj02MercatorProjection } from './proj';
import { TileGrid } from 'ol/tilegrid';
import { applyTransform } from 'ol/extent';
import * as projzh from 'projzh';

const tdtTk = '59d3a78163c2741d6aa0cb12f77fa62a'; // 在此处填写您的天地图密钥
const mapList: Record<string, string[]> = {
    '天地图': [
        'http://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk,
        'http://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk
    ],
    '天地图-影像图': [
        'http://t{0-7}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk,
        'http://t{0-7}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk
    ],
    '天地图-地形图': [
        'http://t{0-7}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk,
        'http://t{0-7}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + tdtTk
    ],
    '高德地图': [
        'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
    ],
    '百度地图': [
        'http://online{0-3}.map.bdimg.com/onlinelabel/qt=tile&x={x}&y={y}&z={z}&v=009&styles=pl&udt=20170301&scaler=1&p=1'
    ]
}

let map: OlMap | null = null;
const LayerMap = new Map<string, TileLayer[]>();
function createMap() {
    return new OlMap({
        target: 'map', // 绑定html元素
        view: new View({ // 地图视图
            projection: "EPSG:3857", // 坐标系，有EPSG:4326和EPSG:3857
            center: transform([120, 30], 'EPSG:4326', 'EPSG:3857'), // 杭州坐标
            zoom: 12 // 地图缩放级别（打开页面时默认级别）
        })
    })
}

const currentMap = ref('高德地图');
function addLayer(name: string) {
    const urls = mapList[name];
    const layers = urls.map(url => {
        let source = new XYZ({
            url: url,
            projection: name === '高德地图' ? 'GCJ02' : 'EPSG:3857',
            crossOrigin: 'anonymous'
        });
        if (name === '百度地图') {
            const extent = [72.004, 0.8293, 137.8347, 55.8271];
            addBdMercatorProjection();

            const bmercResolutions = new Array(19);
            for (let i = 0; i < 19; ++i) {
                bmercResolutions[i] = Math.pow(2, 18 - i);
            }
            source = new XYZ({
                projection: 'baidu',
                maxZoom: 18,
                tileUrlFunction: function (tileCoord) {
                    const urls = [0, 1, 2, 3, 4].map(function (sub) {
                        return 'http://online' + sub +
                            '.map.bdimg.com/onlinelabel/qt=tile&x={x}&y={y}&z={z}&v=009&styles=pl&udt=20170301&scaler=1&p=1';
                    });
                    const x = tileCoord[1];
                    const y = -tileCoord[2] - 1;
                    const z = tileCoord[0];
                    const hash = (x << z) + y;
                    let index = hash % urls.length;
                    index = index < 0 ? index + urls.length : index;
                    return urls[index].replace('{x}', x+'').replace('{y}', y+'').replace('{z}', z+'');
                },
                tileGrid: new TileGrid({
                    resolutions: bmercResolutions,
                    origin: [0, 0],
                    extent: applyTransform(extent, projzh.ll2bmerc),
                    tileSize: [256, 256]
                }),
                crossOrigin: 'anonymous'
            })
        }
        const layer = new TileLayer({
            source
        });
        map!.addLayer(layer);
        return layer;
    });
    LayerMap.set(name, layers);
}

function removeLayer(name: string) {
    const layers = LayerMap.get(name);
    if (layers) {
        layers.forEach(layer => {
            map!.removeLayer(layer);
        });
        LayerMap.delete(name);
    }
}

let previousName = '';
function toggleLayer() {
    if (LayerMap.has(previousName)) {
        removeLayer(previousName);
    }
    addLayer(currentMap.value);
    previousName = currentMap.value;
}

onMounted(() => {
    map = createMap();
    addBdMercatorProjection();
    addGcj02MercatorProjection();
    toggleLayer();
})

</script>


<style scoped>
#map {
    width: 100%;
    height: 400px;
}

.radio-outer {
    position: absolute;
    bottom: 10px;
    left: 10px;
}
</style>