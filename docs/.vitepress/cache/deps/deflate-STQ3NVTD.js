import {
  inflate_1
} from "./chunk-5M4PVDI4.js";
import {
  BaseDecoder
} from "./chunk-U5RMOR45.js";
import "./chunk-DC5AMYBS.js";

// node_modules/geotiff/dist-module/compression/deflate.js
var DeflateDecoder = class extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
};
export {
  DeflateDecoder as default
};
//# sourceMappingURL=deflate-STQ3NVTD.js.map
