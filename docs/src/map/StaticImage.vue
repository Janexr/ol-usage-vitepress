<template>
    <div id="map"></div>
    <div class="radio-outer">
        <ElRadioGroup v-model="currentType" @change="toggleType">
            <ElRadioButton v-for="type in types" :value="type"> {{ type }} </ElRadioButton>
        </ElRadioGroup>
    </div>
</template>

<script lang="ts" setup>
import { Map as OlMap, View } from 'ol';
import ImageLayer from 'ol/layer/Image.js';
import Static from 'ol/source/ImageStatic.js';
import Projection from 'ol/proj/Projection.js';
import { onMounted, ref } from 'vue';
import { transform } from 'ol/proj';
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import { getCenter } from 'ol/extent';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Icon from 'ol/style/Icon.js';
import Style from 'ol/style/Style.js';
import IconPng from './icon.png';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

const currentType = ref('地理坐标');
const types = ['地理坐标', '像素坐标'];

let map: OlMap | null = null, pixelMap: OlMap | null = null;
let imgLayer: ImageLayer<Static> | null = null;
function createMap() {
    map = new OlMap({
        target: 'map', // 绑定html元素
        view: new View({
            projection: 'EPSG:3857', // 坐标系，有EPSG:4326和EPSG:3857
            center: transform([120, 30], 'EPSG:4326', 'EPSG:3857'),
            zoom: 18,
        }),
    })
    imgLayer = new ImageLayer({
        source: new Static({
            url: 'https://imgs.xkcd.com/comics/online_communities.png',
            imageExtent: [119.995, 29.998, 120.005, 30.005],
            projection: 'EPSG:4326',
        }),
    });
    map.addLayer(imgLayer);

    const centerIcon = new Feature(new Point(transform([120, 30], 'EPSG:4326', 'EPSG:3857')));
    const vectorLayer = new VectorLayer({
        style: new Style({
            image: new Icon({
                anchor: [0.5, 0.96],
                crossOrigin: 'anonymous',
                src: IconPng,
            }),
        }),
        source: new VectorSource({ 
            features: [centerIcon] 
        }),
    })
    map.addLayer(vectorLayer);
}

function createPixelMap() {
    const extent = [0, 0, 1024, 968];
    const projection = new Projection({
        code: 'xkcd-image',
        units: 'pixels',
        extent: extent,
    });
    const center = getCenter(extent);

    pixelMap = new OlMap({
        layers: [
            new ImageLayer({
                source: new Static({
                    url: 'https://imgs.xkcd.com/comics/online_communities.png',
                    projection: projection,
                    imageExtent: extent,
                }),
            }),
        ],
        target: 'map',
        view: new View({
            projection: projection,
            center,
            zoom: 2,
            maxZoom: 8,
        }),
    });

    const centerIcon = new Feature(new Point(center));
    const originIcon = new Feature(new Point([0, 0]));
    const vectorLayer = new VectorLayer({
        style: new Style({
            image: new Icon({
                anchor: [0.5, 0.96],
                crossOrigin: 'anonymous',
                src: IconPng,
            }),
        }),
        source: new VectorSource({ features: [centerIcon, originIcon] }),
    })
    pixelMap.addLayer(vectorLayer);
}

function toggleType() {
    if (currentType.value === '地理坐标') {
        if (pixelMap) {
            pixelMap.setTarget(undefined);
        }
        if (!map) {
            createMap();
        } else {
            map.setTarget('map');
        }
    } else {
        if (map) {
            map.setTarget(undefined);
        }
        if (!pixelMap) {
            createPixelMap();
        } else {
            pixelMap.setTarget('map');
        }
    }
}

onMounted(() => {
    createMap();
})
</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>