<template>
    <div id="map"></div>
</template>

<script lang="ts" setup>
import { Map as OlMap, View } from 'ol';
import { VectorTile as VectorTileLayer } from 'ol/layer';
import { VectorTile as VectorTileSource } from 'ol/source';
import { MVT } from 'ol/format';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Text from 'ol/style/Text.js';
import Style from 'ol/style/Style.js';
import { onMounted, ref } from 'vue';

const style = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new Stroke({
    color: '#319FD3',
    width: 1,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#000',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 3,
    }),
  }),
});

let map: OlMap | null = null;
let vtLayer: VectorTileLayer | null = null;
function createMap() {
    return new OlMap({
        target: 'map', // 绑定html元素
        view: new View({
            center: [0, 6000000],
            zoom: 4,
        }),
    })
}

function addLayer() {
    vtLayer = new VectorTileLayer({
        declutter: true,
        source: new VectorTileSource({
            maxZoom: 15,
            format: new MVT(),
            url:
                'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
                'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
        }),
        style: function (feature) {
            style.getText()!.setText(feature.get('name'));
            return style;
        },
    });
    map!.addLayer(vtLayer);
}

onMounted(() => {
    map = createMap();
    addLayer();
})

</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>