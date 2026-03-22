<template>
    <div id="map"></div>
</template>

<script lang="ts" setup>
import { Map as OlMap, View } from 'ol';
import { Layer } from 'ol/layer';
import { onMounted, ref } from 'vue';
import { composeCssTransform } from 'ol/transform';
import { transform } from 'ol/proj';

let map: OlMap | null = null;
function createMap() {
    return new OlMap({
        target: 'map', // 绑定html元素
        view: new View({
            center: [0, 0],
            zoom: 2,
        }),
    })
}

function getBase64(img: string) {
    const image = new Image()
    image.crossOrigin = ''
    image.src = img
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
        image.onload = function () {
            const { width, height } = image
            resolve({ width, height })
        }
    })
}

async function createSvgLayer(options: {
    url: string, 
    imgExtent: number[],
    className: string,
}) {
    const { url, imgExtent, className } = options;
    let oLayer;
    const svgContainer = document.createElement('div');

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
        const svg = xhr.responseXML!.documentElement;
        svgContainer.ownerDocument.importNode(svg);
        svgContainer.appendChild(svg);
    });
    xhr.send();

    const res = await getBase64(url);
    const width = res.width;
    const height = res.height;
    svgContainer.style.width = width + 'px';
    svgContainer.style.height = height + 'px';
    svgContainer.style.transformOrigin = 'top left';
    svgContainer.className = className;
    const viewProjection = map!.getView().getProjection();
    const svgProjection = 'EPSG:4326';
    const transformExtent = transform([imgExtent[0], imgExtent[1]], svgProjection, viewProjection ).concat(transform([imgExtent[2], imgExtent[3]], svgProjection, viewProjection));
    const svgResolution = (transformExtent[2] - transformExtent[0]) / width;
    // 根据范围计算中心点
    const extentCenter = [(transformExtent[2] - transformExtent[0]) / 2 + transformExtent[0], (transformExtent[3] - transformExtent[1]) / 2 + transformExtent[1]];

    oLayer = new Layer({
        render: function (frameState) {
            const scale = svgResolution / frameState.viewState.resolution;
            const center = frameState.viewState.center;
            const size = frameState.size;
            const cssTransform = composeCssTransform(
                size[0] / 2,
                size[1] / 2,
                scale,
                scale,
                frameState.viewState.rotation,
                (extentCenter[0] / svgResolution) - (center[0] / svgResolution) - width / 2,
                (center[1] / svgResolution) - (extentCenter[1] / svgResolution) - height / 2
            );
            svgContainer.style.transform = cssTransform;
            svgContainer.style.opacity = this.getOpacity()+'';
            return svgContainer;
        }
    });

    return oLayer;
}

onMounted(async () => {
    map = createMap();
    const svgLayer = await createSvgLayer({
        url: "https://openlayers.org/en/latest/examples/data/world.svg",
        imgExtent: [-180, -90, 180, 90],
        className: 'svg-layer',
    }); 
    map.addLayer(svgLayer);
})

</script>

<style scoped>
#map {
    width: 100%;
    height: 400px;
}
</style>