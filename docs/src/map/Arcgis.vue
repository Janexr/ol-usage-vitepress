<template>
    <div id="map"></div>
    <div class="radio-outer">
        <ElRadioGroup v-model="currentType" @change="toggleType">
            <ElRadioButton v-for="type in types" :value="type"> {{ type }} </ElRadioButton>
        </ElRadioGroup>
    </div>
    <div id="mouse-position"></div>
</template>

<script lang="ts" setup>
import { Map as OlMap, View } from 'ol';
import * as olLoadingstrategy from 'ol/loadingstrategy';
import { Tile, Image, Vector as VectorLayer, Layer } from 'ol/layer';
import { TileArcGISRest, ImageArcGISRest, Vector as VectorSource } from 'ol/source';
import { transform } from 'ol/proj';
import { EsriJSON } from 'ol/format';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import { onMounted, ref } from 'vue';
import { createXYZ } from 'ol/tilegrid';

const currentType = ref('TileArcGISRest');
const types = ['TileArcGISRest', 'ImageArcGISRest', 'EsriJSON'];

let map: OlMap | null = null;
function createMap() {
    return new OlMap({
        target: 'map', // 绑定html元素
        view: new View({ // 地图视图
            projection: 'EPSG:3857', // 坐标系，有EPSG:4326和EPSG:3857
            center: transform([117.064, 36.675], 'EPSG:4326', 'EPSG:3857'),
            zoom: 10 // 地图缩放级别（打开页面时默认级别）
        })
    })
}

const layerMap = new Map<string, Layer>();
function addLayer(type: string) {
    if (type === 'TileArcGISRest') {
        const arcgisSource = new TileArcGISRest({
            // ArcGIS世界影像图
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
            wrapX: false
        })
        const arcgisLayer = new Tile({
            source: arcgisSource
        })
        map!.addLayer(arcgisLayer);
        layerMap.set('TileArcGISRest', arcgisLayer);
    } else if (type === 'ImageArcGISRest') {
        const arcgisSource = new ImageArcGISRest({
            // ArcGIS世界影像图
            url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
        })
        const arcgisLayer = new Image({
            source: arcgisSource
        })
        map!.addLayer(arcgisLayer);
        layerMap.set('ImageArcGISRest', arcgisLayer);
    } else {
        // const arcgisVectorSource = new VectorSource({
        //     format: new EsriJSON(),
        //     url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/0/query?where=1=1&f=json'
        // })
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
        map!.addLayer(arcgisVectorLayer);
        layerMap.set('EsriJSON', arcgisVectorLayer);
    }
}

function removeLayer(type: string) {
    if (layerMap.has(type)) {
        map?.removeLayer(layerMap.get(type)!);
        layerMap.delete(type);
    }
}

let prevType: string = '';
function toggleType() {
    if (layerMap.has(prevType)) {
        removeLayer(prevType);
    }
    addLayer(currentType.value);
    prevType = currentType.value;
}

onMounted(() => {
    map = createMap();
    toggleType();
})

</script>


<style scoped>
#map {
    width: 100%;
    height: 400px;
}

#mouse-position {
    position: absolute;
    top: 5px;
    left: 10px;
}

.radio-outer {
    position: absolute;
    bottom: 10px;
    left: 10px;
}
</style>