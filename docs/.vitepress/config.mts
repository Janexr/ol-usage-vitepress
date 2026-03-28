import { defineConfig } from "vitepress";
import { vitepressDemoPlugin } from "vitepress-demo-plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "OpenLayers 实战笔记",
    description: "OpenLayers 使用手册",
    outDir: "dist",
    srcDir: "src",
    head: [["link", { rel: "icon", href: "/map.svg" }]],
    themeConfig: {
        logo: "/map.svg",
        search: {
            provider: "local",
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: "开始",
                link: "/start/instruction",
                activeMatch: "^/start/",
            },
            { text: "底图", link: "/map/online", activeMatch: "^/map/" },
            { text: "图形", link: "/vector/instruction", activeMatch: "^/vector/" },
        ],

        sidebar: {
            "/start/": [
                {
                    text: "开始",
                    items: [
                        { text: "介绍", link: "/start/instruction" },
                        { text: "安装", link: "/start/install" },
                        { text: "快速上手", link: "/start/use" },
                    ],
                },
            ],
            "/map/": [
                {
                    text: "底图",
                    items: [
                        { text: "在线地图", link: "/map/online" },
                        { text: "ArcGIS 服务", link: "/map/arcgis" },
                        { text: "矢量切片", link: "/map/vectorTile" },
                        { text: "静态图片", link: "/map/staticImg" },
                        { text: "SVG图层", link: "/map/svgLayer" },
                    ],
                }
            ],
            "/vector/": [
                {
                    text: "图形",
                    items: [
                        { text: "介绍", link: "/vector/instruction" },
                        { text: "坐标数据格式", link: "/vector/coordinates" },
                        { text: "style 格式说明", link: "/vector/style" },
                    ],
                }
            ],
        },

        socialLinks: [
            { icon: "github", link: "https://github.com/Janexr/ol-usage-vitepress" },
        ],
    },
    markdown: {
        config(md) {
            md.use(vitepressDemoPlugin, {
                stackblitz: {
                    show: true,
                },
                codesandbox: {
                    show: true,
                },
            });
        },
    },
});
