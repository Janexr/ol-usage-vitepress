import {
  require_fs
} from "./chunk-25MWNFCR.js";
import {
  Fragment,
  Transition,
  computed,
  createApp,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createStaticVNode,
  createTextVNode,
  createVNode,
  defineComponent,
  inject,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  renderList,
  renderSlot,
  toDisplayString,
  unref,
  watch,
  watchEffect,
  withCtx
} from "./chunk-VY422XXG.js";
import {
  __commonJS,
  __export,
  __publicField,
  __toESM
} from "./chunk-DC5AMYBS.js";

// browser-external:path
var require_path = __commonJS({
  "browser-external:path"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key2) {
        if (key2 !== "__esModule" && key2 !== "__proto__" && key2 !== "constructor" && key2 !== "splice") {
          console.warn(`Module "path" has been externalized for browser compatibility. Cannot access "path.${key2}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/@shikijs/types/dist/index.mjs
var ShikiError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};

// node_modules/@shikijs/engine-oniguruma/dist/index.mjs
var ShikiError2 = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};
function getHeapMax() {
  return 2147483648;
}
function _emscripten_get_now() {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}
var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
async function main(init) {
  let wasmMemory;
  let buffer;
  const binding = {};
  function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    binding.HEAPU8 = new Uint8Array(buf);
    binding.HEAPU32 = new Uint32Array(buf);
  }
  function _emscripten_memcpy_big(dest, src, num) {
    binding.HEAPU8.copyWithin(dest, src, src + num);
  }
  function emscripten_realloc_buffer(size) {
    try {
      wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
      updateGlobalBufferAndViews(wasmMemory.buffer);
      return 1;
    } catch {
    }
  }
  function _emscripten_resize_heap(requestedSize) {
    const oldSize = binding.HEAPU8.length;
    requestedSize = requestedSize >>> 0;
    const maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize)
      return false;
    for (let cutDown = 1; cutDown <= 4; cutDown *= 2) {
      let overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      const newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
      const replacement = emscripten_realloc_buffer(newSize);
      if (replacement)
        return true;
    }
    return false;
  }
  const UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
  function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead = 1024) {
    const endIdx = idx + maxBytesToRead;
    let endPtr = idx;
    while (heapOrArray[endPtr] && !(endPtr >= endIdx))
      ++endPtr;
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    let str = "";
    while (idx < endPtr) {
      let u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      const u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) === 192) {
        str += String.fromCharCode((u0 & 31) << 6 | u1);
        continue;
      }
      const u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) === 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
      } else {
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        const ch = u0 - 65536;
        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
      }
    }
    return str;
  }
  function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(binding.HEAPU8, ptr, maxBytesToRead) : "";
  }
  const asmLibraryArg = {
    emscripten_get_now: _emscripten_get_now,
    emscripten_memcpy_big: _emscripten_memcpy_big,
    emscripten_resize_heap: _emscripten_resize_heap,
    fd_write: () => 0
  };
  async function createWasm() {
    const info = {
      env: asmLibraryArg,
      wasi_snapshot_preview1: asmLibraryArg
    };
    const exports = await init(info);
    wasmMemory = exports.memory;
    updateGlobalBufferAndViews(wasmMemory.buffer);
    Object.assign(binding, exports);
    binding.UTF8ToString = UTF8ToString;
  }
  await createWasm();
  return binding;
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField2 = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var onigBinding = null;
function throwLastOnigError(onigBinding2) {
  throw new ShikiError2(onigBinding2.UTF8ToString(onigBinding2.getLastOnigError()));
}
var UtfString = class _UtfString {
  constructor(str) {
    __publicField2(this, "utf16Length");
    __publicField2(this, "utf8Length");
    __publicField2(this, "utf16Value");
    __publicField2(this, "utf8Value");
    __publicField2(this, "utf16OffsetToUtf8");
    __publicField2(this, "utf8OffsetToUtf16");
    const utf16Length = str.length;
    const utf8Length = _UtfString._utf8ByteLength(str);
    const computeIndicesMapping = utf8Length !== utf16Length;
    const utf16OffsetToUtf8 = computeIndicesMapping ? new Uint32Array(utf16Length + 1) : null;
    if (computeIndicesMapping)
      utf16OffsetToUtf8[utf16Length] = utf8Length;
    const utf8OffsetToUtf16 = computeIndicesMapping ? new Uint32Array(utf8Length + 1) : null;
    if (computeIndicesMapping)
      utf8OffsetToUtf16[utf8Length] = utf16Length;
    const utf8Value = new Uint8Array(utf8Length);
    let i8 = 0;
    for (let i16 = 0; i16 < utf16Length; i16++) {
      const charCode = str.charCodeAt(i16);
      let codePoint = charCode;
      let wasSurrogatePair = false;
      if (charCode >= 55296 && charCode <= 56319) {
        if (i16 + 1 < utf16Length) {
          const nextCharCode = str.charCodeAt(i16 + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            codePoint = (charCode - 55296 << 10) + 65536 | nextCharCode - 56320;
            wasSurrogatePair = true;
          }
        }
      }
      if (computeIndicesMapping) {
        utf16OffsetToUtf8[i16] = i8;
        if (wasSurrogatePair)
          utf16OffsetToUtf8[i16 + 1] = i8;
        if (codePoint <= 127) {
          utf8OffsetToUtf16[i8 + 0] = i16;
        } else if (codePoint <= 2047) {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
        } else if (codePoint <= 65535) {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
          utf8OffsetToUtf16[i8 + 2] = i16;
        } else {
          utf8OffsetToUtf16[i8 + 0] = i16;
          utf8OffsetToUtf16[i8 + 1] = i16;
          utf8OffsetToUtf16[i8 + 2] = i16;
          utf8OffsetToUtf16[i8 + 3] = i16;
        }
      }
      if (codePoint <= 127) {
        utf8Value[i8++] = codePoint;
      } else if (codePoint <= 2047) {
        utf8Value[i8++] = 192 | (codePoint & 1984) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      } else if (codePoint <= 65535) {
        utf8Value[i8++] = 224 | (codePoint & 61440) >>> 12;
        utf8Value[i8++] = 128 | (codePoint & 4032) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      } else {
        utf8Value[i8++] = 240 | (codePoint & 1835008) >>> 18;
        utf8Value[i8++] = 128 | (codePoint & 258048) >>> 12;
        utf8Value[i8++] = 128 | (codePoint & 4032) >>> 6;
        utf8Value[i8++] = 128 | (codePoint & 63) >>> 0;
      }
      if (wasSurrogatePair)
        i16++;
    }
    this.utf16Length = utf16Length;
    this.utf8Length = utf8Length;
    this.utf16Value = str;
    this.utf8Value = utf8Value;
    this.utf16OffsetToUtf8 = utf16OffsetToUtf8;
    this.utf8OffsetToUtf16 = utf8OffsetToUtf16;
  }
  static _utf8ByteLength(str) {
    let result = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      const charCode = str.charCodeAt(i);
      let codepoint = charCode;
      let wasSurrogatePair = false;
      if (charCode >= 55296 && charCode <= 56319) {
        if (i + 1 < len) {
          const nextCharCode = str.charCodeAt(i + 1);
          if (nextCharCode >= 56320 && nextCharCode <= 57343) {
            codepoint = (charCode - 55296 << 10) + 65536 | nextCharCode - 56320;
            wasSurrogatePair = true;
          }
        }
      }
      if (codepoint <= 127)
        result += 1;
      else if (codepoint <= 2047)
        result += 2;
      else if (codepoint <= 65535)
        result += 3;
      else
        result += 4;
      if (wasSurrogatePair)
        i++;
    }
    return result;
  }
  createString(onigBinding2) {
    const result = onigBinding2.omalloc(this.utf8Length);
    onigBinding2.HEAPU8.set(this.utf8Value, result);
    return result;
  }
};
var _OnigString = class {
  constructor(str) {
    __publicField2(this, "id", ++_OnigString.LAST_ID);
    __publicField2(this, "_onigBinding");
    __publicField2(this, "content");
    __publicField2(this, "utf16Length");
    __publicField2(this, "utf8Length");
    __publicField2(this, "utf16OffsetToUtf8");
    __publicField2(this, "utf8OffsetToUtf16");
    __publicField2(this, "ptr");
    if (!onigBinding)
      throw new ShikiError2("Must invoke loadWasm first.");
    this._onigBinding = onigBinding;
    this.content = str;
    const utfString = new UtfString(str);
    this.utf16Length = utfString.utf16Length;
    this.utf8Length = utfString.utf8Length;
    this.utf16OffsetToUtf8 = utfString.utf16OffsetToUtf8;
    this.utf8OffsetToUtf16 = utfString.utf8OffsetToUtf16;
    if (this.utf8Length < 1e4 && !_OnigString._sharedPtrInUse) {
      if (!_OnigString._sharedPtr)
        _OnigString._sharedPtr = onigBinding.omalloc(1e4);
      _OnigString._sharedPtrInUse = true;
      onigBinding.HEAPU8.set(utfString.utf8Value, _OnigString._sharedPtr);
      this.ptr = _OnigString._sharedPtr;
    } else {
      this.ptr = utfString.createString(onigBinding);
    }
  }
  convertUtf8OffsetToUtf16(utf8Offset) {
    if (this.utf8OffsetToUtf16) {
      if (utf8Offset < 0)
        return 0;
      if (utf8Offset > this.utf8Length)
        return this.utf16Length;
      return this.utf8OffsetToUtf16[utf8Offset];
    }
    return utf8Offset;
  }
  convertUtf16OffsetToUtf8(utf16Offset) {
    if (this.utf16OffsetToUtf8) {
      if (utf16Offset < 0)
        return 0;
      if (utf16Offset > this.utf16Length)
        return this.utf8Length;
      return this.utf16OffsetToUtf8[utf16Offset];
    }
    return utf16Offset;
  }
  dispose() {
    if (this.ptr === _OnigString._sharedPtr)
      _OnigString._sharedPtrInUse = false;
    else
      this._onigBinding.ofree(this.ptr);
  }
};
var OnigString = _OnigString;
__publicField2(OnigString, "LAST_ID", 0);
__publicField2(OnigString, "_sharedPtr", 0);
__publicField2(OnigString, "_sharedPtrInUse", false);
var OnigScanner = class {
  constructor(patterns) {
    __publicField2(this, "_onigBinding");
    __publicField2(this, "_ptr");
    if (!onigBinding)
      throw new ShikiError2("Must invoke loadWasm first.");
    const strPtrsArr = [];
    const strLenArr = [];
    for (let i = 0, len = patterns.length; i < len; i++) {
      const utfString = new UtfString(patterns[i]);
      strPtrsArr[i] = utfString.createString(onigBinding);
      strLenArr[i] = utfString.utf8Length;
    }
    const strPtrsPtr = onigBinding.omalloc(4 * patterns.length);
    onigBinding.HEAPU32.set(strPtrsArr, strPtrsPtr / 4);
    const strLenPtr = onigBinding.omalloc(4 * patterns.length);
    onigBinding.HEAPU32.set(strLenArr, strLenPtr / 4);
    const scannerPtr = onigBinding.createOnigScanner(strPtrsPtr, strLenPtr, patterns.length);
    for (let i = 0, len = patterns.length; i < len; i++)
      onigBinding.ofree(strPtrsArr[i]);
    onigBinding.ofree(strLenPtr);
    onigBinding.ofree(strPtrsPtr);
    if (scannerPtr === 0)
      throwLastOnigError(onigBinding);
    this._onigBinding = onigBinding;
    this._ptr = scannerPtr;
  }
  dispose() {
    this._onigBinding.freeOnigScanner(this._ptr);
  }
  findNextMatchSync(string, startPosition, arg) {
    let options = 0;
    if (typeof arg === "number") {
      options = arg;
    }
    if (typeof string === "string") {
      string = new OnigString(string);
      const result = this._findNextMatchSync(string, startPosition, false, options);
      string.dispose();
      return result;
    }
    return this._findNextMatchSync(string, startPosition, false, options);
  }
  _findNextMatchSync(string, startPosition, debugCall, options) {
    const onigBinding2 = this._onigBinding;
    const resultPtr = onigBinding2.findNextOnigScannerMatch(this._ptr, string.id, string.ptr, string.utf8Length, string.convertUtf16OffsetToUtf8(startPosition), options);
    if (resultPtr === 0) {
      return null;
    }
    const HEAPU32 = onigBinding2.HEAPU32;
    let offset = resultPtr / 4;
    const index = HEAPU32[offset++];
    const count = HEAPU32[offset++];
    const captureIndices = [];
    for (let i = 0; i < count; i++) {
      const beg = string.convertUtf8OffsetToUtf16(HEAPU32[offset++]);
      const end = string.convertUtf8OffsetToUtf16(HEAPU32[offset++]);
      captureIndices[i] = {
        start: beg,
        end,
        length: end - beg
      };
    }
    return {
      index,
      captureIndices
    };
  }
};
function isInstantiatorOptionsObject(dataOrOptions) {
  return typeof dataOrOptions.instantiator === "function";
}
function isInstantiatorModule(dataOrOptions) {
  return typeof dataOrOptions.default === "function";
}
function isDataOptionsObject(dataOrOptions) {
  return typeof dataOrOptions.data !== "undefined";
}
function isResponse(dataOrOptions) {
  return typeof Response !== "undefined" && dataOrOptions instanceof Response;
}
function isArrayBuffer(data) {
  var _a3;
  return typeof ArrayBuffer !== "undefined" && (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) || typeof Buffer !== "undefined" && ((_a3 = Buffer.isBuffer) == null ? void 0 : _a3.call(Buffer, data)) || typeof SharedArrayBuffer !== "undefined" && data instanceof SharedArrayBuffer || typeof Uint32Array !== "undefined" && data instanceof Uint32Array;
}
var initPromise;
function loadWasm(options) {
  if (initPromise)
    return initPromise;
  async function _load() {
    onigBinding = await main(async (info) => {
      let instance = options;
      instance = await instance;
      if (typeof instance === "function")
        instance = await instance(info);
      if (typeof instance === "function")
        instance = await instance(info);
      if (isInstantiatorOptionsObject(instance)) {
        instance = await instance.instantiator(info);
      } else if (isInstantiatorModule(instance)) {
        instance = await instance.default(info);
      } else {
        if (isDataOptionsObject(instance))
          instance = instance.data;
        if (isResponse(instance)) {
          if (typeof WebAssembly.instantiateStreaming === "function")
            instance = await _makeResponseStreamingLoader(instance)(info);
          else
            instance = await _makeResponseNonStreamingLoader(instance)(info);
        } else if (isArrayBuffer(instance)) {
          instance = await _makeArrayBufferLoader(instance)(info);
        } else if (instance instanceof WebAssembly.Module) {
          instance = await _makeArrayBufferLoader(instance)(info);
        } else if ("default" in instance && instance.default instanceof WebAssembly.Module) {
          instance = await _makeArrayBufferLoader(instance.default)(info);
        }
      }
      if ("instance" in instance)
        instance = instance.instance;
      if ("exports" in instance)
        instance = instance.exports;
      return instance;
    });
  }
  initPromise = _load();
  return initPromise;
}
function _makeArrayBufferLoader(data) {
  return (importObject) => WebAssembly.instantiate(data, importObject);
}
function _makeResponseStreamingLoader(data) {
  return (importObject) => WebAssembly.instantiateStreaming(data, importObject);
}
function _makeResponseNonStreamingLoader(data) {
  return async (importObject) => {
    const arrayBuffer = await data.arrayBuffer();
    return WebAssembly.instantiate(arrayBuffer, importObject);
  };
}
var _defaultWasmLoader;
function getDefaultWasmLoader() {
  return _defaultWasmLoader;
}
async function createOnigurumaEngine(options) {
  if (options)
    await loadWasm(options);
  return {
    createScanner(patterns) {
      return new OnigScanner(patterns.map((p2) => typeof p2 === "string" ? p2 : p2.source));
    },
    createString(s) {
      return new OnigString(s);
    }
  };
}

// node_modules/@shikijs/core/dist/shared/core.5hv0Law9.mjs
var _emitDeprecation = 3;
var _emitError = false;
function warnDeprecated(message, version = 3) {
  if (!_emitDeprecation)
    return;
  if (typeof _emitDeprecation === "number" && version > _emitDeprecation)
    return;
  if (_emitError) {
    throw new Error(`[SHIKI DEPRECATE]: ${message}`);
  } else {
    console.trace(`[SHIKI DEPRECATE]: ${message}`);
  }
}

// node_modules/@shikijs/vscode-textmate/dist/index.js
function clone(something) {
  return doClone(something);
}
function doClone(something) {
  if (Array.isArray(something)) {
    return cloneArray(something);
  }
  if (something instanceof RegExp) {
    return something;
  }
  if (typeof something === "object") {
    return cloneObj(something);
  }
  return something;
}
function cloneArray(arr) {
  let r4 = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    r4[i] = doClone(arr[i]);
  }
  return r4;
}
function cloneObj(obj) {
  let r4 = {};
  for (let key2 in obj) {
    r4[key2] = doClone(obj[key2]);
  }
  return r4;
}
function mergeObjects(target, ...sources) {
  sources.forEach((source) => {
    for (let key2 in source) {
      target[key2] = source[key2];
    }
  });
  return target;
}
function basename(path) {
  const idx = ~path.lastIndexOf("/") || ~path.lastIndexOf("\\");
  if (idx === 0) {
    return path;
  } else if (~idx === path.length - 1) {
    return basename(path.substring(0, path.length - 1));
  } else {
    return path.substr(~idx + 1);
  }
}
var CAPTURING_REGEX_SOURCE = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g;
var RegexSource = class {
  static hasCaptures(regexSource) {
    if (regexSource === null) {
      return false;
    }
    CAPTURING_REGEX_SOURCE.lastIndex = 0;
    return CAPTURING_REGEX_SOURCE.test(regexSource);
  }
  static replaceCaptures(regexSource, captureSource, captureIndices) {
    return regexSource.replace(CAPTURING_REGEX_SOURCE, (match, index, commandIndex, command) => {
      let capture = captureIndices[parseInt(index || commandIndex, 10)];
      if (capture) {
        let result = captureSource.substring(capture.start, capture.end);
        while (result[0] === ".") {
          result = result.substring(1);
        }
        switch (command) {
          case "downcase":
            return result.toLowerCase();
          case "upcase":
            return result.toUpperCase();
          default:
            return result;
        }
      } else {
        return match;
      }
    });
  }
};
function strcmp(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
function strArrCmp(a, b) {
  if (a === null && b === null) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  let len1 = a.length;
  let len2 = b.length;
  if (len1 === len2) {
    for (let i = 0; i < len1; i++) {
      let res = strcmp(a[i], b[i]);
      if (res !== 0) {
        return res;
      }
    }
    return 0;
  }
  return len1 - len2;
}
function isValidHexColor(hex) {
  if (/^#[0-9a-f]{6}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{8}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{3}$/i.test(hex)) {
    return true;
  }
  if (/^#[0-9a-f]{4}$/i.test(hex)) {
    return true;
  }
  return false;
}
function escapeRegExpCharacters(value) {
  return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&");
}
var CachedFn = class {
  constructor(fn2) {
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    this.fn = fn2;
  }
  get(key2) {
    if (this.cache.has(key2)) {
      return this.cache.get(key2);
    }
    const value = this.fn(key2);
    this.cache.set(key2, value);
    return value;
  }
};
var Theme = class {
  constructor(_colorMap, _defaults, _root) {
    __publicField(this, "_cachedMatchRoot", new CachedFn(
      (scopeName) => this._root.match(scopeName)
    ));
    this._colorMap = _colorMap;
    this._defaults = _defaults;
    this._root = _root;
  }
  static createFromRawTheme(source, colorMap) {
    return this.createFromParsedTheme(parseTheme(source), colorMap);
  }
  static createFromParsedTheme(source, colorMap) {
    return resolveParsedThemeRules(source, colorMap);
  }
  getColorMap() {
    return this._colorMap.getColorMap();
  }
  getDefaults() {
    return this._defaults;
  }
  match(scopePath) {
    if (scopePath === null) {
      return this._defaults;
    }
    const scopeName = scopePath.scopeName;
    const matchingTrieElements = this._cachedMatchRoot.get(scopeName);
    const effectiveRule = matchingTrieElements.find(
      (v) => _scopePathMatchesParentScopes(scopePath.parent, v.parentScopes)
    );
    if (!effectiveRule) {
      return null;
    }
    return new StyleAttributes(
      effectiveRule.fontStyle,
      effectiveRule.foreground,
      effectiveRule.background
    );
  }
};
var ScopeStack = class _ScopeStack {
  constructor(parent, scopeName) {
    this.parent = parent;
    this.scopeName = scopeName;
  }
  static push(path, scopeNames) {
    for (const name of scopeNames) {
      path = new _ScopeStack(path, name);
    }
    return path;
  }
  static from(...segments) {
    let result = null;
    for (let i = 0; i < segments.length; i++) {
      result = new _ScopeStack(result, segments[i]);
    }
    return result;
  }
  push(scopeName) {
    return new _ScopeStack(this, scopeName);
  }
  getSegments() {
    let item = this;
    const result = [];
    while (item) {
      result.push(item.scopeName);
      item = item.parent;
    }
    result.reverse();
    return result;
  }
  toString() {
    return this.getSegments().join(" ");
  }
  extends(other) {
    if (this === other) {
      return true;
    }
    if (this.parent === null) {
      return false;
    }
    return this.parent.extends(other);
  }
  getExtensionIfDefined(base) {
    const result = [];
    let item = this;
    while (item && item !== base) {
      result.push(item.scopeName);
      item = item.parent;
    }
    return item === base ? result.reverse() : void 0;
  }
};
function _scopePathMatchesParentScopes(scopePath, parentScopes) {
  if (parentScopes.length === 0) {
    return true;
  }
  for (let index = 0; index < parentScopes.length; index++) {
    let scopePattern = parentScopes[index];
    let scopeMustMatch = false;
    if (scopePattern === ">") {
      if (index === parentScopes.length - 1) {
        return false;
      }
      scopePattern = parentScopes[++index];
      scopeMustMatch = true;
    }
    while (scopePath) {
      if (_matchesScope(scopePath.scopeName, scopePattern)) {
        break;
      }
      if (scopeMustMatch) {
        return false;
      }
      scopePath = scopePath.parent;
    }
    if (!scopePath) {
      return false;
    }
    scopePath = scopePath.parent;
  }
  return true;
}
function _matchesScope(scopeName, scopePattern) {
  return scopePattern === scopeName || scopeName.startsWith(scopePattern) && scopeName[scopePattern.length] === ".";
}
var StyleAttributes = class {
  constructor(fontStyle, foregroundId, backgroundId) {
    this.fontStyle = fontStyle;
    this.foregroundId = foregroundId;
    this.backgroundId = backgroundId;
  }
};
function parseTheme(source) {
  if (!source) {
    return [];
  }
  if (!source.settings || !Array.isArray(source.settings)) {
    return [];
  }
  let settings = source.settings;
  let result = [], resultLen = 0;
  for (let i = 0, len = settings.length; i < len; i++) {
    let entry = settings[i];
    if (!entry.settings) {
      continue;
    }
    let scopes;
    if (typeof entry.scope === "string") {
      let _scope = entry.scope;
      _scope = _scope.replace(/^[,]+/, "");
      _scope = _scope.replace(/[,]+$/, "");
      scopes = _scope.split(",");
    } else if (Array.isArray(entry.scope)) {
      scopes = entry.scope;
    } else {
      scopes = [""];
    }
    let fontStyle = -1;
    if (typeof entry.settings.fontStyle === "string") {
      fontStyle = 0;
      let segments = entry.settings.fontStyle.split(" ");
      for (let j = 0, lenJ = segments.length; j < lenJ; j++) {
        let segment = segments[j];
        switch (segment) {
          case "italic":
            fontStyle = fontStyle | 1;
            break;
          case "bold":
            fontStyle = fontStyle | 2;
            break;
          case "underline":
            fontStyle = fontStyle | 4;
            break;
          case "strikethrough":
            fontStyle = fontStyle | 8;
            break;
        }
      }
    }
    let foreground = null;
    if (typeof entry.settings.foreground === "string" && isValidHexColor(entry.settings.foreground)) {
      foreground = entry.settings.foreground;
    }
    let background = null;
    if (typeof entry.settings.background === "string" && isValidHexColor(entry.settings.background)) {
      background = entry.settings.background;
    }
    for (let j = 0, lenJ = scopes.length; j < lenJ; j++) {
      let _scope = scopes[j].trim();
      let segments = _scope.split(" ");
      let scope = segments[segments.length - 1];
      let parentScopes = null;
      if (segments.length > 1) {
        parentScopes = segments.slice(0, segments.length - 1);
        parentScopes.reverse();
      }
      result[resultLen++] = new ParsedThemeRule(
        scope,
        parentScopes,
        i,
        fontStyle,
        foreground,
        background
      );
    }
  }
  return result;
}
var ParsedThemeRule = class {
  constructor(scope, parentScopes, index, fontStyle, foreground, background) {
    this.scope = scope;
    this.parentScopes = parentScopes;
    this.index = index;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
};
var FontStyle = ((FontStyle2) => {
  FontStyle2[FontStyle2["NotSet"] = -1] = "NotSet";
  FontStyle2[FontStyle2["None"] = 0] = "None";
  FontStyle2[FontStyle2["Italic"] = 1] = "Italic";
  FontStyle2[FontStyle2["Bold"] = 2] = "Bold";
  FontStyle2[FontStyle2["Underline"] = 4] = "Underline";
  FontStyle2[FontStyle2["Strikethrough"] = 8] = "Strikethrough";
  return FontStyle2;
})(FontStyle || {});
function resolveParsedThemeRules(parsedThemeRules, _colorMap) {
  parsedThemeRules.sort((a, b) => {
    let r4 = strcmp(a.scope, b.scope);
    if (r4 !== 0) {
      return r4;
    }
    r4 = strArrCmp(a.parentScopes, b.parentScopes);
    if (r4 !== 0) {
      return r4;
    }
    return a.index - b.index;
  });
  let defaultFontStyle = 0;
  let defaultForeground = "#000000";
  let defaultBackground = "#ffffff";
  while (parsedThemeRules.length >= 1 && parsedThemeRules[0].scope === "") {
    let incomingDefaults = parsedThemeRules.shift();
    if (incomingDefaults.fontStyle !== -1) {
      defaultFontStyle = incomingDefaults.fontStyle;
    }
    if (incomingDefaults.foreground !== null) {
      defaultForeground = incomingDefaults.foreground;
    }
    if (incomingDefaults.background !== null) {
      defaultBackground = incomingDefaults.background;
    }
  }
  let colorMap = new ColorMap(_colorMap);
  let defaults = new StyleAttributes(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
  let root2 = new ThemeTrieElement(new ThemeTrieElementRule(0, null, -1, 0, 0), []);
  for (let i = 0, len = parsedThemeRules.length; i < len; i++) {
    let rule = parsedThemeRules[i];
    root2.insert(0, rule.scope, rule.parentScopes, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
  }
  return new Theme(colorMap, defaults, root2);
}
var ColorMap = class {
  constructor(_colorMap) {
    __publicField(this, "_isFrozen");
    __publicField(this, "_lastColorId");
    __publicField(this, "_id2color");
    __publicField(this, "_color2id");
    this._lastColorId = 0;
    this._id2color = [];
    this._color2id = /* @__PURE__ */ Object.create(null);
    if (Array.isArray(_colorMap)) {
      this._isFrozen = true;
      for (let i = 0, len = _colorMap.length; i < len; i++) {
        this._color2id[_colorMap[i]] = i;
        this._id2color[i] = _colorMap[i];
      }
    } else {
      this._isFrozen = false;
    }
  }
  getId(color) {
    if (color === null) {
      return 0;
    }
    color = color.toUpperCase();
    let value = this._color2id[color];
    if (value) {
      return value;
    }
    if (this._isFrozen) {
      throw new Error(`Missing color in color map - ${color}`);
    }
    value = ++this._lastColorId;
    this._color2id[color] = value;
    this._id2color[value] = color;
    return value;
  }
  getColorMap() {
    return this._id2color.slice(0);
  }
};
var emptyParentScopes = Object.freeze([]);
var ThemeTrieElementRule = class _ThemeTrieElementRule {
  constructor(scopeDepth, parentScopes, fontStyle, foreground, background) {
    __publicField(this, "scopeDepth");
    __publicField(this, "parentScopes");
    __publicField(this, "fontStyle");
    __publicField(this, "foreground");
    __publicField(this, "background");
    this.scopeDepth = scopeDepth;
    this.parentScopes = parentScopes || emptyParentScopes;
    this.fontStyle = fontStyle;
    this.foreground = foreground;
    this.background = background;
  }
  clone() {
    return new _ThemeTrieElementRule(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
  }
  static cloneArr(arr) {
    let r4 = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      r4[i] = arr[i].clone();
    }
    return r4;
  }
  acceptOverwrite(scopeDepth, fontStyle, foreground, background) {
    if (this.scopeDepth > scopeDepth) {
      console.log("how did this happen?");
    } else {
      this.scopeDepth = scopeDepth;
    }
    if (fontStyle !== -1) {
      this.fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      this.foreground = foreground;
    }
    if (background !== 0) {
      this.background = background;
    }
  }
};
var ThemeTrieElement = class _ThemeTrieElement {
  constructor(_mainRule, rulesWithParentScopes = [], _children = {}) {
    __publicField(this, "_rulesWithParentScopes");
    this._mainRule = _mainRule;
    this._children = _children;
    this._rulesWithParentScopes = rulesWithParentScopes;
  }
  static _cmpBySpecificity(a, b) {
    if (a.scopeDepth !== b.scopeDepth) {
      return b.scopeDepth - a.scopeDepth;
    }
    let aParentIndex = 0;
    let bParentIndex = 0;
    while (true) {
      if (a.parentScopes[aParentIndex] === ">") {
        aParentIndex++;
      }
      if (b.parentScopes[bParentIndex] === ">") {
        bParentIndex++;
      }
      if (aParentIndex >= a.parentScopes.length || bParentIndex >= b.parentScopes.length) {
        break;
      }
      const parentScopeLengthDiff = b.parentScopes[bParentIndex].length - a.parentScopes[aParentIndex].length;
      if (parentScopeLengthDiff !== 0) {
        return parentScopeLengthDiff;
      }
      aParentIndex++;
      bParentIndex++;
    }
    return b.parentScopes.length - a.parentScopes.length;
  }
  match(scope) {
    if (scope !== "") {
      let dotIndex = scope.indexOf(".");
      let head2;
      let tail;
      if (dotIndex === -1) {
        head2 = scope;
        tail = "";
      } else {
        head2 = scope.substring(0, dotIndex);
        tail = scope.substring(dotIndex + 1);
      }
      if (this._children.hasOwnProperty(head2)) {
        return this._children[head2].match(tail);
      }
    }
    const rules = this._rulesWithParentScopes.concat(this._mainRule);
    rules.sort(_ThemeTrieElement._cmpBySpecificity);
    return rules;
  }
  insert(scopeDepth, scope, parentScopes, fontStyle, foreground, background) {
    if (scope === "") {
      this._doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background);
      return;
    }
    let dotIndex = scope.indexOf(".");
    let head2;
    let tail;
    if (dotIndex === -1) {
      head2 = scope;
      tail = "";
    } else {
      head2 = scope.substring(0, dotIndex);
      tail = scope.substring(dotIndex + 1);
    }
    let child;
    if (this._children.hasOwnProperty(head2)) {
      child = this._children[head2];
    } else {
      child = new _ThemeTrieElement(this._mainRule.clone(), ThemeTrieElementRule.cloneArr(this._rulesWithParentScopes));
      this._children[head2] = child;
    }
    child.insert(scopeDepth + 1, tail, parentScopes, fontStyle, foreground, background);
  }
  _doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background) {
    if (parentScopes === null) {
      this._mainRule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
      return;
    }
    for (let i = 0, len = this._rulesWithParentScopes.length; i < len; i++) {
      let rule = this._rulesWithParentScopes[i];
      if (strArrCmp(rule.parentScopes, parentScopes) === 0) {
        rule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
        return;
      }
    }
    if (fontStyle === -1) {
      fontStyle = this._mainRule.fontStyle;
    }
    if (foreground === 0) {
      foreground = this._mainRule.foreground;
    }
    if (background === 0) {
      background = this._mainRule.background;
    }
    this._rulesWithParentScopes.push(new ThemeTrieElementRule(scopeDepth, parentScopes, fontStyle, foreground, background));
  }
};
var EncodedTokenMetadata = class _EncodedTokenMetadata {
  static toBinaryStr(encodedTokenAttributes) {
    return encodedTokenAttributes.toString(2).padStart(32, "0");
  }
  static print(encodedTokenAttributes) {
    const languageId = _EncodedTokenMetadata.getLanguageId(encodedTokenAttributes);
    const tokenType = _EncodedTokenMetadata.getTokenType(encodedTokenAttributes);
    const fontStyle = _EncodedTokenMetadata.getFontStyle(encodedTokenAttributes);
    const foreground = _EncodedTokenMetadata.getForeground(encodedTokenAttributes);
    const background = _EncodedTokenMetadata.getBackground(encodedTokenAttributes);
    console.log({
      languageId,
      tokenType,
      fontStyle,
      foreground,
      background
    });
  }
  static getLanguageId(encodedTokenAttributes) {
    return (encodedTokenAttributes & 255) >>> 0;
  }
  static getTokenType(encodedTokenAttributes) {
    return (encodedTokenAttributes & 768) >>> 8;
  }
  static containsBalancedBrackets(encodedTokenAttributes) {
    return (encodedTokenAttributes & 1024) !== 0;
  }
  static getFontStyle(encodedTokenAttributes) {
    return (encodedTokenAttributes & 30720) >>> 11;
  }
  static getForeground(encodedTokenAttributes) {
    return (encodedTokenAttributes & 16744448) >>> 15;
  }
  static getBackground(encodedTokenAttributes) {
    return (encodedTokenAttributes & 4278190080) >>> 24;
  }
  /**
   * Updates the fields in `metadata`.
   * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
   */
  static set(encodedTokenAttributes, languageId, tokenType, containsBalancedBrackets, fontStyle, foreground, background) {
    let _languageId = _EncodedTokenMetadata.getLanguageId(encodedTokenAttributes);
    let _tokenType = _EncodedTokenMetadata.getTokenType(encodedTokenAttributes);
    let _containsBalancedBracketsBit = _EncodedTokenMetadata.containsBalancedBrackets(encodedTokenAttributes) ? 1 : 0;
    let _fontStyle = _EncodedTokenMetadata.getFontStyle(encodedTokenAttributes);
    let _foreground = _EncodedTokenMetadata.getForeground(encodedTokenAttributes);
    let _background = _EncodedTokenMetadata.getBackground(encodedTokenAttributes);
    if (languageId !== 0) {
      _languageId = languageId;
    }
    if (tokenType !== 8) {
      _tokenType = fromOptionalTokenType(tokenType);
    }
    if (containsBalancedBrackets !== null) {
      _containsBalancedBracketsBit = containsBalancedBrackets ? 1 : 0;
    }
    if (fontStyle !== -1) {
      _fontStyle = fontStyle;
    }
    if (foreground !== 0) {
      _foreground = foreground;
    }
    if (background !== 0) {
      _background = background;
    }
    return (_languageId << 0 | _tokenType << 8 | _containsBalancedBracketsBit << 10 | _fontStyle << 11 | _foreground << 15 | _background << 24) >>> 0;
  }
};
function toOptionalTokenType(standardType) {
  return standardType;
}
function fromOptionalTokenType(standardType) {
  return standardType;
}
function createMatchers(selector, matchesName) {
  const results = [];
  const tokenizer = newTokenizer(selector);
  let token2 = tokenizer.next();
  while (token2 !== null) {
    let priority = 0;
    if (token2.length === 2 && token2.charAt(1) === ":") {
      switch (token2.charAt(0)) {
        case "R":
          priority = 1;
          break;
        case "L":
          priority = -1;
          break;
        default:
          console.log(`Unknown priority ${token2} in scope selector`);
      }
      token2 = tokenizer.next();
    }
    let matcher = parseConjunction();
    results.push({ matcher, priority });
    if (token2 !== ",") {
      break;
    }
    token2 = tokenizer.next();
  }
  return results;
  function parseOperand() {
    if (token2 === "-") {
      token2 = tokenizer.next();
      const expressionToNegate = parseOperand();
      return (matcherInput) => !!expressionToNegate && !expressionToNegate(matcherInput);
    }
    if (token2 === "(") {
      token2 = tokenizer.next();
      const expressionInParents = parseInnerExpression();
      if (token2 === ")") {
        token2 = tokenizer.next();
      }
      return expressionInParents;
    }
    if (isIdentifier(token2)) {
      const identifiers = [];
      do {
        identifiers.push(token2);
        token2 = tokenizer.next();
      } while (isIdentifier(token2));
      return (matcherInput) => matchesName(identifiers, matcherInput);
    }
    return null;
  }
  function parseConjunction() {
    const matchers = [];
    let matcher = parseOperand();
    while (matcher) {
      matchers.push(matcher);
      matcher = parseOperand();
    }
    return (matcherInput) => matchers.every((matcher2) => matcher2(matcherInput));
  }
  function parseInnerExpression() {
    const matchers = [];
    let matcher = parseConjunction();
    while (matcher) {
      matchers.push(matcher);
      if (token2 === "|" || token2 === ",") {
        do {
          token2 = tokenizer.next();
        } while (token2 === "|" || token2 === ",");
      } else {
        break;
      }
      matcher = parseConjunction();
    }
    return (matcherInput) => matchers.some((matcher2) => matcher2(matcherInput));
  }
}
function isIdentifier(token2) {
  return !!token2 && !!token2.match(/[\w\.:]+/);
}
function newTokenizer(input) {
  let regex = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g;
  let match = regex.exec(input);
  return {
    next: () => {
      if (!match) {
        return null;
      }
      const res = match[0];
      match = regex.exec(input);
      return res;
    }
  };
}
var FindOption = ((FindOption2) => {
  FindOption2[FindOption2["None"] = 0] = "None";
  FindOption2[FindOption2["NotBeginString"] = 1] = "NotBeginString";
  FindOption2[FindOption2["NotEndString"] = 2] = "NotEndString";
  FindOption2[FindOption2["NotBeginPosition"] = 4] = "NotBeginPosition";
  FindOption2[FindOption2["DebugCall"] = 8] = "DebugCall";
  return FindOption2;
})(FindOption || {});
function disposeOnigString(str) {
  if (typeof str.dispose === "function") {
    str.dispose();
  }
}
var TopLevelRuleReference = class {
  constructor(scopeName) {
    this.scopeName = scopeName;
  }
  toKey() {
    return this.scopeName;
  }
};
var TopLevelRepositoryRuleReference = class {
  constructor(scopeName, ruleName) {
    this.scopeName = scopeName;
    this.ruleName = ruleName;
  }
  toKey() {
    return `${this.scopeName}#${this.ruleName}`;
  }
};
var ExternalReferenceCollector = class {
  constructor() {
    __publicField(this, "_references", []);
    __publicField(this, "_seenReferenceKeys", /* @__PURE__ */ new Set());
    __publicField(this, "visitedRule", /* @__PURE__ */ new Set());
  }
  get references() {
    return this._references;
  }
  add(reference) {
    const key2 = reference.toKey();
    if (this._seenReferenceKeys.has(key2)) {
      return;
    }
    this._seenReferenceKeys.add(key2);
    this._references.push(reference);
  }
};
var ScopeDependencyProcessor = class {
  constructor(repo, initialScopeName) {
    __publicField(this, "seenFullScopeRequests", /* @__PURE__ */ new Set());
    __publicField(this, "seenPartialScopeRequests", /* @__PURE__ */ new Set());
    __publicField(this, "Q");
    this.repo = repo;
    this.initialScopeName = initialScopeName;
    this.seenFullScopeRequests.add(this.initialScopeName);
    this.Q = [new TopLevelRuleReference(this.initialScopeName)];
  }
  processQueue() {
    const q = this.Q;
    this.Q = [];
    const deps = new ExternalReferenceCollector();
    for (const dep of q) {
      collectReferencesOfReference(dep, this.initialScopeName, this.repo, deps);
    }
    for (const dep of deps.references) {
      if (dep instanceof TopLevelRuleReference) {
        if (this.seenFullScopeRequests.has(dep.scopeName)) {
          continue;
        }
        this.seenFullScopeRequests.add(dep.scopeName);
        this.Q.push(dep);
      } else {
        if (this.seenFullScopeRequests.has(dep.scopeName)) {
          continue;
        }
        if (this.seenPartialScopeRequests.has(dep.toKey())) {
          continue;
        }
        this.seenPartialScopeRequests.add(dep.toKey());
        this.Q.push(dep);
      }
    }
  }
};
function collectReferencesOfReference(reference, baseGrammarScopeName, repo, result) {
  const selfGrammar = repo.lookup(reference.scopeName);
  if (!selfGrammar) {
    if (reference.scopeName === baseGrammarScopeName) {
      throw new Error(`No grammar provided for <${baseGrammarScopeName}>`);
    }
    return;
  }
  const baseGrammar = repo.lookup(baseGrammarScopeName);
  if (reference instanceof TopLevelRuleReference) {
    collectExternalReferencesInTopLevelRule({ baseGrammar, selfGrammar }, result);
  } else {
    collectExternalReferencesInTopLevelRepositoryRule(
      reference.ruleName,
      { baseGrammar, selfGrammar, repository: selfGrammar.repository },
      result
    );
  }
  const injections = repo.injections(reference.scopeName);
  if (injections) {
    for (const injection of injections) {
      result.add(new TopLevelRuleReference(injection));
    }
  }
}
function collectExternalReferencesInTopLevelRepositoryRule(ruleName, context, result) {
  if (context.repository && context.repository[ruleName]) {
    const rule = context.repository[ruleName];
    collectExternalReferencesInRules([rule], context, result);
  }
}
function collectExternalReferencesInTopLevelRule(context, result) {
  if (context.selfGrammar.patterns && Array.isArray(context.selfGrammar.patterns)) {
    collectExternalReferencesInRules(
      context.selfGrammar.patterns,
      { ...context, repository: context.selfGrammar.repository },
      result
    );
  }
  if (context.selfGrammar.injections) {
    collectExternalReferencesInRules(
      Object.values(context.selfGrammar.injections),
      { ...context, repository: context.selfGrammar.repository },
      result
    );
  }
}
function collectExternalReferencesInRules(rules, context, result) {
  for (const rule of rules) {
    if (result.visitedRule.has(rule)) {
      continue;
    }
    result.visitedRule.add(rule);
    const patternRepository = rule.repository ? mergeObjects({}, context.repository, rule.repository) : context.repository;
    if (Array.isArray(rule.patterns)) {
      collectExternalReferencesInRules(rule.patterns, { ...context, repository: patternRepository }, result);
    }
    const include = rule.include;
    if (!include) {
      continue;
    }
    const reference = parseInclude(include);
    switch (reference.kind) {
      case 0:
        collectExternalReferencesInTopLevelRule({ ...context, selfGrammar: context.baseGrammar }, result);
        break;
      case 1:
        collectExternalReferencesInTopLevelRule(context, result);
        break;
      case 2:
        collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { ...context, repository: patternRepository }, result);
        break;
      case 3:
      case 4:
        const selfGrammar = reference.scopeName === context.selfGrammar.scopeName ? context.selfGrammar : reference.scopeName === context.baseGrammar.scopeName ? context.baseGrammar : void 0;
        if (selfGrammar) {
          const newContext = { baseGrammar: context.baseGrammar, selfGrammar, repository: patternRepository };
          if (reference.kind === 4) {
            collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, newContext, result);
          } else {
            collectExternalReferencesInTopLevelRule(newContext, result);
          }
        } else {
          if (reference.kind === 4) {
            result.add(new TopLevelRepositoryRuleReference(reference.scopeName, reference.ruleName));
          } else {
            result.add(new TopLevelRuleReference(reference.scopeName));
          }
        }
        break;
    }
  }
}
var BaseReference = class {
  constructor() {
    __publicField(this, "kind", 0);
  }
};
var SelfReference = class {
  constructor() {
    __publicField(this, "kind", 1);
  }
};
var RelativeReference = class {
  constructor(ruleName) {
    __publicField(this, "kind", 2);
    this.ruleName = ruleName;
  }
};
var TopLevelReference = class {
  constructor(scopeName) {
    __publicField(this, "kind", 3);
    this.scopeName = scopeName;
  }
};
var TopLevelRepositoryReference = class {
  constructor(scopeName, ruleName) {
    __publicField(this, "kind", 4);
    this.scopeName = scopeName;
    this.ruleName = ruleName;
  }
};
function parseInclude(include) {
  if (include === "$base") {
    return new BaseReference();
  } else if (include === "$self") {
    return new SelfReference();
  }
  const indexOfSharp = include.indexOf("#");
  if (indexOfSharp === -1) {
    return new TopLevelReference(include);
  } else if (indexOfSharp === 0) {
    return new RelativeReference(include.substring(1));
  } else {
    const scopeName = include.substring(0, indexOfSharp);
    const ruleName = include.substring(indexOfSharp + 1);
    return new TopLevelRepositoryReference(scopeName, ruleName);
  }
}
var HAS_BACK_REFERENCES = /\\(\d+)/;
var BACK_REFERENCING_END = /\\(\d+)/g;
var ruleIdSymbol = Symbol("RuleId");
var endRuleId = -1;
var whileRuleId = -2;
function ruleIdFromNumber(id) {
  return id;
}
function ruleIdToNumber(id) {
  return id;
}
var Rule = class {
  constructor($location, id, name, contentName) {
    __publicField(this, "$location");
    __publicField(this, "id");
    __publicField(this, "_nameIsCapturing");
    __publicField(this, "_name");
    __publicField(this, "_contentNameIsCapturing");
    __publicField(this, "_contentName");
    this.$location = $location;
    this.id = id;
    this._name = name || null;
    this._nameIsCapturing = RegexSource.hasCaptures(this._name);
    this._contentName = contentName || null;
    this._contentNameIsCapturing = RegexSource.hasCaptures(this._contentName);
  }
  get debugName() {
    const location = this.$location ? `${basename(this.$location.filename)}:${this.$location.line}` : "unknown";
    return `${this.constructor.name}#${this.id} @ ${location}`;
  }
  getName(lineText, captureIndices) {
    if (!this._nameIsCapturing || this._name === null || lineText === null || captureIndices === null) {
      return this._name;
    }
    return RegexSource.replaceCaptures(this._name, lineText, captureIndices);
  }
  getContentName(lineText, captureIndices) {
    if (!this._contentNameIsCapturing || this._contentName === null) {
      return this._contentName;
    }
    return RegexSource.replaceCaptures(this._contentName, lineText, captureIndices);
  }
};
var CaptureRule = class extends Rule {
  constructor($location, id, name, contentName, retokenizeCapturedWithRuleId) {
    super($location, id, name, contentName);
    __publicField(this, "retokenizeCapturedWithRuleId");
    this.retokenizeCapturedWithRuleId = retokenizeCapturedWithRuleId;
  }
  dispose() {
  }
  collectPatterns(grammar, out) {
    throw new Error("Not supported!");
  }
  compile(grammar, endRegexSource) {
    throw new Error("Not supported!");
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    throw new Error("Not supported!");
  }
};
var MatchRule = class extends Rule {
  constructor($location, id, name, match, captures) {
    super($location, id, name, null);
    __publicField(this, "_match");
    __publicField(this, "captures");
    __publicField(this, "_cachedCompiledPatterns");
    this._match = new RegExpSource(match, this.id);
    this.captures = captures;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  get debugMatchRegExp() {
    return `${this._match.source}`;
  }
  collectPatterns(grammar, out) {
    out.push(this._match);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      this.collectPatterns(grammar, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
};
var IncludeOnlyRule = class extends Rule {
  constructor($location, id, name, contentName, patterns) {
    super($location, id, name, contentName);
    __publicField(this, "hasMissingPatterns");
    __publicField(this, "patterns");
    __publicField(this, "_cachedCompiledPatterns");
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  collectPatterns(grammar, out) {
    for (const pattern of this.patterns) {
      const rule = grammar.getRule(pattern);
      rule.collectPatterns(grammar, out);
    }
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      this.collectPatterns(grammar, this._cachedCompiledPatterns);
    }
    return this._cachedCompiledPatterns;
  }
};
var BeginEndRule = class extends Rule {
  constructor($location, id, name, contentName, begin, beginCaptures, end, endCaptures, applyEndPatternLast, patterns) {
    super($location, id, name, contentName);
    __publicField(this, "_begin");
    __publicField(this, "beginCaptures");
    __publicField(this, "_end");
    __publicField(this, "endHasBackReferences");
    __publicField(this, "endCaptures");
    __publicField(this, "applyEndPatternLast");
    __publicField(this, "hasMissingPatterns");
    __publicField(this, "patterns");
    __publicField(this, "_cachedCompiledPatterns");
    this._begin = new RegExpSource(begin, this.id);
    this.beginCaptures = beginCaptures;
    this._end = new RegExpSource(end ? end : "￿", -1);
    this.endHasBackReferences = this._end.hasBackReferences;
    this.endCaptures = endCaptures;
    this.applyEndPatternLast = applyEndPatternLast || false;
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugEndRegExp() {
    return `${this._end.source}`;
  }
  getEndWithResolvedBackReferences(lineText, captureIndices) {
    return this._end.resolveBackReferences(lineText, captureIndices);
  }
  collectPatterns(grammar, out) {
    out.push(this._begin);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar, endRegexSource).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar, endRegexSource) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      for (const pattern of this.patterns) {
        const rule = grammar.getRule(pattern);
        rule.collectPatterns(grammar, this._cachedCompiledPatterns);
      }
      if (this.applyEndPatternLast) {
        this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end);
      } else {
        this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
      }
    }
    if (this._end.hasBackReferences) {
      if (this.applyEndPatternLast) {
        this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, endRegexSource);
      } else {
        this._cachedCompiledPatterns.setSource(0, endRegexSource);
      }
    }
    return this._cachedCompiledPatterns;
  }
};
var BeginWhileRule = class extends Rule {
  constructor($location, id, name, contentName, begin, beginCaptures, _while, whileCaptures, patterns) {
    super($location, id, name, contentName);
    __publicField(this, "_begin");
    __publicField(this, "beginCaptures");
    __publicField(this, "whileCaptures");
    __publicField(this, "_while");
    __publicField(this, "whileHasBackReferences");
    __publicField(this, "hasMissingPatterns");
    __publicField(this, "patterns");
    __publicField(this, "_cachedCompiledPatterns");
    __publicField(this, "_cachedCompiledWhilePatterns");
    this._begin = new RegExpSource(begin, this.id);
    this.beginCaptures = beginCaptures;
    this.whileCaptures = whileCaptures;
    this._while = new RegExpSource(_while, whileRuleId);
    this.whileHasBackReferences = this._while.hasBackReferences;
    this.patterns = patterns.patterns;
    this.hasMissingPatterns = patterns.hasMissingPatterns;
    this._cachedCompiledPatterns = null;
    this._cachedCompiledWhilePatterns = null;
  }
  dispose() {
    if (this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns.dispose();
      this._cachedCompiledPatterns = null;
    }
    if (this._cachedCompiledWhilePatterns) {
      this._cachedCompiledWhilePatterns.dispose();
      this._cachedCompiledWhilePatterns = null;
    }
  }
  get debugBeginRegExp() {
    return `${this._begin.source}`;
  }
  get debugWhileRegExp() {
    return `${this._while.source}`;
  }
  getWhileWithResolvedBackReferences(lineText, captureIndices) {
    return this._while.resolveBackReferences(lineText, captureIndices);
  }
  collectPatterns(grammar, out) {
    out.push(this._begin);
  }
  compile(grammar, endRegexSource) {
    return this._getCachedCompiledPatterns(grammar).compile(grammar);
  }
  compileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledPatterns(grammar) {
    if (!this._cachedCompiledPatterns) {
      this._cachedCompiledPatterns = new RegExpSourceList();
      for (const pattern of this.patterns) {
        const rule = grammar.getRule(pattern);
        rule.collectPatterns(grammar, this._cachedCompiledPatterns);
      }
    }
    return this._cachedCompiledPatterns;
  }
  compileWhile(grammar, endRegexSource) {
    return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compile(grammar);
  }
  compileWhileAG(grammar, endRegexSource, allowA, allowG) {
    return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
  }
  _getCachedCompiledWhilePatterns(grammar, endRegexSource) {
    if (!this._cachedCompiledWhilePatterns) {
      this._cachedCompiledWhilePatterns = new RegExpSourceList();
      this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while);
    }
    if (this._while.hasBackReferences) {
      this._cachedCompiledWhilePatterns.setSource(0, endRegexSource ? endRegexSource : "￿");
    }
    return this._cachedCompiledWhilePatterns;
  }
};
var RuleFactory = class _RuleFactory {
  static createCaptureRule(helper, $location, name, contentName, retokenizeCapturedWithRuleId) {
    return helper.registerRule((id) => {
      return new CaptureRule($location, id, name, contentName, retokenizeCapturedWithRuleId);
    });
  }
  static getCompiledRuleId(desc, helper, repository) {
    if (!desc.id) {
      helper.registerRule((id) => {
        desc.id = id;
        if (desc.match) {
          return new MatchRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.match,
            _RuleFactory._compileCaptures(desc.captures, helper, repository)
          );
        }
        if (typeof desc.begin === "undefined") {
          if (desc.repository) {
            repository = mergeObjects({}, repository, desc.repository);
          }
          let patterns = desc.patterns;
          if (typeof patterns === "undefined" && desc.include) {
            patterns = [{ include: desc.include }];
          }
          return new IncludeOnlyRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.contentName,
            _RuleFactory._compilePatterns(patterns, helper, repository)
          );
        }
        if (desc.while) {
          return new BeginWhileRule(
            desc.$vscodeTextmateLocation,
            desc.id,
            desc.name,
            desc.contentName,
            desc.begin,
            _RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository),
            desc.while,
            _RuleFactory._compileCaptures(desc.whileCaptures || desc.captures, helper, repository),
            _RuleFactory._compilePatterns(desc.patterns, helper, repository)
          );
        }
        return new BeginEndRule(
          desc.$vscodeTextmateLocation,
          desc.id,
          desc.name,
          desc.contentName,
          desc.begin,
          _RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository),
          desc.end,
          _RuleFactory._compileCaptures(desc.endCaptures || desc.captures, helper, repository),
          desc.applyEndPatternLast,
          _RuleFactory._compilePatterns(desc.patterns, helper, repository)
        );
      });
    }
    return desc.id;
  }
  static _compileCaptures(captures, helper, repository) {
    let r4 = [];
    if (captures) {
      let maximumCaptureId = 0;
      for (const captureId in captures) {
        if (captureId === "$vscodeTextmateLocation") {
          continue;
        }
        const numericCaptureId = parseInt(captureId, 10);
        if (numericCaptureId > maximumCaptureId) {
          maximumCaptureId = numericCaptureId;
        }
      }
      for (let i = 0; i <= maximumCaptureId; i++) {
        r4[i] = null;
      }
      for (const captureId in captures) {
        if (captureId === "$vscodeTextmateLocation") {
          continue;
        }
        const numericCaptureId = parseInt(captureId, 10);
        let retokenizeCapturedWithRuleId = 0;
        if (captures[captureId].patterns) {
          retokenizeCapturedWithRuleId = _RuleFactory.getCompiledRuleId(captures[captureId], helper, repository);
        }
        r4[numericCaptureId] = _RuleFactory.createCaptureRule(helper, captures[captureId].$vscodeTextmateLocation, captures[captureId].name, captures[captureId].contentName, retokenizeCapturedWithRuleId);
      }
    }
    return r4;
  }
  static _compilePatterns(patterns, helper, repository) {
    let r4 = [];
    if (patterns) {
      for (let i = 0, len = patterns.length; i < len; i++) {
        const pattern = patterns[i];
        let ruleId = -1;
        if (pattern.include) {
          const reference = parseInclude(pattern.include);
          switch (reference.kind) {
            case 0:
            case 1:
              ruleId = _RuleFactory.getCompiledRuleId(repository[pattern.include], helper, repository);
              break;
            case 2:
              let localIncludedRule = repository[reference.ruleName];
              if (localIncludedRule) {
                ruleId = _RuleFactory.getCompiledRuleId(localIncludedRule, helper, repository);
              } else {
              }
              break;
            case 3:
            case 4:
              const externalGrammarName = reference.scopeName;
              const externalGrammarInclude = reference.kind === 4 ? reference.ruleName : null;
              const externalGrammar = helper.getExternalGrammar(externalGrammarName, repository);
              if (externalGrammar) {
                if (externalGrammarInclude) {
                  let externalIncludedRule = externalGrammar.repository[externalGrammarInclude];
                  if (externalIncludedRule) {
                    ruleId = _RuleFactory.getCompiledRuleId(externalIncludedRule, helper, externalGrammar.repository);
                  } else {
                  }
                } else {
                  ruleId = _RuleFactory.getCompiledRuleId(externalGrammar.repository.$self, helper, externalGrammar.repository);
                }
              } else {
              }
              break;
          }
        } else {
          ruleId = _RuleFactory.getCompiledRuleId(pattern, helper, repository);
        }
        if (ruleId !== -1) {
          const rule = helper.getRule(ruleId);
          let skipRule = false;
          if (rule instanceof IncludeOnlyRule || rule instanceof BeginEndRule || rule instanceof BeginWhileRule) {
            if (rule.hasMissingPatterns && rule.patterns.length === 0) {
              skipRule = true;
            }
          }
          if (skipRule) {
            continue;
          }
          r4.push(ruleId);
        }
      }
    }
    return {
      patterns: r4,
      hasMissingPatterns: (patterns ? patterns.length : 0) !== r4.length
    };
  }
};
var RegExpSource = class _RegExpSource {
  constructor(regExpSource, ruleId) {
    __publicField(this, "source");
    __publicField(this, "ruleId");
    __publicField(this, "hasAnchor");
    __publicField(this, "hasBackReferences");
    __publicField(this, "_anchorCache");
    if (regExpSource && typeof regExpSource === "string") {
      const len = regExpSource.length;
      let lastPushedPos = 0;
      let output = [];
      let hasAnchor = false;
      for (let pos = 0; pos < len; pos++) {
        const ch = regExpSource.charAt(pos);
        if (ch === "\\") {
          if (pos + 1 < len) {
            const nextCh = regExpSource.charAt(pos + 1);
            if (nextCh === "z") {
              output.push(regExpSource.substring(lastPushedPos, pos));
              output.push("$(?!\\n)(?<!\\n)");
              lastPushedPos = pos + 2;
            } else if (nextCh === "A" || nextCh === "G") {
              hasAnchor = true;
            }
            pos++;
          }
        }
      }
      this.hasAnchor = hasAnchor;
      if (lastPushedPos === 0) {
        this.source = regExpSource;
      } else {
        output.push(regExpSource.substring(lastPushedPos, len));
        this.source = output.join("");
      }
    } else {
      this.hasAnchor = false;
      this.source = regExpSource;
    }
    if (this.hasAnchor) {
      this._anchorCache = this._buildAnchorCache();
    } else {
      this._anchorCache = null;
    }
    this.ruleId = ruleId;
    if (typeof this.source === "string") {
      this.hasBackReferences = HAS_BACK_REFERENCES.test(this.source);
    } else {
      this.hasBackReferences = false;
    }
  }
  clone() {
    return new _RegExpSource(this.source, this.ruleId);
  }
  setSource(newSource) {
    if (this.source === newSource) {
      return;
    }
    this.source = newSource;
    if (this.hasAnchor) {
      this._anchorCache = this._buildAnchorCache();
    }
  }
  resolveBackReferences(lineText, captureIndices) {
    if (typeof this.source !== "string") {
      throw new Error("This method should only be called if the source is a string");
    }
    let capturedValues = captureIndices.map((capture) => {
      return lineText.substring(capture.start, capture.end);
    });
    BACK_REFERENCING_END.lastIndex = 0;
    return this.source.replace(BACK_REFERENCING_END, (match, g1) => {
      return escapeRegExpCharacters(capturedValues[parseInt(g1, 10)] || "");
    });
  }
  _buildAnchorCache() {
    if (typeof this.source !== "string") {
      throw new Error("This method should only be called if the source is a string");
    }
    let A0_G0_result = [];
    let A0_G1_result = [];
    let A1_G0_result = [];
    let A1_G1_result = [];
    let pos, len, ch, nextCh;
    for (pos = 0, len = this.source.length; pos < len; pos++) {
      ch = this.source.charAt(pos);
      A0_G0_result[pos] = ch;
      A0_G1_result[pos] = ch;
      A1_G0_result[pos] = ch;
      A1_G1_result[pos] = ch;
      if (ch === "\\") {
        if (pos + 1 < len) {
          nextCh = this.source.charAt(pos + 1);
          if (nextCh === "A") {
            A0_G0_result[pos + 1] = "￿";
            A0_G1_result[pos + 1] = "￿";
            A1_G0_result[pos + 1] = "A";
            A1_G1_result[pos + 1] = "A";
          } else if (nextCh === "G") {
            A0_G0_result[pos + 1] = "￿";
            A0_G1_result[pos + 1] = "G";
            A1_G0_result[pos + 1] = "￿";
            A1_G1_result[pos + 1] = "G";
          } else {
            A0_G0_result[pos + 1] = nextCh;
            A0_G1_result[pos + 1] = nextCh;
            A1_G0_result[pos + 1] = nextCh;
            A1_G1_result[pos + 1] = nextCh;
          }
          pos++;
        }
      }
    }
    return {
      A0_G0: A0_G0_result.join(""),
      A0_G1: A0_G1_result.join(""),
      A1_G0: A1_G0_result.join(""),
      A1_G1: A1_G1_result.join("")
    };
  }
  resolveAnchors(allowA, allowG) {
    if (!this.hasAnchor || !this._anchorCache || typeof this.source !== "string") {
      return this.source;
    }
    if (allowA) {
      if (allowG) {
        return this._anchorCache.A1_G1;
      } else {
        return this._anchorCache.A1_G0;
      }
    } else {
      if (allowG) {
        return this._anchorCache.A0_G1;
      } else {
        return this._anchorCache.A0_G0;
      }
    }
  }
};
var RegExpSourceList = class {
  constructor() {
    __publicField(this, "_items");
    __publicField(this, "_hasAnchors");
    __publicField(this, "_cached");
    __publicField(this, "_anchorCache");
    this._items = [];
    this._hasAnchors = false;
    this._cached = null;
    this._anchorCache = {
      A0_G0: null,
      A0_G1: null,
      A1_G0: null,
      A1_G1: null
    };
  }
  dispose() {
    this._disposeCaches();
  }
  _disposeCaches() {
    if (this._cached) {
      this._cached.dispose();
      this._cached = null;
    }
    if (this._anchorCache.A0_G0) {
      this._anchorCache.A0_G0.dispose();
      this._anchorCache.A0_G0 = null;
    }
    if (this._anchorCache.A0_G1) {
      this._anchorCache.A0_G1.dispose();
      this._anchorCache.A0_G1 = null;
    }
    if (this._anchorCache.A1_G0) {
      this._anchorCache.A1_G0.dispose();
      this._anchorCache.A1_G0 = null;
    }
    if (this._anchorCache.A1_G1) {
      this._anchorCache.A1_G1.dispose();
      this._anchorCache.A1_G1 = null;
    }
  }
  push(item) {
    this._items.push(item);
    this._hasAnchors = this._hasAnchors || item.hasAnchor;
  }
  unshift(item) {
    this._items.unshift(item);
    this._hasAnchors = this._hasAnchors || item.hasAnchor;
  }
  length() {
    return this._items.length;
  }
  setSource(index, newSource) {
    if (this._items[index].source !== newSource) {
      this._disposeCaches();
      this._items[index].setSource(newSource);
    }
  }
  compile(onigLib) {
    if (!this._cached) {
      let regExps = this._items.map((e) => e.source);
      this._cached = new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
    }
    return this._cached;
  }
  compileAG(onigLib, allowA, allowG) {
    if (!this._hasAnchors) {
      return this.compile(onigLib);
    } else {
      if (allowA) {
        if (allowG) {
          if (!this._anchorCache.A1_G1) {
            this._anchorCache.A1_G1 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A1_G1;
        } else {
          if (!this._anchorCache.A1_G0) {
            this._anchorCache.A1_G0 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A1_G0;
        }
      } else {
        if (allowG) {
          if (!this._anchorCache.A0_G1) {
            this._anchorCache.A0_G1 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A0_G1;
        } else {
          if (!this._anchorCache.A0_G0) {
            this._anchorCache.A0_G0 = this._resolveAnchors(onigLib, allowA, allowG);
          }
          return this._anchorCache.A0_G0;
        }
      }
    }
  }
  _resolveAnchors(onigLib, allowA, allowG) {
    let regExps = this._items.map((e) => e.resolveAnchors(allowA, allowG));
    return new CompiledRule(onigLib, regExps, this._items.map((e) => e.ruleId));
  }
};
var CompiledRule = class {
  constructor(onigLib, regExps, rules) {
    __publicField(this, "scanner");
    this.regExps = regExps;
    this.rules = rules;
    this.scanner = onigLib.createOnigScanner(regExps);
  }
  dispose() {
    if (typeof this.scanner.dispose === "function") {
      this.scanner.dispose();
    }
  }
  toString() {
    const r4 = [];
    for (let i = 0, len = this.rules.length; i < len; i++) {
      r4.push("   - " + this.rules[i] + ": " + this.regExps[i]);
    }
    return r4.join("\n");
  }
  findNextMatchSync(string, startPosition, options) {
    const result = this.scanner.findNextMatchSync(string, startPosition, options);
    if (!result) {
      return null;
    }
    return {
      ruleId: this.rules[result.index],
      captureIndices: result.captureIndices
    };
  }
};
var BasicScopeAttributes = class {
  constructor(languageId, tokenType) {
    this.languageId = languageId;
    this.tokenType = tokenType;
  }
};
var _a;
var BasicScopeAttributesProvider = (_a = class {
  constructor(initialLanguageId, embeddedLanguages) {
    __publicField(this, "_defaultAttributes");
    __publicField(this, "_embeddedLanguagesMatcher");
    __publicField(this, "_getBasicScopeAttributes", new CachedFn((scopeName) => {
      const languageId = this._scopeToLanguage(scopeName);
      const standardTokenType = this._toStandardTokenType(scopeName);
      return new BasicScopeAttributes(languageId, standardTokenType);
    }));
    this._defaultAttributes = new BasicScopeAttributes(
      initialLanguageId,
      8
      /* NotSet */
    );
    this._embeddedLanguagesMatcher = new ScopeMatcher(Object.entries(embeddedLanguages || {}));
  }
  getDefaultAttributes() {
    return this._defaultAttributes;
  }
  getBasicScopeAttributes(scopeName) {
    if (scopeName === null) {
      return _a._NULL_SCOPE_METADATA;
    }
    return this._getBasicScopeAttributes.get(scopeName);
  }
  /**
   * Given a produced TM scope, return the language that token describes or null if unknown.
   * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
   */
  _scopeToLanguage(scope) {
    return this._embeddedLanguagesMatcher.match(scope) || 0;
  }
  _toStandardTokenType(scopeName) {
    const m = scopeName.match(_a.STANDARD_TOKEN_TYPE_REGEXP);
    if (!m) {
      return 8;
    }
    switch (m[1]) {
      case "comment":
        return 1;
      case "string":
        return 2;
      case "regex":
        return 3;
      case "meta.embedded":
        return 0;
    }
    throw new Error("Unexpected match for standard token type!");
  }
}, __publicField(_a, "_NULL_SCOPE_METADATA", new BasicScopeAttributes(0, 0)), __publicField(_a, "STANDARD_TOKEN_TYPE_REGEXP", /\b(comment|string|regex|meta\.embedded)\b/), _a);
var ScopeMatcher = class {
  constructor(values) {
    __publicField(this, "values");
    __publicField(this, "scopesRegExp");
    if (values.length === 0) {
      this.values = null;
      this.scopesRegExp = null;
    } else {
      this.values = new Map(values);
      const escapedScopes = values.map(
        ([scopeName, value]) => escapeRegExpCharacters(scopeName)
      );
      escapedScopes.sort();
      escapedScopes.reverse();
      this.scopesRegExp = new RegExp(
        `^((${escapedScopes.join(")|(")}))($|\\.)`,
        ""
      );
    }
  }
  match(scope) {
    if (!this.scopesRegExp) {
      return void 0;
    }
    const m = scope.match(this.scopesRegExp);
    if (!m) {
      return void 0;
    }
    return this.values.get(m[1]);
  }
};
var DebugFlags = {
  InDebugMode: typeof process !== "undefined" && !!process.env["VSCODE_TEXTMATE_DEBUG"]
};
var UseOnigurumaFindOptions = false;
var TokenizeStringResult = class {
  constructor(stack, stoppedEarly) {
    this.stack = stack;
    this.stoppedEarly = stoppedEarly;
  }
};
function _tokenizeString(grammar, lineText, isFirstLine, linePos, stack, lineTokens, checkWhileConditions, timeLimit) {
  const lineLength = lineText.content.length;
  let STOP = false;
  let anchorPosition = -1;
  if (checkWhileConditions) {
    const whileCheckResult = _checkWhileConditions(
      grammar,
      lineText,
      isFirstLine,
      linePos,
      stack,
      lineTokens
    );
    stack = whileCheckResult.stack;
    linePos = whileCheckResult.linePos;
    isFirstLine = whileCheckResult.isFirstLine;
    anchorPosition = whileCheckResult.anchorPosition;
  }
  const startTime = Date.now();
  while (!STOP) {
    if (timeLimit !== 0) {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > timeLimit) {
        return new TokenizeStringResult(stack, true);
      }
    }
    scanNext();
  }
  return new TokenizeStringResult(stack, false);
  function scanNext() {
    if (false) {
      console.log("");
      console.log(
        `@@scanNext ${linePos}: |${lineText.content.substr(linePos).replace(/\n$/, "\\n")}|`
      );
    }
    const r4 = matchRuleOrInjections(
      grammar,
      lineText,
      isFirstLine,
      linePos,
      stack,
      anchorPosition
    );
    if (!r4) {
      lineTokens.produce(stack, lineLength);
      STOP = true;
      return;
    }
    const captureIndices = r4.captureIndices;
    const matchedRuleId = r4.matchedRuleId;
    const hasAdvanced = captureIndices && captureIndices.length > 0 ? captureIndices[0].end > linePos : false;
    if (matchedRuleId === endRuleId) {
      const poppedRule = stack.getRule(grammar);
      if (false) {
        console.log(
          "  popping " + poppedRule.debugName + " - " + poppedRule.debugEndRegExp
        );
      }
      lineTokens.produce(stack, captureIndices[0].start);
      stack = stack.withContentNameScopesList(stack.nameScopesList);
      handleCaptures(
        grammar,
        lineText,
        isFirstLine,
        stack,
        lineTokens,
        poppedRule.endCaptures,
        captureIndices
      );
      lineTokens.produce(stack, captureIndices[0].end);
      const popped = stack;
      stack = stack.parent;
      anchorPosition = popped.getAnchorPos();
      if (!hasAdvanced && popped.getEnterPos() === linePos) {
        if (false) {
          console.error(
            "[1] - Grammar is in an endless loop - Grammar pushed & popped a rule without advancing"
          );
        }
        stack = popped;
        lineTokens.produce(stack, lineLength);
        STOP = true;
        return;
      }
    } else {
      const _rule = grammar.getRule(matchedRuleId);
      lineTokens.produce(stack, captureIndices[0].start);
      const beforePush = stack;
      const scopeName = _rule.getName(lineText.content, captureIndices);
      const nameScopesList = stack.contentNameScopesList.pushAttributed(
        scopeName,
        grammar
      );
      stack = stack.push(
        matchedRuleId,
        linePos,
        anchorPosition,
        captureIndices[0].end === lineLength,
        null,
        nameScopesList,
        nameScopesList
      );
      if (_rule instanceof BeginEndRule) {
        const pushedRule = _rule;
        if (false) {
          console.log(
            "  pushing " + pushedRule.debugName + " - " + pushedRule.debugBeginRegExp
          );
        }
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          pushedRule.beginCaptures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        anchorPosition = captureIndices[0].end;
        const contentName = pushedRule.getContentName(
          lineText.content,
          captureIndices
        );
        const contentNameScopesList = nameScopesList.pushAttributed(
          contentName,
          grammar
        );
        stack = stack.withContentNameScopesList(contentNameScopesList);
        if (pushedRule.endHasBackReferences) {
          stack = stack.withEndRule(
            pushedRule.getEndWithResolvedBackReferences(
              lineText.content,
              captureIndices
            )
          );
        }
        if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
          if (false) {
            console.error(
              "[2] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"
            );
          }
          stack = stack.pop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      } else if (_rule instanceof BeginWhileRule) {
        const pushedRule = _rule;
        if (false) {
          console.log("  pushing " + pushedRule.debugName);
        }
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          pushedRule.beginCaptures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        anchorPosition = captureIndices[0].end;
        const contentName = pushedRule.getContentName(
          lineText.content,
          captureIndices
        );
        const contentNameScopesList = nameScopesList.pushAttributed(
          contentName,
          grammar
        );
        stack = stack.withContentNameScopesList(contentNameScopesList);
        if (pushedRule.whileHasBackReferences) {
          stack = stack.withEndRule(
            pushedRule.getWhileWithResolvedBackReferences(
              lineText.content,
              captureIndices
            )
          );
        }
        if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
          if (false) {
            console.error(
              "[3] - Grammar is in an endless loop - Grammar pushed the same rule without advancing"
            );
          }
          stack = stack.pop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      } else {
        const matchingRule = _rule;
        if (false) {
          console.log(
            "  matched " + matchingRule.debugName + " - " + matchingRule.debugMatchRegExp
          );
        }
        handleCaptures(
          grammar,
          lineText,
          isFirstLine,
          stack,
          lineTokens,
          matchingRule.captures,
          captureIndices
        );
        lineTokens.produce(stack, captureIndices[0].end);
        stack = stack.pop();
        if (!hasAdvanced) {
          if (false) {
            console.error(
              "[4] - Grammar is in an endless loop - Grammar is not advancing, nor is it pushing/popping"
            );
          }
          stack = stack.safePop();
          lineTokens.produce(stack, lineLength);
          STOP = true;
          return;
        }
      }
    }
    if (captureIndices[0].end > linePos) {
      linePos = captureIndices[0].end;
      isFirstLine = false;
    }
  }
}
function _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens) {
  let anchorPosition = stack.beginRuleCapturedEOL ? 0 : -1;
  const whileRules = [];
  for (let node = stack; node; node = node.pop()) {
    const nodeRule = node.getRule(grammar);
    if (nodeRule instanceof BeginWhileRule) {
      whileRules.push({
        rule: nodeRule,
        stack: node
      });
    }
  }
  for (let whileRule = whileRules.pop(); whileRule; whileRule = whileRules.pop()) {
    const { ruleScanner, findOptions } = prepareRuleWhileSearch(whileRule.rule, grammar, whileRule.stack.endRule, isFirstLine, linePos === anchorPosition);
    const r4 = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (false) {
      console.log("  scanning for while rule");
      console.log(ruleScanner.toString());
    }
    if (r4) {
      const matchedRuleId = r4.ruleId;
      if (matchedRuleId !== whileRuleId) {
        stack = whileRule.stack.pop();
        break;
      }
      if (r4.captureIndices && r4.captureIndices.length) {
        lineTokens.produce(whileRule.stack, r4.captureIndices[0].start);
        handleCaptures(grammar, lineText, isFirstLine, whileRule.stack, lineTokens, whileRule.rule.whileCaptures, r4.captureIndices);
        lineTokens.produce(whileRule.stack, r4.captureIndices[0].end);
        anchorPosition = r4.captureIndices[0].end;
        if (r4.captureIndices[0].end > linePos) {
          linePos = r4.captureIndices[0].end;
          isFirstLine = false;
        }
      }
    } else {
      if (false) {
        console.log("  popping " + whileRule.rule.debugName + " - " + whileRule.rule.debugWhileRegExp);
      }
      stack = whileRule.stack.pop();
      break;
    }
  }
  return { stack, linePos, anchorPosition, isFirstLine };
}
function matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  const matchResult = matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
  const injections = grammar.getInjections();
  if (injections.length === 0) {
    return matchResult;
  }
  const injectionResult = matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
  if (!injectionResult) {
    return matchResult;
  }
  if (!matchResult) {
    return injectionResult;
  }
  const matchResultScore = matchResult.captureIndices[0].start;
  const injectionResultScore = injectionResult.captureIndices[0].start;
  if (injectionResultScore < matchResultScore || injectionResult.priorityMatch && injectionResultScore === matchResultScore) {
    return injectionResult;
  }
  return matchResult;
}
function matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  const rule = stack.getRule(grammar);
  const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, stack.endRule, isFirstLine, linePos === anchorPosition);
  const r4 = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
  if (r4) {
    return {
      captureIndices: r4.captureIndices,
      matchedRuleId: r4.ruleId
    };
  }
  return null;
}
function matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
  let bestMatchRating = Number.MAX_VALUE;
  let bestMatchCaptureIndices = null;
  let bestMatchRuleId;
  let bestMatchResultPriority = 0;
  const scopes = stack.contentNameScopesList.getScopeNames();
  for (let i = 0, len = injections.length; i < len; i++) {
    const injection = injections[i];
    if (!injection.matcher(scopes)) {
      continue;
    }
    const rule = grammar.getRule(injection.ruleId);
    const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, null, isFirstLine, linePos === anchorPosition);
    const matchResult = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (!matchResult) {
      continue;
    }
    if (false) {
      console.log(`  matched injection: ${injection.debugSelector}`);
      console.log(ruleScanner.toString());
    }
    const matchRating = matchResult.captureIndices[0].start;
    if (matchRating >= bestMatchRating) {
      continue;
    }
    bestMatchRating = matchRating;
    bestMatchCaptureIndices = matchResult.captureIndices;
    bestMatchRuleId = matchResult.ruleId;
    bestMatchResultPriority = injection.priority;
    if (bestMatchRating === linePos) {
      break;
    }
  }
  if (bestMatchCaptureIndices) {
    return {
      priorityMatch: bestMatchResultPriority === -1,
      captureIndices: bestMatchCaptureIndices,
      matchedRuleId: bestMatchRuleId
    };
  }
  return null;
}
function prepareRuleSearch(rule, grammar, endRegexSource, allowA, allowG) {
  if (UseOnigurumaFindOptions) {
    const ruleScanner2 = rule.compile(grammar, endRegexSource);
    const findOptions = getFindOptions(allowA, allowG);
    return { ruleScanner: ruleScanner2, findOptions };
  }
  const ruleScanner = rule.compileAG(grammar, endRegexSource, allowA, allowG);
  return {
    ruleScanner,
    findOptions: 0
    /* None */
  };
}
function prepareRuleWhileSearch(rule, grammar, endRegexSource, allowA, allowG) {
  if (UseOnigurumaFindOptions) {
    const ruleScanner2 = rule.compileWhile(grammar, endRegexSource);
    const findOptions = getFindOptions(allowA, allowG);
    return { ruleScanner: ruleScanner2, findOptions };
  }
  const ruleScanner = rule.compileWhileAG(grammar, endRegexSource, allowA, allowG);
  return {
    ruleScanner,
    findOptions: 0
    /* None */
  };
}
function getFindOptions(allowA, allowG) {
  let options = 0;
  if (!allowA) {
    options |= 1;
  }
  if (!allowG) {
    options |= 4;
  }
  return options;
}
function handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, captures, captureIndices) {
  if (captures.length === 0) {
    return;
  }
  const lineTextContent = lineText.content;
  const len = Math.min(captures.length, captureIndices.length);
  const localStack = [];
  const maxEnd = captureIndices[0].end;
  for (let i = 0; i < len; i++) {
    const captureRule = captures[i];
    if (captureRule === null) {
      continue;
    }
    const captureIndex = captureIndices[i];
    if (captureIndex.length === 0) {
      continue;
    }
    if (captureIndex.start > maxEnd) {
      break;
    }
    while (localStack.length > 0 && localStack[localStack.length - 1].endPos <= captureIndex.start) {
      lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
      localStack.pop();
    }
    if (localStack.length > 0) {
      lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, captureIndex.start);
    } else {
      lineTokens.produce(stack, captureIndex.start);
    }
    if (captureRule.retokenizeCapturedWithRuleId) {
      const scopeName = captureRule.getName(lineTextContent, captureIndices);
      const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
      const contentName = captureRule.getContentName(lineTextContent, captureIndices);
      const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
      const stackClone = stack.push(captureRule.retokenizeCapturedWithRuleId, captureIndex.start, -1, false, null, nameScopesList, contentNameScopesList);
      const onigSubStr = grammar.createOnigString(lineTextContent.substring(0, captureIndex.end));
      _tokenizeString(
        grammar,
        onigSubStr,
        isFirstLine && captureIndex.start === 0,
        captureIndex.start,
        stackClone,
        lineTokens,
        false,
        /* no time limit */
        0
      );
      disposeOnigString(onigSubStr);
      continue;
    }
    const captureRuleScopeName = captureRule.getName(lineTextContent, captureIndices);
    if (captureRuleScopeName !== null) {
      const base = localStack.length > 0 ? localStack[localStack.length - 1].scopes : stack.contentNameScopesList;
      const captureRuleScopesList = base.pushAttributed(captureRuleScopeName, grammar);
      localStack.push(new LocalStackElement(captureRuleScopesList, captureIndex.end));
    }
  }
  while (localStack.length > 0) {
    lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
    localStack.pop();
  }
}
var LocalStackElement = class {
  constructor(scopes, endPos) {
    __publicField(this, "scopes");
    __publicField(this, "endPos");
    this.scopes = scopes;
    this.endPos = endPos;
  }
};
function createGrammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib) {
  return new Grammar(
    scopeName,
    grammar,
    initialLanguage,
    embeddedLanguages,
    tokenTypes,
    balancedBracketSelectors,
    grammarRepository,
    onigLib
  );
}
function collectInjections(result, selector, rule, ruleFactoryHelper, grammar) {
  const matchers = createMatchers(selector, nameMatcher);
  const ruleId = RuleFactory.getCompiledRuleId(rule, ruleFactoryHelper, grammar.repository);
  for (const matcher of matchers) {
    result.push({
      debugSelector: selector,
      matcher: matcher.matcher,
      ruleId,
      grammar,
      priority: matcher.priority
    });
  }
}
function nameMatcher(identifers, scopes) {
  if (scopes.length < identifers.length) {
    return false;
  }
  let lastIndex = 0;
  return identifers.every((identifier) => {
    for (let i = lastIndex; i < scopes.length; i++) {
      if (scopesAreMatching(scopes[i], identifier)) {
        lastIndex = i + 1;
        return true;
      }
    }
    return false;
  });
}
function scopesAreMatching(thisScopeName, scopeName) {
  if (!thisScopeName) {
    return false;
  }
  if (thisScopeName === scopeName) {
    return true;
  }
  const len = scopeName.length;
  return thisScopeName.length > len && thisScopeName.substr(0, len) === scopeName && thisScopeName[len] === ".";
}
var Grammar = class {
  constructor(_rootScopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, _onigLib) {
    __publicField(this, "_rootId");
    __publicField(this, "_lastRuleId");
    __publicField(this, "_ruleId2desc");
    __publicField(this, "_includedGrammars");
    __publicField(this, "_grammarRepository");
    __publicField(this, "_grammar");
    __publicField(this, "_injections");
    __publicField(this, "_basicScopeAttributesProvider");
    __publicField(this, "_tokenTypeMatchers");
    this._rootScopeName = _rootScopeName;
    this.balancedBracketSelectors = balancedBracketSelectors;
    this._onigLib = _onigLib;
    this._basicScopeAttributesProvider = new BasicScopeAttributesProvider(
      initialLanguage,
      embeddedLanguages
    );
    this._rootId = -1;
    this._lastRuleId = 0;
    this._ruleId2desc = [null];
    this._includedGrammars = {};
    this._grammarRepository = grammarRepository;
    this._grammar = initGrammar(grammar, null);
    this._injections = null;
    this._tokenTypeMatchers = [];
    if (tokenTypes) {
      for (const selector of Object.keys(tokenTypes)) {
        const matchers = createMatchers(selector, nameMatcher);
        for (const matcher of matchers) {
          this._tokenTypeMatchers.push({
            matcher: matcher.matcher,
            type: tokenTypes[selector]
          });
        }
      }
    }
  }
  get themeProvider() {
    return this._grammarRepository;
  }
  dispose() {
    for (const rule of this._ruleId2desc) {
      if (rule) {
        rule.dispose();
      }
    }
  }
  createOnigScanner(sources) {
    return this._onigLib.createOnigScanner(sources);
  }
  createOnigString(sources) {
    return this._onigLib.createOnigString(sources);
  }
  getMetadataForScope(scope) {
    return this._basicScopeAttributesProvider.getBasicScopeAttributes(scope);
  }
  _collectInjections() {
    const grammarRepository = {
      lookup: (scopeName2) => {
        if (scopeName2 === this._rootScopeName) {
          return this._grammar;
        }
        return this.getExternalGrammar(scopeName2);
      },
      injections: (scopeName2) => {
        return this._grammarRepository.injections(scopeName2);
      }
    };
    const result = [];
    const scopeName = this._rootScopeName;
    const grammar = grammarRepository.lookup(scopeName);
    if (grammar) {
      const rawInjections = grammar.injections;
      if (rawInjections) {
        for (let expression in rawInjections) {
          collectInjections(
            result,
            expression,
            rawInjections[expression],
            this,
            grammar
          );
        }
      }
      const injectionScopeNames = this._grammarRepository.injections(scopeName);
      if (injectionScopeNames) {
        injectionScopeNames.forEach((injectionScopeName) => {
          const injectionGrammar = this.getExternalGrammar(injectionScopeName);
          if (injectionGrammar) {
            const selector = injectionGrammar.injectionSelector;
            if (selector) {
              collectInjections(
                result,
                selector,
                injectionGrammar,
                this,
                injectionGrammar
              );
            }
          }
        });
      }
    }
    result.sort((i1, i2) => i1.priority - i2.priority);
    return result;
  }
  getInjections() {
    if (this._injections === null) {
      this._injections = this._collectInjections();
    }
    return this._injections;
  }
  registerRule(factory) {
    const id = ++this._lastRuleId;
    const result = factory(ruleIdFromNumber(id));
    this._ruleId2desc[id] = result;
    return result;
  }
  getRule(ruleId) {
    return this._ruleId2desc[ruleIdToNumber(ruleId)];
  }
  getExternalGrammar(scopeName, repository) {
    if (this._includedGrammars[scopeName]) {
      return this._includedGrammars[scopeName];
    } else if (this._grammarRepository) {
      const rawIncludedGrammar = this._grammarRepository.lookup(scopeName);
      if (rawIncludedGrammar) {
        this._includedGrammars[scopeName] = initGrammar(
          rawIncludedGrammar,
          repository && repository.$base
        );
        return this._includedGrammars[scopeName];
      }
    }
    return void 0;
  }
  tokenizeLine(lineText, prevState, timeLimit = 0) {
    const r4 = this._tokenize(lineText, prevState, false, timeLimit);
    return {
      tokens: r4.lineTokens.getResult(r4.ruleStack, r4.lineLength),
      ruleStack: r4.ruleStack,
      stoppedEarly: r4.stoppedEarly
    };
  }
  tokenizeLine2(lineText, prevState, timeLimit = 0) {
    const r4 = this._tokenize(lineText, prevState, true, timeLimit);
    return {
      tokens: r4.lineTokens.getBinaryResult(r4.ruleStack, r4.lineLength),
      ruleStack: r4.ruleStack,
      stoppedEarly: r4.stoppedEarly
    };
  }
  _tokenize(lineText, prevState, emitBinaryTokens, timeLimit) {
    if (this._rootId === -1) {
      this._rootId = RuleFactory.getCompiledRuleId(
        this._grammar.repository.$self,
        this,
        this._grammar.repository
      );
      this.getInjections();
    }
    let isFirstLine;
    if (!prevState || prevState === StateStackImpl.NULL) {
      isFirstLine = true;
      const rawDefaultMetadata = this._basicScopeAttributesProvider.getDefaultAttributes();
      const defaultStyle = this.themeProvider.getDefaults();
      const defaultMetadata = EncodedTokenMetadata.set(
        0,
        rawDefaultMetadata.languageId,
        rawDefaultMetadata.tokenType,
        null,
        defaultStyle.fontStyle,
        defaultStyle.foregroundId,
        defaultStyle.backgroundId
      );
      const rootScopeName = this.getRule(this._rootId).getName(
        null,
        null
      );
      let scopeList;
      if (rootScopeName) {
        scopeList = AttributedScopeStack.createRootAndLookUpScopeName(
          rootScopeName,
          defaultMetadata,
          this
        );
      } else {
        scopeList = AttributedScopeStack.createRoot(
          "unknown",
          defaultMetadata
        );
      }
      prevState = new StateStackImpl(
        null,
        this._rootId,
        -1,
        -1,
        false,
        null,
        scopeList,
        scopeList
      );
    } else {
      isFirstLine = false;
      prevState.reset();
    }
    lineText = lineText + "\n";
    const onigLineText = this.createOnigString(lineText);
    const lineLength = onigLineText.content.length;
    const lineTokens = new LineTokens(
      emitBinaryTokens,
      lineText,
      this._tokenTypeMatchers,
      this.balancedBracketSelectors
    );
    const r4 = _tokenizeString(
      this,
      onigLineText,
      isFirstLine,
      0,
      prevState,
      lineTokens,
      true,
      timeLimit
    );
    disposeOnigString(onigLineText);
    return {
      lineLength,
      lineTokens,
      ruleStack: r4.stack,
      stoppedEarly: r4.stoppedEarly
    };
  }
};
function initGrammar(grammar, base) {
  grammar = clone(grammar);
  grammar.repository = grammar.repository || {};
  grammar.repository.$self = {
    $vscodeTextmateLocation: grammar.$vscodeTextmateLocation,
    patterns: grammar.patterns,
    name: grammar.scopeName
  };
  grammar.repository.$base = base || grammar.repository.$self;
  return grammar;
}
var AttributedScopeStack = class _AttributedScopeStack {
  /**
   * Invariant:
   * ```
   * if (parent && !scopePath.extends(parent.scopePath)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(parent, scopePath, tokenAttributes) {
    this.parent = parent;
    this.scopePath = scopePath;
    this.tokenAttributes = tokenAttributes;
  }
  static fromExtension(namesScopeList, contentNameScopesList) {
    let current = namesScopeList;
    let scopeNames = (namesScopeList == null ? void 0 : namesScopeList.scopePath) ?? null;
    for (const frame of contentNameScopesList) {
      scopeNames = ScopeStack.push(scopeNames, frame.scopeNames);
      current = new _AttributedScopeStack(current, scopeNames, frame.encodedTokenAttributes);
    }
    return current;
  }
  static createRoot(scopeName, tokenAttributes) {
    return new _AttributedScopeStack(null, new ScopeStack(null, scopeName), tokenAttributes);
  }
  static createRootAndLookUpScopeName(scopeName, tokenAttributes, grammar) {
    const rawRootMetadata = grammar.getMetadataForScope(scopeName);
    const scopePath = new ScopeStack(null, scopeName);
    const rootStyle = grammar.themeProvider.themeMatch(scopePath);
    const resolvedTokenAttributes = _AttributedScopeStack.mergeAttributes(
      tokenAttributes,
      rawRootMetadata,
      rootStyle
    );
    return new _AttributedScopeStack(null, scopePath, resolvedTokenAttributes);
  }
  get scopeName() {
    return this.scopePath.scopeName;
  }
  toString() {
    return this.getScopeNames().join(" ");
  }
  equals(other) {
    return _AttributedScopeStack.equals(this, other);
  }
  static equals(a, b) {
    do {
      if (a === b) {
        return true;
      }
      if (!a && !b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      if (a.scopeName !== b.scopeName || a.tokenAttributes !== b.tokenAttributes) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    } while (true);
  }
  static mergeAttributes(existingTokenAttributes, basicScopeAttributes, styleAttributes) {
    let fontStyle = -1;
    let foreground = 0;
    let background = 0;
    if (styleAttributes !== null) {
      fontStyle = styleAttributes.fontStyle;
      foreground = styleAttributes.foregroundId;
      background = styleAttributes.backgroundId;
    }
    return EncodedTokenMetadata.set(
      existingTokenAttributes,
      basicScopeAttributes.languageId,
      basicScopeAttributes.tokenType,
      null,
      fontStyle,
      foreground,
      background
    );
  }
  pushAttributed(scopePath, grammar) {
    if (scopePath === null) {
      return this;
    }
    if (scopePath.indexOf(" ") === -1) {
      return _AttributedScopeStack._pushAttributed(this, scopePath, grammar);
    }
    const scopes = scopePath.split(/ /g);
    let result = this;
    for (const scope of scopes) {
      result = _AttributedScopeStack._pushAttributed(result, scope, grammar);
    }
    return result;
  }
  static _pushAttributed(target, scopeName, grammar) {
    const rawMetadata = grammar.getMetadataForScope(scopeName);
    const newPath = target.scopePath.push(scopeName);
    const scopeThemeMatchResult = grammar.themeProvider.themeMatch(newPath);
    const metadata = _AttributedScopeStack.mergeAttributes(
      target.tokenAttributes,
      rawMetadata,
      scopeThemeMatchResult
    );
    return new _AttributedScopeStack(target, newPath, metadata);
  }
  getScopeNames() {
    return this.scopePath.getSegments();
  }
  getExtensionIfDefined(base) {
    var _a3;
    const result = [];
    let self = this;
    while (self && self !== base) {
      result.push({
        encodedTokenAttributes: self.tokenAttributes,
        scopeNames: self.scopePath.getExtensionIfDefined(((_a3 = self.parent) == null ? void 0 : _a3.scopePath) ?? null)
      });
      self = self.parent;
    }
    return self === base ? result.reverse() : void 0;
  }
};
var _a2;
var StateStackImpl = (_a2 = class {
  /**
   * Invariant:
   * ```
   * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
   * 	throw new Error();
   * }
   * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
   * 	throw new Error();
   * }
   * ```
   */
  constructor(parent, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
    __publicField(this, "_stackElementBrand");
    /**
     * The position on the current line where this state was pushed.
     * This is relevant only while tokenizing a line, to detect endless loops.
     * Its value is meaningless across lines.
     */
    __publicField(this, "_enterPos");
    /**
     * The captured anchor position when this stack element was pushed.
     * This is relevant only while tokenizing a line, to restore the anchor position when popping.
     * Its value is meaningless across lines.
     */
    __publicField(this, "_anchorPos");
    /**
     * The depth of the stack.
     */
    __publicField(this, "depth");
    this.parent = parent;
    this.ruleId = ruleId;
    this.beginRuleCapturedEOL = beginRuleCapturedEOL;
    this.endRule = endRule;
    this.nameScopesList = nameScopesList;
    this.contentNameScopesList = contentNameScopesList;
    this.depth = this.parent ? this.parent.depth + 1 : 1;
    this._enterPos = enterPos;
    this._anchorPos = anchorPos;
  }
  equals(other) {
    if (other === null) {
      return false;
    }
    return _a2._equals(this, other);
  }
  static _equals(a, b) {
    if (a === b) {
      return true;
    }
    if (!this._structuralEquals(a, b)) {
      return false;
    }
    return AttributedScopeStack.equals(a.contentNameScopesList, b.contentNameScopesList);
  }
  /**
   * A structural equals check. Does not take into account `scopes`.
   */
  static _structuralEquals(a, b) {
    do {
      if (a === b) {
        return true;
      }
      if (!a && !b) {
        return true;
      }
      if (!a || !b) {
        return false;
      }
      if (a.depth !== b.depth || a.ruleId !== b.ruleId || a.endRule !== b.endRule) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    } while (true);
  }
  clone() {
    return this;
  }
  static _reset(el) {
    while (el) {
      el._enterPos = -1;
      el._anchorPos = -1;
      el = el.parent;
    }
  }
  reset() {
    _a2._reset(this);
  }
  pop() {
    return this.parent;
  }
  safePop() {
    if (this.parent) {
      return this.parent;
    }
    return this;
  }
  push(ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
    return new _a2(
      this,
      ruleId,
      enterPos,
      anchorPos,
      beginRuleCapturedEOL,
      endRule,
      nameScopesList,
      contentNameScopesList
    );
  }
  getEnterPos() {
    return this._enterPos;
  }
  getAnchorPos() {
    return this._anchorPos;
  }
  getRule(grammar) {
    return grammar.getRule(this.ruleId);
  }
  toString() {
    const r4 = [];
    this._writeString(r4, 0);
    return "[" + r4.join(",") + "]";
  }
  _writeString(res, outIndex) {
    var _a3, _b;
    if (this.parent) {
      outIndex = this.parent._writeString(res, outIndex);
    }
    res[outIndex++] = `(${this.ruleId}, ${(_a3 = this.nameScopesList) == null ? void 0 : _a3.toString()}, ${(_b = this.contentNameScopesList) == null ? void 0 : _b.toString()})`;
    return outIndex;
  }
  withContentNameScopesList(contentNameScopeStack) {
    if (this.contentNameScopesList === contentNameScopeStack) {
      return this;
    }
    return this.parent.push(
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      this.endRule,
      this.nameScopesList,
      contentNameScopeStack
    );
  }
  withEndRule(endRule) {
    if (this.endRule === endRule) {
      return this;
    }
    return new _a2(
      this.parent,
      this.ruleId,
      this._enterPos,
      this._anchorPos,
      this.beginRuleCapturedEOL,
      endRule,
      this.nameScopesList,
      this.contentNameScopesList
    );
  }
  // Used to warn of endless loops
  hasSameRuleAs(other) {
    let el = this;
    while (el && el._enterPos === other._enterPos) {
      if (el.ruleId === other.ruleId) {
        return true;
      }
      el = el.parent;
    }
    return false;
  }
  toStateStackFrame() {
    var _a3, _b, _c;
    return {
      ruleId: ruleIdToNumber(this.ruleId),
      beginRuleCapturedEOL: this.beginRuleCapturedEOL,
      endRule: this.endRule,
      nameScopesList: ((_b = this.nameScopesList) == null ? void 0 : _b.getExtensionIfDefined(((_a3 = this.parent) == null ? void 0 : _a3.nameScopesList) ?? null)) ?? [],
      contentNameScopesList: ((_c = this.contentNameScopesList) == null ? void 0 : _c.getExtensionIfDefined(this.nameScopesList)) ?? []
    };
  }
  static pushFrame(self, frame) {
    const namesScopeList = AttributedScopeStack.fromExtension((self == null ? void 0 : self.nameScopesList) ?? null, frame.nameScopesList);
    return new _a2(
      self,
      ruleIdFromNumber(frame.ruleId),
      frame.enterPos ?? -1,
      frame.anchorPos ?? -1,
      frame.beginRuleCapturedEOL,
      frame.endRule,
      namesScopeList,
      AttributedScopeStack.fromExtension(namesScopeList, frame.contentNameScopesList)
    );
  }
}, // TODO remove me
__publicField(_a2, "NULL", new _a2(
  null,
  0,
  0,
  0,
  false,
  null,
  null,
  null
)), _a2);
var BalancedBracketSelectors = class {
  constructor(balancedBracketScopes, unbalancedBracketScopes) {
    __publicField(this, "balancedBracketScopes");
    __publicField(this, "unbalancedBracketScopes");
    __publicField(this, "allowAny", false);
    this.balancedBracketScopes = balancedBracketScopes.flatMap(
      (selector) => {
        if (selector === "*") {
          this.allowAny = true;
          return [];
        }
        return createMatchers(selector, nameMatcher).map((m) => m.matcher);
      }
    );
    this.unbalancedBracketScopes = unbalancedBracketScopes.flatMap(
      (selector) => createMatchers(selector, nameMatcher).map((m) => m.matcher)
    );
  }
  get matchesAlways() {
    return this.allowAny && this.unbalancedBracketScopes.length === 0;
  }
  get matchesNever() {
    return this.balancedBracketScopes.length === 0 && !this.allowAny;
  }
  match(scopes) {
    for (const excluder of this.unbalancedBracketScopes) {
      if (excluder(scopes)) {
        return false;
      }
    }
    for (const includer of this.balancedBracketScopes) {
      if (includer(scopes)) {
        return true;
      }
    }
    return this.allowAny;
  }
};
var LineTokens = class {
  constructor(emitBinaryTokens, lineText, tokenTypeOverrides, balancedBracketSelectors) {
    __publicField(this, "_emitBinaryTokens");
    /**
     * defined only if `false`.
     */
    __publicField(this, "_lineText");
    /**
     * used only if `_emitBinaryTokens` is false.
     */
    __publicField(this, "_tokens");
    /**
     * used only if `_emitBinaryTokens` is true.
     */
    __publicField(this, "_binaryTokens");
    __publicField(this, "_lastTokenEndIndex");
    __publicField(this, "_tokenTypeOverrides");
    this.balancedBracketSelectors = balancedBracketSelectors;
    this._emitBinaryTokens = emitBinaryTokens;
    this._tokenTypeOverrides = tokenTypeOverrides;
    if (false) {
      this._lineText = lineText;
    } else {
      this._lineText = null;
    }
    this._tokens = [];
    this._binaryTokens = [];
    this._lastTokenEndIndex = 0;
  }
  produce(stack, endIndex) {
    this.produceFromScopes(stack.contentNameScopesList, endIndex);
  }
  produceFromScopes(scopesList, endIndex) {
    var _a3;
    if (this._lastTokenEndIndex >= endIndex) {
      return;
    }
    if (this._emitBinaryTokens) {
      let metadata = (scopesList == null ? void 0 : scopesList.tokenAttributes) ?? 0;
      let containsBalancedBrackets = false;
      if ((_a3 = this.balancedBracketSelectors) == null ? void 0 : _a3.matchesAlways) {
        containsBalancedBrackets = true;
      }
      if (this._tokenTypeOverrides.length > 0 || this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever) {
        const scopes2 = (scopesList == null ? void 0 : scopesList.getScopeNames()) ?? [];
        for (const tokenType of this._tokenTypeOverrides) {
          if (tokenType.matcher(scopes2)) {
            metadata = EncodedTokenMetadata.set(
              metadata,
              0,
              toOptionalTokenType(tokenType.type),
              null,
              -1,
              0,
              0
            );
          }
        }
        if (this.balancedBracketSelectors) {
          containsBalancedBrackets = this.balancedBracketSelectors.match(scopes2);
        }
      }
      if (containsBalancedBrackets) {
        metadata = EncodedTokenMetadata.set(
          metadata,
          0,
          8,
          containsBalancedBrackets,
          -1,
          0,
          0
        );
      }
      if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === metadata) {
        this._lastTokenEndIndex = endIndex;
        return;
      }
      this._binaryTokens.push(this._lastTokenEndIndex);
      this._binaryTokens.push(metadata);
      this._lastTokenEndIndex = endIndex;
      return;
    }
    const scopes = (scopesList == null ? void 0 : scopesList.getScopeNames()) ?? [];
    this._tokens.push({
      startIndex: this._lastTokenEndIndex,
      endIndex,
      // value: lineText.substring(lastTokenEndIndex, endIndex),
      scopes
    });
    this._lastTokenEndIndex = endIndex;
  }
  getResult(stack, lineLength) {
    if (this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === lineLength - 1) {
      this._tokens.pop();
    }
    if (this._tokens.length === 0) {
      this._lastTokenEndIndex = -1;
      this.produce(stack, lineLength);
      this._tokens[this._tokens.length - 1].startIndex = 0;
    }
    return this._tokens;
  }
  getBinaryResult(stack, lineLength) {
    if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === lineLength - 1) {
      this._binaryTokens.pop();
      this._binaryTokens.pop();
    }
    if (this._binaryTokens.length === 0) {
      this._lastTokenEndIndex = -1;
      this.produce(stack, lineLength);
      this._binaryTokens[this._binaryTokens.length - 2] = 0;
    }
    const result = new Uint32Array(this._binaryTokens.length);
    for (let i = 0, len = this._binaryTokens.length; i < len; i++) {
      result[i] = this._binaryTokens[i];
    }
    return result;
  }
};
var SyncRegistry = class {
  constructor(theme, _onigLib) {
    __publicField(this, "_grammars", /* @__PURE__ */ new Map());
    __publicField(this, "_rawGrammars", /* @__PURE__ */ new Map());
    __publicField(this, "_injectionGrammars", /* @__PURE__ */ new Map());
    __publicField(this, "_theme");
    this._onigLib = _onigLib;
    this._theme = theme;
  }
  dispose() {
    for (const grammar of this._grammars.values()) {
      grammar.dispose();
    }
  }
  setTheme(theme) {
    this._theme = theme;
  }
  getColorMap() {
    return this._theme.getColorMap();
  }
  /**
   * Add `grammar` to registry and return a list of referenced scope names
   */
  addGrammar(grammar, injectionScopeNames) {
    this._rawGrammars.set(grammar.scopeName, grammar);
    if (injectionScopeNames) {
      this._injectionGrammars.set(grammar.scopeName, injectionScopeNames);
    }
  }
  /**
   * Lookup a raw grammar.
   */
  lookup(scopeName) {
    return this._rawGrammars.get(scopeName);
  }
  /**
   * Returns the injections for the given grammar
   */
  injections(targetScope) {
    return this._injectionGrammars.get(targetScope);
  }
  /**
   * Get the default theme settings
   */
  getDefaults() {
    return this._theme.getDefaults();
  }
  /**
   * Match a scope in the theme.
   */
  themeMatch(scopePath) {
    return this._theme.match(scopePath);
  }
  /**
   * Lookup a grammar.
   */
  grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
    if (!this._grammars.has(scopeName)) {
      let rawGrammar = this._rawGrammars.get(scopeName);
      if (!rawGrammar) {
        return null;
      }
      this._grammars.set(scopeName, createGrammar(
        scopeName,
        rawGrammar,
        initialLanguage,
        embeddedLanguages,
        tokenTypes,
        balancedBracketSelectors,
        this,
        this._onigLib
      ));
    }
    return this._grammars.get(scopeName);
  }
};
var Registry = class {
  constructor(options) {
    __publicField(this, "_options");
    __publicField(this, "_syncRegistry");
    __publicField(this, "_ensureGrammarCache");
    this._options = options;
    this._syncRegistry = new SyncRegistry(
      Theme.createFromRawTheme(options.theme, options.colorMap),
      options.onigLib
    );
    this._ensureGrammarCache = /* @__PURE__ */ new Map();
  }
  dispose() {
    this._syncRegistry.dispose();
  }
  /**
   * Change the theme. Once called, no previous `ruleStack` should be used anymore.
   */
  setTheme(theme, colorMap) {
    this._syncRegistry.setTheme(Theme.createFromRawTheme(theme, colorMap));
  }
  /**
   * Returns a lookup array for color ids.
   */
  getColorMap() {
    return this._syncRegistry.getColorMap();
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithEmbeddedLanguages(initialScopeName, initialLanguage, embeddedLanguages) {
    return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, { embeddedLanguages });
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   * Please do not use language id 0.
   */
  loadGrammarWithConfiguration(initialScopeName, initialLanguage, configuration) {
    return this._loadGrammar(
      initialScopeName,
      initialLanguage,
      configuration.embeddedLanguages,
      configuration.tokenTypes,
      new BalancedBracketSelectors(
        configuration.balancedBracketSelectors || [],
        configuration.unbalancedBracketSelectors || []
      )
    );
  }
  /**
   * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
   */
  loadGrammar(initialScopeName) {
    return this._loadGrammar(initialScopeName, 0, null, null, null);
  }
  _loadGrammar(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
    const dependencyProcessor = new ScopeDependencyProcessor(this._syncRegistry, initialScopeName);
    while (dependencyProcessor.Q.length > 0) {
      dependencyProcessor.Q.map((request) => this._loadSingleGrammar(request.scopeName));
      dependencyProcessor.processQueue();
    }
    return this._grammarForScopeName(
      initialScopeName,
      initialLanguage,
      embeddedLanguages,
      tokenTypes,
      balancedBracketSelectors
    );
  }
  _loadSingleGrammar(scopeName) {
    if (!this._ensureGrammarCache.has(scopeName)) {
      this._doLoadSingleGrammar(scopeName);
      this._ensureGrammarCache.set(scopeName, true);
    }
  }
  _doLoadSingleGrammar(scopeName) {
    const grammar = this._options.loadGrammar(scopeName);
    if (grammar) {
      const injections = typeof this._options.getInjections === "function" ? this._options.getInjections(scopeName) : void 0;
      this._syncRegistry.addGrammar(grammar, injections);
    }
  }
  /**
   * Adds a rawGrammar.
   */
  addGrammar(rawGrammar, injections = [], initialLanguage = 0, embeddedLanguages = null) {
    this._syncRegistry.addGrammar(rawGrammar, injections);
    return this._grammarForScopeName(rawGrammar.scopeName, initialLanguage, embeddedLanguages);
  }
  /**
   * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
   */
  _grammarForScopeName(scopeName, initialLanguage = 0, embeddedLanguages = null, tokenTypes = null, balancedBracketSelectors = null) {
    return this._syncRegistry.grammarForScopeName(
      scopeName,
      initialLanguage,
      embeddedLanguages,
      tokenTypes,
      balancedBracketSelectors
    );
  }
};
var INITIAL = StateStackImpl.NULL;

// node_modules/html-void-elements/index.js
var htmlVoidElements = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];

// node_modules/property-information/lib/util/schema.js
var Schema = class {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(property, normal, space) {
    this.normal = normal;
    this.property = property;
    if (space) {
      this.space = space;
    }
  }
};
Schema.prototype.normal = {};
Schema.prototype.property = {};
Schema.prototype.space = void 0;

// node_modules/property-information/lib/util/merge.js
function merge(definitions, space) {
  const property = {};
  const normal = {};
  for (const definition of definitions) {
    Object.assign(property, definition.property);
    Object.assign(normal, definition.normal);
  }
  return new Schema(property, normal, space);
}

// node_modules/property-information/lib/normalize.js
function normalize(value) {
  return value.toLowerCase();
}

// node_modules/property-information/lib/util/info.js
var Info = class {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(property, attribute) {
    this.attribute = attribute;
    this.property = property;
  }
};
Info.prototype.attribute = "";
Info.prototype.booleanish = false;
Info.prototype.boolean = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.commaSeparated = false;
Info.prototype.defined = false;
Info.prototype.mustUseProperty = false;
Info.prototype.number = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.property = "";
Info.prototype.spaceSeparated = false;
Info.prototype.space = void 0;

// node_modules/property-information/lib/util/types.js
var types_exports = {};
__export(types_exports, {
  boolean: () => boolean,
  booleanish: () => booleanish,
  commaOrSpaceSeparated: () => commaOrSpaceSeparated,
  commaSeparated: () => commaSeparated,
  number: () => number,
  overloadedBoolean: () => overloadedBoolean,
  spaceSeparated: () => spaceSeparated
});
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}

// node_modules/property-information/lib/util/defined-info.js
var checks = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(types_exports)
);
var DefinedInfo = class extends Info {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(property, attribute, mask, space) {
    let index = -1;
    super(property, attribute);
    mark(this, "space", space);
    if (typeof mask === "number") {
      while (++index < checks.length) {
        const check = checks[index];
        mark(this, checks[index], (mask & types_exports[check]) === types_exports[check]);
      }
    }
  }
};
DefinedInfo.prototype.defined = true;
function mark(values, key2, value) {
  if (value) {
    values[key2] = value;
  }
}

// node_modules/property-information/lib/util/create.js
function create(definition) {
  const properties = {};
  const normals = {};
  for (const [property, value] of Object.entries(definition.properties)) {
    const info = new DefinedInfo(
      property,
      definition.transform(definition.attributes || {}, property),
      value,
      definition.space
    );
    if (definition.mustUseProperty && definition.mustUseProperty.includes(property)) {
      info.mustUseProperty = true;
    }
    properties[property] = info;
    normals[normalize(property)] = property;
    normals[normalize(info.attribute)] = property;
  }
  return new Schema(properties, normals, definition.space);
}

// node_modules/property-information/lib/aria.js
var aria = create({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  },
  transform(_, property) {
    return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
  }
});

// node_modules/property-information/lib/util/case-sensitive-transform.js
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}

// node_modules/property-information/lib/util/case-insensitive-transform.js
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}

// node_modules/property-information/lib/html.js
var html = create({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    blocking: spaceSeparated,
    capture: null,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: overloadedBoolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: boolean,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shadowRootClonable: boolean,
    shadowRootDelegatesFocus: boolean,
    shadowRootMode: null,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: number,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: boolean,
    // Lists. Use CSS to reduce space between items instead
    declare: boolean,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: number,
    // `<img>` and `<object>`
    leftMargin: number,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: number,
    // `<body>`
    marginWidth: number,
    // `<body>`
    noResize: boolean,
    // `<frame>`
    noHref: boolean,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: number,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: booleanish,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: number,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: caseInsensitiveTransform
});

// node_modules/property-information/lib/svg.js
var svg = create({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: caseSensitiveTransform
});

// node_modules/property-information/lib/xlink.js
var xlink = create({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(_, property) {
    return "xlink:" + property.slice(5).toLowerCase();
  }
});

// node_modules/property-information/lib/xmlns.js
var xmlns = create({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: caseInsensitiveTransform
});

// node_modules/property-information/lib/xml.js
var xml = create({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(_, property) {
    return "xml:" + property.slice(3).toLowerCase();
  }
});

// node_modules/property-information/lib/find.js
var cap = /[A-Z]/g;
var dash = /-[a-z]/g;
var valid = /^data[-\w.:]+$/i;
function find(schema, value) {
  const normal = normalize(value);
  let property = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(property, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}

// node_modules/property-information/index.js
var html2 = merge([aria, html, xlink, xmlns, xml], "html");
var svg2 = merge([aria, svg, xlink, xmlns, xml], "svg");

// node_modules/zwitch/index.js
var own = {}.hasOwnProperty;
function zwitch(key2, options) {
  const settings = options || {};
  function one2(value, ...parameters) {
    let fn2 = one2.invalid;
    const handlers = one2.handlers;
    if (value && own.call(value, key2)) {
      const id = String(value[key2]);
      fn2 = own.call(handlers, id) ? handlers[id] : one2.unknown;
    }
    if (fn2) {
      return fn2.call(this, value, ...parameters);
    }
  }
  one2.handlers = settings.handlers || {};
  one2.invalid = settings.invalid;
  one2.unknown = settings.unknown;
  return one2;
}

// node_modules/stringify-entities/lib/core.js
var defaultSubsetRegex = /["&'<>`]/g;
var surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
var controlCharactersRegex = (
  // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
  /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g
);
var regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
var subsetToRegexCache = /* @__PURE__ */ new WeakMap();
function core(value, options) {
  value = value.replace(
    options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex,
    basic
  );
  if (options.subset || options.escapeOnly) {
    return value;
  }
  return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
  function surrogate(pair, index, all2) {
    return options.format(
      (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
      all2.charCodeAt(index + 2),
      options
    );
  }
  function basic(character, index, all2) {
    return options.format(
      character.charCodeAt(0),
      all2.charCodeAt(index + 1),
      options
    );
  }
}
function charactersToExpressionCached(subset) {
  let cached = subsetToRegexCache.get(subset);
  if (!cached) {
    cached = charactersToExpression(subset);
    subsetToRegexCache.set(subset, cached);
  }
  return cached;
}
function charactersToExpression(subset) {
  const groups = [];
  let index = -1;
  while (++index < subset.length) {
    groups.push(subset[index].replace(regexEscapeRegex, "\\$&"));
  }
  return new RegExp("(?:" + groups.join("|") + ")", "g");
}

// node_modules/stringify-entities/lib/util/to-hexadecimal.js
var hexadecimalRegex = /[\dA-Fa-f]/;
function toHexadecimal(code, next, omit) {
  const value = "&#x" + code.toString(16).toUpperCase();
  return omit && next && !hexadecimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}

// node_modules/stringify-entities/lib/util/to-decimal.js
var decimalRegex = /\d/;
function toDecimal(code, next, omit) {
  const value = "&#" + String(code);
  return omit && next && !decimalRegex.test(String.fromCharCode(next)) ? value : value + ";";
}

// node_modules/character-entities-legacy/index.js
var characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];

// node_modules/character-entities-html4/index.js
var characterEntitiesHtml4 = {
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  times: "×",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  divide: "÷",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  fnof: "ƒ",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  bull: "•",
  hellip: "…",
  prime: "′",
  Prime: "″",
  oline: "‾",
  frasl: "⁄",
  weierp: "℘",
  image: "ℑ",
  real: "ℜ",
  trade: "™",
  alefsym: "ℵ",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lArr: "⇐",
  uArr: "⇑",
  rArr: "⇒",
  dArr: "⇓",
  hArr: "⇔",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lang: "〈",
  rang: "〉",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  permil: "‰",
  lsaquo: "‹",
  rsaquo: "›",
  euro: "€"
};

// node_modules/stringify-entities/lib/constant/dangerous.js
var dangerous = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
];

// node_modules/stringify-entities/lib/util/to-named.js
var own2 = {}.hasOwnProperty;
var characters = {};
var key;
for (key in characterEntitiesHtml4) {
  if (own2.call(characterEntitiesHtml4, key)) {
    characters[characterEntitiesHtml4[key]] = key;
  }
}
var notAlphanumericRegex = /[^\dA-Za-z]/;
function toNamed(code, next, omit, attribute) {
  const character = String.fromCharCode(code);
  if (own2.call(characters, character)) {
    const name = characters[character];
    const value = "&" + name;
    if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next && next !== 61 && notAlphanumericRegex.test(String.fromCharCode(next)))) {
      return value;
    }
    return value + ";";
  }
  return "";
}

// node_modules/stringify-entities/lib/util/format-smart.js
function formatSmart(code, next, options) {
  let numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);
  let named;
  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed(
      code,
      next,
      options.omitOptionalSemicolons,
      options.attribute
    );
  }
  if ((options.useShortestReferences || !named) && options.useShortestReferences) {
    const decimal = toDecimal(code, next, options.omitOptionalSemicolons);
    if (decimal.length < numeric.length) {
      numeric = decimal;
    }
  }
  return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}

// node_modules/stringify-entities/lib/index.js
function stringifyEntities(value, options) {
  return core(value, Object.assign({ format: formatSmart }, options));
}

// node_modules/hast-util-to-html/lib/handle/comment.js
var htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
var bogusCommentEntitySubset = [">"];
var commentEntitySubset = ["<", ">"];
function comment(node, _1, _2, state) {
  return state.settings.bogusComments ? "<?" + stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: bogusCommentEntitySubset
    })
  ) + ">" : "<!--" + node.value.replace(htmlCommentRegex, encode) + "-->";
  function encode($0) {
    return stringifyEntities(
      $0,
      Object.assign({}, state.settings.characterReferences, {
        subset: commentEntitySubset
      })
    );
  }
}

// node_modules/hast-util-to-html/lib/handle/doctype.js
function doctype(_1, _2, _3, state) {
  return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
}

// node_modules/ccount/index.js
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count = 0;
  let index = source.indexOf(character);
  while (index !== -1) {
    count++;
    index = source.indexOf(character, index + character.length);
  }
  return count;
}

// node_modules/comma-separated-tokens/index.js
function stringify(values, options) {
  const settings = options || {};
  const input = values[values.length - 1] === "" ? [...values, ""] : values;
  return input.join(
    (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
  ).trim();
}

// node_modules/space-separated-tokens/index.js
function stringify2(values) {
  return values.join(" ").trim();
}

// node_modules/hast-util-whitespace/lib/index.js
var re = /[ \t\n\f\r]/g;
function whitespace(thing) {
  return typeof thing === "object" ? thing.type === "text" ? empty(thing.value) : false : empty(thing);
}
function empty(value) {
  return value.replace(re, "") === "";
}

// node_modules/hast-util-to-html/lib/omission/util/siblings.js
var siblingAfter = siblings(1);
var siblingBefore = siblings(-1);
var emptyChildren = [];
function siblings(increment2) {
  return sibling;
  function sibling(parent, index, includeWhitespace) {
    const siblings2 = parent ? parent.children : emptyChildren;
    let offset = (index || 0) + increment2;
    let next = siblings2[offset];
    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset += increment2;
        next = siblings2[offset];
      }
    }
    return next;
  }
}

// node_modules/hast-util-to-html/lib/omission/omission.js
var own3 = {}.hasOwnProperty;
function omission(handlers) {
  return omit;
  function omit(node, index, parent) {
    return own3.call(handlers, node.tagName) && handlers[node.tagName](node, index, parent);
  }
}

// node_modules/hast-util-to-html/lib/omission/closing.js
var closing = omission({
  body,
  caption: headOrColgroupOrCaption,
  colgroup: headOrColgroupOrCaption,
  dd,
  dt,
  head: headOrColgroupOrCaption,
  html: html3,
  li,
  optgroup,
  option,
  p,
  rp: rubyElement,
  rt: rubyElement,
  tbody,
  td: cells,
  tfoot,
  th: cells,
  thead,
  tr
});
function headOrColgroupOrCaption(_, index, parent) {
  const next = siblingAfter(parent, index, true);
  return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
}
function html3(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function body(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type !== "comment";
}
function p(_, index, parent) {
  const next = siblingAfter(parent, index);
  return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || // Confusing parent.
  !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
}
function li(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "li";
}
function dt(_, index, parent) {
  const next = siblingAfter(parent, index);
  return Boolean(
    next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd")
  );
}
function dd(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function rubyElement(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
}
function optgroup(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "optgroup";
}
function option(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
}
function thead(_, index, parent) {
  const next = siblingAfter(parent, index);
  return Boolean(
    next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot")
  );
}
function tbody(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tfoot(_, index, parent) {
  return !siblingAfter(parent, index);
}
function tr(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && next.tagName === "tr";
}
function cells(_, index, parent) {
  const next = siblingAfter(parent, index);
  return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
}

// node_modules/hast-util-to-html/lib/omission/opening.js
var opening = omission({
  body: body2,
  colgroup,
  head,
  html: html4,
  tbody: tbody2
});
function html4(node) {
  const head2 = siblingAfter(node, -1);
  return !head2 || head2.type !== "comment";
}
function head(node) {
  const seen = /* @__PURE__ */ new Set();
  for (const child2 of node.children) {
    if (child2.type === "element" && (child2.tagName === "base" || child2.tagName === "title")) {
      if (seen.has(child2.tagName)) return false;
      seen.add(child2.tagName);
    }
  }
  const child = node.children[0];
  return !child || child.type === "element";
}
function body2(node) {
  const head2 = siblingAfter(node, -1, true);
  return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
}
function colgroup(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1, true);
  if (parent && previous && previous.type === "element" && previous.tagName === "colgroup" && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "col");
}
function tbody2(node, index, parent) {
  const previous = siblingBefore(parent, index);
  const head2 = siblingAfter(node, -1);
  if (parent && previous && previous.type === "element" && (previous.tagName === "thead" || previous.tagName === "tbody") && closing(previous, parent.children.indexOf(previous), parent)) {
    return false;
  }
  return Boolean(head2 && head2.type === "element" && head2.tagName === "tr");
}

// node_modules/hast-util-to-html/lib/handle/element.js
var constants = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    ["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")],
    [`\0	
\f\r "&'/<=>`.split(""), "\0	\n\f\r \"&'/<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    ["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")],
    ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function element(node, index, parent, state) {
  const schema = state.schema;
  const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
  let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node.tagName.toLowerCase());
  const parts = [];
  let last;
  if (schema.space === "html" && node.tagName === "svg") {
    state.schema = svg2;
  }
  const attributes = serializeAttributes(state, node.properties);
  const content = state.all(
    schema.space === "html" && node.tagName === "template" ? node.content : node
  );
  state.schema = schema;
  if (content) selfClosing = false;
  if (attributes || !omit || !opening(node, index, parent)) {
    parts.push("<", node.tagName, attributes ? " " + attributes : "");
    if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
      last = attributes.charAt(attributes.length - 1);
      if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
        parts.push(" ");
      }
      parts.push("/");
    }
    parts.push(">");
  }
  parts.push(content);
  if (!selfClosing && (!omit || !closing(node, index, parent))) {
    parts.push("</" + node.tagName + ">");
  }
  return parts.join("");
}
function serializeAttributes(state, properties) {
  const values = [];
  let index = -1;
  let key2;
  if (properties) {
    for (key2 in properties) {
      if (properties[key2] !== null && properties[key2] !== void 0) {
        const value = serializeAttribute(state, key2, properties[key2]);
        if (value) values.push(value);
      }
    }
  }
  while (++index < values.length) {
    const last = state.settings.tightAttributes ? values[index].charAt(values[index].length - 1) : void 0;
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += " ";
    }
  }
  return values.join("");
}
function serializeAttribute(state, key2, value) {
  const info = find(state.schema, key2);
  const x = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
  const y = state.settings.allowDangerousCharacters ? 0 : 1;
  let quote = state.quote;
  let result;
  if (info.overloadedBoolean && (value === info.attribute || value === "")) {
    value = true;
  } else if ((info.boolean || info.overloadedBoolean) && (typeof value !== "string" || value === info.attribute || value === "")) {
    value = Boolean(value);
  }
  if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value)) {
    return "";
  }
  const name = stringifyEntities(
    info.attribute,
    Object.assign({}, state.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: constants.name[x][y]
    })
  );
  if (value === true) return name;
  value = Array.isArray(value) ? (info.commaSeparated ? stringify : stringify2)(value, {
    padLeft: !state.settings.tightCommaSeparatedLists
  }) : String(value);
  if (state.settings.collapseEmptyAttributes && !value) return name;
  if (state.settings.preferUnquoted) {
    result = stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        attribute: true,
        subset: constants.unquoted[x][y]
      })
    );
  }
  if (result !== value) {
    if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
      quote = state.alternative;
    }
    result = quote + stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        // Always encode without parse errors in non-HTML.
        subset: (quote === "'" ? constants.single : constants.double)[x][y],
        attribute: true
      })
    ) + quote;
  }
  return name + (result ? "=" + result : result);
}

// node_modules/hast-util-to-html/lib/handle/text.js
var textEntitySubset = ["<", "&"];
function text(node, _, parent, state) {
  return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node.value : stringifyEntities(
    node.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: textEntitySubset
    })
  );
}

// node_modules/hast-util-to-html/lib/handle/raw.js
function raw(node, index, parent, state) {
  return state.settings.allowDangerousHtml ? node.value : text(node, index, parent, state);
}

// node_modules/hast-util-to-html/lib/handle/root.js
function root(node, _1, _2, state) {
  return state.all(node);
}

// node_modules/hast-util-to-html/lib/handle/index.js
var handle = zwitch("type", {
  invalid,
  unknown,
  handlers: { comment, doctype, element, raw, root, text }
});
function invalid(node) {
  throw new Error("Expected node, not `" + node + "`");
}
function unknown(node_) {
  const node = (
    /** @type {Nodes} */
    node_
  );
  throw new Error("Cannot compile unknown node `" + node.type + "`");
}

// node_modules/hast-util-to-html/lib/index.js
var emptyOptions = {};
var emptyCharacterReferences = {};
var emptyChildren2 = [];
function toHtml(tree, options) {
  const options_ = options || emptyOptions;
  const quote = options_.quote || '"';
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
  }
  const state = {
    one,
    all,
    settings: {
      omitOptionalTags: options_.omitOptionalTags || false,
      allowParseErrors: options_.allowParseErrors || false,
      allowDangerousCharacters: options_.allowDangerousCharacters || false,
      quoteSmart: options_.quoteSmart || false,
      preferUnquoted: options_.preferUnquoted || false,
      tightAttributes: options_.tightAttributes || false,
      upperDoctype: options_.upperDoctype || false,
      tightDoctype: options_.tightDoctype || false,
      bogusComments: options_.bogusComments || false,
      tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
      tightSelfClosing: options_.tightSelfClosing || false,
      collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
      allowDangerousHtml: options_.allowDangerousHtml || false,
      voids: options_.voids || htmlVoidElements,
      characterReferences: options_.characterReferences || emptyCharacterReferences,
      closeSelfClosing: options_.closeSelfClosing || false,
      closeEmptyElements: options_.closeEmptyElements || false
    },
    schema: options_.space === "svg" ? svg2 : html2,
    quote,
    alternative
  };
  return state.one(
    Array.isArray(tree) ? { type: "root", children: tree } : tree,
    void 0,
    void 0
  );
}
function one(node, index, parent) {
  return handle(node, index, parent, this);
}
function all(parent) {
  const results = [];
  const children = parent && parent.children || emptyChildren2;
  let index = -1;
  while (++index < children.length) {
    results[index] = this.one(children[index], index, parent);
  }
  return results.join("");
}

// node_modules/emoji-regex-xs/index.mjs
var r = String.raw;
var seq = r`(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})`;
var sTags = r`\u{E0061}-\u{E007A}`;

// node_modules/regex/src/utils-internals.js
var noncapturingDelim = String.raw`\(\?(?:[:=!>A-Za-z\-]|<[=!]|\(DEFINE\))`;

// node_modules/regex-utilities/src/index.js
var Context = Object.freeze({
  DEFAULT: "DEFAULT",
  CHAR_CLASS: "CHAR_CLASS"
});

// node_modules/regex/src/atomic.js
var atomicPluginToken = new RegExp(String.raw`(?<noncapturingStart>${noncapturingDelim})|(?<capturingStart>\((?:\?<[^>]+>)?)|\\?.`, "gsu");
var baseQuantifier = String.raw`(?:[?*+]|\{\d+(?:,\d*)?\})`;
var possessivePluginToken = new RegExp(String.raw`
\\(?: \d+
  | c[A-Za-z]
  | [gk]<[^>]+>
  | [pPu]\{[^\}]+\}
  | u[A-Fa-f\d]{4}
  | x[A-Fa-f\d]{2}
  )
| \((?: \? (?: [:=!>]
  | <(?:[=!]|[^>]+>)
  | [A-Za-z\-]+:
  | \(DEFINE\)
  ))?
| (?<qBase>${baseQuantifier})(?<qMod>[?+]?)(?<invalidQ>[?*+\{]?)
| \\?.
`.replace(/\s+/g, ""), "gsu");

// node_modules/regex-recursion/src/index.js
var r2 = String.raw;
var gRToken = r2`\\g<(?<gRNameOrNum>[^>&]+)&R=(?<gRDepth>[^>]+)>`;
var recursiveToken = r2`\(\?R=(?<rDepth>[^\)]+)\)|${gRToken}`;
var namedCaptureDelim = r2`\(\?<(?![=!])(?<captureName>[^>]+)>`;
var captureDelim = r2`${namedCaptureDelim}|(?<unnamed>\()(?!\?)`;
var token = new RegExp(r2`${namedCaptureDelim}|${recursiveToken}|\(\?|\\?.`, "gsu");

// node_modules/oniguruma-to-es/dist/esm/index.js
var cp = String.fromCodePoint;
var r3 = String.raw;
var envFlags = {
  flagGroups: (() => {
    try {
      new RegExp("(?i:)");
    } catch {
      return false;
    }
    return true;
  })(),
  unicodeSets: (() => {
    try {
      new RegExp("", "v");
    } catch {
      return false;
    }
    return true;
  })()
};
envFlags.literalHyphenIncorrectlyCreatesRange = (() => {
  if (!envFlags.unicodeSets) {
    return false;
  }
  try {
    new RegExp(r3`[\d\-a]`, "v");
  } catch {
    return true;
  }
  return false;
})();
var CharsWithoutIgnoreCaseExpansion = /* @__PURE__ */ new Set([
  cp(304),
  // İ
  cp(305)
  // ı
]);
var JsUnicodeProperties = new Set(
  `C Other
Cc Control cntrl
Cf Format
Cn Unassigned
Co Private_Use
Cs Surrogate
L Letter
LC Cased_Letter
Ll Lowercase_Letter
Lm Modifier_Letter
Lo Other_Letter
Lt Titlecase_Letter
Lu Uppercase_Letter
M Mark Combining_Mark
Mc Spacing_Mark
Me Enclosing_Mark
Mn Nonspacing_Mark
N Number
Nd Decimal_Number digit
Nl Letter_Number
No Other_Number
P Punctuation punct
Pc Connector_Punctuation
Pd Dash_Punctuation
Pe Close_Punctuation
Pf Final_Punctuation
Pi Initial_Punctuation
Po Other_Punctuation
Ps Open_Punctuation
S Symbol
Sc Currency_Symbol
Sk Modifier_Symbol
Sm Math_Symbol
So Other_Symbol
Z Separator
Zl Line_Separator
Zp Paragraph_Separator
Zs Space_Separator
ASCII
ASCII_Hex_Digit AHex
Alphabetic Alpha
Any
Assigned
Bidi_Control Bidi_C
Bidi_Mirrored Bidi_M
Case_Ignorable CI
Cased
Changes_When_Casefolded CWCF
Changes_When_Casemapped CWCM
Changes_When_Lowercased CWL
Changes_When_NFKC_Casefolded CWKCF
Changes_When_Titlecased CWT
Changes_When_Uppercased CWU
Dash
Default_Ignorable_Code_Point DI
Deprecated Dep
Diacritic Dia
Emoji
Emoji_Component EComp
Emoji_Modifier EMod
Emoji_Modifier_Base EBase
Emoji_Presentation EPres
Extended_Pictographic ExtPict
Extender Ext
Grapheme_Base Gr_Base
Grapheme_Extend Gr_Ext
Hex_Digit Hex
IDS_Binary_Operator IDSB
IDS_Trinary_Operator IDST
ID_Continue IDC
ID_Start IDS
Ideographic Ideo
Join_Control Join_C
Logical_Order_Exception LOE
Lowercase Lower
Math
Noncharacter_Code_Point NChar
Pattern_Syntax Pat_Syn
Pattern_White_Space Pat_WS
Quotation_Mark QMark
Radical
Regional_Indicator RI
Sentence_Terminal STerm
Soft_Dotted SD
Terminal_Punctuation Term
Unified_Ideograph UIdeo
Uppercase Upper
Variation_Selector VS
White_Space space
XID_Continue XIDC
XID_Start XIDS`.split(/\s/)
);
var JsUnicodePropertiesMap = /* @__PURE__ */ new Map();
for (const p2 of JsUnicodeProperties) {
  JsUnicodePropertiesMap.set(slug(p2), p2);
}
var JsUnicodePropertiesOfStrings = /* @__PURE__ */ new Set([
  // ES2024 properties of strings; none are supported by Oniguruma
  "Basic_Emoji",
  "Emoji_Keycap_Sequence",
  "RGI_Emoji",
  "RGI_Emoji_Flag_Sequence",
  "RGI_Emoji_Modifier_Sequence",
  "RGI_Emoji_Tag_Sequence",
  "RGI_Emoji_ZWJ_Sequence"
]);
var JsUnicodePropertiesOfStringsMap = /* @__PURE__ */ new Map();
for (const p2 of JsUnicodePropertiesOfStrings) {
  JsUnicodePropertiesOfStringsMap.set(slug(p2), p2);
}
var LowerToAlternativeLowerCaseMap = /* @__PURE__ */ new Map([
  ["s", cp(383)],
  // s, ſ
  [cp(383), "s"]
  // ſ, s
]);
var LowerToAlternativeUpperCaseMap = /* @__PURE__ */ new Map([
  [cp(223), cp(7838)],
  // ß, ẞ
  [cp(107), cp(8490)],
  // k, K (Kelvin)
  [cp(229), cp(8491)],
  // å, Å (Angstrom)
  [cp(969), cp(8486)]
  // ω, Ω (Ohm)
]);
var LowerToTitleCaseMap = new Map([
  titleEntry(453),
  titleEntry(456),
  titleEntry(459),
  titleEntry(498),
  ...titleRange(8072, 8079),
  ...titleRange(8088, 8095),
  ...titleRange(8104, 8111),
  titleEntry(8124),
  titleEntry(8140),
  titleEntry(8188)
]);
var PosixClassesMap = /* @__PURE__ */ new Map([
  ["alnum", r3`[\p{Alpha}\p{Nd}]`],
  ["alpha", r3`\p{Alpha}`],
  ["ascii", r3`\p{ASCII}`],
  ["blank", r3`[\p{Zs}\t]`],
  ["cntrl", r3`\p{cntrl}`],
  ["digit", r3`\p{Nd}`],
  ["graph", r3`[\P{space}&&\P{cntrl}&&\P{Cn}&&\P{Cs}]`],
  ["lower", r3`\p{Lower}`],
  ["print", r3`[[\P{space}&&\P{cntrl}&&\P{Cn}&&\P{Cs}]\p{Zs}]`],
  ["punct", r3`[\p{P}\p{S}]`],
  // New value from Oniguruma 6.9.9
  ["space", r3`\p{space}`],
  ["upper", r3`\p{Upper}`],
  ["word", r3`[\p{Alpha}\p{M}\p{Nd}\p{Pc}]`],
  ["xdigit", r3`\p{AHex}`]
]);
function range(start, end) {
  const range2 = [];
  for (let i = start; i <= end; i++) {
    range2.push(i);
  }
  return range2;
}
function slug(name) {
  return name.replace(/[- _]+/g, "").toLowerCase();
}
function titleEntry(codePoint) {
  const char = cp(codePoint);
  return [char.toLowerCase(), char];
}
function titleRange(start, end) {
  return range(start, end).map((codePoint) => titleEntry(codePoint));
}
var charClassOpenPattern = r3`\[\^?`;
var sharedEscapesPattern = `${// Control char
"c.? | C(?:-.?)?"}|${// Unicode property; Onig considers `\p` an identity escape, but e.g. `\p{`, `\p{ ^L}`, and
// `\p{gc=L}` are invalid
r3`[pP]\{(?:\^?[-\x20_]*[A-Za-z][-\x20\w]*\})?`}|${// Hex encoded byte sequence; attempt match before other `\xNN` hex char
r3`x[89A-Fa-f]\p{AHex}(?:\\x[89A-Fa-f]\p{AHex})*`}|${// Hex char
r3`u(?:\p{AHex}{4})? | x\{[^\}]*\}? | x\p{AHex}{0,2}`}|${// Enclosed octal code point
r3`o\{[^\}]*\}?`}|${// Escaped number
r3`\d{1,3}`}`;
var quantifierRe = /[?*+][?+]?|\{(?:\d+(?:,\d*)?|,\d+)\}\??/;
var tokenRe = new RegExp(r3`
  \\ (?:
    ${sharedEscapesPattern}
    | [gk]<[^>]*>?
    | [gk]'[^']*'?
    | .
  )
  | \( (?:
    \? (?:
      [:=!>({]
      | <[=!]
      | <[^>]*>
      | '[^']*'
      | ~\|?
      | #(?:[^)\\]|\\.?)*
      | [^:)]*[:)]
    )?
    | \*
  )?
  | ${quantifierRe.source}
  | ${charClassOpenPattern}
  | .
`.replace(/\s+/g, ""), "gsu");
var charClassTokenRe = new RegExp(r3`
  \\ (?:
    ${sharedEscapesPattern}
    | .
  )
  | \[:(?:\^?\p{Alpha}+|\^):\]
  | ${charClassOpenPattern}
  | &&
  | .
`.replace(/\s+/g, ""), "gsu");
var defaultWordChar = r3`[\p{L}\p{M}\p{N}\p{Pc}]`;
var CharCodeEscapeMap = /* @__PURE__ */ new Map([
  [9, r3`\t`],
  // horizontal tab
  [10, r3`\n`],
  // line feed
  [11, r3`\v`],
  // vertical tab
  [12, r3`\f`],
  // form feed
  [13, r3`\r`],
  // carriage return
  [8232, r3`\u2028`],
  // line separator
  [8233, r3`\u2029`],
  // paragraph separator
  [65279, r3`\uFEFF`]
  // ZWNBSP/BOM
]);
var casedRe = new RegExp("^\\p{Cased}$", "u");

// node_modules/@shikijs/core/dist/index.mjs
function createOnigurumaEngine2(options) {
  warnDeprecated("import `createOnigurumaEngine` from `@shikijs/engine-oniguruma` or `shiki/engine/oniguruma` instead");
  return createOnigurumaEngine(options);
}
function resolveColorReplacements(theme, options) {
  const replacements = typeof theme === "string" ? {} : { ...theme.colorReplacements };
  const themeName = typeof theme === "string" ? theme : theme.name;
  for (const [key2, value] of Object.entries((options == null ? void 0 : options.colorReplacements) || {})) {
    if (typeof value === "string")
      replacements[key2] = value;
    else if (key2 === themeName)
      Object.assign(replacements, value);
  }
  return replacements;
}
function applyColorReplacements(color, replacements) {
  if (!color)
    return color;
  return (replacements == null ? void 0 : replacements[color == null ? void 0 : color.toLowerCase()]) || color;
}
function toArray(x) {
  return Array.isArray(x) ? x : [x];
}
async function normalizeGetter(p2) {
  return Promise.resolve(typeof p2 === "function" ? p2() : p2).then((r4) => r4.default || r4);
}
function isPlainLang(lang) {
  return !lang || ["plaintext", "txt", "text", "plain"].includes(lang);
}
function isSpecialLang(lang) {
  return lang === "ansi" || isPlainLang(lang);
}
function isNoneTheme(theme) {
  return theme === "none";
}
function isSpecialTheme(theme) {
  return isNoneTheme(theme);
}
function addClassToHast(node, className) {
  var _a3;
  if (!className)
    return node;
  node.properties || (node.properties = {});
  (_a3 = node.properties).class || (_a3.class = []);
  if (typeof node.properties.class === "string")
    node.properties.class = node.properties.class.split(/\s+/g);
  if (!Array.isArray(node.properties.class))
    node.properties.class = [];
  const targets = Array.isArray(className) ? className : className.split(/\s+/g);
  for (const c of targets) {
    if (c && !node.properties.class.includes(c))
      node.properties.class.push(c);
  }
  return node;
}
function splitLines(code, preserveEnding = false) {
  var _a3;
  const parts = code.split(/(\r?\n)/g);
  let index = 0;
  const lines = [];
  for (let i = 0; i < parts.length; i += 2) {
    const line = preserveEnding ? parts[i] + (parts[i + 1] || "") : parts[i];
    lines.push([line, index]);
    index += parts[i].length;
    index += ((_a3 = parts[i + 1]) == null ? void 0 : _a3.length) || 0;
  }
  return lines;
}
function createPositionConverter(code) {
  const lines = splitLines(code, true).map(([line]) => line);
  function indexToPos(index) {
    if (index === code.length) {
      return {
        line: lines.length - 1,
        character: lines[lines.length - 1].length
      };
    }
    let character = index;
    let line = 0;
    for (const lineText of lines) {
      if (character < lineText.length)
        break;
      character -= lineText.length;
      line++;
    }
    return { line, character };
  }
  function posToIndex(line, character) {
    let index = 0;
    for (let i = 0; i < line; i++)
      index += lines[i].length;
    index += character;
    return index;
  }
  return {
    lines,
    indexToPos,
    posToIndex
  };
}
function guessEmbeddedLanguages(code, _lang, highlighter) {
  const langs = /* @__PURE__ */ new Set();
  for (const match of code.matchAll(/lang=["']([\w-]+)["']/g)) {
    langs.add(match[1]);
  }
  for (const match of code.matchAll(/(?:```|~~~)([\w-]+)/g)) {
    langs.add(match[1]);
  }
  for (const match of code.matchAll(/\\begin\{([\w-]+)\}/g)) {
    langs.add(match[1]);
  }
  if (!highlighter)
    return Array.from(langs);
  const bundle = highlighter.getBundledLanguages();
  return Array.from(langs).filter((l) => l && bundle[l]);
}
function splitToken(token2, offsets) {
  let lastOffset = 0;
  const tokens = [];
  for (const offset of offsets) {
    if (offset > lastOffset) {
      tokens.push({
        ...token2,
        content: token2.content.slice(lastOffset, offset),
        offset: token2.offset + lastOffset
      });
    }
    lastOffset = offset;
  }
  if (lastOffset < token2.content.length) {
    tokens.push({
      ...token2,
      content: token2.content.slice(lastOffset),
      offset: token2.offset + lastOffset
    });
  }
  return tokens;
}
function splitTokens(tokens, breakpoints) {
  const sorted = Array.from(breakpoints instanceof Set ? breakpoints : new Set(breakpoints)).sort((a, b) => a - b);
  if (!sorted.length)
    return tokens;
  return tokens.map((line) => {
    return line.flatMap((token2) => {
      const breakpointsInToken = sorted.filter((i) => token2.offset < i && i < token2.offset + token2.content.length).map((i) => i - token2.offset).sort((a, b) => a - b);
      if (!breakpointsInToken.length)
        return token2;
      return splitToken(token2, breakpointsInToken);
    });
  });
}
function flatTokenVariants(merged, variantsOrder, cssVariablePrefix, defaultColor) {
  const token2 = {
    content: merged.content,
    explanation: merged.explanation,
    offset: merged.offset
  };
  const styles = variantsOrder.map((t) => getTokenStyleObject(merged.variants[t]));
  const styleKeys = new Set(styles.flatMap((t) => Object.keys(t)));
  const mergedStyles = {};
  styles.forEach((cur, idx) => {
    for (const key2 of styleKeys) {
      const value = cur[key2] || "inherit";
      if (idx === 0 && defaultColor) {
        mergedStyles[key2] = value;
      } else {
        const keyName = key2 === "color" ? "" : key2 === "background-color" ? "-bg" : `-${key2}`;
        const varKey = cssVariablePrefix + variantsOrder[idx] + (key2 === "color" ? "" : keyName);
        mergedStyles[varKey] = value;
      }
    }
  });
  token2.htmlStyle = mergedStyles;
  return token2;
}
function getTokenStyleObject(token2) {
  const styles = {};
  if (token2.color)
    styles.color = token2.color;
  if (token2.bgColor)
    styles["background-color"] = token2.bgColor;
  if (token2.fontStyle) {
    if (token2.fontStyle & FontStyle.Italic)
      styles["font-style"] = "italic";
    if (token2.fontStyle & FontStyle.Bold)
      styles["font-weight"] = "bold";
    if (token2.fontStyle & FontStyle.Underline)
      styles["text-decoration"] = "underline";
  }
  return styles;
}
function stringifyTokenStyle(token2) {
  if (typeof token2 === "string")
    return token2;
  return Object.entries(token2).map(([key2, value]) => `${key2}:${value}`).join(";");
}
var _grammarStateMap = /* @__PURE__ */ new WeakMap();
function setLastGrammarStateToMap(keys, state) {
  _grammarStateMap.set(keys, state);
}
function getLastGrammarStateFromMap(keys) {
  return _grammarStateMap.get(keys);
}
var GrammarState = class _GrammarState {
  constructor(...args) {
    /**
     * Theme to Stack mapping
     */
    __publicField(this, "_stacks", {});
    __publicField(this, "lang");
    if (args.length === 2) {
      const [stacksMap, lang] = args;
      this.lang = lang;
      this._stacks = stacksMap;
    } else {
      const [stack, lang, theme] = args;
      this.lang = lang;
      this._stacks = { [theme]: stack };
    }
  }
  get themes() {
    return Object.keys(this._stacks);
  }
  get theme() {
    return this.themes[0];
  }
  get _stack() {
    return this._stacks[this.theme];
  }
  /**
   * Static method to create a initial grammar state.
   */
  static initial(lang, themes) {
    return new _GrammarState(
      Object.fromEntries(toArray(themes).map((theme) => [theme, INITIAL])),
      lang
    );
  }
  /**
   * Get the internal stack object.
   * @internal
   */
  getInternalStack(theme = this.theme) {
    return this._stacks[theme];
  }
  /**
   * @deprecated use `getScopes` instead
   */
  get scopes() {
    warnDeprecated("GrammarState.scopes is deprecated, use GrammarState.getScopes() instead");
    return getScopes(this._stacks[this.theme]);
  }
  getScopes(theme = this.theme) {
    return getScopes(this._stacks[theme]);
  }
  toJSON() {
    return {
      lang: this.lang,
      theme: this.theme,
      themes: this.themes,
      scopes: this.getScopes()
    };
  }
};
function getScopes(stack) {
  const scopes = [];
  const visited = /* @__PURE__ */ new Set();
  function pushScope(stack2) {
    var _a3;
    if (visited.has(stack2))
      return;
    visited.add(stack2);
    const name = (_a3 = stack2 == null ? void 0 : stack2.nameScopesList) == null ? void 0 : _a3.scopeName;
    if (name)
      scopes.push(name);
    if (stack2.parent)
      pushScope(stack2.parent);
  }
  pushScope(stack);
  return scopes;
}
function getGrammarStack(state, theme) {
  if (!(state instanceof GrammarState))
    throw new ShikiError("Invalid grammar state");
  return state.getInternalStack(theme);
}
function transformerDecorations() {
  const map = /* @__PURE__ */ new WeakMap();
  function getContext(shiki) {
    if (!map.has(shiki.meta)) {
      let normalizePosition = function(p2) {
        if (typeof p2 === "number") {
          if (p2 < 0 || p2 > shiki.source.length)
            throw new ShikiError(`Invalid decoration offset: ${p2}. Code length: ${shiki.source.length}`);
          return {
            ...converter.indexToPos(p2),
            offset: p2
          };
        } else {
          const line = converter.lines[p2.line];
          if (line === void 0)
            throw new ShikiError(`Invalid decoration position ${JSON.stringify(p2)}. Lines length: ${converter.lines.length}`);
          if (p2.character < 0 || p2.character > line.length)
            throw new ShikiError(`Invalid decoration position ${JSON.stringify(p2)}. Line ${p2.line} length: ${line.length}`);
          return {
            ...p2,
            offset: converter.posToIndex(p2.line, p2.character)
          };
        }
      };
      const converter = createPositionConverter(shiki.source);
      const decorations2 = (shiki.options.decorations || []).map((d) => ({
        ...d,
        start: normalizePosition(d.start),
        end: normalizePosition(d.end)
      }));
      verifyIntersections(decorations2);
      map.set(shiki.meta, {
        decorations: decorations2,
        converter,
        source: shiki.source
      });
    }
    return map.get(shiki.meta);
  }
  return {
    name: "shiki:decorations",
    tokens(tokens) {
      var _a3;
      if (!((_a3 = this.options.decorations) == null ? void 0 : _a3.length))
        return;
      const ctx = getContext(this);
      const breakpoints = ctx.decorations.flatMap((d) => [d.start.offset, d.end.offset]);
      const splitted = splitTokens(tokens, breakpoints);
      return splitted;
    },
    code(codeEl) {
      var _a3;
      if (!((_a3 = this.options.decorations) == null ? void 0 : _a3.length))
        return;
      const ctx = getContext(this);
      const lines = Array.from(codeEl.children).filter((i) => i.type === "element" && i.tagName === "span");
      if (lines.length !== ctx.converter.lines.length)
        throw new ShikiError(`Number of lines in code element (${lines.length}) does not match the number of lines in the source (${ctx.converter.lines.length}). Failed to apply decorations.`);
      function applyLineSection(line, start, end, decoration) {
        const lineEl = lines[line];
        let text2 = "";
        let startIndex = -1;
        let endIndex = -1;
        if (start === 0)
          startIndex = 0;
        if (end === 0)
          endIndex = 0;
        if (end === Number.POSITIVE_INFINITY)
          endIndex = lineEl.children.length;
        if (startIndex === -1 || endIndex === -1) {
          for (let i = 0; i < lineEl.children.length; i++) {
            text2 += stringify3(lineEl.children[i]);
            if (startIndex === -1 && text2.length === start)
              startIndex = i + 1;
            if (endIndex === -1 && text2.length === end)
              endIndex = i + 1;
          }
        }
        if (startIndex === -1)
          throw new ShikiError(`Failed to find start index for decoration ${JSON.stringify(decoration.start)}`);
        if (endIndex === -1)
          throw new ShikiError(`Failed to find end index for decoration ${JSON.stringify(decoration.end)}`);
        const children = lineEl.children.slice(startIndex, endIndex);
        if (!decoration.alwaysWrap && children.length === lineEl.children.length) {
          applyDecoration(lineEl, decoration, "line");
        } else if (!decoration.alwaysWrap && children.length === 1 && children[0].type === "element") {
          applyDecoration(children[0], decoration, "token");
        } else {
          const wrapper = {
            type: "element",
            tagName: "span",
            properties: {},
            children
          };
          applyDecoration(wrapper, decoration, "wrapper");
          lineEl.children.splice(startIndex, children.length, wrapper);
        }
      }
      function applyLine(line, decoration) {
        lines[line] = applyDecoration(lines[line], decoration, "line");
      }
      function applyDecoration(el, decoration, type) {
        var _a4;
        const properties = decoration.properties || {};
        const transform = decoration.transform || ((i) => i);
        el.tagName = decoration.tagName || "span";
        el.properties = {
          ...el.properties,
          ...properties,
          class: el.properties.class
        };
        if ((_a4 = decoration.properties) == null ? void 0 : _a4.class)
          addClassToHast(el, decoration.properties.class);
        el = transform(el, type) || el;
        return el;
      }
      const lineApplies = [];
      const sorted = ctx.decorations.sort((a, b) => b.start.offset - a.start.offset || a.end.offset - b.end.offset);
      for (const decoration of sorted) {
        const { start, end } = decoration;
        if (start.line === end.line) {
          applyLineSection(start.line, start.character, end.character, decoration);
        } else if (start.line < end.line) {
          applyLineSection(start.line, start.character, Number.POSITIVE_INFINITY, decoration);
          for (let i = start.line + 1; i < end.line; i++)
            lineApplies.unshift(() => applyLine(i, decoration));
          applyLineSection(end.line, 0, end.character, decoration);
        }
      }
      lineApplies.forEach((i) => i());
    }
  };
}
function verifyIntersections(items) {
  for (let i = 0; i < items.length; i++) {
    const foo = items[i];
    if (foo.start.offset > foo.end.offset)
      throw new ShikiError(`Invalid decoration range: ${JSON.stringify(foo.start)} - ${JSON.stringify(foo.end)}`);
    for (let j = i + 1; j < items.length; j++) {
      const bar = items[j];
      const isFooHasBarStart = foo.start.offset <= bar.start.offset && bar.start.offset < foo.end.offset;
      const isFooHasBarEnd = foo.start.offset < bar.end.offset && bar.end.offset <= foo.end.offset;
      const isBarHasFooStart = bar.start.offset <= foo.start.offset && foo.start.offset < bar.end.offset;
      const isBarHasFooEnd = bar.start.offset < foo.end.offset && foo.end.offset <= bar.end.offset;
      if (isFooHasBarStart || isFooHasBarEnd || isBarHasFooStart || isBarHasFooEnd) {
        if (isFooHasBarStart && isFooHasBarEnd)
          continue;
        if (isBarHasFooStart && isBarHasFooEnd)
          continue;
        throw new ShikiError(`Decorations ${JSON.stringify(foo.start)} and ${JSON.stringify(bar.start)} intersect.`);
      }
    }
  }
}
function stringify3(el) {
  if (el.type === "text")
    return el.value;
  if (el.type === "element")
    return el.children.map(stringify3).join("");
  return "";
}
var builtInTransformers = [
  transformerDecorations()
];
function getTransformers(options) {
  return [
    ...options.transformers || [],
    ...builtInTransformers
  ];
}
var namedColors = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite"
];
var decorations = {
  1: "bold",
  2: "dim",
  3: "italic",
  4: "underline",
  7: "reverse",
  8: "hidden",
  9: "strikethrough"
};
function findSequence(value, position) {
  const nextEscape = value.indexOf("\x1B", position);
  if (nextEscape !== -1) {
    if (value[nextEscape + 1] === "[") {
      const nextClose = value.indexOf("m", nextEscape);
      if (nextClose !== -1) {
        return {
          sequence: value.substring(nextEscape + 2, nextClose).split(";"),
          startPosition: nextEscape,
          position: nextClose + 1
        };
      }
    }
  }
  return {
    position: value.length
  };
}
function parseColor(sequence) {
  const colorMode = sequence.shift();
  if (colorMode === "2") {
    const rgb = sequence.splice(0, 3).map((x) => Number.parseInt(x));
    if (rgb.length !== 3 || rgb.some((x) => Number.isNaN(x)))
      return;
    return {
      type: "rgb",
      rgb
    };
  } else if (colorMode === "5") {
    const index = sequence.shift();
    if (index) {
      return { type: "table", index: Number(index) };
    }
  }
}
function parseSequence(sequence) {
  const commands = [];
  while (sequence.length > 0) {
    const code = sequence.shift();
    if (!code)
      continue;
    const codeInt = Number.parseInt(code);
    if (Number.isNaN(codeInt))
      continue;
    if (codeInt === 0) {
      commands.push({ type: "resetAll" });
    } else if (codeInt <= 9) {
      const decoration = decorations[codeInt];
      if (decoration) {
        commands.push({
          type: "setDecoration",
          value: decorations[codeInt]
        });
      }
    } else if (codeInt <= 29) {
      const decoration = decorations[codeInt - 20];
      if (decoration) {
        commands.push({
          type: "resetDecoration",
          value: decoration
        });
        if (decoration === "dim") {
          commands.push({
            type: "resetDecoration",
            value: "bold"
          });
        }
      }
    } else if (codeInt <= 37) {
      commands.push({
        type: "setForegroundColor",
        value: { type: "named", name: namedColors[codeInt - 30] }
      });
    } else if (codeInt === 38) {
      const color = parseColor(sequence);
      if (color) {
        commands.push({
          type: "setForegroundColor",
          value: color
        });
      }
    } else if (codeInt === 39) {
      commands.push({
        type: "resetForegroundColor"
      });
    } else if (codeInt <= 47) {
      commands.push({
        type: "setBackgroundColor",
        value: { type: "named", name: namedColors[codeInt - 40] }
      });
    } else if (codeInt === 48) {
      const color = parseColor(sequence);
      if (color) {
        commands.push({
          type: "setBackgroundColor",
          value: color
        });
      }
    } else if (codeInt === 49) {
      commands.push({
        type: "resetBackgroundColor"
      });
    } else if (codeInt === 53) {
      commands.push({
        type: "setDecoration",
        value: "overline"
      });
    } else if (codeInt === 55) {
      commands.push({
        type: "resetDecoration",
        value: "overline"
      });
    } else if (codeInt >= 90 && codeInt <= 97) {
      commands.push({
        type: "setForegroundColor",
        value: { type: "named", name: namedColors[codeInt - 90 + 8] }
      });
    } else if (codeInt >= 100 && codeInt <= 107) {
      commands.push({
        type: "setBackgroundColor",
        value: { type: "named", name: namedColors[codeInt - 100 + 8] }
      });
    }
  }
  return commands;
}
function createAnsiSequenceParser() {
  let foreground = null;
  let background = null;
  let decorations2 = /* @__PURE__ */ new Set();
  return {
    parse(value) {
      const tokens = [];
      let position = 0;
      do {
        const findResult = findSequence(value, position);
        const text2 = findResult.sequence ? value.substring(position, findResult.startPosition) : value.substring(position);
        if (text2.length > 0) {
          tokens.push({
            value: text2,
            foreground,
            background,
            decorations: new Set(decorations2)
          });
        }
        if (findResult.sequence) {
          const commands = parseSequence(findResult.sequence);
          for (const styleToken of commands) {
            if (styleToken.type === "resetAll") {
              foreground = null;
              background = null;
              decorations2.clear();
            } else if (styleToken.type === "resetForegroundColor") {
              foreground = null;
            } else if (styleToken.type === "resetBackgroundColor") {
              background = null;
            } else if (styleToken.type === "resetDecoration") {
              decorations2.delete(styleToken.value);
            }
          }
          for (const styleToken of commands) {
            if (styleToken.type === "setForegroundColor") {
              foreground = styleToken.value;
            } else if (styleToken.type === "setBackgroundColor") {
              background = styleToken.value;
            } else if (styleToken.type === "setDecoration") {
              decorations2.add(styleToken.value);
            }
          }
        }
        position = findResult.position;
      } while (position < value.length);
      return tokens;
    }
  };
}
var defaultNamedColorsMap = {
  black: "#000000",
  red: "#bb0000",
  green: "#00bb00",
  yellow: "#bbbb00",
  blue: "#0000bb",
  magenta: "#ff00ff",
  cyan: "#00bbbb",
  white: "#eeeeee",
  brightBlack: "#555555",
  brightRed: "#ff5555",
  brightGreen: "#00ff00",
  brightYellow: "#ffff55",
  brightBlue: "#5555ff",
  brightMagenta: "#ff55ff",
  brightCyan: "#55ffff",
  brightWhite: "#ffffff"
};
function createColorPalette(namedColorsMap = defaultNamedColorsMap) {
  function namedColor(name) {
    return namedColorsMap[name];
  }
  function rgbColor(rgb) {
    return `#${rgb.map((x) => Math.max(0, Math.min(x, 255)).toString(16).padStart(2, "0")).join("")}`;
  }
  let colorTable;
  function getColorTable() {
    if (colorTable) {
      return colorTable;
    }
    colorTable = [];
    for (let i = 0; i < namedColors.length; i++) {
      colorTable.push(namedColor(namedColors[i]));
    }
    let levels = [0, 95, 135, 175, 215, 255];
    for (let r4 = 0; r4 < 6; r4++) {
      for (let g = 0; g < 6; g++) {
        for (let b = 0; b < 6; b++) {
          colorTable.push(rgbColor([levels[r4], levels[g], levels[b]]));
        }
      }
    }
    let level = 8;
    for (let i = 0; i < 24; i++, level += 10) {
      colorTable.push(rgbColor([level, level, level]));
    }
    return colorTable;
  }
  function tableColor(index) {
    return getColorTable()[index];
  }
  function value(color) {
    switch (color.type) {
      case "named":
        return namedColor(color.name);
      case "rgb":
        return rgbColor(color.rgb);
      case "table":
        return tableColor(color.index);
    }
  }
  return {
    value
  };
}
function tokenizeAnsiWithTheme(theme, fileContents, options) {
  const colorReplacements = resolveColorReplacements(theme, options);
  const lines = splitLines(fileContents);
  const colorPalette = createColorPalette(
    Object.fromEntries(
      namedColors.map((name) => {
        var _a3;
        return [
          name,
          (_a3 = theme.colors) == null ? void 0 : _a3[`terminal.ansi${name[0].toUpperCase()}${name.substring(1)}`]
        ];
      })
    )
  );
  const parser = createAnsiSequenceParser();
  return lines.map(
    (line) => parser.parse(line[0]).map((token2) => {
      let color;
      let bgColor;
      if (token2.decorations.has("reverse")) {
        color = token2.background ? colorPalette.value(token2.background) : theme.bg;
        bgColor = token2.foreground ? colorPalette.value(token2.foreground) : theme.fg;
      } else {
        color = token2.foreground ? colorPalette.value(token2.foreground) : theme.fg;
        bgColor = token2.background ? colorPalette.value(token2.background) : void 0;
      }
      color = applyColorReplacements(color, colorReplacements);
      bgColor = applyColorReplacements(bgColor, colorReplacements);
      if (token2.decorations.has("dim"))
        color = dimColor(color);
      let fontStyle = FontStyle.None;
      if (token2.decorations.has("bold"))
        fontStyle |= FontStyle.Bold;
      if (token2.decorations.has("italic"))
        fontStyle |= FontStyle.Italic;
      if (token2.decorations.has("underline"))
        fontStyle |= FontStyle.Underline;
      return {
        content: token2.value,
        offset: line[1],
        // TODO: more accurate offset? might need to fork ansi-sequence-parser
        color,
        bgColor,
        fontStyle
      };
    })
  );
}
function dimColor(color) {
  const hexMatch = color.match(/#([0-9a-f]{3})([0-9a-f]{3})?([0-9a-f]{2})?/);
  if (hexMatch) {
    if (hexMatch[3]) {
      const alpha = Math.round(Number.parseInt(hexMatch[3], 16) / 2).toString(16).padStart(2, "0");
      return `#${hexMatch[1]}${hexMatch[2]}${alpha}`;
    } else if (hexMatch[2]) {
      return `#${hexMatch[1]}${hexMatch[2]}80`;
    } else {
      return `#${Array.from(hexMatch[1]).map((x) => `${x}${x}`).join("")}80`;
    }
  }
  const cssVarMatch = color.match(/var\((--[\w-]+-ansi-[\w-]+)\)/);
  if (cssVarMatch)
    return `var(${cssVarMatch[1]}-dim)`;
  return color;
}
function codeToTokensBase(internal, code, options = {}) {
  const {
    lang = "text",
    theme: themeName = internal.getLoadedThemes()[0]
  } = options;
  if (isPlainLang(lang) || isNoneTheme(themeName))
    return splitLines(code).map((line) => [{ content: line[0], offset: line[1] }]);
  const { theme, colorMap } = internal.setTheme(themeName);
  if (lang === "ansi")
    return tokenizeAnsiWithTheme(theme, code, options);
  const _grammar = internal.getLanguage(lang);
  if (options.grammarState) {
    if (options.grammarState.lang !== _grammar.name) {
      throw new ShikiError(`Grammar state language "${options.grammarState.lang}" does not match highlight language "${_grammar.name}"`);
    }
    if (!options.grammarState.themes.includes(theme.name)) {
      throw new ShikiError(`Grammar state themes "${options.grammarState.themes}" do not contain highlight theme "${theme.name}"`);
    }
  }
  return tokenizeWithTheme(code, _grammar, theme, colorMap, options);
}
function getLastGrammarState(...args) {
  if (args.length === 2) {
    return getLastGrammarStateFromMap(args[1]);
  }
  const [internal, code, options = {}] = args;
  const {
    lang = "text",
    theme: themeName = internal.getLoadedThemes()[0]
  } = options;
  if (isPlainLang(lang) || isNoneTheme(themeName))
    throw new ShikiError("Plain language does not have grammar state");
  if (lang === "ansi")
    throw new ShikiError("ANSI language does not have grammar state");
  const { theme, colorMap } = internal.setTheme(themeName);
  const _grammar = internal.getLanguage(lang);
  return new GrammarState(
    _tokenizeWithTheme(code, _grammar, theme, colorMap, options).stateStack,
    _grammar.name,
    theme.name
  );
}
function tokenizeWithTheme(code, grammar, theme, colorMap, options) {
  const result = _tokenizeWithTheme(code, grammar, theme, colorMap, options);
  const grammarState = new GrammarState(
    _tokenizeWithTheme(code, grammar, theme, colorMap, options).stateStack,
    grammar.name,
    theme.name
  );
  setLastGrammarStateToMap(result.tokens, grammarState);
  return result.tokens;
}
function _tokenizeWithTheme(code, grammar, theme, colorMap, options) {
  const colorReplacements = resolveColorReplacements(theme, options);
  const {
    tokenizeMaxLineLength = 0,
    tokenizeTimeLimit = 500
  } = options;
  const lines = splitLines(code);
  let stateStack = options.grammarState ? getGrammarStack(options.grammarState, theme.name) ?? INITIAL : options.grammarContextCode != null ? _tokenizeWithTheme(
    options.grammarContextCode,
    grammar,
    theme,
    colorMap,
    {
      ...options,
      grammarState: void 0,
      grammarContextCode: void 0
    }
  ).stateStack : INITIAL;
  let actual = [];
  const final = [];
  for (let i = 0, len = lines.length; i < len; i++) {
    const [line, lineOffset] = lines[i];
    if (line === "") {
      actual = [];
      final.push([]);
      continue;
    }
    if (tokenizeMaxLineLength > 0 && line.length >= tokenizeMaxLineLength) {
      actual = [];
      final.push([{
        content: line,
        offset: lineOffset,
        color: "",
        fontStyle: 0
      }]);
      continue;
    }
    let resultWithScopes;
    let tokensWithScopes;
    let tokensWithScopesIndex;
    if (options.includeExplanation) {
      resultWithScopes = grammar.tokenizeLine(line, stateStack, tokenizeTimeLimit);
      tokensWithScopes = resultWithScopes.tokens;
      tokensWithScopesIndex = 0;
    }
    const result = grammar.tokenizeLine2(line, stateStack, tokenizeTimeLimit);
    const tokensLength = result.tokens.length / 2;
    for (let j = 0; j < tokensLength; j++) {
      const startIndex = result.tokens[2 * j];
      const nextStartIndex = j + 1 < tokensLength ? result.tokens[2 * j + 2] : line.length;
      if (startIndex === nextStartIndex)
        continue;
      const metadata = result.tokens[2 * j + 1];
      const color = applyColorReplacements(
        colorMap[EncodedTokenMetadata.getForeground(metadata)],
        colorReplacements
      );
      const fontStyle = EncodedTokenMetadata.getFontStyle(metadata);
      const token2 = {
        content: line.substring(startIndex, nextStartIndex),
        offset: lineOffset + startIndex,
        color,
        fontStyle
      };
      if (options.includeExplanation) {
        const themeSettingsSelectors = [];
        if (options.includeExplanation !== "scopeName") {
          for (const setting of theme.settings) {
            let selectors;
            switch (typeof setting.scope) {
              case "string":
                selectors = setting.scope.split(/,/).map((scope) => scope.trim());
                break;
              case "object":
                selectors = setting.scope;
                break;
              default:
                continue;
            }
            themeSettingsSelectors.push({
              settings: setting,
              selectors: selectors.map((selector) => selector.split(/ /))
            });
          }
        }
        token2.explanation = [];
        let offset = 0;
        while (startIndex + offset < nextStartIndex) {
          const tokenWithScopes = tokensWithScopes[tokensWithScopesIndex];
          const tokenWithScopesText = line.substring(
            tokenWithScopes.startIndex,
            tokenWithScopes.endIndex
          );
          offset += tokenWithScopesText.length;
          token2.explanation.push({
            content: tokenWithScopesText,
            scopes: options.includeExplanation === "scopeName" ? explainThemeScopesNameOnly(
              tokenWithScopes.scopes
            ) : explainThemeScopesFull(
              themeSettingsSelectors,
              tokenWithScopes.scopes
            )
          });
          tokensWithScopesIndex += 1;
        }
      }
      actual.push(token2);
    }
    final.push(actual);
    actual = [];
    stateStack = result.ruleStack;
  }
  return {
    tokens: final,
    stateStack
  };
}
function explainThemeScopesNameOnly(scopes) {
  return scopes.map((scope) => ({ scopeName: scope }));
}
function explainThemeScopesFull(themeSelectors, scopes) {
  const result = [];
  for (let i = 0, len = scopes.length; i < len; i++) {
    const scope = scopes[i];
    result[i] = {
      scopeName: scope,
      themeMatches: explainThemeScope(themeSelectors, scope, scopes.slice(0, i))
    };
  }
  return result;
}
function matchesOne(selector, scope) {
  return selector === scope || scope.substring(0, selector.length) === selector && scope[selector.length] === ".";
}
function matches(selectors, scope, parentScopes) {
  if (!matchesOne(selectors[selectors.length - 1], scope))
    return false;
  let selectorParentIndex = selectors.length - 2;
  let parentIndex = parentScopes.length - 1;
  while (selectorParentIndex >= 0 && parentIndex >= 0) {
    if (matchesOne(selectors[selectorParentIndex], parentScopes[parentIndex]))
      selectorParentIndex -= 1;
    parentIndex -= 1;
  }
  if (selectorParentIndex === -1)
    return true;
  return false;
}
function explainThemeScope(themeSettingsSelectors, scope, parentScopes) {
  const result = [];
  for (const { selectors, settings } of themeSettingsSelectors) {
    for (const selectorPieces of selectors) {
      if (matches(selectorPieces, scope, parentScopes)) {
        result.push(settings);
        break;
      }
    }
  }
  return result;
}
function codeToTokensWithThemes(internal, code, options) {
  const themes = Object.entries(options.themes).filter((i) => i[1]).map((i) => ({ color: i[0], theme: i[1] }));
  const themedTokens = themes.map((t) => {
    const tokens2 = codeToTokensBase(internal, code, {
      ...options,
      theme: t.theme
    });
    const state = getLastGrammarStateFromMap(tokens2);
    const theme = typeof t.theme === "string" ? t.theme : t.theme.name;
    return {
      tokens: tokens2,
      state,
      theme
    };
  });
  const tokens = syncThemesTokenization(
    ...themedTokens.map((i) => i.tokens)
  );
  const mergedTokens = tokens[0].map(
    (line, lineIdx) => line.map((_token, tokenIdx) => {
      const mergedToken = {
        content: _token.content,
        variants: {},
        offset: _token.offset
      };
      if ("includeExplanation" in options && options.includeExplanation) {
        mergedToken.explanation = _token.explanation;
      }
      tokens.forEach((t, themeIdx) => {
        const {
          content: _,
          explanation: __,
          offset: ___,
          ...styles
        } = t[lineIdx][tokenIdx];
        mergedToken.variants[themes[themeIdx].color] = styles;
      });
      return mergedToken;
    })
  );
  const mergedGrammarState = themedTokens[0].state ? new GrammarState(
    Object.fromEntries(themedTokens.map((s) => {
      var _a3;
      return [s.theme, (_a3 = s.state) == null ? void 0 : _a3.getInternalStack(s.theme)];
    })),
    themedTokens[0].state.lang
  ) : void 0;
  if (mergedGrammarState)
    setLastGrammarStateToMap(mergedTokens, mergedGrammarState);
  return mergedTokens;
}
function syncThemesTokenization(...themes) {
  const outThemes = themes.map(() => []);
  const count = themes.length;
  for (let i = 0; i < themes[0].length; i++) {
    const lines = themes.map((t) => t[i]);
    const outLines = outThemes.map(() => []);
    outThemes.forEach((t, i2) => t.push(outLines[i2]));
    const indexes = lines.map(() => 0);
    const current = lines.map((l) => l[0]);
    while (current.every((t) => t)) {
      const minLength = Math.min(...current.map((t) => t.content.length));
      for (let n = 0; n < count; n++) {
        const token2 = current[n];
        if (token2.content.length === minLength) {
          outLines[n].push(token2);
          indexes[n] += 1;
          current[n] = lines[n][indexes[n]];
        } else {
          outLines[n].push({
            ...token2,
            content: token2.content.slice(0, minLength)
          });
          current[n] = {
            ...token2,
            content: token2.content.slice(minLength),
            offset: token2.offset + minLength
          };
        }
      }
    }
  }
  return outThemes;
}
function codeToTokens(internal, code, options) {
  let bg;
  let fg;
  let tokens;
  let themeName;
  let rootStyle;
  let grammarState;
  if ("themes" in options) {
    const {
      defaultColor = "light",
      cssVariablePrefix = "--shiki-"
    } = options;
    const themes = Object.entries(options.themes).filter((i) => i[1]).map((i) => ({ color: i[0], theme: i[1] })).sort((a, b) => a.color === defaultColor ? -1 : b.color === defaultColor ? 1 : 0);
    if (themes.length === 0)
      throw new ShikiError("`themes` option must not be empty");
    const themeTokens = codeToTokensWithThemes(
      internal,
      code,
      options
    );
    grammarState = getLastGrammarStateFromMap(themeTokens);
    if (defaultColor && !themes.find((t) => t.color === defaultColor))
      throw new ShikiError(`\`themes\` option must contain the defaultColor key \`${defaultColor}\``);
    const themeRegs = themes.map((t) => internal.getTheme(t.theme));
    const themesOrder = themes.map((t) => t.color);
    tokens = themeTokens.map((line) => line.map((token2) => flatTokenVariants(token2, themesOrder, cssVariablePrefix, defaultColor)));
    if (grammarState)
      setLastGrammarStateToMap(tokens, grammarState);
    const themeColorReplacements = themes.map((t) => resolveColorReplacements(t.theme, options));
    fg = themes.map((t, idx) => (idx === 0 && defaultColor ? "" : `${cssVariablePrefix + t.color}:`) + (applyColorReplacements(themeRegs[idx].fg, themeColorReplacements[idx]) || "inherit")).join(";");
    bg = themes.map((t, idx) => (idx === 0 && defaultColor ? "" : `${cssVariablePrefix + t.color}-bg:`) + (applyColorReplacements(themeRegs[idx].bg, themeColorReplacements[idx]) || "inherit")).join(";");
    themeName = `shiki-themes ${themeRegs.map((t) => t.name).join(" ")}`;
    rootStyle = defaultColor ? void 0 : [fg, bg].join(";");
  } else if ("theme" in options) {
    const colorReplacements = resolveColorReplacements(options.theme, options);
    tokens = codeToTokensBase(
      internal,
      code,
      options
    );
    const _theme = internal.getTheme(options.theme);
    bg = applyColorReplacements(_theme.bg, colorReplacements);
    fg = applyColorReplacements(_theme.fg, colorReplacements);
    themeName = _theme.name;
    grammarState = getLastGrammarStateFromMap(tokens);
  } else {
    throw new ShikiError("Invalid options, either `theme` or `themes` must be provided");
  }
  return {
    tokens,
    fg,
    bg,
    themeName,
    rootStyle,
    grammarState
  };
}
function codeToHast(internal, code, options, transformerContext = {
  meta: {},
  options,
  codeToHast: (_code, _options) => codeToHast(internal, _code, _options),
  codeToTokens: (_code, _options) => codeToTokens(internal, _code, _options)
}) {
  var _a3, _b;
  let input = code;
  for (const transformer of getTransformers(options))
    input = ((_a3 = transformer.preprocess) == null ? void 0 : _a3.call(transformerContext, input, options)) || input;
  let {
    tokens,
    fg,
    bg,
    themeName,
    rootStyle,
    grammarState
  } = codeToTokens(internal, input, options);
  const {
    mergeWhitespaces = true
  } = options;
  if (mergeWhitespaces === true)
    tokens = mergeWhitespaceTokens(tokens);
  else if (mergeWhitespaces === "never")
    tokens = splitWhitespaceTokens(tokens);
  const contextSource = {
    ...transformerContext,
    get source() {
      return input;
    }
  };
  for (const transformer of getTransformers(options))
    tokens = ((_b = transformer.tokens) == null ? void 0 : _b.call(contextSource, tokens)) || tokens;
  return tokensToHast(
    tokens,
    {
      ...options,
      fg,
      bg,
      themeName,
      rootStyle
    },
    contextSource,
    grammarState
  );
}
function tokensToHast(tokens, options, transformerContext, grammarState = getLastGrammarStateFromMap(tokens)) {
  var _a3, _b, _c;
  const transformers = getTransformers(options);
  const lines = [];
  const root2 = {
    type: "root",
    children: []
  };
  const {
    structure = "classic",
    tabindex = "0"
  } = options;
  let preNode = {
    type: "element",
    tagName: "pre",
    properties: {
      class: `shiki ${options.themeName || ""}`,
      style: options.rootStyle || `background-color:${options.bg};color:${options.fg}`,
      ...tabindex !== false && tabindex != null ? {
        tabindex: tabindex.toString()
      } : {},
      ...Object.fromEntries(
        Array.from(
          Object.entries(options.meta || {})
        ).filter(([key2]) => !key2.startsWith("_"))
      )
    },
    children: []
  };
  let codeNode = {
    type: "element",
    tagName: "code",
    properties: {},
    children: lines
  };
  const lineNodes = [];
  const context = {
    ...transformerContext,
    structure,
    addClassToHast,
    get source() {
      return transformerContext.source;
    },
    get tokens() {
      return tokens;
    },
    get options() {
      return options;
    },
    get root() {
      return root2;
    },
    get pre() {
      return preNode;
    },
    get code() {
      return codeNode;
    },
    get lines() {
      return lineNodes;
    }
  };
  tokens.forEach((line, idx) => {
    var _a4, _b2;
    if (idx) {
      if (structure === "inline")
        root2.children.push({ type: "element", tagName: "br", properties: {}, children: [] });
      else if (structure === "classic")
        lines.push({ type: "text", value: "\n" });
    }
    let lineNode = {
      type: "element",
      tagName: "span",
      properties: { class: "line" },
      children: []
    };
    let col = 0;
    for (const token2 of line) {
      let tokenNode = {
        type: "element",
        tagName: "span",
        properties: {
          ...token2.htmlAttrs
        },
        children: [{ type: "text", value: token2.content }]
      };
      if (typeof token2.htmlStyle === "string")
        warnDeprecated("`htmlStyle` as a string is deprecated. Use an object instead.");
      const style = stringifyTokenStyle(token2.htmlStyle || getTokenStyleObject(token2));
      if (style)
        tokenNode.properties.style = style;
      for (const transformer of transformers)
        tokenNode = ((_a4 = transformer == null ? void 0 : transformer.span) == null ? void 0 : _a4.call(context, tokenNode, idx + 1, col, lineNode, token2)) || tokenNode;
      if (structure === "inline")
        root2.children.push(tokenNode);
      else if (structure === "classic")
        lineNode.children.push(tokenNode);
      col += token2.content.length;
    }
    if (structure === "classic") {
      for (const transformer of transformers)
        lineNode = ((_b2 = transformer == null ? void 0 : transformer.line) == null ? void 0 : _b2.call(context, lineNode, idx + 1)) || lineNode;
      lineNodes.push(lineNode);
      lines.push(lineNode);
    }
  });
  if (structure === "classic") {
    for (const transformer of transformers)
      codeNode = ((_a3 = transformer == null ? void 0 : transformer.code) == null ? void 0 : _a3.call(context, codeNode)) || codeNode;
    preNode.children.push(codeNode);
    for (const transformer of transformers)
      preNode = ((_b = transformer == null ? void 0 : transformer.pre) == null ? void 0 : _b.call(context, preNode)) || preNode;
    root2.children.push(preNode);
  }
  let result = root2;
  for (const transformer of transformers)
    result = ((_c = transformer == null ? void 0 : transformer.root) == null ? void 0 : _c.call(context, result)) || result;
  if (grammarState)
    setLastGrammarStateToMap(result, grammarState);
  return result;
}
function mergeWhitespaceTokens(tokens) {
  return tokens.map((line) => {
    const newLine = [];
    let carryOnContent = "";
    let firstOffset = 0;
    line.forEach((token2, idx) => {
      const isUnderline = token2.fontStyle && token2.fontStyle & FontStyle.Underline;
      const couldMerge = !isUnderline;
      if (couldMerge && token2.content.match(/^\s+$/) && line[idx + 1]) {
        if (!firstOffset)
          firstOffset = token2.offset;
        carryOnContent += token2.content;
      } else {
        if (carryOnContent) {
          if (couldMerge) {
            newLine.push({
              ...token2,
              offset: firstOffset,
              content: carryOnContent + token2.content
            });
          } else {
            newLine.push(
              {
                content: carryOnContent,
                offset: firstOffset
              },
              token2
            );
          }
          firstOffset = 0;
          carryOnContent = "";
        } else {
          newLine.push(token2);
        }
      }
    });
    return newLine;
  });
}
function splitWhitespaceTokens(tokens) {
  return tokens.map((line) => {
    return line.flatMap((token2) => {
      if (token2.content.match(/^\s+$/))
        return token2;
      const match = token2.content.match(/^(\s*)(.*?)(\s*)$/);
      if (!match)
        return token2;
      const [, leading, content, trailing] = match;
      if (!leading && !trailing)
        return token2;
      const expanded = [{
        ...token2,
        offset: token2.offset + leading.length,
        content
      }];
      if (leading) {
        expanded.unshift({
          content: leading,
          offset: token2.offset
        });
      }
      if (trailing) {
        expanded.push({
          content: trailing,
          offset: token2.offset + leading.length + content.length
        });
      }
      return expanded;
    });
  });
}
function codeToHtml(internal, code, options) {
  var _a3;
  const context = {
    meta: {},
    options,
    codeToHast: (_code, _options) => codeToHast(internal, _code, _options),
    codeToTokens: (_code, _options) => codeToTokens(internal, _code, _options)
  };
  let result = toHtml(codeToHast(internal, code, options, context));
  for (const transformer of getTransformers(options))
    result = ((_a3 = transformer.postprocess) == null ? void 0 : _a3.call(context, result, options)) || result;
  return result;
}
var VSCODE_FALLBACK_EDITOR_FG = { light: "#333333", dark: "#bbbbbb" };
var VSCODE_FALLBACK_EDITOR_BG = { light: "#fffffe", dark: "#1e1e1e" };
var RESOLVED_KEY = "__shiki_resolved";
function normalizeTheme(rawTheme) {
  var _a3, _b, _c, _d, _e2;
  if (rawTheme == null ? void 0 : rawTheme[RESOLVED_KEY])
    return rawTheme;
  const theme = {
    ...rawTheme
  };
  if (theme.tokenColors && !theme.settings) {
    theme.settings = theme.tokenColors;
    delete theme.tokenColors;
  }
  theme.type || (theme.type = "dark");
  theme.colorReplacements = { ...theme.colorReplacements };
  theme.settings || (theme.settings = []);
  let { bg, fg } = theme;
  if (!bg || !fg) {
    const globalSetting = theme.settings ? theme.settings.find((s) => !s.name && !s.scope) : void 0;
    if ((_a3 = globalSetting == null ? void 0 : globalSetting.settings) == null ? void 0 : _a3.foreground)
      fg = globalSetting.settings.foreground;
    if ((_b = globalSetting == null ? void 0 : globalSetting.settings) == null ? void 0 : _b.background)
      bg = globalSetting.settings.background;
    if (!fg && ((_c = theme == null ? void 0 : theme.colors) == null ? void 0 : _c["editor.foreground"]))
      fg = theme.colors["editor.foreground"];
    if (!bg && ((_d = theme == null ? void 0 : theme.colors) == null ? void 0 : _d["editor.background"]))
      bg = theme.colors["editor.background"];
    if (!fg)
      fg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_FG.light : VSCODE_FALLBACK_EDITOR_FG.dark;
    if (!bg)
      bg = theme.type === "light" ? VSCODE_FALLBACK_EDITOR_BG.light : VSCODE_FALLBACK_EDITOR_BG.dark;
    theme.fg = fg;
    theme.bg = bg;
  }
  if (!(theme.settings[0] && theme.settings[0].settings && !theme.settings[0].scope)) {
    theme.settings.unshift({
      settings: {
        foreground: theme.fg,
        background: theme.bg
      }
    });
  }
  let replacementCount = 0;
  const replacementMap = /* @__PURE__ */ new Map();
  function getReplacementColor(value) {
    var _a4;
    if (replacementMap.has(value))
      return replacementMap.get(value);
    replacementCount += 1;
    const hex = `#${replacementCount.toString(16).padStart(8, "0").toLowerCase()}`;
    if ((_a4 = theme.colorReplacements) == null ? void 0 : _a4[`#${hex}`])
      return getReplacementColor(value);
    replacementMap.set(value, hex);
    return hex;
  }
  theme.settings = theme.settings.map((setting) => {
    var _a4, _b2;
    const replaceFg = ((_a4 = setting.settings) == null ? void 0 : _a4.foreground) && !setting.settings.foreground.startsWith("#");
    const replaceBg = ((_b2 = setting.settings) == null ? void 0 : _b2.background) && !setting.settings.background.startsWith("#");
    if (!replaceFg && !replaceBg)
      return setting;
    const clone2 = {
      ...setting,
      settings: {
        ...setting.settings
      }
    };
    if (replaceFg) {
      const replacement = getReplacementColor(setting.settings.foreground);
      theme.colorReplacements[replacement] = setting.settings.foreground;
      clone2.settings.foreground = replacement;
    }
    if (replaceBg) {
      const replacement = getReplacementColor(setting.settings.background);
      theme.colorReplacements[replacement] = setting.settings.background;
      clone2.settings.background = replacement;
    }
    return clone2;
  });
  for (const key2 of Object.keys(theme.colors || {})) {
    if (key2 === "editor.foreground" || key2 === "editor.background" || key2.startsWith("terminal.ansi")) {
      if (!((_e2 = theme.colors[key2]) == null ? void 0 : _e2.startsWith("#"))) {
        const replacement = getReplacementColor(theme.colors[key2]);
        theme.colorReplacements[replacement] = theme.colors[key2];
        theme.colors[key2] = replacement;
      }
    }
  }
  Object.defineProperty(theme, RESOLVED_KEY, {
    enumerable: false,
    writable: false,
    value: true
  });
  return theme;
}
async function resolveLangs(langs) {
  return Array.from(new Set((await Promise.all(
    langs.filter((l) => !isSpecialLang(l)).map(async (lang) => await normalizeGetter(lang).then((r4) => Array.isArray(r4) ? r4 : [r4]))
  )).flat()));
}
async function resolveThemes(themes) {
  const resolved = await Promise.all(
    themes.map(
      async (theme) => isSpecialTheme(theme) ? null : normalizeTheme(await normalizeGetter(theme))
    )
  );
  return resolved.filter((i) => !!i);
}
var ShikiError3 = class extends Error {
  constructor(message) {
    super(message);
    this.name = "ShikiError";
  }
};
var Registry2 = class extends Registry {
  constructor(_resolver, _themes, _langs, _alias = {}) {
    super(_resolver);
    __publicField(this, "_resolvedThemes", /* @__PURE__ */ new Map());
    __publicField(this, "_resolvedGrammars", /* @__PURE__ */ new Map());
    __publicField(this, "_langMap", /* @__PURE__ */ new Map());
    __publicField(this, "_langGraph", /* @__PURE__ */ new Map());
    __publicField(this, "_textmateThemeCache", /* @__PURE__ */ new WeakMap());
    __publicField(this, "_loadedThemesCache", null);
    __publicField(this, "_loadedLanguagesCache", null);
    this._resolver = _resolver;
    this._themes = _themes;
    this._langs = _langs;
    this._alias = _alias;
    this._themes.map((t) => this.loadTheme(t));
    this.loadLanguages(this._langs);
  }
  getTheme(theme) {
    if (typeof theme === "string")
      return this._resolvedThemes.get(theme);
    else
      return this.loadTheme(theme);
  }
  loadTheme(theme) {
    const _theme = normalizeTheme(theme);
    if (_theme.name) {
      this._resolvedThemes.set(_theme.name, _theme);
      this._loadedThemesCache = null;
    }
    return _theme;
  }
  getLoadedThemes() {
    if (!this._loadedThemesCache)
      this._loadedThemesCache = [...this._resolvedThemes.keys()];
    return this._loadedThemesCache;
  }
  // Override and re-implement this method to cache the textmate themes as `TextMateTheme.createFromRawTheme`
  // is expensive. Themes can switch often especially for dual-theme support.
  //
  // The parent class also accepts `colorMap` as the second parameter, but since we don't use that,
  // we omit here so it's easier to cache the themes.
  setTheme(theme) {
    let textmateTheme = this._textmateThemeCache.get(theme);
    if (!textmateTheme) {
      textmateTheme = Theme.createFromRawTheme(theme);
      this._textmateThemeCache.set(theme, textmateTheme);
    }
    this._syncRegistry.setTheme(textmateTheme);
  }
  getGrammar(name) {
    if (this._alias[name]) {
      const resolved = /* @__PURE__ */ new Set([name]);
      while (this._alias[name]) {
        name = this._alias[name];
        if (resolved.has(name))
          throw new ShikiError3(`Circular alias \`${Array.from(resolved).join(" -> ")} -> ${name}\``);
        resolved.add(name);
      }
    }
    return this._resolvedGrammars.get(name);
  }
  loadLanguage(lang) {
    var _a3, _b, _c, _d;
    if (this.getGrammar(lang.name))
      return;
    const embeddedLazilyBy = new Set(
      [...this._langMap.values()].filter((i) => {
        var _a4;
        return (_a4 = i.embeddedLangsLazy) == null ? void 0 : _a4.includes(lang.name);
      })
    );
    this._resolver.addLanguage(lang);
    const grammarConfig = {
      balancedBracketSelectors: lang.balancedBracketSelectors || ["*"],
      unbalancedBracketSelectors: lang.unbalancedBracketSelectors || []
    };
    this._syncRegistry._rawGrammars.set(lang.scopeName, lang);
    const g = this.loadGrammarWithConfiguration(lang.scopeName, 1, grammarConfig);
    g.name = lang.name;
    this._resolvedGrammars.set(lang.name, g);
    if (lang.aliases) {
      lang.aliases.forEach((alias) => {
        this._alias[alias] = lang.name;
      });
    }
    this._loadedLanguagesCache = null;
    if (embeddedLazilyBy.size) {
      for (const e of embeddedLazilyBy) {
        this._resolvedGrammars.delete(e.name);
        this._loadedLanguagesCache = null;
        (_b = (_a3 = this._syncRegistry) == null ? void 0 : _a3._injectionGrammars) == null ? void 0 : _b.delete(e.scopeName);
        (_d = (_c = this._syncRegistry) == null ? void 0 : _c._grammars) == null ? void 0 : _d.delete(e.scopeName);
        this.loadLanguage(this._langMap.get(e.name));
      }
    }
  }
  dispose() {
    super.dispose();
    this._resolvedThemes.clear();
    this._resolvedGrammars.clear();
    this._langMap.clear();
    this._langGraph.clear();
    this._loadedThemesCache = null;
  }
  loadLanguages(langs) {
    for (const lang of langs)
      this.resolveEmbeddedLanguages(lang);
    const langsGraphArray = Array.from(this._langGraph.entries());
    const missingLangs = langsGraphArray.filter(([_, lang]) => !lang);
    if (missingLangs.length) {
      const dependents = langsGraphArray.filter(([_, lang]) => {
        var _a3;
        return lang && ((_a3 = lang.embeddedLangs) == null ? void 0 : _a3.some((l) => missingLangs.map(([name]) => name).includes(l)));
      }).filter((lang) => !missingLangs.includes(lang));
      throw new ShikiError3(`Missing languages ${missingLangs.map(([name]) => `\`${name}\``).join(", ")}, required by ${dependents.map(([name]) => `\`${name}\``).join(", ")}`);
    }
    for (const [_, lang] of langsGraphArray)
      this._resolver.addLanguage(lang);
    for (const [_, lang] of langsGraphArray)
      this.loadLanguage(lang);
  }
  getLoadedLanguages() {
    if (!this._loadedLanguagesCache) {
      this._loadedLanguagesCache = [
        .../* @__PURE__ */ new Set([...this._resolvedGrammars.keys(), ...Object.keys(this._alias)])
      ];
    }
    return this._loadedLanguagesCache;
  }
  resolveEmbeddedLanguages(lang) {
    this._langMap.set(lang.name, lang);
    this._langGraph.set(lang.name, lang);
    if (lang.embeddedLangs) {
      for (const embeddedLang of lang.embeddedLangs)
        this._langGraph.set(embeddedLang, this._langMap.get(embeddedLang));
    }
  }
};
var Resolver = class {
  constructor(engine, langs) {
    __publicField(this, "_langs", /* @__PURE__ */ new Map());
    __publicField(this, "_scopeToLang", /* @__PURE__ */ new Map());
    __publicField(this, "_injections", /* @__PURE__ */ new Map());
    __publicField(this, "_onigLib");
    this._onigLib = {
      createOnigScanner: (patterns) => engine.createScanner(patterns),
      createOnigString: (s) => engine.createString(s)
    };
    langs.forEach((i) => this.addLanguage(i));
  }
  get onigLib() {
    return this._onigLib;
  }
  getLangRegistration(langIdOrAlias) {
    return this._langs.get(langIdOrAlias);
  }
  loadGrammar(scopeName) {
    return this._scopeToLang.get(scopeName);
  }
  addLanguage(l) {
    this._langs.set(l.name, l);
    if (l.aliases) {
      l.aliases.forEach((a) => {
        this._langs.set(a, l);
      });
    }
    this._scopeToLang.set(l.scopeName, l);
    if (l.injectTo) {
      l.injectTo.forEach((i) => {
        if (!this._injections.get(i))
          this._injections.set(i, []);
        this._injections.get(i).push(l.scopeName);
      });
    }
  }
  getInjections(scopeName) {
    const scopeParts = scopeName.split(".");
    let injections = [];
    for (let i = 1; i <= scopeParts.length; i++) {
      const subScopeName = scopeParts.slice(0, i).join(".");
      injections = [...injections, ...this._injections.get(subScopeName) || []];
    }
    return injections;
  }
};
var instancesCount = 0;
function createShikiInternalSync(options) {
  instancesCount += 1;
  if (options.warnings !== false && instancesCount >= 10 && instancesCount % 10 === 0)
    console.warn(`[Shiki] ${instancesCount} instances have been created. Shiki is supposed to be used as a singleton, consider refactoring your code to cache your highlighter instance; Or call \`highlighter.dispose()\` to release unused instances.`);
  let isDisposed = false;
  if (!options.engine)
    throw new ShikiError3("`engine` option is required for synchronous mode");
  const langs = (options.langs || []).flat(1);
  const themes = (options.themes || []).flat(1).map(normalizeTheme);
  const resolver = new Resolver(options.engine, langs);
  const _registry = new Registry2(resolver, themes, langs, options.langAlias);
  let _lastTheme;
  function getLanguage(name) {
    ensureNotDisposed();
    const _lang = _registry.getGrammar(typeof name === "string" ? name : name.name);
    if (!_lang)
      throw new ShikiError3(`Language \`${name}\` not found, you may need to load it first`);
    return _lang;
  }
  function getTheme(name) {
    if (name === "none")
      return { bg: "", fg: "", name: "none", settings: [], type: "dark" };
    ensureNotDisposed();
    const _theme = _registry.getTheme(name);
    if (!_theme)
      throw new ShikiError3(`Theme \`${name}\` not found, you may need to load it first`);
    return _theme;
  }
  function setTheme(name) {
    ensureNotDisposed();
    const theme = getTheme(name);
    if (_lastTheme !== name) {
      _registry.setTheme(theme);
      _lastTheme = name;
    }
    const colorMap = _registry.getColorMap();
    return {
      theme,
      colorMap
    };
  }
  function getLoadedThemes() {
    ensureNotDisposed();
    return _registry.getLoadedThemes();
  }
  function getLoadedLanguages() {
    ensureNotDisposed();
    return _registry.getLoadedLanguages();
  }
  function loadLanguageSync(...langs2) {
    ensureNotDisposed();
    _registry.loadLanguages(langs2.flat(1));
  }
  async function loadLanguage(...langs2) {
    return loadLanguageSync(await resolveLangs(langs2));
  }
  function loadThemeSync(...themes2) {
    ensureNotDisposed();
    for (const theme of themes2.flat(1)) {
      _registry.loadTheme(theme);
    }
  }
  async function loadTheme(...themes2) {
    ensureNotDisposed();
    return loadThemeSync(await resolveThemes(themes2));
  }
  function ensureNotDisposed() {
    if (isDisposed)
      throw new ShikiError3("Shiki instance has been disposed");
  }
  function dispose() {
    if (isDisposed)
      return;
    isDisposed = true;
    _registry.dispose();
    instancesCount -= 1;
  }
  return {
    setTheme,
    getTheme,
    getLanguage,
    getLoadedThemes,
    getLoadedLanguages,
    loadLanguage,
    loadLanguageSync,
    loadTheme,
    loadThemeSync,
    dispose,
    [Symbol.dispose]: dispose
  };
}
async function createShikiInternal(options) {
  if (options.loadWasm) {
    warnDeprecated("`loadWasm` option is deprecated. Use `engine: createOnigurumaEngine(loadWasm)` instead.");
  }
  if (!options.engine) {
    warnDeprecated("`engine` option is required. Use `createOnigurumaEngine` or `createJavaScriptRegexEngine` to create an engine.");
  }
  const [
    themes,
    langs,
    engine
  ] = await Promise.all([
    resolveThemes(options.themes || []),
    resolveLangs(options.langs || []),
    options.engine || createOnigurumaEngine(options.loadWasm || getDefaultWasmLoader())
  ]);
  return createShikiInternalSync({
    ...options,
    themes,
    langs,
    engine
  });
}
async function createHighlighterCore(options) {
  const internal = await createShikiInternal(options);
  return {
    getLastGrammarState: (...args) => getLastGrammarState(internal, ...args),
    codeToTokensBase: (code, options2) => codeToTokensBase(internal, code, options2),
    codeToTokensWithThemes: (code, options2) => codeToTokensWithThemes(internal, code, options2),
    codeToTokens: (code, options2) => codeToTokens(internal, code, options2),
    codeToHast: (code, options2) => codeToHast(internal, code, options2),
    codeToHtml: (code, options2) => codeToHtml(internal, code, options2),
    getBundledLanguages: () => ({}),
    getBundledThemes: () => ({}),
    ...internal,
    getInternalContext: () => internal
  };
}
function makeSingletonHighlighterCore(createHighlighter2) {
  let _shiki;
  async function getSingletonHighlighterCore2(options) {
    if (!_shiki) {
      _shiki = createHighlighter2({
        ...options,
        themes: options.themes || [],
        langs: options.langs || []
      });
      return _shiki;
    } else {
      const s = await _shiki;
      await Promise.all([
        s.loadTheme(...options.themes || []),
        s.loadLanguage(...options.langs || [])
      ]);
      return s;
    }
  }
  return getSingletonHighlighterCore2;
}
var getSingletonHighlighterCore = makeSingletonHighlighterCore(createHighlighterCore);
function createdBundledHighlighter(arg1, arg2, arg3) {
  let bundledLanguages2;
  let bundledThemes2;
  let engine;
  if (arg2) {
    warnDeprecated("`createdBundledHighlighter` signature with `bundledLanguages` and `bundledThemes` is deprecated. Use the options object signature instead.");
    bundledLanguages2 = arg1;
    bundledThemes2 = arg2;
    engine = () => createOnigurumaEngine2(arg3);
  } else {
    const options = arg1;
    bundledLanguages2 = options.langs;
    bundledThemes2 = options.themes;
    engine = options.engine;
  }
  async function createHighlighter2(options) {
    function resolveLang(lang) {
      if (typeof lang === "string") {
        if (isSpecialLang(lang))
          return [];
        const bundle = bundledLanguages2[lang];
        if (!bundle)
          throw new ShikiError(`Language \`${lang}\` is not included in this bundle. You may want to load it from external source.`);
        return bundle;
      }
      return lang;
    }
    function resolveTheme(theme) {
      if (isSpecialTheme(theme))
        return "none";
      if (typeof theme === "string") {
        const bundle = bundledThemes2[theme];
        if (!bundle)
          throw new ShikiError(`Theme \`${theme}\` is not included in this bundle. You may want to load it from external source.`);
        return bundle;
      }
      return theme;
    }
    const _themes = (options.themes ?? []).map((i) => resolveTheme(i));
    const langs = (options.langs ?? []).map((i) => resolveLang(i));
    const core2 = await createHighlighterCore({
      engine: options.engine ?? engine(),
      ...options,
      themes: _themes,
      langs
    });
    return {
      ...core2,
      loadLanguage(...langs2) {
        return core2.loadLanguage(...langs2.map(resolveLang));
      },
      loadTheme(...themes) {
        return core2.loadTheme(...themes.map(resolveTheme));
      },
      getBundledLanguages() {
        return bundledLanguages2;
      },
      getBundledThemes() {
        return bundledThemes2;
      }
    };
  }
  return createHighlighter2;
}
function makeSingletonHighlighter(createHighlighter2) {
  let _shiki;
  async function getSingletonHighlighter2(options = {}) {
    if (!_shiki) {
      _shiki = createHighlighter2({
        ...options,
        themes: options.themes || [],
        langs: options.langs || []
      });
      return _shiki;
    } else {
      const s = await _shiki;
      await Promise.all([
        s.loadTheme(...options.themes || []),
        s.loadLanguage(...options.langs || [])
      ]);
      return s;
    }
  }
  return getSingletonHighlighter2;
}
function createSingletonShorthands(createHighlighter2, config) {
  const getSingletonHighlighter2 = makeSingletonHighlighter(createHighlighter2);
  async function get(code, options) {
    var _a3;
    const shiki = await getSingletonHighlighter2({
      langs: [options.lang],
      themes: "theme" in options ? [options.theme] : Object.values(options.themes)
    });
    const langs = await ((_a3 = config == null ? void 0 : config.guessEmbeddedLanguages) == null ? void 0 : _a3.call(config, code, options.lang, shiki));
    if (langs) {
      await shiki.loadLanguage(...langs);
    }
    return shiki;
  }
  return {
    getSingletonHighlighter(options) {
      return getSingletonHighlighter2(options);
    },
    async codeToHtml(code, options) {
      const shiki = await get(code, options);
      return shiki.codeToHtml(code, options);
    },
    async codeToHast(code, options) {
      const shiki = await get(code, options);
      return shiki.codeToHast(code, options);
    },
    async codeToTokens(code, options) {
      const shiki = await get(code, options);
      return shiki.codeToTokens(code, options);
    },
    async codeToTokensBase(code, options) {
      const shiki = await get(code, options);
      return shiki.codeToTokensBase(code, options);
    },
    async codeToTokensWithThemes(code, options) {
      const shiki = await get(code, options);
      return shiki.codeToTokensWithThemes(code, options);
    },
    async getLastGrammarState(code, options) {
      const shiki = await getSingletonHighlighter2({
        langs: [options.lang],
        themes: [options.theme]
      });
      return shiki.getLastGrammarState(code, options);
    }
  };
}

// node_modules/shiki/dist/langs.mjs
var bundledLanguagesInfo = [
  {
    "id": "abap",
    "name": "ABAP",
    "import": () => import("./abap-HJVG5E2G.js")
  },
  {
    "id": "actionscript-3",
    "name": "ActionScript",
    "import": () => import("./actionscript-3-L67WSKEE.js")
  },
  {
    "id": "ada",
    "name": "Ada",
    "import": () => import("./ada-OXQW4CWA.js")
  },
  {
    "id": "angular-html",
    "name": "Angular HTML",
    "import": () => import("./angular-html-UNPOVVED.js")
  },
  {
    "id": "angular-ts",
    "name": "Angular TypeScript",
    "import": () => import("./angular-ts-TNYUKKA4.js")
  },
  {
    "id": "apache",
    "name": "Apache Conf",
    "import": () => import("./apache-FDXMJLZ2.js")
  },
  {
    "id": "apex",
    "name": "Apex",
    "import": () => import("./apex-YQG63QXF.js")
  },
  {
    "id": "apl",
    "name": "APL",
    "import": () => import("./apl-JRYJVOS3.js")
  },
  {
    "id": "applescript",
    "name": "AppleScript",
    "import": () => import("./applescript-MO52K76Z.js")
  },
  {
    "id": "ara",
    "name": "Ara",
    "import": () => import("./ara-MFGHWC5Q.js")
  },
  {
    "id": "asciidoc",
    "name": "AsciiDoc",
    "aliases": [
      "adoc"
    ],
    "import": () => import("./asciidoc-R62YJKYT.js")
  },
  {
    "id": "asm",
    "name": "Assembly",
    "import": () => import("./asm-36EHEJOQ.js")
  },
  {
    "id": "astro",
    "name": "Astro",
    "import": () => import("./astro-LYKTQPFH.js")
  },
  {
    "id": "awk",
    "name": "AWK",
    "import": () => import("./awk-3O4RJIB2.js")
  },
  {
    "id": "ballerina",
    "name": "Ballerina",
    "import": () => import("./ballerina-GUYKAMJN.js")
  },
  {
    "id": "bat",
    "name": "Batch File",
    "aliases": [
      "batch"
    ],
    "import": () => import("./bat-KFYXMG4Z.js")
  },
  {
    "id": "beancount",
    "name": "Beancount",
    "import": () => import("./beancount-YYWG6MR3.js")
  },
  {
    "id": "berry",
    "name": "Berry",
    "aliases": [
      "be"
    ],
    "import": () => import("./berry-JTXKB2TY.js")
  },
  {
    "id": "bibtex",
    "name": "BibTeX",
    "import": () => import("./bibtex-UPEMR4MB.js")
  },
  {
    "id": "bicep",
    "name": "Bicep",
    "import": () => import("./bicep-Z36TVBK2.js")
  },
  {
    "id": "blade",
    "name": "Blade",
    "import": () => import("./blade-UDZNH2KZ.js")
  },
  {
    "id": "bsl",
    "name": "1C (Enterprise)",
    "aliases": [
      "1c"
    ],
    "import": () => import("./bsl-4NV4YOLM.js")
  },
  {
    "id": "c",
    "name": "C",
    "import": () => import("./c-4BVAE55W.js")
  },
  {
    "id": "cadence",
    "name": "Cadence",
    "aliases": [
      "cdc"
    ],
    "import": () => import("./cadence-6OUY476O.js")
  },
  {
    "id": "cairo",
    "name": "Cairo",
    "import": () => import("./cairo-VTOLRP45.js")
  },
  {
    "id": "clarity",
    "name": "Clarity",
    "import": () => import("./clarity-EMABENMH.js")
  },
  {
    "id": "clojure",
    "name": "Clojure",
    "aliases": [
      "clj"
    ],
    "import": () => import("./clojure-KHXJJBFJ.js")
  },
  {
    "id": "cmake",
    "name": "CMake",
    "import": () => import("./cmake-ZYYISBL7.js")
  },
  {
    "id": "cobol",
    "name": "COBOL",
    "import": () => import("./cobol-2JBYUIKZ.js")
  },
  {
    "id": "codeowners",
    "name": "CODEOWNERS",
    "import": () => import("./codeowners-WEI73NHS.js")
  },
  {
    "id": "codeql",
    "name": "CodeQL",
    "aliases": [
      "ql"
    ],
    "import": () => import("./codeql-DLI4SJO5.js")
  },
  {
    "id": "coffee",
    "name": "CoffeeScript",
    "aliases": [
      "coffeescript"
    ],
    "import": () => import("./coffee-PE75X7UY.js")
  },
  {
    "id": "common-lisp",
    "name": "Common Lisp",
    "aliases": [
      "lisp"
    ],
    "import": () => import("./common-lisp-QVYCEAIT.js")
  },
  {
    "id": "coq",
    "name": "Coq",
    "import": () => import("./coq-PHVSMFMZ.js")
  },
  {
    "id": "cpp",
    "name": "C++",
    "aliases": [
      "c++"
    ],
    "import": () => import("./cpp-NU5UR2NA.js")
  },
  {
    "id": "crystal",
    "name": "Crystal",
    "import": () => import("./crystal-KNNNVKGI.js")
  },
  {
    "id": "csharp",
    "name": "C#",
    "aliases": [
      "c#",
      "cs"
    ],
    "import": () => import("./csharp-JFYLJW7I.js")
  },
  {
    "id": "css",
    "name": "CSS",
    "import": () => import("./css-4V334Y35.js")
  },
  {
    "id": "csv",
    "name": "CSV",
    "import": () => import("./csv-7YU4ZXFO.js")
  },
  {
    "id": "cue",
    "name": "CUE",
    "import": () => import("./cue-OS24QQTE.js")
  },
  {
    "id": "cypher",
    "name": "Cypher",
    "aliases": [
      "cql"
    ],
    "import": () => import("./cypher-VXID2QOW.js")
  },
  {
    "id": "d",
    "name": "D",
    "import": () => import("./d-TIMATX2Q.js")
  },
  {
    "id": "dart",
    "name": "Dart",
    "import": () => import("./dart-SCSWBZ65.js")
  },
  {
    "id": "dax",
    "name": "DAX",
    "import": () => import("./dax-5MWUCTLF.js")
  },
  {
    "id": "desktop",
    "name": "Desktop",
    "import": () => import("./desktop-L44IYLPO.js")
  },
  {
    "id": "diff",
    "name": "Diff",
    "import": () => import("./diff-MNTYDTSJ.js")
  },
  {
    "id": "docker",
    "name": "Dockerfile",
    "aliases": [
      "dockerfile"
    ],
    "import": () => import("./docker-UC5TDX6F.js")
  },
  {
    "id": "dotenv",
    "name": "dotEnv",
    "import": () => import("./dotenv-AP7Q7EGK.js")
  },
  {
    "id": "dream-maker",
    "name": "Dream Maker",
    "import": () => import("./dream-maker-6MNNPGPA.js")
  },
  {
    "id": "edge",
    "name": "Edge",
    "import": () => import("./edge-7MCEBXT5.js")
  },
  {
    "id": "elixir",
    "name": "Elixir",
    "import": () => import("./elixir-FXHRNV2O.js")
  },
  {
    "id": "elm",
    "name": "Elm",
    "import": () => import("./elm-YMGPWF6A.js")
  },
  {
    "id": "emacs-lisp",
    "name": "Emacs Lisp",
    "aliases": [
      "elisp"
    ],
    "import": () => import("./emacs-lisp-GVX4B4QU.js")
  },
  {
    "id": "erb",
    "name": "ERB",
    "import": () => import("./erb-C36OJT3Z.js")
  },
  {
    "id": "erlang",
    "name": "Erlang",
    "aliases": [
      "erl"
    ],
    "import": () => import("./erlang-6ZVO3EBF.js")
  },
  {
    "id": "fennel",
    "name": "Fennel",
    "import": () => import("./fennel-WERW3ZI5.js")
  },
  {
    "id": "fish",
    "name": "Fish",
    "import": () => import("./fish-VHD6BCUV.js")
  },
  {
    "id": "fluent",
    "name": "Fluent",
    "aliases": [
      "ftl"
    ],
    "import": () => import("./fluent-DV6ARHJB.js")
  },
  {
    "id": "fortran-fixed-form",
    "name": "Fortran (Fixed Form)",
    "aliases": [
      "f",
      "for",
      "f77"
    ],
    "import": () => import("./fortran-fixed-form-K3JPEIL4.js")
  },
  {
    "id": "fortran-free-form",
    "name": "Fortran (Free Form)",
    "aliases": [
      "f90",
      "f95",
      "f03",
      "f08",
      "f18"
    ],
    "import": () => import("./fortran-free-form-3G5VZKW3.js")
  },
  {
    "id": "fsharp",
    "name": "F#",
    "aliases": [
      "f#",
      "fs"
    ],
    "import": () => import("./fsharp-7JEY7IIA.js")
  },
  {
    "id": "gdresource",
    "name": "GDResource",
    "import": () => import("./gdresource-Y7YGDOJN.js")
  },
  {
    "id": "gdscript",
    "name": "GDScript",
    "import": () => import("./gdscript-OGSSUO4N.js")
  },
  {
    "id": "gdshader",
    "name": "GDShader",
    "import": () => import("./gdshader-ENSONZPI.js")
  },
  {
    "id": "genie",
    "name": "Genie",
    "import": () => import("./genie-NAOXRH2J.js")
  },
  {
    "id": "gherkin",
    "name": "Gherkin",
    "import": () => import("./gherkin-RWXXXKA4.js")
  },
  {
    "id": "git-commit",
    "name": "Git Commit Message",
    "import": () => import("./git-commit-ZG6CSTF3.js")
  },
  {
    "id": "git-rebase",
    "name": "Git Rebase Message",
    "import": () => import("./git-rebase-7NL74SKY.js")
  },
  {
    "id": "gleam",
    "name": "Gleam",
    "import": () => import("./gleam-I23B2KJ7.js")
  },
  {
    "id": "glimmer-js",
    "name": "Glimmer JS",
    "aliases": [
      "gjs"
    ],
    "import": () => import("./glimmer-js-LXJFZLZJ.js")
  },
  {
    "id": "glimmer-ts",
    "name": "Glimmer TS",
    "aliases": [
      "gts"
    ],
    "import": () => import("./glimmer-ts-V54QPFIA.js")
  },
  {
    "id": "glsl",
    "name": "GLSL",
    "import": () => import("./glsl-YWF4VZYW.js")
  },
  {
    "id": "gnuplot",
    "name": "Gnuplot",
    "import": () => import("./gnuplot-F5VY2B3M.js")
  },
  {
    "id": "go",
    "name": "Go",
    "import": () => import("./go-L2PKSGHZ.js")
  },
  {
    "id": "graphql",
    "name": "GraphQL",
    "aliases": [
      "gql"
    ],
    "import": () => import("./graphql-WD6ZDDC5.js")
  },
  {
    "id": "groovy",
    "name": "Groovy",
    "import": () => import("./groovy-2A7P5F77.js")
  },
  {
    "id": "hack",
    "name": "Hack",
    "import": () => import("./hack-WLHSWVRJ.js")
  },
  {
    "id": "haml",
    "name": "Ruby Haml",
    "import": () => import("./haml-FBYMTHF7.js")
  },
  {
    "id": "handlebars",
    "name": "Handlebars",
    "aliases": [
      "hbs"
    ],
    "import": () => import("./handlebars-BAX6JDMK.js")
  },
  {
    "id": "haskell",
    "name": "Haskell",
    "aliases": [
      "hs"
    ],
    "import": () => import("./haskell-Z7Z54E3L.js")
  },
  {
    "id": "haxe",
    "name": "Haxe",
    "import": () => import("./haxe-MBDJVFVO.js")
  },
  {
    "id": "hcl",
    "name": "HashiCorp HCL",
    "import": () => import("./hcl-PIDZYRN4.js")
  },
  {
    "id": "hjson",
    "name": "Hjson",
    "import": () => import("./hjson-L4DRQVH6.js")
  },
  {
    "id": "hlsl",
    "name": "HLSL",
    "import": () => import("./hlsl-WT5INQDT.js")
  },
  {
    "id": "html",
    "name": "HTML",
    "import": () => import("./html-CXCYMXHW.js")
  },
  {
    "id": "html-derivative",
    "name": "HTML (Derivative)",
    "import": () => import("./html-derivative-MV5534Q6.js")
  },
  {
    "id": "http",
    "name": "HTTP",
    "import": () => import("./http-A26XNXM6.js")
  },
  {
    "id": "hxml",
    "name": "HXML",
    "import": () => import("./hxml-2RMTNVN4.js")
  },
  {
    "id": "hy",
    "name": "Hy",
    "import": () => import("./hy-2RE3TRMF.js")
  },
  {
    "id": "imba",
    "name": "Imba",
    "import": () => import("./imba-H2XJHZI7.js")
  },
  {
    "id": "ini",
    "name": "INI",
    "aliases": [
      "properties"
    ],
    "import": () => import("./ini-6Y2SGDOD.js")
  },
  {
    "id": "java",
    "name": "Java",
    "import": () => import("./java-KK2G2HOP.js")
  },
  {
    "id": "javascript",
    "name": "JavaScript",
    "aliases": [
      "js"
    ],
    "import": () => import("./javascript-7DTZ6H5G.js")
  },
  {
    "id": "jinja",
    "name": "Jinja",
    "import": () => import("./jinja-6RXIUHCG.js")
  },
  {
    "id": "jison",
    "name": "Jison",
    "import": () => import("./jison-W6FKJNVM.js")
  },
  {
    "id": "json",
    "name": "JSON",
    "import": () => import("./json-PCTS62IA.js")
  },
  {
    "id": "json5",
    "name": "JSON5",
    "import": () => import("./json5-7BWWTPGC.js")
  },
  {
    "id": "jsonc",
    "name": "JSON with Comments",
    "import": () => import("./jsonc-IF2JUVMT.js")
  },
  {
    "id": "jsonl",
    "name": "JSON Lines",
    "import": () => import("./jsonl-OGJ7I6TO.js")
  },
  {
    "id": "jsonnet",
    "name": "Jsonnet",
    "import": () => import("./jsonnet-7RDHSPLP.js")
  },
  {
    "id": "jssm",
    "name": "JSSM",
    "aliases": [
      "fsl"
    ],
    "import": () => import("./jssm-32PUTGUH.js")
  },
  {
    "id": "jsx",
    "name": "JSX",
    "import": () => import("./jsx-ME2INHYI.js")
  },
  {
    "id": "julia",
    "name": "Julia",
    "aliases": [
      "jl"
    ],
    "import": () => import("./julia-7FDIMPNE.js")
  },
  {
    "id": "kotlin",
    "name": "Kotlin",
    "aliases": [
      "kt",
      "kts"
    ],
    "import": () => import("./kotlin-2ZAU4MWQ.js")
  },
  {
    "id": "kusto",
    "name": "Kusto",
    "aliases": [
      "kql"
    ],
    "import": () => import("./kusto-LTUWPS2Q.js")
  },
  {
    "id": "latex",
    "name": "LaTeX",
    "import": () => import("./latex-QPWHU73D.js")
  },
  {
    "id": "lean",
    "name": "Lean 4",
    "aliases": [
      "lean4"
    ],
    "import": () => import("./lean-BRIKRSR7.js")
  },
  {
    "id": "less",
    "name": "Less",
    "import": () => import("./less-FA6THJZR.js")
  },
  {
    "id": "liquid",
    "name": "Liquid",
    "import": () => import("./liquid-FME5GT7G.js")
  },
  {
    "id": "log",
    "name": "Log file",
    "import": () => import("./log-EIUTHQOP.js")
  },
  {
    "id": "logo",
    "name": "Logo",
    "import": () => import("./logo-R6WIHMDM.js")
  },
  {
    "id": "lua",
    "name": "Lua",
    "import": () => import("./lua-6XXN2TNY.js")
  },
  {
    "id": "luau",
    "name": "Luau",
    "import": () => import("./luau-SGSYQVPW.js")
  },
  {
    "id": "make",
    "name": "Makefile",
    "aliases": [
      "makefile"
    ],
    "import": () => import("./make-7RV5KSWY.js")
  },
  {
    "id": "markdown",
    "name": "Markdown",
    "aliases": [
      "md"
    ],
    "import": () => import("./markdown-E4FV32IJ.js")
  },
  {
    "id": "marko",
    "name": "Marko",
    "import": () => import("./marko-O5R2U5CI.js")
  },
  {
    "id": "matlab",
    "name": "MATLAB",
    "import": () => import("./matlab-HE3OVURR.js")
  },
  {
    "id": "mdc",
    "name": "MDC",
    "import": () => import("./mdc-IQYEXOVI.js")
  },
  {
    "id": "mdx",
    "name": "MDX",
    "import": () => import("./mdx-K2TMW7AB.js")
  },
  {
    "id": "mermaid",
    "name": "Mermaid",
    "aliases": [
      "mmd"
    ],
    "import": () => import("./mermaid-RSZRQ2R6.js")
  },
  {
    "id": "mipsasm",
    "name": "MIPS Assembly",
    "aliases": [
      "mips"
    ],
    "import": () => import("./mipsasm-PI2E57FZ.js")
  },
  {
    "id": "mojo",
    "name": "Mojo",
    "import": () => import("./mojo-UGYGJCSZ.js")
  },
  {
    "id": "move",
    "name": "Move",
    "import": () => import("./move-YAG7CRLS.js")
  },
  {
    "id": "narrat",
    "name": "Narrat Language",
    "aliases": [
      "nar"
    ],
    "import": () => import("./narrat-W7WX5N2F.js")
  },
  {
    "id": "nextflow",
    "name": "Nextflow",
    "aliases": [
      "nf"
    ],
    "import": () => import("./nextflow-Y4BU7X6N.js")
  },
  {
    "id": "nginx",
    "name": "Nginx",
    "import": () => import("./nginx-XEUFLZOB.js")
  },
  {
    "id": "nim",
    "name": "Nim",
    "import": () => import("./nim-JBO34Q3F.js")
  },
  {
    "id": "nix",
    "name": "Nix",
    "import": () => import("./nix-MQKASJKP.js")
  },
  {
    "id": "nushell",
    "name": "nushell",
    "aliases": [
      "nu"
    ],
    "import": () => import("./nushell-SBXGZU7S.js")
  },
  {
    "id": "objective-c",
    "name": "Objective-C",
    "aliases": [
      "objc"
    ],
    "import": () => import("./objective-c-4OGVJTWV.js")
  },
  {
    "id": "objective-cpp",
    "name": "Objective-C++",
    "import": () => import("./objective-cpp-C7JQN2CH.js")
  },
  {
    "id": "ocaml",
    "name": "OCaml",
    "import": () => import("./ocaml-KUNONPOX.js")
  },
  {
    "id": "pascal",
    "name": "Pascal",
    "import": () => import("./pascal-Q54GUNVT.js")
  },
  {
    "id": "perl",
    "name": "Perl",
    "import": () => import("./perl-ZXFOPCS6.js")
  },
  {
    "id": "php",
    "name": "PHP",
    "import": () => import("./php-SYUHLZHH.js")
  },
  {
    "id": "plsql",
    "name": "PL/SQL",
    "import": () => import("./plsql-4GQBILY6.js")
  },
  {
    "id": "po",
    "name": "Gettext PO",
    "aliases": [
      "pot",
      "potx"
    ],
    "import": () => import("./po-IT3A22I2.js")
  },
  {
    "id": "polar",
    "name": "Polar",
    "import": () => import("./polar-IQD6SEZM.js")
  },
  {
    "id": "postcss",
    "name": "PostCSS",
    "import": () => import("./postcss-XHPQQG4A.js")
  },
  {
    "id": "powerquery",
    "name": "PowerQuery",
    "import": () => import("./powerquery-KQX2CNZG.js")
  },
  {
    "id": "powershell",
    "name": "PowerShell",
    "aliases": [
      "ps",
      "ps1"
    ],
    "import": () => import("./powershell-FHOWIVM2.js")
  },
  {
    "id": "prisma",
    "name": "Prisma",
    "import": () => import("./prisma-WHXKGLNZ.js")
  },
  {
    "id": "prolog",
    "name": "Prolog",
    "import": () => import("./prolog-U6LX5V6J.js")
  },
  {
    "id": "proto",
    "name": "Protocol Buffer 3",
    "aliases": [
      "protobuf"
    ],
    "import": () => import("./proto-TTHZYSZ6.js")
  },
  {
    "id": "pug",
    "name": "Pug",
    "aliases": [
      "jade"
    ],
    "import": () => import("./pug-EILU4E2I.js")
  },
  {
    "id": "puppet",
    "name": "Puppet",
    "import": () => import("./puppet-EBTBJFDT.js")
  },
  {
    "id": "purescript",
    "name": "PureScript",
    "import": () => import("./purescript-HAK5EXHI.js")
  },
  {
    "id": "python",
    "name": "Python",
    "aliases": [
      "py"
    ],
    "import": () => import("./python-OGVQFEFA.js")
  },
  {
    "id": "qml",
    "name": "QML",
    "import": () => import("./qml-V54YQ5O2.js")
  },
  {
    "id": "qmldir",
    "name": "QML Directory",
    "import": () => import("./qmldir-SO6SY5Y2.js")
  },
  {
    "id": "qss",
    "name": "Qt Style Sheets",
    "import": () => import("./qss-UDXZUYK2.js")
  },
  {
    "id": "r",
    "name": "R",
    "import": () => import("./r-YNOU4WAJ.js")
  },
  {
    "id": "racket",
    "name": "Racket",
    "import": () => import("./racket-EJ2TVMKK.js")
  },
  {
    "id": "raku",
    "name": "Raku",
    "aliases": [
      "perl6"
    ],
    "import": () => import("./raku-IPPMK5SN.js")
  },
  {
    "id": "razor",
    "name": "ASP.NET Razor",
    "import": () => import("./razor-BYHWLIDB.js")
  },
  {
    "id": "reg",
    "name": "Windows Registry Script",
    "import": () => import("./reg-L27H634W.js")
  },
  {
    "id": "regexp",
    "name": "RegExp",
    "aliases": [
      "regex"
    ],
    "import": () => import("./regexp-NOPOCG7N.js")
  },
  {
    "id": "rel",
    "name": "Rel",
    "import": () => import("./rel-FAP7HFXU.js")
  },
  {
    "id": "riscv",
    "name": "RISC-V",
    "import": () => import("./riscv-FV3VT64O.js")
  },
  {
    "id": "rst",
    "name": "reStructuredText",
    "import": () => import("./rst-QOPUBS5W.js")
  },
  {
    "id": "ruby",
    "name": "Ruby",
    "aliases": [
      "rb"
    ],
    "import": () => import("./ruby-T7TGWHZR.js")
  },
  {
    "id": "rust",
    "name": "Rust",
    "aliases": [
      "rs"
    ],
    "import": () => import("./rust-7ANDFBMG.js")
  },
  {
    "id": "sas",
    "name": "SAS",
    "import": () => import("./sas-G4COOA2T.js")
  },
  {
    "id": "sass",
    "name": "Sass",
    "import": () => import("./sass-QZ6B6PCW.js")
  },
  {
    "id": "scala",
    "name": "Scala",
    "import": () => import("./scala-MYZLHC4Y.js")
  },
  {
    "id": "scheme",
    "name": "Scheme",
    "import": () => import("./scheme-KCL3YBOL.js")
  },
  {
    "id": "scss",
    "name": "SCSS",
    "import": () => import("./scss-6JBKHWFU.js")
  },
  {
    "id": "sdbl",
    "name": "1C (Query)",
    "aliases": [
      "1c-query"
    ],
    "import": () => import("./sdbl-67YKWFBQ.js")
  },
  {
    "id": "shaderlab",
    "name": "ShaderLab",
    "aliases": [
      "shader"
    ],
    "import": () => import("./shaderlab-7A4ABS3E.js")
  },
  {
    "id": "shellscript",
    "name": "Shell",
    "aliases": [
      "bash",
      "sh",
      "shell",
      "zsh"
    ],
    "import": () => import("./shellscript-FUFWICIL.js")
  },
  {
    "id": "shellsession",
    "name": "Shell Session",
    "aliases": [
      "console"
    ],
    "import": () => import("./shellsession-ERJ5DILV.js")
  },
  {
    "id": "smalltalk",
    "name": "Smalltalk",
    "import": () => import("./smalltalk-ZD6MWAC3.js")
  },
  {
    "id": "solidity",
    "name": "Solidity",
    "import": () => import("./solidity-BSMEWFJN.js")
  },
  {
    "id": "soy",
    "name": "Closure Templates",
    "aliases": [
      "closure-templates"
    ],
    "import": () => import("./soy-THU36CTD.js")
  },
  {
    "id": "sparql",
    "name": "SPARQL",
    "import": () => import("./sparql-5NJQVBR5.js")
  },
  {
    "id": "splunk",
    "name": "Splunk Query Language",
    "aliases": [
      "spl"
    ],
    "import": () => import("./splunk-AIKIPXHE.js")
  },
  {
    "id": "sql",
    "name": "SQL",
    "import": () => import("./sql-IKOVYXXG.js")
  },
  {
    "id": "ssh-config",
    "name": "SSH Config",
    "import": () => import("./ssh-config-PG5VSAHN.js")
  },
  {
    "id": "stata",
    "name": "Stata",
    "import": () => import("./stata-YLFVTGIQ.js")
  },
  {
    "id": "stylus",
    "name": "Stylus",
    "aliases": [
      "styl"
    ],
    "import": () => import("./stylus-TI4XULBT.js")
  },
  {
    "id": "svelte",
    "name": "Svelte",
    "import": () => import("./svelte-MPOCJTEJ.js")
  },
  {
    "id": "swift",
    "name": "Swift",
    "import": () => import("./swift-EMVRFFKI.js")
  },
  {
    "id": "system-verilog",
    "name": "SystemVerilog",
    "import": () => import("./system-verilog-7LLXL5AT.js")
  },
  {
    "id": "systemd",
    "name": "Systemd Units",
    "import": () => import("./systemd-PPSYA75U.js")
  },
  {
    "id": "talonscript",
    "name": "TalonScript",
    "aliases": [
      "talon"
    ],
    "import": () => import("./talonscript-ZV26TM26.js")
  },
  {
    "id": "tasl",
    "name": "Tasl",
    "import": () => import("./tasl-CYGCX5LZ.js")
  },
  {
    "id": "tcl",
    "name": "Tcl",
    "import": () => import("./tcl-JFHOMB7I.js")
  },
  {
    "id": "templ",
    "name": "Templ",
    "import": () => import("./templ-SWAEAQBA.js")
  },
  {
    "id": "terraform",
    "name": "Terraform",
    "aliases": [
      "tf",
      "tfvars"
    ],
    "import": () => import("./terraform-JF62YVVW.js")
  },
  {
    "id": "tex",
    "name": "TeX",
    "import": () => import("./tex-7VEBD273.js")
  },
  {
    "id": "toml",
    "name": "TOML",
    "import": () => import("./toml-646SU2UT.js")
  },
  {
    "id": "ts-tags",
    "name": "TypeScript with Tags",
    "aliases": [
      "lit"
    ],
    "import": () => import("./ts-tags-B5DJNEJJ.js")
  },
  {
    "id": "tsv",
    "name": "TSV",
    "import": () => import("./tsv-AZQB26F6.js")
  },
  {
    "id": "tsx",
    "name": "TSX",
    "import": () => import("./tsx-A5ANCWFT.js")
  },
  {
    "id": "turtle",
    "name": "Turtle",
    "import": () => import("./turtle-OBPUOTK3.js")
  },
  {
    "id": "twig",
    "name": "Twig",
    "import": () => import("./twig-IYMBTUO2.js")
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "aliases": [
      "ts"
    ],
    "import": () => import("./typescript-6CDFKA2O.js")
  },
  {
    "id": "typespec",
    "name": "TypeSpec",
    "aliases": [
      "tsp"
    ],
    "import": () => import("./typespec-73IA74ZK.js")
  },
  {
    "id": "typst",
    "name": "Typst",
    "aliases": [
      "typ"
    ],
    "import": () => import("./typst-RQM5NUVX.js")
  },
  {
    "id": "v",
    "name": "V",
    "import": () => import("./v-P4FBS4WG.js")
  },
  {
    "id": "vala",
    "name": "Vala",
    "import": () => import("./vala-AVGP5MLW.js")
  },
  {
    "id": "vb",
    "name": "Visual Basic",
    "aliases": [
      "cmd"
    ],
    "import": () => import("./vb-J2J2XQ6W.js")
  },
  {
    "id": "verilog",
    "name": "Verilog",
    "import": () => import("./verilog-ER4E3BJY.js")
  },
  {
    "id": "vhdl",
    "name": "VHDL",
    "import": () => import("./vhdl-B7HVHVNT.js")
  },
  {
    "id": "viml",
    "name": "Vim Script",
    "aliases": [
      "vim",
      "vimscript"
    ],
    "import": () => import("./viml-N6BPJQAG.js")
  },
  {
    "id": "vue",
    "name": "Vue",
    "import": () => import("./vue-DS74RLPP.js")
  },
  {
    "id": "vue-html",
    "name": "Vue HTML",
    "import": () => import("./vue-html-KRQU4JGP.js")
  },
  {
    "id": "vyper",
    "name": "Vyper",
    "aliases": [
      "vy"
    ],
    "import": () => import("./vyper-AHG37VUW.js")
  },
  {
    "id": "wasm",
    "name": "WebAssembly",
    "import": () => import("./wasm-RMGWXVLL.js")
  },
  {
    "id": "wenyan",
    "name": "Wenyan",
    "aliases": [
      "文言"
    ],
    "import": () => import("./wenyan-QPZKAHQC.js")
  },
  {
    "id": "wgsl",
    "name": "WGSL",
    "import": () => import("./wgsl-JKISTEQP.js")
  },
  {
    "id": "wikitext",
    "name": "Wikitext",
    "aliases": [
      "mediawiki",
      "wiki"
    ],
    "import": () => import("./wikitext-I7BM4QHW.js")
  },
  {
    "id": "wolfram",
    "name": "Wolfram",
    "aliases": [
      "wl"
    ],
    "import": () => import("./wolfram-3E6FDMUD.js")
  },
  {
    "id": "xml",
    "name": "XML",
    "import": () => import("./xml-IOZKYA4V.js")
  },
  {
    "id": "xsl",
    "name": "XSL",
    "import": () => import("./xsl-JPG3UAWA.js")
  },
  {
    "id": "yaml",
    "name": "YAML",
    "aliases": [
      "yml"
    ],
    "import": () => import("./yaml-7MPCGV3N.js")
  },
  {
    "id": "zenscript",
    "name": "ZenScript",
    "import": () => import("./zenscript-5OQWXL4Y.js")
  },
  {
    "id": "zig",
    "name": "Zig",
    "import": () => import("./zig-FIQ76NJI.js")
  }
];
var bundledLanguagesBase = Object.fromEntries(bundledLanguagesInfo.map((i) => [i.id, i.import]));
var bundledLanguagesAlias = Object.fromEntries(bundledLanguagesInfo.flatMap((i) => {
  var _a3;
  return ((_a3 = i.aliases) == null ? void 0 : _a3.map((a) => [a, i.import])) || [];
}));
var bundledLanguages = {
  ...bundledLanguagesBase,
  ...bundledLanguagesAlias
};

// node_modules/shiki/dist/themes.mjs
var bundledThemesInfo = [
  {
    "id": "andromeeda",
    "displayName": "Andromeeda",
    "type": "dark",
    "import": () => import("./andromeeda-KVKGLHWJ.js")
  },
  {
    "id": "aurora-x",
    "displayName": "Aurora X",
    "type": "dark",
    "import": () => import("./aurora-x-AF5CNNHW.js")
  },
  {
    "id": "ayu-dark",
    "displayName": "Ayu Dark",
    "type": "dark",
    "import": () => import("./ayu-dark-LP3FN3UL.js")
  },
  {
    "id": "catppuccin-frappe",
    "displayName": "Catppuccin Frappé",
    "type": "dark",
    "import": () => import("./catppuccin-frappe-F5WCNAPS.js")
  },
  {
    "id": "catppuccin-latte",
    "displayName": "Catppuccin Latte",
    "type": "light",
    "import": () => import("./catppuccin-latte-ARC2UXSG.js")
  },
  {
    "id": "catppuccin-macchiato",
    "displayName": "Catppuccin Macchiato",
    "type": "dark",
    "import": () => import("./catppuccin-macchiato-AZDA6T4J.js")
  },
  {
    "id": "catppuccin-mocha",
    "displayName": "Catppuccin Mocha",
    "type": "dark",
    "import": () => import("./catppuccin-mocha-ZR5OHFNI.js")
  },
  {
    "id": "dark-plus",
    "displayName": "Dark Plus",
    "type": "dark",
    "import": () => import("./dark-plus-WLQSVCWA.js")
  },
  {
    "id": "dracula",
    "displayName": "Dracula Theme",
    "type": "dark",
    "import": () => import("./dracula-UL33EUGS.js")
  },
  {
    "id": "dracula-soft",
    "displayName": "Dracula Theme Soft",
    "type": "dark",
    "import": () => import("./dracula-soft-CENCOAYA.js")
  },
  {
    "id": "everforest-dark",
    "displayName": "Everforest Dark",
    "type": "dark",
    "import": () => import("./everforest-dark-DLRNKWJK.js")
  },
  {
    "id": "everforest-light",
    "displayName": "Everforest Light",
    "type": "light",
    "import": () => import("./everforest-light-X5JXMZ36.js")
  },
  {
    "id": "github-dark",
    "displayName": "GitHub Dark",
    "type": "dark",
    "import": () => import("./github-dark-NABP2PPI.js")
  },
  {
    "id": "github-dark-default",
    "displayName": "GitHub Dark Default",
    "type": "dark",
    "import": () => import("./github-dark-default-XFVDVQDW.js")
  },
  {
    "id": "github-dark-dimmed",
    "displayName": "GitHub Dark Dimmed",
    "type": "dark",
    "import": () => import("./github-dark-dimmed-5ZSPTPNQ.js")
  },
  {
    "id": "github-dark-high-contrast",
    "displayName": "GitHub Dark High Contrast",
    "type": "dark",
    "import": () => import("./github-dark-high-contrast-62GAEVKO.js")
  },
  {
    "id": "github-light",
    "displayName": "GitHub Light",
    "type": "light",
    "import": () => import("./github-light-RSYU76DC.js")
  },
  {
    "id": "github-light-default",
    "displayName": "GitHub Light Default",
    "type": "light",
    "import": () => import("./github-light-default-KCNRBH5U.js")
  },
  {
    "id": "github-light-high-contrast",
    "displayName": "GitHub Light High Contrast",
    "type": "light",
    "import": () => import("./github-light-high-contrast-ZSYAZ4B5.js")
  },
  {
    "id": "houston",
    "displayName": "Houston",
    "type": "dark",
    "import": () => import("./houston-Q5JMU46L.js")
  },
  {
    "id": "kanagawa-dragon",
    "displayName": "Kanagawa Dragon",
    "type": "dark",
    "import": () => import("./kanagawa-dragon-OL7BTFMO.js")
  },
  {
    "id": "kanagawa-lotus",
    "displayName": "Kanagawa Lotus",
    "type": "light",
    "import": () => import("./kanagawa-lotus-I232VJCG.js")
  },
  {
    "id": "kanagawa-wave",
    "displayName": "Kanagawa Wave",
    "type": "dark",
    "import": () => import("./kanagawa-wave-VGRXWDFT.js")
  },
  {
    "id": "laserwave",
    "displayName": "LaserWave",
    "type": "dark",
    "import": () => import("./laserwave-4JMZOLO5.js")
  },
  {
    "id": "light-plus",
    "displayName": "Light Plus",
    "type": "light",
    "import": () => import("./light-plus-NJ6FOWK3.js")
  },
  {
    "id": "material-theme",
    "displayName": "Material Theme",
    "type": "dark",
    "import": () => import("./material-theme-AEQCQ7P2.js")
  },
  {
    "id": "material-theme-darker",
    "displayName": "Material Theme Darker",
    "type": "dark",
    "import": () => import("./material-theme-darker-IMXSZD3K.js")
  },
  {
    "id": "material-theme-lighter",
    "displayName": "Material Theme Lighter",
    "type": "light",
    "import": () => import("./material-theme-lighter-CNWUWIY6.js")
  },
  {
    "id": "material-theme-ocean",
    "displayName": "Material Theme Ocean",
    "type": "dark",
    "import": () => import("./material-theme-ocean-NXNJRNRZ.js")
  },
  {
    "id": "material-theme-palenight",
    "displayName": "Material Theme Palenight",
    "type": "dark",
    "import": () => import("./material-theme-palenight-PK3O77CF.js")
  },
  {
    "id": "min-dark",
    "displayName": "Min Dark",
    "type": "dark",
    "import": () => import("./min-dark-A7UY25OD.js")
  },
  {
    "id": "min-light",
    "displayName": "Min Light",
    "type": "light",
    "import": () => import("./min-light-7IAEVHTK.js")
  },
  {
    "id": "monokai",
    "displayName": "Monokai",
    "type": "dark",
    "import": () => import("./monokai-XED2SDQ4.js")
  },
  {
    "id": "night-owl",
    "displayName": "Night Owl",
    "type": "dark",
    "import": () => import("./night-owl-AR4WK7MI.js")
  },
  {
    "id": "nord",
    "displayName": "Nord",
    "type": "dark",
    "import": () => import("./nord-UEWJX7DJ.js")
  },
  {
    "id": "one-dark-pro",
    "displayName": "One Dark Pro",
    "type": "dark",
    "import": () => import("./one-dark-pro-3G5LIPTQ.js")
  },
  {
    "id": "one-light",
    "displayName": "One Light",
    "type": "light",
    "import": () => import("./one-light-DKTC2HCZ.js")
  },
  {
    "id": "plastic",
    "displayName": "Plastic",
    "type": "dark",
    "import": () => import("./plastic-M6TMJG3H.js")
  },
  {
    "id": "poimandres",
    "displayName": "Poimandres",
    "type": "dark",
    "import": () => import("./poimandres-I3CGNDKI.js")
  },
  {
    "id": "red",
    "displayName": "Red",
    "type": "dark",
    "import": () => import("./red-BAXZXP2Y.js")
  },
  {
    "id": "rose-pine",
    "displayName": "Rosé Pine",
    "type": "dark",
    "import": () => import("./rose-pine-MAIMNKU5.js")
  },
  {
    "id": "rose-pine-dawn",
    "displayName": "Rosé Pine Dawn",
    "type": "light",
    "import": () => import("./rose-pine-dawn-SPE5J7YE.js")
  },
  {
    "id": "rose-pine-moon",
    "displayName": "Rosé Pine Moon",
    "type": "dark",
    "import": () => import("./rose-pine-moon-XZEBBFYG.js")
  },
  {
    "id": "slack-dark",
    "displayName": "Slack Dark",
    "type": "dark",
    "import": () => import("./slack-dark-2JTZE2CT.js")
  },
  {
    "id": "slack-ochin",
    "displayName": "Slack Ochin",
    "type": "light",
    "import": () => import("./slack-ochin-SWWORLRC.js")
  },
  {
    "id": "snazzy-light",
    "displayName": "Snazzy Light",
    "type": "light",
    "import": () => import("./snazzy-light-ZL5MKOSK.js")
  },
  {
    "id": "solarized-dark",
    "displayName": "Solarized Dark",
    "type": "dark",
    "import": () => import("./solarized-dark-VF3RKBBL.js")
  },
  {
    "id": "solarized-light",
    "displayName": "Solarized Light",
    "type": "light",
    "import": () => import("./solarized-light-6I725WTO.js")
  },
  {
    "id": "synthwave-84",
    "displayName": "Synthwave '84",
    "type": "dark",
    "import": () => import("./synthwave-84-7UJ6A3Y5.js")
  },
  {
    "id": "tokyo-night",
    "displayName": "Tokyo Night",
    "type": "dark",
    "import": () => import("./tokyo-night-Z6BI7WJY.js")
  },
  {
    "id": "vesper",
    "displayName": "Vesper",
    "type": "dark",
    "import": () => import("./vesper-2WXE7HDB.js")
  },
  {
    "id": "vitesse-black",
    "displayName": "Vitesse Black",
    "type": "dark",
    "import": () => import("./vitesse-black-WX5KVSWU.js")
  },
  {
    "id": "vitesse-dark",
    "displayName": "Vitesse Dark",
    "type": "dark",
    "import": () => import("./vitesse-dark-7I7RMIB5.js")
  },
  {
    "id": "vitesse-light",
    "displayName": "Vitesse Light",
    "type": "light",
    "import": () => import("./vitesse-light-4VMFEE5W.js")
  }
];
var bundledThemes = Object.fromEntries(bundledThemesInfo.map((i) => [i.id, i.import]));

// node_modules/shiki/dist/bundle-full.mjs
var createHighlighter = createdBundledHighlighter({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createOnigurumaEngine(import("./wasm-5YTRTCW5.js"))
});
var {
  codeToHtml: codeToHtml2,
  codeToHast: codeToHast2,
  codeToTokens: codeToTokens2,
  codeToTokensBase: codeToTokensBase2,
  codeToTokensWithThemes: codeToTokensWithThemes2,
  getSingletonHighlighter,
  getLastGrammarState: getLastGrammarState2
} = createSingletonShorthands(
  createHighlighter,
  { guessEmbeddedLanguages }
);

// node_modules/vitepress-demo-plugin/dist/index.js
var import_path = __toESM(require_path());
var import_fs = __toESM(require_fs());
var et = (n, i) => {
  const e = n.__vccOpts || n;
  for (const [t, a] of i)
    e[t] = a;
  return e;
};
var Ui = {};
var Fi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-code"
};
function zi(n, i) {
  return openBlock(), createElementBlock("svg", Fi, i[0] || (i[0] = [
    createBaseVNode("polyline", { points: "16 18 22 12 16 6" }, null, -1),
    createBaseVNode("polyline", { points: "8 6 2 12 8 18" }, null, -1)
  ]));
}
var Ki = et(Ui, [["render", zi]]);
var qi = {};
var Vi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-code-xml"
};
function Gi(n, i) {
  return openBlock(), createElementBlock("svg", Vi, i[0] || (i[0] = [
    createBaseVNode("path", { d: "m18 16 4-4-4-4" }, null, -1),
    createBaseVNode("path", { d: "m6 8-4 4 4 4" }, null, -1),
    createBaseVNode("path", { d: "m14.5 4-5 16" }, null, -1)
  ]));
}
var Hi = et(qi, [["render", Gi]]);
var Xi = {};
var Qi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-copy"
};
function Ji(n, i) {
  return openBlock(), createElementBlock("svg", Qi, i[0] || (i[0] = [
    createBaseVNode("rect", {
      width: "14",
      height: "14",
      x: "8",
      y: "8",
      rx: "2",
      ry: "2"
    }, null, -1),
    createBaseVNode("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }, null, -1)
  ]));
}
var Zi = et(Xi, [["render", Ji]]);
var Yi = {};
var tn = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-arrow-up-from-line"
};
function en(n, i) {
  return openBlock(), createElementBlock("svg", tn, i[0] || (i[0] = [
    createBaseVNode("path", { d: "m18 9-6-6-6 6" }, null, -1),
    createBaseVNode("path", { d: "M12 3v14" }, null, -1),
    createBaseVNode("path", { d: "M5 21h14" }, null, -1)
  ]));
}
var nn = et(Yi, [["render", en]]);
function sn(n) {
  return n === "vue" ? "/src/Demo.vue" : n === "react" ? "/src/Demo.tsx" : "index.html";
}
var $ = ((n) => (n.VUE = "vue", n.REACT = "react", n.HTML = "html", n))($ || {});
var rt = ((n) => (n.STACKBLITZ = "stackblitz", n.CODESANDBOX = "codesandbox", n))(rt || {});
var di = "vitepress-demo";
var mi = "This is a demo from vitepress-demo-plugin";
var It = {};
var gi = { exports: {} };
(function(n) {
  var i = function() {
    var e = String.fromCharCode, t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", _ = {};
    function f(u, g) {
      if (!_[u]) {
        _[u] = {};
        for (var v = 0; v < u.length; v++)
          _[u][u.charAt(v)] = v;
      }
      return _[u][g];
    }
    var o = {
      compressToBase64: function(u) {
        if (u == null)
          return "";
        var g = o._compress(u, 6, function(v) {
          return t.charAt(v);
        });
        switch (g.length % 4) {
          default:
          case 0:
            return g;
          case 1:
            return g + "===";
          case 2:
            return g + "==";
          case 3:
            return g + "=";
        }
      },
      decompressFromBase64: function(u) {
        return u == null ? "" : u == "" ? null : o._decompress(u.length, 32, function(g) {
          return f(t, u.charAt(g));
        });
      },
      compressToUTF16: function(u) {
        return u == null ? "" : o._compress(u, 15, function(g) {
          return e(g + 32);
        }) + " ";
      },
      decompressFromUTF16: function(u) {
        return u == null ? "" : u == "" ? null : o._decompress(u.length, 16384, function(g) {
          return u.charCodeAt(g) - 32;
        });
      },
      compressToUint8Array: function(u) {
        for (var g = o.compress(u), v = new Uint8Array(g.length * 2), b = 0, c = g.length; b < c; b++) {
          var k = g.charCodeAt(b);
          v[b * 2] = k >>> 8, v[b * 2 + 1] = k % 256;
        }
        return v;
      },
      decompressFromUint8Array: function(u) {
        if (u == null)
          return o.decompress(u);
        for (var g = new Array(u.length / 2), v = 0, b = g.length; v < b; v++)
          g[v] = u[v * 2] * 256 + u[v * 2 + 1];
        var c = [];
        return g.forEach(function(k) {
          c.push(e(k));
        }), o.decompress(c.join(""));
      },
      compressToEncodedURIComponent: function(u) {
        return u == null ? "" : o._compress(u, 6, function(g) {
          return a.charAt(g);
        });
      },
      decompressFromEncodedURIComponent: function(u) {
        return u == null ? "" : u == "" ? null : (u = u.replace(/ /g, "+"), o._decompress(u.length, 32, function(g) {
          return f(a, u.charAt(g));
        }));
      },
      compress: function(u) {
        return o._compress(u, 16, function(g) {
          return e(g);
        });
      },
      _compress: function(u, g, v) {
        if (u == null)
          return "";
        var b, c, k = {}, C = {}, S = "", h = "", r4 = "", d = 2, T = 3, x = 2, E = [], l = 0, m = 0, p2;
        for (p2 = 0; p2 < u.length; p2 += 1)
          if (S = u.charAt(p2), Object.prototype.hasOwnProperty.call(k, S) || (k[S] = T++, C[S] = true), h = r4 + S, Object.prototype.hasOwnProperty.call(k, h))
            r4 = h;
          else {
            if (Object.prototype.hasOwnProperty.call(C, r4)) {
              if (r4.charCodeAt(0) < 256) {
                for (b = 0; b < x; b++)
                  l = l << 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++;
                for (c = r4.charCodeAt(0), b = 0; b < 8; b++)
                  l = l << 1 | c & 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = c >> 1;
              } else {
                for (c = 1, b = 0; b < x; b++)
                  l = l << 1 | c, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = 0;
                for (c = r4.charCodeAt(0), b = 0; b < 16; b++)
                  l = l << 1 | c & 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = c >> 1;
              }
              d--, d == 0 && (d = Math.pow(2, x), x++), delete C[r4];
            } else
              for (c = k[r4], b = 0; b < x; b++)
                l = l << 1 | c & 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = c >> 1;
            d--, d == 0 && (d = Math.pow(2, x), x++), k[h] = T++, r4 = String(S);
          }
        if (r4 !== "") {
          if (Object.prototype.hasOwnProperty.call(C, r4)) {
            if (r4.charCodeAt(0) < 256) {
              for (b = 0; b < x; b++)
                l = l << 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++;
              for (c = r4.charCodeAt(0), b = 0; b < 8; b++)
                l = l << 1 | c & 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = c >> 1;
            } else {
              for (c = 1, b = 0; b < x; b++)
                l = l << 1 | c, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = 0;
              for (c = r4.charCodeAt(0), b = 0; b < 16; b++)
                l = l << 1 | c & 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = c >> 1;
            }
            d--, d == 0 && (d = Math.pow(2, x), x++), delete C[r4];
          } else
            for (c = k[r4], b = 0; b < x; b++)
              l = l << 1 | c & 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = c >> 1;
          d--, d == 0 && (d = Math.pow(2, x), x++);
        }
        for (c = 2, b = 0; b < x; b++)
          l = l << 1 | c & 1, m == g - 1 ? (m = 0, E.push(v(l)), l = 0) : m++, c = c >> 1;
        for (; ; )
          if (l = l << 1, m == g - 1) {
            E.push(v(l));
            break;
          } else
            m++;
        return E.join("");
      },
      decompress: function(u) {
        return u == null ? "" : u == "" ? null : o._decompress(u.length, 32768, function(g) {
          return u.charCodeAt(g);
        });
      },
      _decompress: function(u, g, v) {
        var b = [], c = 4, k = 4, C = 3, S = "", h = [], r4, d, T, x, E, l, m, p2 = { val: v(0), position: g, index: 1 };
        for (r4 = 0; r4 < 3; r4 += 1)
          b[r4] = r4;
        for (T = 0, E = Math.pow(2, 2), l = 1; l != E; )
          x = p2.val & p2.position, p2.position >>= 1, p2.position == 0 && (p2.position = g, p2.val = v(p2.index++)), T |= (x > 0 ? 1 : 0) * l, l <<= 1;
        switch (T) {
          case 0:
            for (T = 0, E = Math.pow(2, 8), l = 1; l != E; )
              x = p2.val & p2.position, p2.position >>= 1, p2.position == 0 && (p2.position = g, p2.val = v(p2.index++)), T |= (x > 0 ? 1 : 0) * l, l <<= 1;
            m = e(T);
            break;
          case 1:
            for (T = 0, E = Math.pow(2, 16), l = 1; l != E; )
              x = p2.val & p2.position, p2.position >>= 1, p2.position == 0 && (p2.position = g, p2.val = v(p2.index++)), T |= (x > 0 ? 1 : 0) * l, l <<= 1;
            m = e(T);
            break;
          case 2:
            return "";
        }
        for (b[3] = m, d = m, h.push(m); ; ) {
          if (p2.index > u)
            return "";
          for (T = 0, E = Math.pow(2, C), l = 1; l != E; )
            x = p2.val & p2.position, p2.position >>= 1, p2.position == 0 && (p2.position = g, p2.val = v(p2.index++)), T |= (x > 0 ? 1 : 0) * l, l <<= 1;
          switch (m = T) {
            case 0:
              for (T = 0, E = Math.pow(2, 8), l = 1; l != E; )
                x = p2.val & p2.position, p2.position >>= 1, p2.position == 0 && (p2.position = g, p2.val = v(p2.index++)), T |= (x > 0 ? 1 : 0) * l, l <<= 1;
              b[k++] = e(T), m = k - 1, c--;
              break;
            case 1:
              for (T = 0, E = Math.pow(2, 16), l = 1; l != E; )
                x = p2.val & p2.position, p2.position >>= 1, p2.position == 0 && (p2.position = g, p2.val = v(p2.index++)), T |= (x > 0 ? 1 : 0) * l, l <<= 1;
              b[k++] = e(T), m = k - 1, c--;
              break;
            case 2:
              return h.join("");
          }
          if (c == 0 && (c = Math.pow(2, C), C++), b[m])
            S = b[m];
          else if (m === k)
            S = d + d.charAt(0);
          else
            return null;
          h.push(S), b[k++] = d + S.charAt(0), c--, d = S, c == 0 && (c = Math.pow(2, C), C++);
        }
      }
    };
    return o;
  }();
  n != null ? n.exports = i : typeof angular < "u" && angular != null && angular.module("LZString", []).factory("LZString", function() {
    return i;
  });
})(gi);
Object.defineProperty(It, "__esModule", { value: true });
It.getParameters = void 0;
var rn = gi.exports;
function an(n) {
  return rn.compressToBase64(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function on(n) {
  return an(JSON.stringify(n));
}
It.getParameters = on;
var Pt = void 0;
var _n = It;
Pt = _n.getParameters;
var vi = { exports: {} };
var yt = {};
var Ot = { exports: {} };
var Gt = {};
var Ht = {};
var $e;
function pe() {
  if ($e)
    return Ht;
  $e = 1;
  function n(t) {
    this.__parent = t, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__wrap_point_index = 0, this.__wrap_point_character_count = 0, this.__wrap_point_indent_count = -1, this.__wrap_point_alignment_count = 0, this.__items = [];
  }
  n.prototype.clone_empty = function() {
    var t = new n(this.__parent);
    return t.set_indent(this.__indent_count, this.__alignment_count), t;
  }, n.prototype.item = function(t) {
    return t < 0 ? this.__items[this.__items.length + t] : this.__items[t];
  }, n.prototype.has_match = function(t) {
    for (var a = this.__items.length - 1; a >= 0; a--)
      if (this.__items[a].match(t))
        return true;
    return false;
  }, n.prototype.set_indent = function(t, a) {
    this.is_empty() && (this.__indent_count = t || 0, this.__alignment_count = a || 0, this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count));
  }, n.prototype._set_wrap_point = function() {
    this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count = this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count);
  }, n.prototype._should_wrap = function() {
    return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
  }, n.prototype._allow_wrap = function() {
    if (this._should_wrap()) {
      this.__parent.add_new_line();
      var t = this.__parent.current_line;
      return t.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count), t.__items = this.__items.slice(this.__wrap_point_index), this.__items = this.__items.slice(0, this.__wrap_point_index), t.__character_count += this.__character_count - this.__wrap_point_character_count, this.__character_count = this.__wrap_point_character_count, t.__items[0] === " " && (t.__items.splice(0, 1), t.__character_count -= 1), true;
    }
    return false;
  }, n.prototype.is_empty = function() {
    return this.__items.length === 0;
  }, n.prototype.last = function() {
    return this.is_empty() ? null : this.__items[this.__items.length - 1];
  }, n.prototype.push = function(t) {
    this.__items.push(t);
    var a = t.lastIndexOf(`
`);
    a !== -1 ? this.__character_count = t.length - a : this.__character_count += t.length;
  }, n.prototype.pop = function() {
    var t = null;
    return this.is_empty() || (t = this.__items.pop(), this.__character_count -= t.length), t;
  }, n.prototype._remove_indent = function() {
    this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size);
  }, n.prototype._remove_wrap_indent = function() {
    this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1);
  }, n.prototype.trim = function() {
    for (; this.last() === " "; )
      this.__items.pop(), this.__character_count -= 1;
  }, n.prototype.toString = function() {
    var t = "";
    return this.is_empty() ? this.__parent.indent_empty_lines && (t = this.__parent.get_indent_string(this.__indent_count)) : (t = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), t += this.__items.join("")), t;
  };
  function i(t, a) {
    this.__cache = [""], this.__indent_size = t.indent_size, this.__indent_string = t.indent_char, t.indent_with_tabs || (this.__indent_string = new Array(t.indent_size + 1).join(t.indent_char)), a = a || "", t.indent_level > 0 && (a = new Array(t.indent_level + 1).join(this.__indent_string)), this.__base_string = a, this.__base_string_length = a.length;
  }
  i.prototype.get_indent_size = function(t, a) {
    var _ = this.__base_string_length;
    return a = a || 0, t < 0 && (_ = 0), _ += t * this.__indent_size, _ += a, _;
  }, i.prototype.get_indent_string = function(t, a) {
    var _ = this.__base_string;
    return a = a || 0, t < 0 && (t = 0, _ = ""), a += t * this.__indent_size, this.__ensure_cache(a), _ += this.__cache[a], _;
  }, i.prototype.__ensure_cache = function(t) {
    for (; t >= this.__cache.length; )
      this.__add_column();
  }, i.prototype.__add_column = function() {
    var t = this.__cache.length, a = 0, _ = "";
    this.__indent_size && t >= this.__indent_size && (a = Math.floor(t / this.__indent_size), t -= a * this.__indent_size, _ = new Array(a + 1).join(this.__indent_string)), t && (_ += new Array(t + 1).join(" ")), this.__cache.push(_);
  };
  function e(t, a) {
    this.__indent_cache = new i(t, a), this.raw = false, this._end_with_newline = t.end_with_newline, this.indent_size = t.indent_size, this.wrap_line_length = t.wrap_line_length, this.indent_empty_lines = t.indent_empty_lines, this.__lines = [], this.previous_line = null, this.current_line = null, this.next_line = new n(this), this.space_before_token = false, this.non_breaking_space = false, this.previous_token_wrapped = false, this.__add_outputline();
  }
  return e.prototype.__add_outputline = function() {
    this.previous_line = this.current_line, this.current_line = this.next_line.clone_empty(), this.__lines.push(this.current_line);
  }, e.prototype.get_line_number = function() {
    return this.__lines.length;
  }, e.prototype.get_indent_string = function(t, a) {
    return this.__indent_cache.get_indent_string(t, a);
  }, e.prototype.get_indent_size = function(t, a) {
    return this.__indent_cache.get_indent_size(t, a);
  }, e.prototype.is_empty = function() {
    return !this.previous_line && this.current_line.is_empty();
  }, e.prototype.add_new_line = function(t) {
    return this.is_empty() || !t && this.just_added_newline() ? false : (this.raw || this.__add_outputline(), true);
  }, e.prototype.get_code = function(t) {
    this.trim(true);
    var a = this.current_line.pop();
    a && (a[a.length - 1] === `
` && (a = a.replace(/\n+$/g, "")), this.current_line.push(a)), this._end_with_newline && this.__add_outputline();
    var _ = this.__lines.join(`
`);
    return t !== `
` && (_ = _.replace(/[\n]/g, t)), _;
  }, e.prototype.set_wrap_point = function() {
    this.current_line._set_wrap_point();
  }, e.prototype.set_indent = function(t, a) {
    return t = t || 0, a = a || 0, this.next_line.set_indent(t, a), this.__lines.length > 1 ? (this.current_line.set_indent(t, a), true) : (this.current_line.set_indent(), false);
  }, e.prototype.add_raw_token = function(t) {
    for (var a = 0; a < t.newlines; a++)
      this.__add_outputline();
    this.current_line.set_indent(-1), this.current_line.push(t.whitespace_before), this.current_line.push(t.text), this.space_before_token = false, this.non_breaking_space = false, this.previous_token_wrapped = false;
  }, e.prototype.add_token = function(t) {
    this.__add_space_before_token(), this.current_line.push(t), this.space_before_token = false, this.non_breaking_space = false, this.previous_token_wrapped = this.current_line._allow_wrap();
  }, e.prototype.__add_space_before_token = function() {
    this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(" "));
  }, e.prototype.remove_indent = function(t) {
    for (var a = this.__lines.length; t < a; )
      this.__lines[t]._remove_indent(), t++;
    this.current_line._remove_wrap_indent();
  }, e.prototype.trim = function(t) {
    for (t = t === void 0 ? false : t, this.current_line.trim(); t && this.__lines.length > 1 && this.current_line.is_empty(); )
      this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
    this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
  }, e.prototype.just_added_newline = function() {
    return this.current_line.is_empty();
  }, e.prototype.just_added_blankline = function() {
    return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
  }, e.prototype.ensure_empty_line_above = function(t, a) {
    for (var _ = this.__lines.length - 2; _ >= 0; ) {
      var f = this.__lines[_];
      if (f.is_empty())
        break;
      if (f.item(0).indexOf(t) !== 0 && f.item(-1) !== a) {
        this.__lines.splice(_ + 1, 0, new n(this)), this.previous_line = this.__lines[this.__lines.length - 2];
        break;
      }
      _--;
    }
  }, Ht.Output = e, Ht;
}
var Xt = {};
var Ie;
function bi() {
  if (Ie)
    return Xt;
  Ie = 1;
  function n(i, e, t, a) {
    this.type = i, this.text = e, this.comments_before = null, this.newlines = t || 0, this.whitespace_before = a || "", this.parent = null, this.next = null, this.previous = null, this.opened = null, this.closed = null, this.directives = null;
  }
  return Xt.Token = n, Xt;
}
var Qt = {};
var Pe;
function yi() {
  return Pe || (Pe = 1, function(n) {
    var i = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a", e = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a", t = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc", a = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f", _ = "\\\\u[0-9a-fA-F]{4}|\\\\u\\{[0-9a-fA-F]+\\}", f = "(?:" + _ + "|[" + i + t + "])", o = "(?:" + _ + "|[" + e + t + a + "])*";
    n.identifier = new RegExp(f + o, "g"), n.identifierStart = new RegExp(f), n.identifierMatch = new RegExp("(?:" + _ + "|[" + e + t + a + "])+"), n.newline = /[\n\r\u2028\u2029]/, n.lineBreak = new RegExp(`\r
|` + n.newline.source), n.allLineBreaks = new RegExp(n.lineBreak.source, "g");
  }(Qt)), Qt;
}
var Jt = {};
var wt = {};
var Be;
function he() {
  if (Be)
    return wt;
  Be = 1;
  function n(t, a) {
    this.raw_options = i(t, a), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol", "auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number("indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number("indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", true), this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0), this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	"), this.indent_with_tabs && (this.indent_char = "	", this.indent_size === 1 && (this.indent_size = 4)), this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char")), this.indent_empty_lines = this._get_boolean("indent_empty_lines"), this.templating = this._get_selection_list("templating", ["auto", "none", "angular", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
  }
  n.prototype._get_array = function(t, a) {
    var _ = this.raw_options[t], f = a || [];
    return typeof _ == "object" ? _ !== null && typeof _.concat == "function" && (f = _.concat()) : typeof _ == "string" && (f = _.split(/[^a-zA-Z0-9_\/\-]+/)), f;
  }, n.prototype._get_boolean = function(t, a) {
    var _ = this.raw_options[t], f = _ === void 0 ? !!a : !!_;
    return f;
  }, n.prototype._get_characters = function(t, a) {
    var _ = this.raw_options[t], f = a || "";
    return typeof _ == "string" && (f = _.replace(/\\r/, "\r").replace(/\\n/, `
`).replace(/\\t/, "	")), f;
  }, n.prototype._get_number = function(t, a) {
    var _ = this.raw_options[t];
    a = parseInt(a, 10), isNaN(a) && (a = 0);
    var f = parseInt(_, 10);
    return isNaN(f) && (f = a), f;
  }, n.prototype._get_selection = function(t, a, _) {
    var f = this._get_selection_list(t, a, _);
    if (f.length !== 1)
      throw new Error(
        "Invalid Option Value: The option '" + t + `' can only be one of the following values:
` + a + `
You passed in: '` + this.raw_options[t] + "'"
      );
    return f[0];
  }, n.prototype._get_selection_list = function(t, a, _) {
    if (!a || a.length === 0)
      throw new Error("Selection list cannot be empty.");
    if (_ = _ || [a[0]], !this._is_valid_selection(_, a))
      throw new Error("Invalid Default Value!");
    var f = this._get_array(t, _);
    if (!this._is_valid_selection(f, a))
      throw new Error(
        "Invalid Option Value: The option '" + t + `' can contain only the following values:
` + a + `
You passed in: '` + this.raw_options[t] + "'"
      );
    return f;
  }, n.prototype._is_valid_selection = function(t, a) {
    return t.length && a.length && !t.some(function(_) {
      return a.indexOf(_) === -1;
    });
  };
  function i(t, a) {
    var _ = {};
    t = e(t);
    var f;
    for (f in t)
      f !== a && (_[f] = t[f]);
    if (a && t[a])
      for (f in t[a])
        _[f] = t[a][f];
    return _;
  }
  function e(t) {
    var a = {}, _;
    for (_ in t) {
      var f = _.replace(/-/g, "_");
      a[f] = t[_];
    }
    return a;
  }
  return wt.Options = n, wt.normalizeOpts = e, wt.mergeOpts = i, wt;
}
var Me;
function wi() {
  if (Me)
    return Jt;
  Me = 1;
  var n = he().Options, i = ["before-newline", "after-newline", "preserve-newline"];
  function e(t) {
    n.call(this, t, "js");
    var a = this.raw_options.brace_style || null;
    a === "expand-strict" ? this.raw_options.brace_style = "expand" : a === "collapse-preserve-inline" ? this.raw_options.brace_style = "collapse,preserve-inline" : this.raw_options.braces_on_own_line !== void 0 && (this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse");
    var _ = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
    this.brace_preserve_inline = false, this.brace_style = "collapse";
    for (var f = 0; f < _.length; f++)
      _[f] === "preserve-inline" ? this.brace_preserve_inline = true : this.brace_style = _[f];
    this.unindent_chained_methods = this._get_boolean("unindent_chained_methods"), this.break_chained_methods = this._get_boolean("break_chained_methods"), this.space_in_paren = this._get_boolean("space_in_paren"), this.space_in_empty_paren = this._get_boolean("space_in_empty_paren"), this.jslint_happy = this._get_boolean("jslint_happy"), this.space_after_anon_function = this._get_boolean("space_after_anon_function"), this.space_after_named_function = this._get_boolean("space_after_named_function"), this.keep_array_indentation = this._get_boolean("keep_array_indentation"), this.space_before_conditional = this._get_boolean("space_before_conditional", true), this.unescape_strings = this._get_boolean("unescape_strings"), this.e4x = this._get_boolean("e4x"), this.comma_first = this._get_boolean("comma_first"), this.operator_position = this._get_selection("operator_position", i), this.test_output_raw = this._get_boolean("test_output_raw"), this.jslint_happy && (this.space_after_anon_function = true);
  }
  return e.prototype = new n(), Jt.Options = e, Jt;
}
var ct = {};
var Zt = {};
var We;
function ce() {
  if (We)
    return Zt;
  We = 1;
  var n = RegExp.prototype.hasOwnProperty("sticky");
  function i(e) {
    this.__input = e || "", this.__input_length = this.__input.length, this.__position = 0;
  }
  return i.prototype.restart = function() {
    this.__position = 0;
  }, i.prototype.back = function() {
    this.__position > 0 && (this.__position -= 1);
  }, i.prototype.hasNext = function() {
    return this.__position < this.__input_length;
  }, i.prototype.next = function() {
    var e = null;
    return this.hasNext() && (e = this.__input.charAt(this.__position), this.__position += 1), e;
  }, i.prototype.peek = function(e) {
    var t = null;
    return e = e || 0, e += this.__position, e >= 0 && e < this.__input_length && (t = this.__input.charAt(e)), t;
  }, i.prototype.__match = function(e, t) {
    e.lastIndex = t;
    var a = e.exec(this.__input);
    return a && !(n && e.sticky) && a.index !== t && (a = null), a;
  }, i.prototype.test = function(e, t) {
    return t = t || 0, t += this.__position, t >= 0 && t < this.__input_length ? !!this.__match(e, t) : false;
  }, i.prototype.testChar = function(e, t) {
    var a = this.peek(t);
    return e.lastIndex = 0, a !== null && e.test(a);
  }, i.prototype.match = function(e) {
    var t = this.__match(e, this.__position);
    return t ? this.__position += t[0].length : t = null, t;
  }, i.prototype.read = function(e, t, a) {
    var _ = "", f;
    return e && (f = this.match(e), f && (_ += f[0])), t && (f || !e) && (_ += this.readUntil(t, a)), _;
  }, i.prototype.readUntil = function(e, t) {
    var a = "", _ = this.__position;
    e.lastIndex = this.__position;
    var f = e.exec(this.__input);
    return f ? (_ = f.index, t && (_ += f[0].length)) : _ = this.__input_length, a = this.__input.substring(this.__position, _), this.__position = _, a;
  }, i.prototype.readUntilAfter = function(e) {
    return this.readUntil(e, true);
  }, i.prototype.get_regexp = function(e, t) {
    var a = null, _ = "g";
    return t && n && (_ = "y"), typeof e == "string" && e !== "" ? a = new RegExp(e, _) : e && (a = new RegExp(e.source, _)), a;
  }, i.prototype.get_literal_regexp = function(e) {
    return RegExp(e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
  }, i.prototype.peekUntilAfter = function(e) {
    var t = this.__position, a = this.readUntilAfter(e);
    return this.__position = t, a;
  }, i.prototype.lookBack = function(e) {
    var t = this.__position - 1;
    return t >= e.length && this.__input.substring(t - e.length, t).toLowerCase() === e;
  }, Zt.InputScanner = i, Zt;
}
var Tt = {};
var Yt = {};
var Ue;
function un() {
  if (Ue)
    return Yt;
  Ue = 1;
  function n(i) {
    this.__tokens = [], this.__tokens_length = this.__tokens.length, this.__position = 0, this.__parent_token = i;
  }
  return n.prototype.restart = function() {
    this.__position = 0;
  }, n.prototype.isEmpty = function() {
    return this.__tokens_length === 0;
  }, n.prototype.hasNext = function() {
    return this.__position < this.__tokens_length;
  }, n.prototype.next = function() {
    var i = null;
    return this.hasNext() && (i = this.__tokens[this.__position], this.__position += 1), i;
  }, n.prototype.peek = function(i) {
    var e = null;
    return i = i || 0, i += this.__position, i >= 0 && i < this.__tokens_length && (e = this.__tokens[i]), e;
  }, n.prototype.add = function(i) {
    this.__parent_token && (i.parent = this.__parent_token), this.__tokens.push(i), this.__tokens_length += 1;
  }, Yt.TokenStream = n, Yt;
}
var te = {};
var ee = {};
var Fe;
function Bt() {
  if (Fe)
    return ee;
  Fe = 1;
  function n(i, e) {
    this._input = i, this._starting_pattern = null, this._match_pattern = null, this._until_pattern = null, this._until_after = false, e && (this._starting_pattern = this._input.get_regexp(e._starting_pattern, true), this._match_pattern = this._input.get_regexp(e._match_pattern, true), this._until_pattern = this._input.get_regexp(e._until_pattern), this._until_after = e._until_after);
  }
  return n.prototype.read = function() {
    var i = this._input.read(this._starting_pattern);
    return (!this._starting_pattern || i) && (i += this._input.read(this._match_pattern, this._until_pattern, this._until_after)), i;
  }, n.prototype.read_match = function() {
    return this._input.match(this._match_pattern);
  }, n.prototype.until_after = function(i) {
    var e = this._create();
    return e._until_after = true, e._until_pattern = this._input.get_regexp(i), e._update(), e;
  }, n.prototype.until = function(i) {
    var e = this._create();
    return e._until_after = false, e._until_pattern = this._input.get_regexp(i), e._update(), e;
  }, n.prototype.starting_with = function(i) {
    var e = this._create();
    return e._starting_pattern = this._input.get_regexp(i, true), e._update(), e;
  }, n.prototype.matching = function(i) {
    var e = this._create();
    return e._match_pattern = this._input.get_regexp(i, true), e._update(), e;
  }, n.prototype._create = function() {
    return new n(this._input, this);
  }, n.prototype._update = function() {
  }, ee.Pattern = n, ee;
}
var ze;
function ln() {
  if (ze)
    return te;
  ze = 1;
  var n = Bt().Pattern;
  function i(e, t) {
    n.call(this, e, t), t ? this._line_regexp = this._input.get_regexp(t._line_regexp) : this.__set_whitespace_patterns("", ""), this.newline_count = 0, this.whitespace_before_token = "";
  }
  return i.prototype = new n(), i.prototype.__set_whitespace_patterns = function(e, t) {
    e += "\\t ", t += "\\n\\r", this._match_pattern = this._input.get_regexp(
      "[" + e + t + "]+",
      true
    ), this._newline_regexp = this._input.get_regexp(
      "\\r\\n|[" + t + "]"
    );
  }, i.prototype.read = function() {
    this.newline_count = 0, this.whitespace_before_token = "";
    var e = this._input.read(this._match_pattern);
    if (e === " ")
      this.whitespace_before_token = " ";
    else if (e) {
      var t = this.__split(this._newline_regexp, e);
      this.newline_count = t.length - 1, this.whitespace_before_token = t[this.newline_count];
    }
    return e;
  }, i.prototype.matching = function(e, t) {
    var a = this._create();
    return a.__set_whitespace_patterns(e, t), a._update(), a;
  }, i.prototype._create = function() {
    return new i(this._input, this);
  }, i.prototype.__split = function(e, t) {
    e.lastIndex = 0;
    for (var a = 0, _ = [], f = e.exec(t); f; )
      _.push(t.substring(a, f.index)), a = f.index + f[0].length, f = e.exec(t);
    return a < t.length ? _.push(t.substring(a, t.length)) : _.push(""), _;
  }, te.WhitespacePattern = i, te;
}
var Ke;
function Dt() {
  if (Ke)
    return Tt;
  Ke = 1;
  var n = ce().InputScanner, i = bi().Token, e = un().TokenStream, t = ln().WhitespacePattern, a = {
    START: "TK_START",
    RAW: "TK_RAW",
    EOF: "TK_EOF"
  }, _ = function(f, o) {
    this._input = new n(f), this._options = o || {}, this.__tokens = null, this._patterns = {}, this._patterns.whitespace = new t(this._input);
  };
  return _.prototype.tokenize = function() {
    this._input.restart(), this.__tokens = new e(), this._reset();
    for (var f, o = new i(a.START, ""), u = null, g = [], v = new e(); o.type !== a.EOF; ) {
      for (f = this._get_next_token(o, u); this._is_comment(f); )
        v.add(f), f = this._get_next_token(o, u);
      v.isEmpty() || (f.comments_before = v, v = new e()), f.parent = u, this._is_opening(f) ? (g.push(u), u = f) : u && this._is_closing(f, u) && (f.opened = u, u.closed = f, u = g.pop(), f.parent = u), f.previous = o, o.next = f, this.__tokens.add(f), o = f;
    }
    return this.__tokens;
  }, _.prototype._is_first_token = function() {
    return this.__tokens.isEmpty();
  }, _.prototype._reset = function() {
  }, _.prototype._get_next_token = function(f, o) {
    this._readWhitespace();
    var u = this._input.read(/.+/g);
    return u ? this._create_token(a.RAW, u) : this._create_token(a.EOF, "");
  }, _.prototype._is_comment = function(f) {
    return false;
  }, _.prototype._is_opening = function(f) {
    return false;
  }, _.prototype._is_closing = function(f, o) {
    return false;
  }, _.prototype._create_token = function(f, o) {
    var u = new i(
      f,
      o,
      this._patterns.whitespace.newline_count,
      this._patterns.whitespace.whitespace_before_token
    );
    return u;
  }, _.prototype._readWhitespace = function() {
    return this._patterns.whitespace.read();
  }, Tt.Tokenizer = _, Tt.TOKEN = a, Tt;
}
var ie = {};
var qe;
function fe() {
  if (qe)
    return ie;
  qe = 1;
  function n(i, e) {
    i = typeof i == "string" ? i : i.source, e = typeof e == "string" ? e : e.source, this.__directives_block_pattern = new RegExp(i + / beautify( \w+[:]\w+)+ /.source + e, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern = new RegExp(i + /\sbeautify\signore:end\s/.source + e, "g");
  }
  return n.prototype.get_directives = function(i) {
    if (!i.match(this.__directives_block_pattern))
      return null;
    var e = {};
    this.__directive_pattern.lastIndex = 0;
    for (var t = this.__directive_pattern.exec(i); t; )
      e[t[1]] = t[2], t = this.__directive_pattern.exec(i);
    return e;
  }, n.prototype.readIgnored = function(i) {
    return i.readUntilAfter(this.__directives_end_ignore_pattern);
  }, ie.Directives = n, ie;
}
var ne = {};
var Ve;
function xi() {
  if (Ve)
    return ne;
  Ve = 1;
  var n = Bt().Pattern, i = {
    django: false,
    erb: false,
    handlebars: false,
    php: false,
    smarty: false,
    angular: false
  };
  function e(t, a) {
    n.call(this, t, a), this.__template_pattern = null, this._disabled = Object.assign({}, i), this._excluded = Object.assign({}, i), a && (this.__template_pattern = this._input.get_regexp(a.__template_pattern), this._excluded = Object.assign(this._excluded, a._excluded), this._disabled = Object.assign(this._disabled, a._disabled));
    var _ = new n(t);
    this.__patterns = {
      handlebars_comment: _.starting_with(/{{!--/).until_after(/--}}/),
      handlebars_unescaped: _.starting_with(/{{{/).until_after(/}}}/),
      handlebars: _.starting_with(/{{/).until_after(/}}/),
      php: _.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
      erb: _.starting_with(/<%[^%]/).until_after(/[^%]%>/),
      django: _.starting_with(/{%/).until_after(/%}/),
      django_value: _.starting_with(/{{/).until_after(/}}/),
      django_comment: _.starting_with(/{#/).until_after(/#}/),
      smarty: _.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
      smarty_comment: _.starting_with(/{\*/).until_after(/\*}/),
      smarty_literal: _.starting_with(/{literal}/).until_after(/{\/literal}/)
    };
  }
  return e.prototype = new n(), e.prototype._create = function() {
    return new e(this._input, this);
  }, e.prototype._update = function() {
    this.__set_templated_pattern();
  }, e.prototype.disable = function(t) {
    var a = this._create();
    return a._disabled[t] = true, a._update(), a;
  }, e.prototype.read_options = function(t) {
    var a = this._create();
    for (var _ in i)
      a._disabled[_] = t.templating.indexOf(_) === -1;
    return a._update(), a;
  }, e.prototype.exclude = function(t) {
    var a = this._create();
    return a._excluded[t] = true, a._update(), a;
  }, e.prototype.read = function() {
    var t = "";
    this._match_pattern ? t = this._input.read(this._starting_pattern) : t = this._input.read(this._starting_pattern, this.__template_pattern);
    for (var a = this._read_template(); a; )
      this._match_pattern ? a += this._input.read(this._match_pattern) : a += this._input.readUntil(this.__template_pattern), t += a, a = this._read_template();
    return this._until_after && (t += this._input.readUntilAfter(this._until_pattern)), t;
  }, e.prototype.__set_templated_pattern = function() {
    var t = [];
    this._disabled.php || t.push(this.__patterns.php._starting_pattern.source), this._disabled.handlebars || t.push(this.__patterns.handlebars._starting_pattern.source), this._disabled.erb || t.push(this.__patterns.erb._starting_pattern.source), this._disabled.django || (t.push(this.__patterns.django._starting_pattern.source), t.push(this.__patterns.django_value._starting_pattern.source), t.push(this.__patterns.django_comment._starting_pattern.source)), this._disabled.smarty || t.push(this.__patterns.smarty._starting_pattern.source), this._until_pattern && t.push(this._until_pattern.source), this.__template_pattern = this._input.get_regexp("(?:" + t.join("|") + ")");
  }, e.prototype._read_template = function() {
    var t = "", a = this._input.peek();
    if (a === "<") {
      var _ = this._input.peek(1);
      !this._disabled.php && !this._excluded.php && _ === "?" && (t = t || this.__patterns.php.read()), !this._disabled.erb && !this._excluded.erb && _ === "%" && (t = t || this.__patterns.erb.read());
    } else
      a === "{" && (!this._disabled.handlebars && !this._excluded.handlebars && (t = t || this.__patterns.handlebars_comment.read(), t = t || this.__patterns.handlebars_unescaped.read(), t = t || this.__patterns.handlebars.read()), this._disabled.django || (!this._excluded.django && !this._excluded.handlebars && (t = t || this.__patterns.django_value.read()), this._excluded.django || (t = t || this.__patterns.django_comment.read(), t = t || this.__patterns.django.read())), this._disabled.smarty || this._disabled.django && this._disabled.handlebars && (t = t || this.__patterns.smarty_comment.read(), t = t || this.__patterns.smarty_literal.read(), t = t || this.__patterns.smarty.read()));
    return t;
  }, ne.TemplatablePattern = e, ne;
}
var Ge;
function kt() {
  if (Ge)
    return ct;
  Ge = 1;
  var n = ce().InputScanner, i = Dt().Tokenizer, e = Dt().TOKEN, t = fe().Directives, a = yi(), _ = Bt().Pattern, f = xi().TemplatablePattern;
  function o(l, m) {
    return m.indexOf(l) !== -1;
  }
  var u = {
    START_EXPR: "TK_START_EXPR",
    END_EXPR: "TK_END_EXPR",
    START_BLOCK: "TK_START_BLOCK",
    END_BLOCK: "TK_END_BLOCK",
    WORD: "TK_WORD",
    RESERVED: "TK_RESERVED",
    SEMICOLON: "TK_SEMICOLON",
    STRING: "TK_STRING",
    EQUALS: "TK_EQUALS",
    OPERATOR: "TK_OPERATOR",
    COMMA: "TK_COMMA",
    BLOCK_COMMENT: "TK_BLOCK_COMMENT",
    COMMENT: "TK_COMMENT",
    DOT: "TK_DOT",
    UNKNOWN: "TK_UNKNOWN",
    START: e.START,
    RAW: e.RAW,
    EOF: e.EOF
  }, g = new t(/\/\*/, /\*\//), v = /0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/, b = /[0-9]/, c = /[^\d\.]/, k = ">>> === !== &&= ??= ||= << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" "), C = ">>>= ... >>= <<= === >>> !== **= &&= ??= ||= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";
  C = C.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"), C = "\\?\\.(?!\\d) " + C, C = C.replace(/ /g, "|");
  var S = new RegExp(C), h = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","), r4 = h.concat(["do", "in", "of", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await", "from", "as", "class", "extends"]), d = new RegExp("^(?:" + r4.join("|") + ")$"), T, x = function(l, m) {
    i.call(this, l, m), this._patterns.whitespace = this._patterns.whitespace.matching(
      /\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,
      /\u2028\u2029/.source
    );
    var p2 = new _(this._input), O = new f(this._input).read_options(this._options);
    this.__patterns = {
      template: O,
      identifier: O.starting_with(a.identifier).matching(a.identifierMatch),
      number: p2.matching(v),
      punct: p2.matching(S),
      comment: p2.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
      block_comment: p2.starting_with(/\/\*/).until_after(/\*\//),
      html_comment_start: p2.matching(/<!--/),
      html_comment_end: p2.matching(/-->/),
      include: p2.starting_with(/#include/).until_after(a.lineBreak),
      shebang: p2.starting_with(/#!/).until_after(a.lineBreak),
      xml: p2.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[^}]+?}|!\[CDATA\[[^\]]*?\]\]|)(\s*{[^}]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{([^{}]|{[^}]+?})+?}))*\s*(\/?)\s*>/),
      single_quote: O.until(/['\\\n\r\u2028\u2029]/),
      double_quote: O.until(/["\\\n\r\u2028\u2029]/),
      template_text: O.until(/[`\\$]/),
      template_expression: O.until(/[`}\\]/)
    };
  };
  x.prototype = new i(), x.prototype._is_comment = function(l) {
    return l.type === u.COMMENT || l.type === u.BLOCK_COMMENT || l.type === u.UNKNOWN;
  }, x.prototype._is_opening = function(l) {
    return l.type === u.START_BLOCK || l.type === u.START_EXPR;
  }, x.prototype._is_closing = function(l, m) {
    return (l.type === u.END_BLOCK || l.type === u.END_EXPR) && m && (l.text === "]" && m.text === "[" || l.text === ")" && m.text === "(" || l.text === "}" && m.text === "{");
  }, x.prototype._reset = function() {
    T = false;
  }, x.prototype._get_next_token = function(l, m) {
    var p2 = null;
    this._readWhitespace();
    var O = this._input.peek();
    return O === null ? this._create_token(u.EOF, "") : (p2 = p2 || this._read_non_javascript(O), p2 = p2 || this._read_string(O), p2 = p2 || this._read_pair(O, this._input.peek(1)), p2 = p2 || this._read_word(l), p2 = p2 || this._read_singles(O), p2 = p2 || this._read_comment(O), p2 = p2 || this._read_regexp(O, l), p2 = p2 || this._read_xml(O, l), p2 = p2 || this._read_punctuation(), p2 = p2 || this._create_token(u.UNKNOWN, this._input.next()), p2);
  }, x.prototype._read_word = function(l) {
    var m;
    if (m = this.__patterns.identifier.read(), m !== "")
      return m = m.replace(a.allLineBreaks, `
`), !(l.type === u.DOT || l.type === u.RESERVED && (l.text === "set" || l.text === "get")) && d.test(m) ? (m === "in" || m === "of") && (l.type === u.WORD || l.type === u.STRING) ? this._create_token(u.OPERATOR, m) : this._create_token(u.RESERVED, m) : this._create_token(u.WORD, m);
    if (m = this.__patterns.number.read(), m !== "")
      return this._create_token(u.WORD, m);
  }, x.prototype._read_singles = function(l) {
    var m = null;
    return l === "(" || l === "[" ? m = this._create_token(u.START_EXPR, l) : l === ")" || l === "]" ? m = this._create_token(u.END_EXPR, l) : l === "{" ? m = this._create_token(u.START_BLOCK, l) : l === "}" ? m = this._create_token(u.END_BLOCK, l) : l === ";" ? m = this._create_token(u.SEMICOLON, l) : l === "." && c.test(this._input.peek(1)) ? m = this._create_token(u.DOT, l) : l === "," && (m = this._create_token(u.COMMA, l)), m && this._input.next(), m;
  }, x.prototype._read_pair = function(l, m) {
    var p2 = null;
    return l === "#" && m === "{" && (p2 = this._create_token(u.START_BLOCK, l + m)), p2 && (this._input.next(), this._input.next()), p2;
  }, x.prototype._read_punctuation = function() {
    var l = this.__patterns.punct.read();
    if (l !== "")
      return l === "=" ? this._create_token(u.EQUALS, l) : l === "?." ? this._create_token(u.DOT, l) : this._create_token(u.OPERATOR, l);
  }, x.prototype._read_non_javascript = function(l) {
    var m = "";
    if (l === "#") {
      if (this._is_first_token() && (m = this.__patterns.shebang.read(), m))
        return this._create_token(u.UNKNOWN, m.trim() + `
`);
      if (m = this.__patterns.include.read(), m)
        return this._create_token(u.UNKNOWN, m.trim() + `
`);
      l = this._input.next();
      var p2 = "#";
      if (this._input.hasNext() && this._input.testChar(b)) {
        do
          l = this._input.next(), p2 += l;
        while (this._input.hasNext() && l !== "#" && l !== "=");
        return l === "#" || (this._input.peek() === "[" && this._input.peek(1) === "]" ? (p2 += "[]", this._input.next(), this._input.next()) : this._input.peek() === "{" && this._input.peek(1) === "}" && (p2 += "{}", this._input.next(), this._input.next())), this._create_token(u.WORD, p2);
      }
      this._input.back();
    } else if (l === "<" && this._is_first_token()) {
      if (m = this.__patterns.html_comment_start.read(), m) {
        for (; this._input.hasNext() && !this._input.testChar(a.newline); )
          m += this._input.next();
        return T = true, this._create_token(u.COMMENT, m);
      }
    } else if (T && l === "-" && (m = this.__patterns.html_comment_end.read(), m))
      return T = false, this._create_token(u.COMMENT, m);
    return null;
  }, x.prototype._read_comment = function(l) {
    var m = null;
    if (l === "/") {
      var p2 = "";
      if (this._input.peek(1) === "*") {
        p2 = this.__patterns.block_comment.read();
        var O = g.get_directives(p2);
        O && O.ignore === "start" && (p2 += g.readIgnored(this._input)), p2 = p2.replace(a.allLineBreaks, `
`), m = this._create_token(u.BLOCK_COMMENT, p2), m.directives = O;
      } else
        this._input.peek(1) === "/" && (p2 = this.__patterns.comment.read(), m = this._create_token(u.COMMENT, p2));
    }
    return m;
  }, x.prototype._read_string = function(l) {
    if (l === "`" || l === "'" || l === '"') {
      var m = this._input.next();
      return this.has_char_escapes = false, l === "`" ? m += this._read_string_recursive("`", true, "${") : m += this._read_string_recursive(l), this.has_char_escapes && this._options.unescape_strings && (m = E(m)), this._input.peek() === l && (m += this._input.next()), m = m.replace(a.allLineBreaks, `
`), this._create_token(u.STRING, m);
    }
    return null;
  }, x.prototype._allow_regexp_or_xml = function(l) {
    return l.type === u.RESERVED && o(l.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || l.type === u.END_EXPR && l.text === ")" && l.opened.previous.type === u.RESERVED && o(l.opened.previous.text, ["if", "while", "for"]) || o(l.type, [
      u.COMMENT,
      u.START_EXPR,
      u.START_BLOCK,
      u.START,
      u.END_BLOCK,
      u.OPERATOR,
      u.EQUALS,
      u.EOF,
      u.SEMICOLON,
      u.COMMA
    ]);
  }, x.prototype._read_regexp = function(l, m) {
    if (l === "/" && this._allow_regexp_or_xml(m)) {
      for (var p2 = this._input.next(), O = false, s = false; this._input.hasNext() && (O || s || this._input.peek() !== l) && !this._input.testChar(a.newline); )
        p2 += this._input.peek(), O ? O = false : (O = this._input.peek() === "\\", this._input.peek() === "[" ? s = true : this._input.peek() === "]" && (s = false)), this._input.next();
      return this._input.peek() === l && (p2 += this._input.next(), p2 += this._input.read(a.identifier)), this._create_token(u.STRING, p2);
    }
    return null;
  }, x.prototype._read_xml = function(l, m) {
    if (this._options.e4x && l === "<" && this._allow_regexp_or_xml(m)) {
      var p2 = "", O = this.__patterns.xml.read_match();
      if (O) {
        for (var s = O[2].replace(/^{\s+/, "{").replace(/\s+}$/, "}"), y = s.indexOf("{") === 0, w = 0; O; ) {
          var A = !!O[1], N = O[2], j = !!O[O.length - 1] || N.slice(0, 8) === "![CDATA[";
          if (!j && (N === s || y && N.replace(/^{\s+/, "{").replace(/\s+}$/, "}")) && (A ? --w : ++w), p2 += O[0], w <= 0)
            break;
          O = this.__patterns.xml.read_match();
        }
        return O || (p2 += this._input.match(/[\s\S]*/g)[0]), p2 = p2.replace(a.allLineBreaks, `
`), this._create_token(u.STRING, p2);
      }
    }
    return null;
  };
  function E(l) {
    for (var m = "", p2 = 0, O = new n(l), s = null; O.hasNext(); )
      if (s = O.match(/([\s]|[^\\]|\\\\)+/g), s && (m += s[0]), O.peek() === "\\") {
        if (O.next(), O.peek() === "x")
          s = O.match(/x([0-9A-Fa-f]{2})/g);
        else if (O.peek() === "u")
          s = O.match(/u([0-9A-Fa-f]{4})/g), s || (s = O.match(/u\{([0-9A-Fa-f]+)\}/g));
        else {
          m += "\\", O.hasNext() && (m += O.next());
          continue;
        }
        if (!s || (p2 = parseInt(s[1], 16), p2 > 126 && p2 <= 255 && s[0].indexOf("x") === 0))
          return l;
        p2 >= 0 && p2 < 32 || p2 > 1114111 ? m += "\\" + s[0] : p2 === 34 || p2 === 39 || p2 === 92 ? m += "\\" + String.fromCharCode(p2) : m += String.fromCharCode(p2);
      }
    return m;
  }
  return x.prototype._read_string_recursive = function(l, m, p2) {
    var O, s;
    l === "'" ? s = this.__patterns.single_quote : l === '"' ? s = this.__patterns.double_quote : l === "`" ? s = this.__patterns.template_text : l === "}" && (s = this.__patterns.template_expression);
    for (var y = s.read(), w = ""; this._input.hasNext(); ) {
      if (w = this._input.next(), w === l || !m && a.newline.test(w)) {
        this._input.back();
        break;
      } else
        w === "\\" && this._input.hasNext() ? (O = this._input.peek(), O === "x" || O === "u" ? this.has_char_escapes = true : O === "\r" && this._input.peek(1) === `
` && this._input.next(), w += this._input.next()) : p2 && (p2 === "${" && w === "$" && this._input.peek() === "{" && (w += this._input.next()), p2 === w && (l === "`" ? w += this._read_string_recursive("}", m, "`") : w += this._read_string_recursive("`", m, "${"), this._input.hasNext() && (w += this._input.next())));
      w += s.read(), y += w;
    }
    return y;
  }, ct.Tokenizer = x, ct.TOKEN = u, ct.positionable_operators = k.slice(), ct.line_starters = h.slice(), ct;
}
var He;
function pn() {
  if (He)
    return Gt;
  He = 1;
  var n = pe().Output, i = bi().Token, e = yi(), t = wi().Options, a = kt().Tokenizer, _ = kt().line_starters, f = kt().positionable_operators, o = kt().TOKEN;
  function u(s, y) {
    return y.indexOf(s) !== -1;
  }
  function g(s) {
    return s.replace(/^\s+/g, "");
  }
  function v(s) {
    for (var y = {}, w = 0; w < s.length; w++)
      y[s[w].replace(/-/g, "_")] = s[w];
    return y;
  }
  function b(s, y) {
    return s && s.type === o.RESERVED && s.text === y;
  }
  function c(s, y) {
    return s && s.type === o.RESERVED && u(s.text, y);
  }
  var k = ["case", "return", "do", "if", "throw", "else", "await", "break", "continue", "async"], C = ["before-newline", "after-newline", "preserve-newline"], S = v(C), h = [S.before_newline, S.preserve_newline], r4 = {
    BlockStatement: "BlockStatement",
    Statement: "Statement",
    ObjectLiteral: "ObjectLiteral",
    ArrayLiteral: "ArrayLiteral",
    ForInitializer: "ForInitializer",
    Conditional: "Conditional",
    Expression: "Expression"
  };
  function d(s, y) {
    y.multiline_frame || y.mode === r4.ForInitializer || y.mode === r4.Conditional || s.remove_indent(y.start_line_index);
  }
  function T(s) {
    s = s.replace(e.allLineBreaks, `
`);
    for (var y = [], w = s.indexOf(`
`); w !== -1; )
      y.push(s.substring(0, w)), s = s.substring(w + 1), w = s.indexOf(`
`);
    return s.length && y.push(s), y;
  }
  function x(s) {
    return s === r4.ArrayLiteral;
  }
  function E(s) {
    return u(s, [r4.Expression, r4.ForInitializer, r4.Conditional]);
  }
  function l(s, y) {
    for (var w = 0; w < s.length; w++) {
      var A = s[w].trim();
      if (A.charAt(0) !== y)
        return false;
    }
    return true;
  }
  function m(s, y) {
    for (var w = 0, A = s.length, N; w < A; w++)
      if (N = s[w], N && N.indexOf(y) !== 0)
        return false;
    return true;
  }
  function p2(s, y) {
    y = y || {}, this._source_text = s || "", this._output = null, this._tokens = null, this._last_last_text = null, this._flags = null, this._previous_flags = null, this._flag_store = null, this._options = new t(y);
  }
  p2.prototype.create_flags = function(s, y) {
    var w = 0;
    s && (w = s.indentation_level, !this._output.just_added_newline() && s.line_indent_level > w && (w = s.line_indent_level));
    var A = {
      mode: y,
      parent: s,
      last_token: s ? s.last_token : new i(o.START_BLOCK, ""),
      last_word: s ? s.last_word : "",
      declaration_statement: false,
      declaration_assignment: false,
      multiline_frame: false,
      inline_frame: false,
      if_block: false,
      else_block: false,
      class_start_block: false,
      do_block: false,
      do_while: false,
      import_block: false,
      in_case_statement: false,
      in_case: false,
      case_body: false,
      case_block: false,
      indentation_level: w,
      alignment: 0,
      line_indent_level: s ? s.line_indent_level : w,
      start_line_index: this._output.get_line_number(),
      ternary_depth: 0
    };
    return A;
  }, p2.prototype._reset = function(s) {
    var y = s.match(/^[\t ]*/)[0];
    this._last_last_text = "", this._output = new n(this._options, y), this._output.raw = this._options.test_output_raw, this._flag_store = [], this.set_mode(r4.BlockStatement);
    var w = new a(s, this._options);
    return this._tokens = w.tokenize(), s;
  }, p2.prototype.beautify = function() {
    if (this._options.disabled)
      return this._source_text;
    var s, y = this._reset(this._source_text), w = this._options.eol;
    this._options.eol === "auto" && (w = `
`, y && e.lineBreak.test(y || "") && (w = y.match(e.lineBreak)[0]));
    for (var A = this._tokens.next(); A; )
      this.handle_token(A), this._last_last_text = this._flags.last_token.text, this._flags.last_token = A, A = this._tokens.next();
    return s = this._output.get_code(w), s;
  }, p2.prototype.handle_token = function(s, y) {
    s.type === o.START_EXPR ? this.handle_start_expr(s) : s.type === o.END_EXPR ? this.handle_end_expr(s) : s.type === o.START_BLOCK ? this.handle_start_block(s) : s.type === o.END_BLOCK ? this.handle_end_block(s) : s.type === o.WORD ? this.handle_word(s) : s.type === o.RESERVED ? this.handle_word(s) : s.type === o.SEMICOLON ? this.handle_semicolon(s) : s.type === o.STRING ? this.handle_string(s) : s.type === o.EQUALS ? this.handle_equals(s) : s.type === o.OPERATOR ? this.handle_operator(s) : s.type === o.COMMA ? this.handle_comma(s) : s.type === o.BLOCK_COMMENT ? this.handle_block_comment(s, y) : s.type === o.COMMENT ? this.handle_comment(s, y) : s.type === o.DOT ? this.handle_dot(s) : s.type === o.EOF ? this.handle_eof(s) : s.type === o.UNKNOWN ? this.handle_unknown(s, y) : this.handle_unknown(s, y);
  }, p2.prototype.handle_whitespace_and_comments = function(s, y) {
    var w = s.newlines, A = this._options.keep_array_indentation && x(this._flags.mode);
    if (s.comments_before)
      for (var N = s.comments_before.next(); N; )
        this.handle_whitespace_and_comments(N, y), this.handle_token(N, y), N = s.comments_before.next();
    if (A)
      for (var j = 0; j < w; j += 1)
        this.print_newline(j > 0, y);
    else if (this._options.max_preserve_newlines && w > this._options.max_preserve_newlines && (w = this._options.max_preserve_newlines), this._options.preserve_newlines && w > 1) {
      this.print_newline(false, y);
      for (var P = 1; P < w; P += 1)
        this.print_newline(true, y);
    }
  };
  var O = ["async", "break", "continue", "return", "throw", "yield"];
  return p2.prototype.allow_wrap_or_preserved_newline = function(s, y) {
    if (y = y === void 0 ? false : y, !this._output.just_added_newline()) {
      var w = this._options.preserve_newlines && s.newlines || y, A = u(this._flags.last_token.text, f) || u(s.text, f);
      if (A) {
        var N = u(this._flags.last_token.text, f) && u(this._options.operator_position, h) || u(s.text, f);
        w = w && N;
      }
      if (w)
        this.print_newline(false, true);
      else if (this._options.wrap_line_length) {
        if (c(this._flags.last_token, O))
          return;
        this._output.set_wrap_point();
      }
    }
  }, p2.prototype.print_newline = function(s, y) {
    if (!y && this._flags.last_token.text !== ";" && this._flags.last_token.text !== "," && this._flags.last_token.text !== "=" && (this._flags.last_token.type !== o.OPERATOR || this._flags.last_token.text === "--" || this._flags.last_token.text === "++"))
      for (var w = this._tokens.peek(); this._flags.mode === r4.Statement && !(this._flags.if_block && b(w, "else")) && !this._flags.do_block; )
        this.restore_mode();
    this._output.add_new_line(s) && (this._flags.multiline_frame = true);
  }, p2.prototype.print_token_line_indentation = function(s) {
    this._output.just_added_newline() && (this._options.keep_array_indentation && s.newlines && (s.text === "[" || x(this._flags.mode)) ? (this._output.current_line.set_indent(-1), this._output.current_line.push(s.whitespace_before), this._output.space_before_token = false) : this._output.set_indent(this._flags.indentation_level, this._flags.alignment) && (this._flags.line_indent_level = this._flags.indentation_level));
  }, p2.prototype.print_token = function(s) {
    if (this._output.raw) {
      this._output.add_raw_token(s);
      return;
    }
    if (this._options.comma_first && s.previous && s.previous.type === o.COMMA && this._output.just_added_newline() && this._output.previous_line.last() === ",") {
      var y = this._output.previous_line.pop();
      this._output.previous_line.is_empty() && (this._output.previous_line.push(y), this._output.trim(true), this._output.current_line.pop(), this._output.trim()), this.print_token_line_indentation(s), this._output.add_token(","), this._output.space_before_token = true;
    }
    this.print_token_line_indentation(s), this._output.non_breaking_space = true, this._output.add_token(s.text), this._output.previous_token_wrapped && (this._flags.multiline_frame = true);
  }, p2.prototype.indent = function() {
    this._flags.indentation_level += 1, this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }, p2.prototype.deindent = function() {
    this._flags.indentation_level > 0 && (!this._flags.parent || this._flags.indentation_level > this._flags.parent.indentation_level) && (this._flags.indentation_level -= 1, this._output.set_indent(this._flags.indentation_level, this._flags.alignment));
  }, p2.prototype.set_mode = function(s) {
    this._flags ? (this._flag_store.push(this._flags), this._previous_flags = this._flags) : this._previous_flags = this.create_flags(null, s), this._flags = this.create_flags(this._previous_flags, s), this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }, p2.prototype.restore_mode = function() {
    this._flag_store.length > 0 && (this._previous_flags = this._flags, this._flags = this._flag_store.pop(), this._previous_flags.mode === r4.Statement && d(this._output, this._previous_flags), this._output.set_indent(this._flags.indentation_level, this._flags.alignment));
  }, p2.prototype.start_of_object_property = function() {
    return this._flags.parent.mode === r4.ObjectLiteral && this._flags.mode === r4.Statement && (this._flags.last_token.text === ":" && this._flags.ternary_depth === 0 || c(this._flags.last_token, ["get", "set"]));
  }, p2.prototype.start_of_statement = function(s) {
    var y = false;
    return y = y || c(this._flags.last_token, ["var", "let", "const"]) && s.type === o.WORD, y = y || b(this._flags.last_token, "do"), y = y || !(this._flags.parent.mode === r4.ObjectLiteral && this._flags.mode === r4.Statement) && c(this._flags.last_token, O) && !s.newlines, y = y || b(this._flags.last_token, "else") && !(b(s, "if") && !s.comments_before), y = y || this._flags.last_token.type === o.END_EXPR && (this._previous_flags.mode === r4.ForInitializer || this._previous_flags.mode === r4.Conditional), y = y || this._flags.last_token.type === o.WORD && this._flags.mode === r4.BlockStatement && !this._flags.in_case && !(s.text === "--" || s.text === "++") && this._last_last_text !== "function" && s.type !== o.WORD && s.type !== o.RESERVED, y = y || this._flags.mode === r4.ObjectLiteral && (this._flags.last_token.text === ":" && this._flags.ternary_depth === 0 || c(this._flags.last_token, ["get", "set"])), y ? (this.set_mode(r4.Statement), this.indent(), this.handle_whitespace_and_comments(s, true), this.start_of_object_property() || this.allow_wrap_or_preserved_newline(
      s,
      c(s, ["do", "for", "if", "while"])
    ), true) : false;
  }, p2.prototype.handle_start_expr = function(s) {
    this.start_of_statement(s) || this.handle_whitespace_and_comments(s);
    var y = r4.Expression;
    if (s.text === "[") {
      if (this._flags.last_token.type === o.WORD || this._flags.last_token.text === ")") {
        c(this._flags.last_token, _) && (this._output.space_before_token = true), this.print_token(s), this.set_mode(y), this.indent(), this._options.space_in_paren && (this._output.space_before_token = true);
        return;
      }
      y = r4.ArrayLiteral, x(this._flags.mode) && (this._flags.last_token.text === "[" || this._flags.last_token.text === "," && (this._last_last_text === "]" || this._last_last_text === "}")) && (this._options.keep_array_indentation || this.print_newline()), u(this._flags.last_token.type, [o.START_EXPR, o.END_EXPR, o.WORD, o.OPERATOR, o.DOT]) || (this._output.space_before_token = true);
    } else {
      if (this._flags.last_token.type === o.RESERVED)
        this._flags.last_token.text === "for" ? (this._output.space_before_token = this._options.space_before_conditional, y = r4.ForInitializer) : u(this._flags.last_token.text, ["if", "while", "switch"]) ? (this._output.space_before_token = this._options.space_before_conditional, y = r4.Conditional) : u(this._flags.last_word, ["await", "async"]) ? this._output.space_before_token = true : this._flags.last_token.text === "import" && s.whitespace_before === "" ? this._output.space_before_token = false : (u(this._flags.last_token.text, _) || this._flags.last_token.text === "catch") && (this._output.space_before_token = true);
      else if (this._flags.last_token.type === o.EQUALS || this._flags.last_token.type === o.OPERATOR)
        this.start_of_object_property() || this.allow_wrap_or_preserved_newline(s);
      else if (this._flags.last_token.type === o.WORD) {
        this._output.space_before_token = false;
        var w = this._tokens.peek(-3);
        if (this._options.space_after_named_function && w) {
          var A = this._tokens.peek(-4);
          c(w, ["async", "function"]) || w.text === "*" && c(A, ["async", "function"]) ? this._output.space_before_token = true : this._flags.mode === r4.ObjectLiteral ? (w.text === "{" || w.text === "," || w.text === "*" && (A.text === "{" || A.text === ",")) && (this._output.space_before_token = true) : this._flags.parent && this._flags.parent.class_start_block && (this._output.space_before_token = true);
        }
      } else
        this.allow_wrap_or_preserved_newline(s);
      (this._flags.last_token.type === o.RESERVED && (this._flags.last_word === "function" || this._flags.last_word === "typeof") || this._flags.last_token.text === "*" && (u(this._last_last_text, ["function", "yield"]) || this._flags.mode === r4.ObjectLiteral && u(this._last_last_text, ["{", ","]))) && (this._output.space_before_token = this._options.space_after_anon_function);
    }
    this._flags.last_token.text === ";" || this._flags.last_token.type === o.START_BLOCK ? this.print_newline() : (this._flags.last_token.type === o.END_EXPR || this._flags.last_token.type === o.START_EXPR || this._flags.last_token.type === o.END_BLOCK || this._flags.last_token.text === "." || this._flags.last_token.type === o.COMMA) && this.allow_wrap_or_preserved_newline(s, s.newlines), this.print_token(s), this.set_mode(y), this._options.space_in_paren && (this._output.space_before_token = true), this.indent();
  }, p2.prototype.handle_end_expr = function(s) {
    for (; this._flags.mode === r4.Statement; )
      this.restore_mode();
    this.handle_whitespace_and_comments(s), this._flags.multiline_frame && this.allow_wrap_or_preserved_newline(
      s,
      s.text === "]" && x(this._flags.mode) && !this._options.keep_array_indentation
    ), this._options.space_in_paren && (this._flags.last_token.type === o.START_EXPR && !this._options.space_in_empty_paren ? (this._output.trim(), this._output.space_before_token = false) : this._output.space_before_token = true), this.deindent(), this.print_token(s), this.restore_mode(), d(this._output, this._previous_flags), this._flags.do_while && this._previous_flags.mode === r4.Conditional && (this._previous_flags.mode = r4.Expression, this._flags.do_block = false, this._flags.do_while = false);
  }, p2.prototype.handle_start_block = function(s) {
    this.handle_whitespace_and_comments(s);
    var y = this._tokens.peek(), w = this._tokens.peek(1);
    this._flags.last_word === "switch" && this._flags.last_token.type === o.END_EXPR ? (this.set_mode(r4.BlockStatement), this._flags.in_case_statement = true) : this._flags.case_body ? this.set_mode(r4.BlockStatement) : w && (u(w.text, [":", ","]) && u(y.type, [o.STRING, o.WORD, o.RESERVED]) || u(y.text, ["get", "set", "..."]) && u(w.type, [o.WORD, o.RESERVED])) ? u(this._last_last_text, ["class", "interface"]) && !u(w.text, [":", ","]) ? this.set_mode(r4.BlockStatement) : this.set_mode(r4.ObjectLiteral) : this._flags.last_token.type === o.OPERATOR && this._flags.last_token.text === "=>" ? this.set_mode(r4.BlockStatement) : u(this._flags.last_token.type, [o.EQUALS, o.START_EXPR, o.COMMA, o.OPERATOR]) || c(this._flags.last_token, ["return", "throw", "import", "default"]) ? this.set_mode(r4.ObjectLiteral) : this.set_mode(r4.BlockStatement), this._flags.last_token && c(this._flags.last_token.previous, ["class", "extends"]) && (this._flags.class_start_block = true);
    var A = !y.comments_before && y.text === "}", N = A && this._flags.last_word === "function" && this._flags.last_token.type === o.END_EXPR;
    if (this._options.brace_preserve_inline) {
      var j = 0, P = null;
      this._flags.inline_frame = true;
      do
        if (j += 1, P = this._tokens.peek(j - 1), P.newlines) {
          this._flags.inline_frame = false;
          break;
        }
      while (P.type !== o.EOF && !(P.type === o.END_BLOCK && P.opened === s));
    }
    (this._options.brace_style === "expand" || this._options.brace_style === "none" && s.newlines) && !this._flags.inline_frame ? this._flags.last_token.type !== o.OPERATOR && (N || this._flags.last_token.type === o.EQUALS || c(this._flags.last_token, k) && this._flags.last_token.text !== "else") ? this._output.space_before_token = true : this.print_newline(false, true) : (x(this._previous_flags.mode) && (this._flags.last_token.type === o.START_EXPR || this._flags.last_token.type === o.COMMA) && ((this._flags.last_token.type === o.COMMA || this._options.space_in_paren) && (this._output.space_before_token = true), (this._flags.last_token.type === o.COMMA || this._flags.last_token.type === o.START_EXPR && this._flags.inline_frame) && (this.allow_wrap_or_preserved_newline(s), this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame, this._flags.multiline_frame = false)), this._flags.last_token.type !== o.OPERATOR && this._flags.last_token.type !== o.START_EXPR && (u(this._flags.last_token.type, [o.START_BLOCK, o.SEMICOLON]) && !this._flags.inline_frame ? this.print_newline() : this._output.space_before_token = true)), this.print_token(s), this.indent(), !A && !(this._options.brace_preserve_inline && this._flags.inline_frame) && this.print_newline();
  }, p2.prototype.handle_end_block = function(s) {
    for (this.handle_whitespace_and_comments(s); this._flags.mode === r4.Statement; )
      this.restore_mode();
    var y = this._flags.last_token.type === o.START_BLOCK;
    this._flags.inline_frame && !y ? this._output.space_before_token = true : this._options.brace_style === "expand" ? y || this.print_newline() : y || (x(this._flags.mode) && this._options.keep_array_indentation ? (this._options.keep_array_indentation = false, this.print_newline(), this._options.keep_array_indentation = true) : this.print_newline()), this.restore_mode(), this.print_token(s);
  }, p2.prototype.handle_word = function(s) {
    if (s.type === o.RESERVED) {
      if (u(s.text, ["set", "get"]) && this._flags.mode !== r4.ObjectLiteral)
        s.type = o.WORD;
      else if (s.text === "import" && u(this._tokens.peek().text, ["(", "."]))
        s.type = o.WORD;
      else if (u(s.text, ["as", "from"]) && !this._flags.import_block)
        s.type = o.WORD;
      else if (this._flags.mode === r4.ObjectLiteral) {
        var y = this._tokens.peek();
        y.text === ":" && (s.type = o.WORD);
      }
    }
    if (this.start_of_statement(s) ? c(this._flags.last_token, ["var", "let", "const"]) && s.type === o.WORD && (this._flags.declaration_statement = true) : s.newlines && !E(this._flags.mode) && (this._flags.last_token.type !== o.OPERATOR || this._flags.last_token.text === "--" || this._flags.last_token.text === "++") && this._flags.last_token.type !== o.EQUALS && (this._options.preserve_newlines || !c(this._flags.last_token, ["var", "let", "const", "set", "get"])) ? (this.handle_whitespace_and_comments(s), this.print_newline()) : this.handle_whitespace_and_comments(s), this._flags.do_block && !this._flags.do_while)
      if (b(s, "while")) {
        this._output.space_before_token = true, this.print_token(s), this._output.space_before_token = true, this._flags.do_while = true;
        return;
      } else
        this.print_newline(), this._flags.do_block = false;
    if (this._flags.if_block)
      if (!this._flags.else_block && b(s, "else"))
        this._flags.else_block = true;
      else {
        for (; this._flags.mode === r4.Statement; )
          this.restore_mode();
        this._flags.if_block = false, this._flags.else_block = false;
      }
    if (this._flags.in_case_statement && c(s, ["case", "default"])) {
      this.print_newline(), !this._flags.case_block && (this._flags.case_body || this._options.jslint_happy) && this.deindent(), this._flags.case_body = false, this.print_token(s), this._flags.in_case = true;
      return;
    }
    if ((this._flags.last_token.type === o.COMMA || this._flags.last_token.type === o.START_EXPR || this._flags.last_token.type === o.EQUALS || this._flags.last_token.type === o.OPERATOR) && !this.start_of_object_property() && !(u(this._flags.last_token.text, ["+", "-"]) && this._last_last_text === ":" && this._flags.parent.mode === r4.ObjectLiteral) && this.allow_wrap_or_preserved_newline(s), b(s, "function")) {
      (u(this._flags.last_token.text, ["}", ";"]) || this._output.just_added_newline() && !(u(this._flags.last_token.text, ["(", "[", "{", ":", "=", ","]) || this._flags.last_token.type === o.OPERATOR)) && !this._output.just_added_blankline() && !s.comments_before && (this.print_newline(), this.print_newline(true)), this._flags.last_token.type === o.RESERVED || this._flags.last_token.type === o.WORD ? c(this._flags.last_token, ["get", "set", "new", "export"]) || c(this._flags.last_token, O) ? this._output.space_before_token = true : b(this._flags.last_token, "default") && this._last_last_text === "export" ? this._output.space_before_token = true : this._flags.last_token.text === "declare" ? this._output.space_before_token = true : this.print_newline() : this._flags.last_token.type === o.OPERATOR || this._flags.last_token.text === "=" ? this._output.space_before_token = true : !this._flags.multiline_frame && (E(this._flags.mode) || x(this._flags.mode)) || this.print_newline(), this.print_token(s), this._flags.last_word = s.text;
      return;
    }
    var w = "NONE";
    if (this._flags.last_token.type === o.END_BLOCK ? this._previous_flags.inline_frame ? w = "SPACE" : c(s, ["else", "catch", "finally", "from"]) ? this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && s.newlines ? w = "NEWLINE" : (w = "SPACE", this._output.space_before_token = true) : w = "NEWLINE" : this._flags.last_token.type === o.SEMICOLON && this._flags.mode === r4.BlockStatement ? w = "NEWLINE" : this._flags.last_token.type === o.SEMICOLON && E(this._flags.mode) ? w = "SPACE" : this._flags.last_token.type === o.STRING ? w = "NEWLINE" : this._flags.last_token.type === o.RESERVED || this._flags.last_token.type === o.WORD || this._flags.last_token.text === "*" && (u(this._last_last_text, ["function", "yield"]) || this._flags.mode === r4.ObjectLiteral && u(this._last_last_text, ["{", ","])) ? w = "SPACE" : this._flags.last_token.type === o.START_BLOCK ? this._flags.inline_frame ? w = "SPACE" : w = "NEWLINE" : this._flags.last_token.type === o.END_EXPR && (this._output.space_before_token = true, w = "NEWLINE"), c(s, _) && this._flags.last_token.text !== ")" && (this._flags.inline_frame || this._flags.last_token.text === "else" || this._flags.last_token.text === "export" ? w = "SPACE" : w = "NEWLINE"), c(s, ["else", "catch", "finally"]))
      if ((!(this._flags.last_token.type === o.END_BLOCK && this._previous_flags.mode === r4.BlockStatement) || this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && s.newlines) && !this._flags.inline_frame)
        this.print_newline();
      else {
        this._output.trim(true);
        var A = this._output.current_line;
        A.last() !== "}" && this.print_newline(), this._output.space_before_token = true;
      }
    else
      w === "NEWLINE" ? c(this._flags.last_token, k) ? this._output.space_before_token = true : this._flags.last_token.text === "declare" && c(s, ["var", "let", "const"]) ? this._output.space_before_token = true : this._flags.last_token.type !== o.END_EXPR ? (this._flags.last_token.type !== o.START_EXPR || !c(s, ["var", "let", "const"])) && this._flags.last_token.text !== ":" && (b(s, "if") && b(s.previous, "else") ? this._output.space_before_token = true : this.print_newline()) : c(s, _) && this._flags.last_token.text !== ")" && this.print_newline() : this._flags.multiline_frame && x(this._flags.mode) && this._flags.last_token.text === "," && this._last_last_text === "}" ? this.print_newline() : w === "SPACE" && (this._output.space_before_token = true);
    s.previous && (s.previous.type === o.WORD || s.previous.type === o.RESERVED) && (this._output.space_before_token = true), this.print_token(s), this._flags.last_word = s.text, s.type === o.RESERVED && (s.text === "do" ? this._flags.do_block = true : s.text === "if" ? this._flags.if_block = true : s.text === "import" ? this._flags.import_block = true : this._flags.import_block && b(s, "from") && (this._flags.import_block = false));
  }, p2.prototype.handle_semicolon = function(s) {
    this.start_of_statement(s) ? this._output.space_before_token = false : this.handle_whitespace_and_comments(s);
    for (var y = this._tokens.peek(); this._flags.mode === r4.Statement && !(this._flags.if_block && b(y, "else")) && !this._flags.do_block; )
      this.restore_mode();
    this._flags.import_block && (this._flags.import_block = false), this.print_token(s);
  }, p2.prototype.handle_string = function(s) {
    s.text.startsWith("`") && s.newlines === 0 && s.whitespace_before === "" && (s.previous.text === ")" || this._flags.last_token.type === o.WORD) || (this.start_of_statement(s) ? this._output.space_before_token = true : (this.handle_whitespace_and_comments(s), this._flags.last_token.type === o.RESERVED || this._flags.last_token.type === o.WORD || this._flags.inline_frame ? this._output.space_before_token = true : this._flags.last_token.type === o.COMMA || this._flags.last_token.type === o.START_EXPR || this._flags.last_token.type === o.EQUALS || this._flags.last_token.type === o.OPERATOR ? this.start_of_object_property() || this.allow_wrap_or_preserved_newline(s) : s.text.startsWith("`") && this._flags.last_token.type === o.END_EXPR && (s.previous.text === "]" || s.previous.text === ")") && s.newlines === 0 ? this._output.space_before_token = true : this.print_newline())), this.print_token(s);
  }, p2.prototype.handle_equals = function(s) {
    this.start_of_statement(s) || this.handle_whitespace_and_comments(s), this._flags.declaration_statement && (this._flags.declaration_assignment = true), this._output.space_before_token = true, this.print_token(s), this._output.space_before_token = true;
  }, p2.prototype.handle_comma = function(s) {
    this.handle_whitespace_and_comments(s, true), this.print_token(s), this._output.space_before_token = true, this._flags.declaration_statement ? (E(this._flags.parent.mode) && (this._flags.declaration_assignment = false), this._flags.declaration_assignment ? (this._flags.declaration_assignment = false, this.print_newline(false, true)) : this._options.comma_first && this.allow_wrap_or_preserved_newline(s)) : this._flags.mode === r4.ObjectLiteral || this._flags.mode === r4.Statement && this._flags.parent.mode === r4.ObjectLiteral ? (this._flags.mode === r4.Statement && this.restore_mode(), this._flags.inline_frame || this.print_newline()) : this._options.comma_first && this.allow_wrap_or_preserved_newline(s);
  }, p2.prototype.handle_operator = function(s) {
    var y = s.text === "*" && (c(this._flags.last_token, ["function", "yield"]) || u(this._flags.last_token.type, [o.START_BLOCK, o.COMMA, o.END_BLOCK, o.SEMICOLON])), w = u(s.text, ["-", "+"]) && (u(this._flags.last_token.type, [o.START_BLOCK, o.START_EXPR, o.EQUALS, o.OPERATOR]) || u(this._flags.last_token.text, _) || this._flags.last_token.text === ",");
    if (!this.start_of_statement(s)) {
      var A = !y;
      this.handle_whitespace_and_comments(s, A);
    }
    if (s.text === "*" && this._flags.last_token.type === o.DOT) {
      this.print_token(s);
      return;
    }
    if (s.text === "::") {
      this.print_token(s);
      return;
    }
    if (u(s.text, ["-", "+"]) && this.start_of_object_property()) {
      this.print_token(s);
      return;
    }
    if (this._flags.last_token.type === o.OPERATOR && u(this._options.operator_position, h) && this.allow_wrap_or_preserved_newline(s), s.text === ":" && this._flags.in_case) {
      this.print_token(s), this._flags.in_case = false, this._flags.case_body = true, this._tokens.peek().type !== o.START_BLOCK ? (this.indent(), this.print_newline(), this._flags.case_block = false) : (this._flags.case_block = true, this._output.space_before_token = true);
      return;
    }
    var N = true, j = true, P = false;
    if (s.text === ":" ? this._flags.ternary_depth === 0 ? N = false : (this._flags.ternary_depth -= 1, P = true) : s.text === "?" && (this._flags.ternary_depth += 1), !w && !y && this._options.preserve_newlines && u(s.text, f)) {
      var F = s.text === ":", z = F && P, it = F && !P;
      switch (this._options.operator_position) {
        case S.before_newline:
          this._output.space_before_token = !it, this.print_token(s), (!F || z) && this.allow_wrap_or_preserved_newline(s), this._output.space_before_token = true;
          return;
        case S.after_newline:
          this._output.space_before_token = true, !F || z ? this._tokens.peek().newlines ? this.print_newline(false, true) : this.allow_wrap_or_preserved_newline(s) : this._output.space_before_token = false, this.print_token(s), this._output.space_before_token = true;
          return;
        case S.preserve_newline:
          it || this.allow_wrap_or_preserved_newline(s), N = !(this._output.just_added_newline() || it), this._output.space_before_token = N, this.print_token(s), this._output.space_before_token = true;
          return;
      }
    }
    if (y) {
      this.allow_wrap_or_preserved_newline(s), N = false;
      var R = this._tokens.peek();
      j = R && u(R.type, [o.WORD, o.RESERVED]);
    } else if (s.text === "...")
      this.allow_wrap_or_preserved_newline(s), N = this._flags.last_token.type === o.START_BLOCK, j = false;
    else if (u(s.text, ["--", "++", "!", "~"]) || w) {
      if ((this._flags.last_token.type === o.COMMA || this._flags.last_token.type === o.START_EXPR) && this.allow_wrap_or_preserved_newline(s), N = false, j = false, s.newlines && (s.text === "--" || s.text === "++" || s.text === "~")) {
        var M = c(this._flags.last_token, k) && s.newlines;
        M && (this._previous_flags.if_block || this._previous_flags.else_block) && this.restore_mode(), this.print_newline(M, true);
      }
      this._flags.last_token.text === ";" && E(this._flags.mode) && (N = true), this._flags.last_token.type === o.RESERVED ? N = true : this._flags.last_token.type === o.END_EXPR ? N = !(this._flags.last_token.text === "]" && (s.text === "--" || s.text === "++")) : this._flags.last_token.type === o.OPERATOR && (N = u(s.text, ["--", "-", "++", "+"]) && u(this._flags.last_token.text, ["--", "-", "++", "+"]), u(s.text, ["+", "-"]) && u(this._flags.last_token.text, ["--", "++"]) && (j = true)), (this._flags.mode === r4.BlockStatement && !this._flags.inline_frame || this._flags.mode === r4.Statement) && (this._flags.last_token.text === "{" || this._flags.last_token.text === ";") && this.print_newline();
    }
    this._output.space_before_token = this._output.space_before_token || N, this.print_token(s), this._output.space_before_token = j;
  }, p2.prototype.handle_block_comment = function(s, y) {
    if (this._output.raw) {
      this._output.add_raw_token(s), s.directives && s.directives.preserve === "end" && (this._output.raw = this._options.test_output_raw);
      return;
    }
    if (s.directives) {
      this.print_newline(false, y), this.print_token(s), s.directives.preserve === "start" && (this._output.raw = true), this.print_newline(false, true);
      return;
    }
    if (!e.newline.test(s.text) && !s.newlines) {
      this._output.space_before_token = true, this.print_token(s), this._output.space_before_token = true;
      return;
    } else
      this.print_block_commment(s, y);
  }, p2.prototype.print_block_commment = function(s, y) {
    var w = T(s.text), A, N = false, j = false, P = s.whitespace_before, F = P.length;
    if (this.print_newline(false, y), this.print_token_line_indentation(s), this._output.add_token(w[0]), this.print_newline(false, y), w.length > 1) {
      for (w = w.slice(1), N = l(w, "*"), j = m(w, P), N && (this._flags.alignment = 1), A = 0; A < w.length; A++)
        N ? (this.print_token_line_indentation(s), this._output.add_token(g(w[A]))) : j && w[A] ? (this.print_token_line_indentation(s), this._output.add_token(w[A].substring(F))) : (this._output.current_line.set_indent(-1), this._output.add_token(w[A])), this.print_newline(false, y);
      this._flags.alignment = 0;
    }
  }, p2.prototype.handle_comment = function(s, y) {
    s.newlines ? this.print_newline(false, y) : this._output.trim(true), this._output.space_before_token = true, this.print_token(s), this.print_newline(false, y);
  }, p2.prototype.handle_dot = function(s) {
    this.start_of_statement(s) || this.handle_whitespace_and_comments(s, true), this._flags.last_token.text.match("^[0-9]+$") && (this._output.space_before_token = true), c(this._flags.last_token, k) ? this._output.space_before_token = false : this.allow_wrap_or_preserved_newline(
      s,
      this._flags.last_token.text === ")" && this._options.break_chained_methods
    ), this._options.unindent_chained_methods && this._output.just_added_newline() && this.deindent(), this.print_token(s);
  }, p2.prototype.handle_unknown = function(s, y) {
    this.print_token(s), s.text[s.text.length - 1] === `
` && this.print_newline(false, y);
  }, p2.prototype.handle_eof = function(s) {
    for (; this._flags.mode === r4.Statement; )
      this.restore_mode();
    this.handle_whitespace_and_comments(s);
  }, Gt.Beautifier = p2, Gt;
}
var Xe;
function hn() {
  if (Xe)
    return Ot.exports;
  Xe = 1;
  var n = pn().Beautifier, i = wi().Options;
  function e(t, a) {
    var _ = new n(t, a);
    return _.beautify();
  }
  return Ot.exports = e, Ot.exports.defaultOptions = function() {
    return new i();
  }, Ot.exports;
}
var Rt = { exports: {} };
var se = {};
var re2 = {};
var Qe;
function Ei() {
  if (Qe)
    return re2;
  Qe = 1;
  var n = he().Options;
  function i(e) {
    n.call(this, e, "css"), this.selector_separator_newline = this._get_boolean("selector_separator_newline", true), this.newline_between_rules = this._get_boolean("newline_between_rules", true);
    var t = this._get_boolean("space_around_selector_separator");
    this.space_around_combinator = this._get_boolean("space_around_combinator") || t;
    var a = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
    this.brace_style = "collapse";
    for (var _ = 0; _ < a.length; _++)
      a[_] !== "expand" ? this.brace_style = "collapse" : this.brace_style = a[_];
  }
  return i.prototype = new n(), re2.Options = i, re2;
}
var Je;
function cn() {
  if (Je)
    return se;
  Je = 1;
  var n = Ei().Options, i = pe().Output, e = ce().InputScanner, t = fe().Directives, a = new t(/\/\*/, /\*\//), _ = /\r\n|[\r\n]/, f = /\r\n|[\r\n]/g, o = /\s/, u = /(?:\s|\n)+/g, g = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g, v = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
  function b(c, k) {
    this._source_text = c || "", this._options = new n(k), this._ch = null, this._input = null, this.NESTED_AT_RULE = {
      page: true,
      "font-face": true,
      keyframes: true,
      media: true,
      supports: true,
      document: true
    }, this.CONDITIONAL_GROUP_RULE = {
      media: true,
      supports: true,
      document: true
    }, this.NON_SEMICOLON_NEWLINE_PROPERTY = [
      "grid-template-areas",
      "grid-template"
    ];
  }
  return b.prototype.eatString = function(c) {
    var k = "";
    for (this._ch = this._input.next(); this._ch; ) {
      if (k += this._ch, this._ch === "\\")
        k += this._input.next();
      else if (c.indexOf(this._ch) !== -1 || this._ch === `
`)
        break;
      this._ch = this._input.next();
    }
    return k;
  }, b.prototype.eatWhitespace = function(c) {
    for (var k = o.test(this._input.peek()), C = 0; o.test(this._input.peek()); )
      this._ch = this._input.next(), c && this._ch === `
` && (C === 0 || C < this._options.max_preserve_newlines) && (C++, this._output.add_new_line(true));
    return k;
  }, b.prototype.foundNestedPseudoClass = function() {
    for (var c = 0, k = 1, C = this._input.peek(k); C; ) {
      if (C === "{")
        return true;
      if (C === "(")
        c += 1;
      else if (C === ")") {
        if (c === 0)
          return false;
        c -= 1;
      } else if (C === ";" || C === "}")
        return false;
      k++, C = this._input.peek(k);
    }
    return false;
  }, b.prototype.print_string = function(c) {
    this._output.set_indent(this._indentLevel), this._output.non_breaking_space = true, this._output.add_token(c);
  }, b.prototype.preserveSingleSpace = function(c) {
    c && (this._output.space_before_token = true);
  }, b.prototype.indent = function() {
    this._indentLevel++;
  }, b.prototype.outdent = function() {
    this._indentLevel > 0 && this._indentLevel--;
  }, b.prototype.beautify = function() {
    if (this._options.disabled)
      return this._source_text;
    var c = this._source_text, k = this._options.eol;
    k === "auto" && (k = `
`, c && _.test(c || "") && (k = c.match(_)[0])), c = c.replace(f, `
`);
    var C = c.match(/^[\t ]*/)[0];
    this._output = new i(this._options, C), this._input = new e(c), this._indentLevel = 0, this._nestedLevel = 0, this._ch = null;
    for (var S = 0, h = false, r4 = false, d = false, T = false, x = false, E = this._ch, l = false, m, p2, O; m = this._input.read(u), p2 = m !== "", O = E, this._ch = this._input.next(), this._ch === "\\" && this._input.hasNext() && (this._ch += this._input.next()), E = this._ch, this._ch; )
      if (this._ch === "/" && this._input.peek() === "*") {
        this._output.add_new_line(), this._input.back();
        var s = this._input.read(g), y = a.get_directives(s);
        y && y.ignore === "start" && (s += a.readIgnored(this._input)), this.print_string(s), this.eatWhitespace(true), this._output.add_new_line();
      } else if (this._ch === "/" && this._input.peek() === "/")
        this._output.space_before_token = true, this._input.back(), this.print_string(this._input.read(v)), this.eatWhitespace(true);
      else if (this._ch === "$") {
        this.preserveSingleSpace(p2), this.print_string(this._ch);
        var w = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
        w.match(/[ :]$/) && (w = this.eatString(": ").replace(/\s+$/, ""), this.print_string(w), this._output.space_before_token = true), S === 0 && w.indexOf(":") !== -1 && (r4 = true, this.indent());
      } else if (this._ch === "@")
        if (this.preserveSingleSpace(p2), this._input.peek() === "{")
          this.print_string(this._ch + this.eatString("}"));
        else {
          this.print_string(this._ch);
          var A = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
          A.match(/[ :]$/) && (A = this.eatString(": ").replace(/\s+$/, ""), this.print_string(A), this._output.space_before_token = true), S === 0 && A.indexOf(":") !== -1 ? (r4 = true, this.indent()) : A in this.NESTED_AT_RULE ? (this._nestedLevel += 1, A in this.CONDITIONAL_GROUP_RULE && (d = true)) : S === 0 && !r4 && (T = true);
        }
      else if (this._ch === "#" && this._input.peek() === "{")
        this.preserveSingleSpace(p2), this.print_string(this._ch + this.eatString("}"));
      else if (this._ch === "{")
        r4 && (r4 = false, this.outdent()), T = false, d ? (d = false, h = this._indentLevel >= this._nestedLevel) : h = this._indentLevel >= this._nestedLevel - 1, this._options.newline_between_rules && h && this._output.previous_line && this._output.previous_line.item(-1) !== "{" && this._output.ensure_empty_line_above("/", ","), this._output.space_before_token = true, this._options.brace_style === "expand" ? (this._output.add_new_line(), this.print_string(this._ch), this.indent(), this._output.set_indent(this._indentLevel)) : (O === "(" ? this._output.space_before_token = false : O !== "," && this.indent(), this.print_string(this._ch)), this.eatWhitespace(true), this._output.add_new_line();
      else if (this._ch === "}")
        this.outdent(), this._output.add_new_line(), O === "{" && this._output.trim(true), r4 && (this.outdent(), r4 = false), this.print_string(this._ch), h = false, this._nestedLevel && this._nestedLevel--, this.eatWhitespace(true), this._output.add_new_line(), this._options.newline_between_rules && !this._output.just_added_blankline() && this._input.peek() !== "}" && this._output.add_new_line(true), this._input.peek() === ")" && (this._output.trim(true), this._options.brace_style === "expand" && this._output.add_new_line(true));
      else if (this._ch === ":") {
        for (var N = 0; N < this.NON_SEMICOLON_NEWLINE_PROPERTY.length; N++)
          if (this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[N])) {
            l = true;
            break;
          }
        (h || d) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !T && S === 0 ? (this.print_string(":"), r4 || (r4 = true, this._output.space_before_token = true, this.eatWhitespace(true), this.indent())) : (this._input.lookBack(" ") && (this._output.space_before_token = true), this._input.peek() === ":" ? (this._ch = this._input.next(), this.print_string("::")) : this.print_string(":"));
      } else if (this._ch === '"' || this._ch === "'") {
        var j = O === '"' || O === "'";
        this.preserveSingleSpace(j || p2), this.print_string(this._ch + this.eatString(this._ch)), this.eatWhitespace(true);
      } else if (this._ch === ";")
        l = false, S === 0 ? (r4 && (this.outdent(), r4 = false), T = false, this.print_string(this._ch), this.eatWhitespace(true), this._input.peek() !== "/" && this._output.add_new_line()) : (this.print_string(this._ch), this.eatWhitespace(true), this._output.space_before_token = true);
      else if (this._ch === "(")
        if (this._input.lookBack("url"))
          this.print_string(this._ch), this.eatWhitespace(), S++, this.indent(), this._ch = this._input.next(), this._ch === ")" || this._ch === '"' || this._ch === "'" ? this._input.back() : this._ch && (this.print_string(this._ch + this.eatString(")")), S && (S--, this.outdent()));
        else {
          var P = false;
          this._input.lookBack("with") && (P = true), this.preserveSingleSpace(p2 || P), this.print_string(this._ch), r4 && O === "$" && this._options.selector_separator_newline ? (this._output.add_new_line(), x = true) : (this.eatWhitespace(), S++, this.indent());
        }
      else if (this._ch === ")")
        S && (S--, this.outdent()), x && this._input.peek() === ";" && this._options.selector_separator_newline && (x = false, this.outdent(), this._output.add_new_line()), this.print_string(this._ch);
      else if (this._ch === ",")
        this.print_string(this._ch), this.eatWhitespace(true), this._options.selector_separator_newline && (!r4 || x) && S === 0 && !T ? this._output.add_new_line() : this._output.space_before_token = true;
      else if ((this._ch === ">" || this._ch === "+" || this._ch === "~") && !r4 && S === 0)
        this._options.space_around_combinator ? (this._output.space_before_token = true, this.print_string(this._ch), this._output.space_before_token = true) : (this.print_string(this._ch), this.eatWhitespace(), this._ch && o.test(this._ch) && (this._ch = ""));
      else if (this._ch === "]")
        this.print_string(this._ch);
      else if (this._ch === "[")
        this.preserveSingleSpace(p2), this.print_string(this._ch);
      else if (this._ch === "=")
        this.eatWhitespace(), this.print_string("="), o.test(this._ch) && (this._ch = "");
      else if (this._ch === "!" && !this._input.lookBack("\\"))
        this._output.space_before_token = true, this.print_string(this._ch);
      else {
        var F = O === '"' || O === "'";
        this.preserveSingleSpace(F || p2), this.print_string(this._ch), !this._output.just_added_newline() && this._input.peek() === `
` && l && this._output.add_new_line();
      }
    var z = this._output.get_code(k);
    return z;
  }, se.Beautifier = b, se;
}
var Ze;
function fn() {
  if (Ze)
    return Rt.exports;
  Ze = 1;
  var n = cn().Beautifier, i = Ei().Options;
  function e(t, a) {
    var _ = new n(t, a);
    return _.beautify();
  }
  return Rt.exports = e, Rt.exports.defaultOptions = function() {
    return new i();
  }, Rt.exports;
}
var St = { exports: {} };
var ae = {};
var oe = {};
var Ye;
function Oi() {
  if (Ye)
    return oe;
  Ye = 1;
  var n = he().Options;
  function i(e) {
    n.call(this, e, "html"), this.templating.length === 1 && this.templating[0] === "auto" && (this.templating = ["django", "erb", "handlebars", "php"]), this.indent_inner_html = this._get_boolean("indent_inner_html"), this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", true), this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", true), this.indent_handlebars = this._get_boolean("indent_handlebars", true), this.wrap_attributes = this._get_selection(
      "wrap_attributes",
      ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]
    ), this.wrap_attributes_min_attrs = this._get_number("wrap_attributes_min_attrs", 2), this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size), this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]), this.inline = this._get_array("inline", [
      "a",
      "abbr",
      "area",
      "audio",
      "b",
      "bdi",
      "bdo",
      "br",
      "button",
      "canvas",
      "cite",
      "code",
      "data",
      "datalist",
      "del",
      "dfn",
      "em",
      "embed",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "map",
      "mark",
      "math",
      "meter",
      "noscript",
      "object",
      "output",
      "progress",
      "q",
      "ruby",
      "s",
      "samp",
      "select",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "svg",
      "template",
      "textarea",
      "time",
      "u",
      "var",
      "video",
      "wbr",
      "text",
      "acronym",
      "big",
      "strike",
      "tt"
    ]), this.inline_custom_elements = this._get_boolean("inline_custom_elements", true), this.void_elements = this._get_array("void_elements", [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "menuitem",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
      "!doctype",
      "?xml",
      "basefont",
      "isindex"
    ]), this.unformatted = this._get_array("unformatted", []), this.content_unformatted = this._get_array("content_unformatted", [
      "pre",
      "textarea"
    ]), this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter"), this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"]);
  }
  return i.prototype = new n(), oe.Options = i, oe;
}
var Ct = {};
var ti;
function ei() {
  if (ti)
    return Ct;
  ti = 1;
  var n = Dt().Tokenizer, i = Dt().TOKEN, e = fe().Directives, t = xi().TemplatablePattern, a = Bt().Pattern, _ = {
    TAG_OPEN: "TK_TAG_OPEN",
    TAG_CLOSE: "TK_TAG_CLOSE",
    CONTROL_FLOW_OPEN: "TK_CONTROL_FLOW_OPEN",
    CONTROL_FLOW_CLOSE: "TK_CONTROL_FLOW_CLOSE",
    ATTRIBUTE: "TK_ATTRIBUTE",
    EQUALS: "TK_EQUALS",
    VALUE: "TK_VALUE",
    COMMENT: "TK_COMMENT",
    TEXT: "TK_TEXT",
    UNKNOWN: "TK_UNKNOWN",
    START: i.START,
    RAW: i.RAW,
    EOF: i.EOF
  }, f = new e(/<\!--/, /-->/), o = function(u, g) {
    n.call(this, u, g), this._current_tag_name = "";
    var v = new t(this._input).read_options(this._options), b = new a(this._input);
    if (this.__patterns = {
      word: v.until(/[\n\r\t <]/),
      word_control_flow_close_excluded: v.until(/[\n\r\t <}]/),
      single_quote: v.until_after(/'/),
      double_quote: v.until_after(/"/),
      attribute: v.until(/[\n\r\t =>]|\/>/),
      element_name: v.until(/[\n\r\t >\/]/),
      angular_control_flow_start: b.matching(/\@[a-zA-Z]+[^({]*[({]/),
      handlebars_comment: b.starting_with(/{{!--/).until_after(/--}}/),
      handlebars: b.starting_with(/{{/).until_after(/}}/),
      handlebars_open: b.until(/[\n\r\t }]/),
      handlebars_raw_close: b.until(/}}/),
      comment: b.starting_with(/<!--/).until_after(/-->/),
      cdata: b.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
      conditional_comment: b.starting_with(/<!\[/).until_after(/]>/),
      processing: b.starting_with(/<\?/).until_after(/\?>/)
    }, this._options.indent_handlebars && (this.__patterns.word = this.__patterns.word.exclude("handlebars"), this.__patterns.word_control_flow_close_excluded = this.__patterns.word_control_flow_close_excluded.exclude("handlebars")), this._unformatted_content_delimiter = null, this._options.unformatted_content_delimiter) {
      var c = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
      this.__patterns.unformatted_content_delimiter = b.matching(c).until_after(c);
    }
  };
  return o.prototype = new n(), o.prototype._is_comment = function(u) {
    return false;
  }, o.prototype._is_opening = function(u) {
    return u.type === _.TAG_OPEN || u.type === _.CONTROL_FLOW_OPEN;
  }, o.prototype._is_closing = function(u, g) {
    return u.type === _.TAG_CLOSE && g && ((u.text === ">" || u.text === "/>") && g.text[0] === "<" || u.text === "}}" && g.text[0] === "{" && g.text[1] === "{") || u.type === _.CONTROL_FLOW_CLOSE && u.text === "}" && g.text.endsWith("{");
  }, o.prototype._reset = function() {
    this._current_tag_name = "";
  }, o.prototype._get_next_token = function(u, g) {
    var v = null;
    this._readWhitespace();
    var b = this._input.peek();
    return b === null ? this._create_token(_.EOF, "") : (v = v || this._read_open_handlebars(b, g), v = v || this._read_attribute(b, u, g), v = v || this._read_close(b, g), v = v || this._read_control_flows(b, g), v = v || this._read_raw_content(b, u, g), v = v || this._read_content_word(b, g), v = v || this._read_comment_or_cdata(b), v = v || this._read_processing(b), v = v || this._read_open(b, g), v = v || this._create_token(_.UNKNOWN, this._input.next()), v);
  }, o.prototype._read_comment_or_cdata = function(u) {
    var g = null, v = null, b = null;
    if (u === "<") {
      var c = this._input.peek(1);
      c === "!" && (v = this.__patterns.comment.read(), v ? (b = f.get_directives(v), b && b.ignore === "start" && (v += f.readIgnored(this._input))) : v = this.__patterns.cdata.read()), v && (g = this._create_token(_.COMMENT, v), g.directives = b);
    }
    return g;
  }, o.prototype._read_processing = function(u) {
    var g = null, v = null, b = null;
    if (u === "<") {
      var c = this._input.peek(1);
      (c === "!" || c === "?") && (v = this.__patterns.conditional_comment.read(), v = v || this.__patterns.processing.read()), v && (g = this._create_token(_.COMMENT, v), g.directives = b);
    }
    return g;
  }, o.prototype._read_open = function(u, g) {
    var v = null, b = null;
    return (!g || g.type === _.CONTROL_FLOW_OPEN) && u === "<" && (v = this._input.next(), this._input.peek() === "/" && (v += this._input.next()), v += this.__patterns.element_name.read(), b = this._create_token(_.TAG_OPEN, v)), b;
  }, o.prototype._read_open_handlebars = function(u, g) {
    var v = null, b = null;
    return (!g || g.type === _.CONTROL_FLOW_OPEN) && this._options.indent_handlebars && u === "{" && this._input.peek(1) === "{" && (this._input.peek(2) === "!" ? (v = this.__patterns.handlebars_comment.read(), v = v || this.__patterns.handlebars.read(), b = this._create_token(_.COMMENT, v)) : (v = this.__patterns.handlebars_open.read(), b = this._create_token(_.TAG_OPEN, v))), b;
  }, o.prototype._read_control_flows = function(u, g) {
    var v = "", b = null;
    if (!this._options.templating.includes("angular") || !this._options.indent_handlebars)
      return b;
    if (u === "@") {
      if (v = this.__patterns.angular_control_flow_start.read(), v === "")
        return b;
      for (var c = v.endsWith("(") ? 1 : 0, k = 0; !(v.endsWith("{") && c === k); ) {
        var C = this._input.next();
        if (C === null)
          break;
        C === "(" ? c++ : C === ")" && k++, v += C;
      }
      b = this._create_token(_.CONTROL_FLOW_OPEN, v);
    } else
      u === "}" && g && g.type === _.CONTROL_FLOW_OPEN && (v = this._input.next(), b = this._create_token(_.CONTROL_FLOW_CLOSE, v));
    return b;
  }, o.prototype._read_close = function(u, g) {
    var v = null, b = null;
    return g && g.type === _.TAG_OPEN && (g.text[0] === "<" && (u === ">" || u === "/" && this._input.peek(1) === ">") ? (v = this._input.next(), u === "/" && (v += this._input.next()), b = this._create_token(_.TAG_CLOSE, v)) : g.text[0] === "{" && u === "}" && this._input.peek(1) === "}" && (this._input.next(), this._input.next(), b = this._create_token(_.TAG_CLOSE, "}}"))), b;
  }, o.prototype._read_attribute = function(u, g, v) {
    var b = null, c = "";
    if (v && v.text[0] === "<")
      if (u === "=")
        b = this._create_token(_.EQUALS, this._input.next());
      else if (u === '"' || u === "'") {
        var k = this._input.next();
        u === '"' ? k += this.__patterns.double_quote.read() : k += this.__patterns.single_quote.read(), b = this._create_token(_.VALUE, k);
      } else
        c = this.__patterns.attribute.read(), c && (g.type === _.EQUALS ? b = this._create_token(_.VALUE, c) : b = this._create_token(_.ATTRIBUTE, c));
    return b;
  }, o.prototype._is_content_unformatted = function(u) {
    return this._options.void_elements.indexOf(u) === -1 && (this._options.content_unformatted.indexOf(u) !== -1 || this._options.unformatted.indexOf(u) !== -1);
  }, o.prototype._read_raw_content = function(u, g, v) {
    var b = "";
    if (v && v.text[0] === "{")
      b = this.__patterns.handlebars_raw_close.read();
    else if (g.type === _.TAG_CLOSE && g.opened.text[0] === "<" && g.text[0] !== "/") {
      var c = g.opened.text.substr(1).toLowerCase();
      if (c === "script" || c === "style") {
        var k = this._read_comment_or_cdata(u);
        if (k)
          return k.type = _.TEXT, k;
        b = this._input.readUntil(new RegExp("</" + c + "[\\n\\r\\t ]*?>", "ig"));
      } else
        this._is_content_unformatted(c) && (b = this._input.readUntil(new RegExp("</" + c + "[\\n\\r\\t ]*?>", "ig")));
    }
    return b ? this._create_token(_.TEXT, b) : null;
  }, o.prototype._read_content_word = function(u, g) {
    var v = "";
    if (this._options.unformatted_content_delimiter && u === this._options.unformatted_content_delimiter[0] && (v = this.__patterns.unformatted_content_delimiter.read()), v || (v = g && g.type === _.CONTROL_FLOW_OPEN ? this.__patterns.word_control_flow_close_excluded.read() : this.__patterns.word.read()), v)
      return this._create_token(_.TEXT, v);
  }, Ct.Tokenizer = o, Ct.TOKEN = _, Ct;
}
var ii;
function dn() {
  if (ii)
    return ae;
  ii = 1;
  var n = Oi().Options, i = pe().Output, e = ei().Tokenizer, t = ei().TOKEN, a = /\r\n|[\r\n]/, _ = /\r\n|[\r\n]/g, f = function(h, r4) {
    this.indent_level = 0, this.alignment_size = 0, this.max_preserve_newlines = h.max_preserve_newlines, this.preserve_newlines = h.preserve_newlines, this._output = new i(h, r4);
  };
  f.prototype.current_line_has_match = function(h) {
    return this._output.current_line.has_match(h);
  }, f.prototype.set_space_before_token = function(h, r4) {
    this._output.space_before_token = h, this._output.non_breaking_space = r4;
  }, f.prototype.set_wrap_point = function() {
    this._output.set_indent(this.indent_level, this.alignment_size), this._output.set_wrap_point();
  }, f.prototype.add_raw_token = function(h) {
    this._output.add_raw_token(h);
  }, f.prototype.print_preserved_newlines = function(h) {
    var r4 = 0;
    h.type !== t.TEXT && h.previous.type !== t.TEXT && (r4 = h.newlines ? 1 : 0), this.preserve_newlines && (r4 = h.newlines < this.max_preserve_newlines + 1 ? h.newlines : this.max_preserve_newlines + 1);
    for (var d = 0; d < r4; d++)
      this.print_newline(d > 0);
    return r4 !== 0;
  }, f.prototype.traverse_whitespace = function(h) {
    return h.whitespace_before || h.newlines ? (this.print_preserved_newlines(h) || (this._output.space_before_token = true), true) : false;
  }, f.prototype.previous_token_wrapped = function() {
    return this._output.previous_token_wrapped;
  }, f.prototype.print_newline = function(h) {
    this._output.add_new_line(h);
  }, f.prototype.print_token = function(h) {
    h.text && (this._output.set_indent(this.indent_level, this.alignment_size), this._output.add_token(h.text));
  }, f.prototype.indent = function() {
    this.indent_level++;
  }, f.prototype.deindent = function() {
    this.indent_level > 0 && (this.indent_level--, this._output.set_indent(this.indent_level, this.alignment_size));
  }, f.prototype.get_full_indent = function(h) {
    return h = this.indent_level + (h || 0), h < 1 ? "" : this._output.get_indent_string(h);
  };
  var o = function(h) {
    for (var r4 = null, d = h.next; d.type !== t.EOF && h.closed !== d; ) {
      if (d.type === t.ATTRIBUTE && d.text === "type") {
        d.next && d.next.type === t.EQUALS && d.next.next && d.next.next.type === t.VALUE && (r4 = d.next.next.text);
        break;
      }
      d = d.next;
    }
    return r4;
  }, u = function(h, r4) {
    var d = null, T = null;
    return r4.closed ? (h === "script" ? d = "text/javascript" : h === "style" && (d = "text/css"), d = o(r4) || d, d.search("text/css") > -1 ? T = "css" : d.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1 ? T = "javascript" : d.search(/(text|application|dojo)\/(x-)?(html)/) > -1 ? T = "html" : d.search(/test\/null/) > -1 && (T = "null"), T) : null;
  };
  function g(h, r4) {
    return r4.indexOf(h) !== -1;
  }
  function v(h, r4, d) {
    this.parent = h || null, this.tag = r4 ? r4.tag_name : "", this.indent_level = d || 0, this.parser_token = r4 || null;
  }
  function b(h) {
    this._printer = h, this._current_frame = null;
  }
  b.prototype.get_parser_token = function() {
    return this._current_frame ? this._current_frame.parser_token : null;
  }, b.prototype.record_tag = function(h) {
    var r4 = new v(this._current_frame, h, this._printer.indent_level);
    this._current_frame = r4;
  }, b.prototype._try_pop_frame = function(h) {
    var r4 = null;
    return h && (r4 = h.parser_token, this._printer.indent_level = h.indent_level, this._current_frame = h.parent), r4;
  }, b.prototype._get_frame = function(h, r4) {
    for (var d = this._current_frame; d && h.indexOf(d.tag) === -1; ) {
      if (r4 && r4.indexOf(d.tag) !== -1) {
        d = null;
        break;
      }
      d = d.parent;
    }
    return d;
  }, b.prototype.try_pop = function(h, r4) {
    var d = this._get_frame([h], r4);
    return this._try_pop_frame(d);
  }, b.prototype.indent_to_tag = function(h) {
    var r4 = this._get_frame(h);
    r4 && (this._printer.indent_level = r4.indent_level);
  };
  function c(h, r4, d, T) {
    this._source_text = h || "", r4 = r4 || {}, this._js_beautify = d, this._css_beautify = T, this._tag_stack = null;
    var x = new n(r4, "html");
    this._options = x, this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 5) === "force", this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === "force-expand-multiline", this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === "force-aligned", this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === "aligned-multiple", this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 8) === "preserve", this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === "preserve-aligned";
  }
  c.prototype.beautify = function() {
    if (this._options.disabled)
      return this._source_text;
    var h = this._source_text, r4 = this._options.eol;
    this._options.eol === "auto" && (r4 = `
`, h && a.test(h) && (r4 = h.match(a)[0])), h = h.replace(_, `
`);
    var d = h.match(/^[\t ]*/)[0], T = {
      text: "",
      type: ""
    }, x = new k(), E = new f(this._options, d), l = new e(h, this._options).tokenize();
    this._tag_stack = new b(E);
    for (var m = null, p2 = l.next(); p2.type !== t.EOF; )
      p2.type === t.TAG_OPEN || p2.type === t.COMMENT ? (m = this._handle_tag_open(E, p2, x, T, l), x = m) : p2.type === t.ATTRIBUTE || p2.type === t.EQUALS || p2.type === t.VALUE || p2.type === t.TEXT && !x.tag_complete ? m = this._handle_inside_tag(E, p2, x, T) : p2.type === t.TAG_CLOSE ? m = this._handle_tag_close(E, p2, x) : p2.type === t.TEXT ? m = this._handle_text(E, p2, x) : p2.type === t.CONTROL_FLOW_OPEN ? m = this._handle_control_flow_open(E, p2) : p2.type === t.CONTROL_FLOW_CLOSE ? m = this._handle_control_flow_close(E, p2) : E.add_raw_token(p2), T = m, p2 = l.next();
    var O = E._output.get_code(r4);
    return O;
  }, c.prototype._handle_control_flow_open = function(h, r4) {
    var d = {
      text: r4.text,
      type: r4.type
    };
    return h.set_space_before_token(r4.newlines || r4.whitespace_before !== "", true), r4.newlines ? h.print_preserved_newlines(r4) : h.set_space_before_token(r4.newlines || r4.whitespace_before !== "", true), h.print_token(r4), h.indent(), d;
  }, c.prototype._handle_control_flow_close = function(h, r4) {
    var d = {
      text: r4.text,
      type: r4.type
    };
    return h.deindent(), r4.newlines ? h.print_preserved_newlines(r4) : h.set_space_before_token(r4.newlines || r4.whitespace_before !== "", true), h.print_token(r4), d;
  }, c.prototype._handle_tag_close = function(h, r4, d) {
    var T = {
      text: r4.text,
      type: r4.type
    };
    return h.alignment_size = 0, d.tag_complete = true, h.set_space_before_token(r4.newlines || r4.whitespace_before !== "", true), d.is_unformatted ? h.add_raw_token(r4) : (d.tag_start_char === "<" && (h.set_space_before_token(r4.text[0] === "/", true), this._is_wrap_attributes_force_expand_multiline && d.has_wrapped_attrs && h.print_newline(false)), h.print_token(r4)), d.indent_content && !(d.is_unformatted || d.is_content_unformatted) && (h.indent(), d.indent_content = false), !d.is_inline_element && !(d.is_unformatted || d.is_content_unformatted) && h.set_wrap_point(), T;
  }, c.prototype._handle_inside_tag = function(h, r4, d, T) {
    var x = d.has_wrapped_attrs, E = {
      text: r4.text,
      type: r4.type
    };
    return h.set_space_before_token(r4.newlines || r4.whitespace_before !== "", true), d.is_unformatted ? h.add_raw_token(r4) : d.tag_start_char === "{" && r4.type === t.TEXT ? h.print_preserved_newlines(r4) ? (r4.newlines = 0, h.add_raw_token(r4)) : h.print_token(r4) : (r4.type === t.ATTRIBUTE ? h.set_space_before_token(true) : (r4.type === t.EQUALS || r4.type === t.VALUE && r4.previous.type === t.EQUALS) && h.set_space_before_token(false), r4.type === t.ATTRIBUTE && d.tag_start_char === "<" && ((this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) && (h.traverse_whitespace(r4), x = x || r4.newlines !== 0), this._is_wrap_attributes_force && d.attr_count >= this._options.wrap_attributes_min_attrs && (T.type !== t.TAG_OPEN || this._is_wrap_attributes_force_expand_multiline) && (h.print_newline(false), x = true)), h.print_token(r4), x = x || h.previous_token_wrapped(), d.has_wrapped_attrs = x), E;
  }, c.prototype._handle_text = function(h, r4, d) {
    var T = {
      text: r4.text,
      type: "TK_CONTENT"
    };
    return d.custom_beautifier_name ? this._print_custom_beatifier_text(h, r4, d) : d.is_unformatted || d.is_content_unformatted ? h.add_raw_token(r4) : (h.traverse_whitespace(r4), h.print_token(r4)), T;
  }, c.prototype._print_custom_beatifier_text = function(h, r4, d) {
    var T = this;
    if (r4.text !== "") {
      var x = r4.text, E, l = 1, m = "", p2 = "";
      d.custom_beautifier_name === "javascript" && typeof this._js_beautify == "function" ? E = this._js_beautify : d.custom_beautifier_name === "css" && typeof this._css_beautify == "function" ? E = this._css_beautify : d.custom_beautifier_name === "html" && (E = function(N, j) {
        var P = new c(N, j, T._js_beautify, T._css_beautify);
        return P.beautify();
      }), this._options.indent_scripts === "keep" ? l = 0 : this._options.indent_scripts === "separate" && (l = -h.indent_level);
      var O = h.get_full_indent(l);
      if (x = x.replace(/\n[ \t]*$/, ""), d.custom_beautifier_name !== "html" && x[0] === "<" && x.match(/^(<!--|<!\[CDATA\[)/)) {
        var s = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(x);
        if (!s) {
          h.add_raw_token(r4);
          return;
        }
        m = O + s[1] + `
`, x = s[4], s[5] && (p2 = O + s[5]), x = x.replace(/\n[ \t]*$/, ""), (s[2] || s[3].indexOf(`
`) !== -1) && (s = s[3].match(/[ \t]+$/), s && (r4.whitespace_before = s[0]));
      }
      if (x)
        if (E) {
          var y = function() {
            this.eol = `
`;
          };
          y.prototype = this._options.raw_options;
          var w = new y();
          x = E(O + x, w);
        } else {
          var A = r4.whitespace_before;
          A && (x = x.replace(new RegExp(`
(` + A + ")?", "g"), `
`)), x = O + x.replace(/\n/g, `
` + O);
        }
      m && (x ? x = m + x + `
` + p2 : x = m + p2), h.print_newline(false), x && (r4.text = x, r4.whitespace_before = "", r4.newlines = 0, h.add_raw_token(r4), h.print_newline(true));
    }
  }, c.prototype._handle_tag_open = function(h, r4, d, T, x) {
    var E = this._get_tag_open_token(r4);
    if ((d.is_unformatted || d.is_content_unformatted) && !d.is_empty_element && r4.type === t.TAG_OPEN && !E.is_start_tag ? (h.add_raw_token(r4), E.start_tag_token = this._tag_stack.try_pop(E.tag_name)) : (h.traverse_whitespace(r4), this._set_tag_position(h, r4, E, d, T), E.is_inline_element || h.set_wrap_point(), h.print_token(r4)), E.is_start_tag && this._is_wrap_attributes_force) {
      var l = 0, m;
      do
        m = x.peek(l), m.type === t.ATTRIBUTE && (E.attr_count += 1), l += 1;
      while (m.type !== t.EOF && m.type !== t.TAG_CLOSE);
    }
    return (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) && (E.alignment_size = r4.text.length + 1), !E.tag_complete && !E.is_unformatted && (h.alignment_size = E.alignment_size), E;
  };
  var k = function(h, r4) {
    if (this.parent = h || null, this.text = "", this.type = "TK_TAG_OPEN", this.tag_name = "", this.is_inline_element = false, this.is_unformatted = false, this.is_content_unformatted = false, this.is_empty_element = false, this.is_start_tag = false, this.is_end_tag = false, this.indent_content = false, this.multiline_content = false, this.custom_beautifier_name = null, this.start_tag_token = null, this.attr_count = 0, this.has_wrapped_attrs = false, this.alignment_size = 0, this.tag_complete = false, this.tag_start_char = "", this.tag_check = "", !r4)
      this.tag_complete = true;
    else {
      var d;
      this.tag_start_char = r4.text[0], this.text = r4.text, this.tag_start_char === "<" ? (d = r4.text.match(/^<([^\s>]*)/), this.tag_check = d ? d[1] : "") : (d = r4.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/), this.tag_check = d ? d[1] : "", (r4.text.startsWith("{{#>") || r4.text.startsWith("{{~#>")) && this.tag_check[0] === ">" && (this.tag_check === ">" && r4.next !== null ? this.tag_check = r4.next.text.split(" ")[0] : this.tag_check = r4.text.split(">")[1])), this.tag_check = this.tag_check.toLowerCase(), r4.type === t.COMMENT && (this.tag_complete = true), this.is_start_tag = this.tag_check.charAt(0) !== "/", this.tag_name = this.is_start_tag ? this.tag_check : this.tag_check.substr(1), this.is_end_tag = !this.is_start_tag || r4.closed && r4.closed.text === "/>";
      var T = 2;
      this.tag_start_char === "{" && this.text.length >= 3 && this.text.charAt(2) === "~" && (T = 3), this.is_end_tag = this.is_end_tag || this.tag_start_char === "{" && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(T)));
    }
  };
  c.prototype._get_tag_open_token = function(h) {
    var r4 = new k(this._tag_stack.get_parser_token(), h);
    return r4.alignment_size = this._options.wrap_attributes_indent_size, r4.is_end_tag = r4.is_end_tag || g(r4.tag_check, this._options.void_elements), r4.is_empty_element = r4.tag_complete || r4.is_start_tag && r4.is_end_tag, r4.is_unformatted = !r4.tag_complete && g(r4.tag_check, this._options.unformatted), r4.is_content_unformatted = !r4.is_empty_element && g(r4.tag_check, this._options.content_unformatted), r4.is_inline_element = g(r4.tag_name, this._options.inline) || this._options.inline_custom_elements && r4.tag_name.includes("-") || r4.tag_start_char === "{", r4;
  }, c.prototype._set_tag_position = function(h, r4, d, T, x) {
    if (d.is_empty_element || (d.is_end_tag ? d.start_tag_token = this._tag_stack.try_pop(d.tag_name) : (this._do_optional_end_element(d) && (d.is_inline_element || h.print_newline(false)), this._tag_stack.record_tag(d), (d.tag_name === "script" || d.tag_name === "style") && !(d.is_unformatted || d.is_content_unformatted) && (d.custom_beautifier_name = u(d.tag_check, r4)))), g(d.tag_check, this._options.extra_liners) && (h.print_newline(false), h._output.just_added_blankline() || h.print_newline(true)), d.is_empty_element) {
      if (d.tag_start_char === "{" && d.tag_check === "else") {
        this._tag_stack.indent_to_tag(["if", "unless", "each"]), d.indent_content = true;
        var E = h.current_line_has_match(/{{#if/);
        E || h.print_newline(false);
      }
      d.tag_name === "!--" && x.type === t.TAG_CLOSE && T.is_end_tag && d.text.indexOf(`
`) === -1 || (d.is_inline_element || d.is_unformatted || h.print_newline(false), this._calcluate_parent_multiline(h, d));
    } else if (d.is_end_tag) {
      var l = false;
      l = d.start_tag_token && d.start_tag_token.multiline_content, l = l || !d.is_inline_element && !(T.is_inline_element || T.is_unformatted) && !(x.type === t.TAG_CLOSE && d.start_tag_token === T) && x.type !== "TK_CONTENT", (d.is_content_unformatted || d.is_unformatted) && (l = false), l && h.print_newline(false);
    } else
      d.indent_content = !d.custom_beautifier_name, d.tag_start_char === "<" && (d.tag_name === "html" ? d.indent_content = this._options.indent_inner_html : d.tag_name === "head" ? d.indent_content = this._options.indent_head_inner_html : d.tag_name === "body" && (d.indent_content = this._options.indent_body_inner_html)), !(d.is_inline_element || d.is_unformatted) && (x.type !== "TK_CONTENT" || d.is_content_unformatted) && h.print_newline(false), this._calcluate_parent_multiline(h, d);
  }, c.prototype._calcluate_parent_multiline = function(h, r4) {
    r4.parent && h._output.just_added_newline() && !((r4.is_inline_element || r4.is_unformatted) && r4.parent.is_inline_element) && (r4.parent.multiline_content = true);
  };
  var C = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "menu", "nav", "ol", "p", "pre", "section", "table", "ul"], S = ["a", "audio", "del", "ins", "map", "noscript", "video"];
  return c.prototype._do_optional_end_element = function(h) {
    var r4 = null;
    if (!(h.is_empty_element || !h.is_start_tag || !h.parent)) {
      if (h.tag_name === "body")
        r4 = r4 || this._tag_stack.try_pop("head");
      else if (h.tag_name === "li")
        r4 = r4 || this._tag_stack.try_pop("li", ["ol", "ul", "menu"]);
      else if (h.tag_name === "dd" || h.tag_name === "dt")
        r4 = r4 || this._tag_stack.try_pop("dt", ["dl"]), r4 = r4 || this._tag_stack.try_pop("dd", ["dl"]);
      else if (h.parent.tag_name === "p" && C.indexOf(h.tag_name) !== -1) {
        var d = h.parent.parent;
        (!d || S.indexOf(d.tag_name) === -1) && (r4 = r4 || this._tag_stack.try_pop("p"));
      } else
        h.tag_name === "rp" || h.tag_name === "rt" ? (r4 = r4 || this._tag_stack.try_pop("rt", ["ruby", "rtc"]), r4 = r4 || this._tag_stack.try_pop("rp", ["ruby", "rtc"])) : h.tag_name === "optgroup" ? r4 = r4 || this._tag_stack.try_pop("optgroup", ["select"]) : h.tag_name === "option" ? r4 = r4 || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]) : h.tag_name === "colgroup" ? r4 = r4 || this._tag_stack.try_pop("caption", ["table"]) : h.tag_name === "thead" ? (r4 = r4 || this._tag_stack.try_pop("caption", ["table"]), r4 = r4 || this._tag_stack.try_pop("colgroup", ["table"])) : h.tag_name === "tbody" || h.tag_name === "tfoot" ? (r4 = r4 || this._tag_stack.try_pop("caption", ["table"]), r4 = r4 || this._tag_stack.try_pop("colgroup", ["table"]), r4 = r4 || this._tag_stack.try_pop("thead", ["table"]), r4 = r4 || this._tag_stack.try_pop("tbody", ["table"])) : h.tag_name === "tr" ? (r4 = r4 || this._tag_stack.try_pop("caption", ["table"]), r4 = r4 || this._tag_stack.try_pop("colgroup", ["table"]), r4 = r4 || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"])) : (h.tag_name === "th" || h.tag_name === "td") && (r4 = r4 || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"]), r4 = r4 || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]));
      return h.parent = this._tag_stack.get_parser_token(), r4;
    }
  }, ae.Beautifier = c, ae;
}
var ni;
function mn() {
  if (ni)
    return St.exports;
  ni = 1;
  var n = dn().Beautifier, i = Oi().Options;
  function e(t, a, _, f) {
    var o = new n(t, a, _, f);
    return o.beautify();
  }
  return St.exports = e, St.exports.defaultOptions = function() {
    return new i();
  }, St.exports;
}
var si;
function gn() {
  if (si)
    return yt;
  si = 1;
  var n = hn(), i = fn(), e = mn();
  function t(a, _, f, o) {
    return f = f || n, o = o || i, e(a, _, f, o);
  }
  return t.defaultOptions = e.defaultOptions, yt.js = n, yt.css = i, yt.html = t, yt;
}
(function(n) {
  function i(e, t, a) {
    var _ = function(f, o) {
      return e.js_beautify(f, o);
    };
    return _.js = e.js_beautify, _.css = t.css_beautify, _.html = a.html_beautify, _.js_beautify = e.js_beautify, _.css_beautify = t.css_beautify, _.html_beautify = a.html_beautify, _;
  }
  (function(e) {
    var t = gn();
    t.js_beautify = t.js, t.css_beautify = t.css, t.html_beautify = t.html, e.exports = i(t, t, t);
  })(n);
})(vi);
var ri;
var vn = function(i) {
  return typeof i == "string" && bn().test(i);
};
function bn() {
  return ri || (ri = new RegExp(`^[\\s	
\v\f\r   ᠎             　\u2028\u2029\uFEFF"]+$`));
}
var yn = function(i) {
  return typeof i < "u" && i !== null && (typeof i == "object" || typeof i == "function");
};
var ai = yn;
var Ti = function(i) {
  ai(i) || (i = {});
  for (var e = arguments.length, t = 1; t < e; t++) {
    var a = arguments[t];
    ai(a) && wn(i, a);
  }
  return i;
};
function wn(n, i) {
  for (var e in i)
    xn(i, e) && (n[e] = i[e]);
}
function xn(n, i) {
  return Object.prototype.hasOwnProperty.call(n, i);
}
var En = function(n) {
  return n != null && (ki(n) || On(n) || !!n._isBuffer);
};
function ki(n) {
  return !!n.constructor && typeof n.constructor.isBuffer == "function" && n.constructor.isBuffer(n);
}
function On(n) {
  return typeof n.readFloatLE == "function" && typeof n.slice == "function" && ki(n.slice(0, 0));
}
var Tn = En;
var kn = Object.prototype.toString;
var Rn = function(i) {
  if (typeof i > "u")
    return "undefined";
  if (i === null)
    return "null";
  if (i === true || i === false || i instanceof Boolean)
    return "boolean";
  if (typeof i == "string" || i instanceof String)
    return "string";
  if (typeof i == "number" || i instanceof Number)
    return "number";
  if (typeof i == "function" || i instanceof Function)
    return "function";
  if (typeof Array.isArray < "u" && Array.isArray(i))
    return "array";
  if (i instanceof RegExp)
    return "regexp";
  if (i instanceof Date)
    return "date";
  var e = kn.call(i);
  return e === "[object RegExp]" ? "regexp" : e === "[object Date]" ? "date" : e === "[object Arguments]" ? "arguments" : e === "[object Error]" ? "error" : Tn(i) ? "buffer" : e === "[object Set]" ? "set" : e === "[object WeakSet]" ? "weakset" : e === "[object Map]" ? "map" : e === "[object WeakMap]" ? "weakmap" : e === "[object Symbol]" ? "symbol" : e === "[object Int8Array]" ? "int8array" : e === "[object Uint8Array]" ? "uint8array" : e === "[object Uint8ClampedArray]" ? "uint8clampedarray" : e === "[object Int16Array]" ? "int16array" : e === "[object Uint16Array]" ? "uint16array" : e === "[object Int32Array]" ? "int32array" : e === "[object Uint32Array]" ? "uint32array" : e === "[object Float32Array]" ? "float32array" : e === "[object Float64Array]" ? "float64array" : "object";
};
var Sn = vn;
var Cn = Ti;
var An = Rn;
var Nn = function(n, i) {
  var e = Cn({}, i), t = e.sep || `

`, a = e.min, _;
  return typeof a == "number" && a !== 2 && (_ = new RegExp("(\\r\\n|\\n|\\u2424) {" + a + ",}")), typeof _ > "u" && (_ = e.regex || /(\r\n|\n|\u2424){2,}/g), e.keepWhitespace !== true && (n = n.split(`
`).map(function(f) {
    return Sn(f) ? f.trim() : f;
  }).join(`
`)), n = Ln(n, e), n.replace(_, t);
};
function Ln(n, i) {
  var e = i.trailingNewline;
  if (e === false)
    return n;
  switch (An(e)) {
    case "string":
      n = n.replace(/\s+$/, i.trailingNewline);
      break;
    case "function":
      n = i.trailingNewline(n);
      break;
    case "undefined":
    case "boolean":
    default: {
      n = n.replace(/\s+$/, `
`);
      break;
    }
  }
  return n;
}
var jn = vi.exports;
var Dn = Nn;
var $n = Ti;
var In = {
  unformatted: ["code", "pre", "em", "strong", "span"],
  indent_inner_html: true,
  indent_char: " ",
  indent_size: 2,
  sep: `
`
};
var Pn = function(i, e) {
  var t = $n({}, In, e);
  return i = jn.html(i, t), t.ocd === true ? (t.newlines && (t.sep = t.newlines), Bn(i, t)) : i;
};
function Bn(n, i) {
  return Dn(n, i).replace(/^\s+/g, "").replace(/\s+$/g, `
`).replace(/(\s*<!--)/g, `
$1`).replace(/>(\s*)(?=<!--\s*\/)/g, "> ");
}
function gt(n) {
  let { code: i, src: e } = n || {};
  if (i || (i = '<div id="app"></div>'), e && (i += `
<script type="module" src="${e}"><\/script>`), typeof DOMParser < "u") {
    const a = new DOMParser().parseFromString(i, "text/html");
    return Pn(`<!DOCTYPE html>
${a.documentElement.outerHTML}`, {
      ocd: true
    });
  }
  return "";
}
function Mt(n) {
  const i = {};
  return n === $.REACT && (i.jsx = "react"), JSON.stringify(
    {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowImportingTsExtensions: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        ...i
      },
      include: ["src"]
    },
    null,
    2
  );
}
var Ri = () => JSON.stringify(
  {
    installDependencies: false,
    startCommand: "npm install && npm run dev"
  },
  null,
  2
);
var Mn = `import { createApp } from "vue";
import Demo from "./Demo.vue";

const app = createApp(Demo);
app.mount("#app");
`;
var Wn = `import React from "react";
import { createRoot } from "react-dom/client";
import Demo from "./Demo.tsx";

const root = createRoot(document.querySelector("#app"));
root.render(<Demo />);
`;
function Wt(n) {
  return n === $.VUE ? Mn : n === $.REACT ? Wn : "";
}
var Un = `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vue(), vueJsx()],
});
`;
var Fn = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
});
`;
function Si(n) {
  return n === $.VUE ? Un : n === $.REACT ? Fn : "";
}
var zn = () => ({
  copyContent: ref(""),
  clickCopy: async (e) => {
    let t = true;
    try {
      navigator.clipboard && navigator.clipboard.writeText && await navigator.clipboard.writeText(e);
    } catch {
      const _ = document.createElement("textarea");
      _.value = e, _.style.position = "fixed", _.style.left = "-999999px", _.style.top = "-999999px", document.body.appendChild(_), _.focus(), _.select(), t = document.execCommand("copy"), document.body.removeChild(_);
    }
    return t;
  }
});
var Kn = () => {
  const n = ref(true);
  return {
    isCodeFold: n,
    setCodeFold: (e) => {
      n.value = e;
    }
  };
};
function qn(n) {
  return [
    ...n.match(/from '([^']+)'(;)?(\r)?\n/g) || [],
    ...n.match(/from "([^"]+)"(;)?(\r)?\n/g) || []
  ].map((i) => {
    let e = "";
    return i.includes("'") ? e = i.split("'")[1] : i.includes('"') && (e = i.split('"')[1]), e.includes("/") && (e.startsWith("@") ? e = e.split("/")[0] + "/" + e.split("/")[1] : e = e.split("/")[0]), e;
  }).filter((i) => i !== "").reduce((i, e) => (i[e] = "latest", i), {});
}
var At = "vitepress-demo-plugin";
var Nt = (n, i, e, t) => {
  let a = i === "" ? `${n}` : `${n}-${i}`;
  return e && (a += `__${e}`), t && (a += `--${t}`), a;
};
var Ut = (n = "") => ({
  b: () => Nt(At, n),
  e: (_ = "") => Nt(At, n, _),
  m: (_ = "") => Nt(At, n, "", _),
  bem: (_, f, o) => Nt(At, _, f, o)
});
var oi = ({
  code: n,
  styles: i,
  links: e
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    ${i}
    ${e}
    <style>
      body {
        min-height: 0;
      }
    </style>
  </head>
  <body>
    <div class="vp-raw">
      ${n}
    </div>
  </body>
</html>
  `;
var Vn = (n, i) => {
  const e = {
    dependencies: {},
    devDependencies: {
      typescript: "latest"
    }
  };
  return n === $.VUE ? (e.dependencies.vue = "latest", i === rt.STACKBLITZ ? (e.devDependencies.vite = "latest", e.devDependencies["@vitejs/plugin-vue"] = "latest", e.devDependencies["@vitejs/plugin-vue-jsx"] = "latest") : i === rt.CODESANDBOX && (e.devDependencies["@vue/cli-plugin-babel"] = "latest")) : n === $.REACT && (e.dependencies.react = "latest", e.dependencies["react-dom"] = "latest", e.dependencies["@emotion/react"] = "latest", e.dependencies["@emotion/styled"] = "latest", e.devDependencies["@types/react"] = "latest", e.devDependencies["@types/react-dom"] = "latest", i === rt.STACKBLITZ && (e.devDependencies.vite = "latest", e.devDependencies["@vitejs/plugin-react"] = "latest")), e;
};
function Ft(n) {
  const { type: i, platform: e, code: t, title: a, description: _ } = n, f = e === rt.STACKBLITZ ? {
    scripts: {
      dev: "vite",
      build: "vite build",
      serve: "vite preview"
    }
  } : {}, { dependencies: o, devDependencies: u } = Vn(i, e), g = {
    name: a,
    description: _,
    version: "0.0.0",
    private: true,
    ...f,
    dependencies: {
      ...qn(t),
      ...o
    },
    devDependencies: {
      ...u
    }
  };
  return JSON.stringify(g, null, 2);
}
function Gn(n) {
  const { code: i } = n;
  return Pt({
    files: {
      "package.json": {
        content: Ft({
          type: $.VUE,
          platform: rt.CODESANDBOX,
          code: i
        })
      },
      "tsconfig.json": {
        content: Mt($.VUE)
      },
      "index.html": {
        content: gt()
      },
      "src/main.ts": {
        content: Wt($.VUE)
      },
      "src/Demo.vue": {
        content: i
      },
      ...n.customFiles
    }
  });
}
function Hn(n) {
  const { code: i } = n;
  return Pt({
    files: {
      "package.json": {
        content: Ft({
          type: $.REACT,
          platform: rt.CODESANDBOX,
          code: i
        })
      },
      "tsconfig.json": {
        content: Mt($.REACT)
      },
      "index.html": {
        content: gt()
      },
      "src/main.tsx": {
        content: Wt($.REACT)
      },
      "src/Demo.tsx": {
        content: i
      },
      ...n.customFiles
    }
  });
}
function Xn(n) {
  const { code: i } = n;
  return Pt({
    files: {
      "index.html": {
        content: gt({ code: i })
      },
      ...n.customFiles
    },
    template: "static"
  });
}
function Qn(n) {
  var a, _, f;
  const i = (a = (n.templates || []).find(
    (o) => o.scope === "global"
  )) == null ? void 0 : a.files, e = (_ = (n.templates || []).find(
    (o) => o.scope === n.type
  )) == null ? void 0 : _.files, t = (f = (n.templates || []).find(
    (o) => o.scope === n.scope
  )) == null ? void 0 : f.files;
  n.customFiles = {
    ...i,
    ...e,
    ...t
  };
  for (let o in n.customFiles)
    n.customFiles[o] = {
      content: n.customFiles[o] || ""
    };
  if (n.type === $.VUE)
    return Gn(n);
  if (n.type === $.REACT)
    return Hn(n);
  if (n.type === $.HTML)
    return Xn(n);
}
var Jn = {
  action: "https://codesandbox.io/api/v1/sandboxes/define",
  method: "post",
  target: "_blank",
  style: { display: "flex" }
};
var Zn = ["value"];
var Yn = ["value"];
var ts = defineComponent({
  __name: "codesandbox",
  props: {
    code: {},
    type: {},
    title: {},
    description: {},
    scope: {},
    templates: {}
  },
  setup(n) {
    const i = n, e = computed(
      () => Qn({
        code: i.code,
        type: i.type,
        title: i.title || di,
        description: i.description || mi,
        scope: i.scope,
        templates: i.templates
      })
    ), t = computed(() => sn(i.type));
    return (a, _) => (openBlock(), createElementBlock("form", Jn, [
      createBaseVNode("input", {
        style: { display: "none" },
        name: "parameters",
        value: e.value
      }, null, 8, Zn),
      _[0] || (_[0] = createBaseVNode("input", {
        style: { display: "none" },
        name: "embed",
        value: 1
      }, null, -1)),
      createBaseVNode("input", {
        style: { display: "none" },
        name: "query",
        value: `module=${t.value}`
      }, null, 8, Yn),
      _[1] || (_[1] = createStaticVNode('<button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-codesandbox"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" x2="12" y1="22.08" y2="12"></line></svg></button>', 1))
    ]));
  }
});
var es = 500;
var is = 20;
var ns = 300;
var ss = "https://stackblitz.com";
var _i = [
  "angular-cli",
  "create-react-app",
  "html",
  "javascript",
  "node",
  "polymer",
  "typescript",
  "vue"
];
var rs = ["project", "search", "ports", "settings"];
var as = ["light", "dark"];
var os = ["editor", "preview"];
var ui = {
  clickToLoad: (n) => lt("ctl", n),
  devToolsHeight: (n) => li2("devtoolsheight", n),
  forceEmbedLayout: (n) => lt("embed", n),
  hideDevTools: (n) => lt("hidedevtools", n),
  hideExplorer: (n) => lt("hideExplorer", n),
  hideNavigation: (n) => lt("hideNavigation", n),
  openFile: (n) => Lt("file", n),
  showSidebar: (n) => _s("showSidebar", n),
  sidebarView: (n) => _e("sidebarView", n, rs),
  startScript: (n) => Lt("startScript", n),
  terminalHeight: (n) => li2("terminalHeight", n),
  theme: (n) => _e("theme", n, as),
  view: (n) => _e("view", n, os),
  zenMode: (n) => lt("zenMode", n),
  organization: (n) => `${Lt("orgName", n == null ? void 0 : n.name)}&${Lt("orgProvider", n == null ? void 0 : n.provider)}`,
  crossOriginIsolated: (n) => lt("corp", n)
};
function Ci(n = {}) {
  const i = Object.entries(n).map(([e, t]) => t != null && ui.hasOwnProperty(e) ? ui[e](t) : "").filter(Boolean);
  return i.length ? `?${i.join("&")}` : "";
}
function lt(n, i) {
  return i === true ? `${n}=1` : "";
}
function _s(n, i) {
  return typeof i == "boolean" ? `${n}=${i ? "1" : "0"}` : "";
}
function li2(n, i) {
  if (typeof i == "number" && !Number.isNaN(i)) {
    const e = Math.min(100, Math.max(0, i));
    return `${n}=${encodeURIComponent(Math.round(e))}`;
  }
  return "";
}
function _e(n, i = "", e = []) {
  return e.includes(i) ? `${n}=${encodeURIComponent(i)}` : "";
}
function Lt(n, i) {
  return (Array.isArray(i) ? i : [i]).filter((t) => typeof t == "string" && t.trim() !== "").map((t) => `${n}=${encodeURIComponent(t)}`).join("&");
}
function Ai() {
  return Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6);
}
function de(n, i) {
  return `${Ni(i)}${n}${Ci(i)}`;
}
function me(n, i) {
  const e = {
    forceEmbedLayout: true
  };
  return i && typeof i == "object" && Object.assign(e, i), `${Ni(e)}${n}${Ci(e)}`;
}
function Ni(n = {}) {
  return (typeof n.origin == "string" ? n.origin : ss).replace(/\/$/, "");
}
function ge(n, i, e) {
  if (!i || !n || !n.parentNode)
    throw new Error("Invalid Element");
  n.id && (i.id = n.id), n.className && (i.className = n.className), us(i, e), ls(n, i, e), n.replaceWith(i);
}
function ve(n) {
  if (typeof n == "string") {
    const i = document.getElementById(n);
    if (!i)
      throw new Error(`Could not find element with id '${n}'`);
    return i;
  } else if (n instanceof HTMLElement)
    return n;
  throw new Error(`Invalid element: ${n}`);
}
function be(n) {
  return n && n.newWindow === false ? "_self" : "_blank";
}
function us(n, i = {}) {
  const e = Object.hasOwnProperty.call(i, "height") ? `${i.height}` : `${ns}`, t = Object.hasOwnProperty.call(i, "width") ? `${i.width}` : void 0;
  n.setAttribute("height", e), t ? n.setAttribute("width", t) : n.setAttribute("style", "width:100%;");
}
function ls(n, i, e = {}) {
  var a, _, f;
  const t = (f = (_ = (a = n.allow) == null ? void 0 : a.split(";")) == null ? void 0 : _.map((o) => o.trim())) != null ? f : [];
  e.crossOriginIsolated && !t.includes("cross-origin-isolated") && t.push("cross-origin-isolated"), t.length > 0 && (i.allow = t.join("; "));
}
var ps = class {
  constructor(i) {
    this.pending = {}, this.port = i, this.port.onmessage = this.messageListener.bind(this);
  }
  request({ type: i, payload: e }) {
    return new Promise((t, a) => {
      const _ = Ai();
      this.pending[_] = { resolve: t, reject: a }, this.port.postMessage({
        type: i,
        payload: {
          ...e,
          __reqid: _
        }
      });
    });
  }
  messageListener(i) {
    var o;
    if (typeof ((o = i.data.payload) == null ? void 0 : o.__reqid) != "string")
      return;
    const { type: e, payload: t } = i.data, { __reqid: a, __success: _, __error: f } = t;
    this.pending[a] && (_ ? this.pending[a].resolve(this.cleanResult(t)) : this.pending[a].reject(f ? `${e}: ${f}` : e), delete this.pending[a]);
  }
  cleanResult(i) {
    const e = { ...i };
    return delete e.__reqid, delete e.__success, delete e.__error, Object.keys(e).length ? e : null;
  }
};
var hs = class {
  constructor(i, e) {
    this.editor = {
      openFile: (t) => this._rdc.request({
        type: "SDK_OPEN_FILE",
        payload: { path: t }
      }),
      setCurrentFile: (t) => this._rdc.request({
        type: "SDK_SET_CURRENT_FILE",
        payload: { path: t }
      }),
      setTheme: (t) => this._rdc.request({
        type: "SDK_SET_UI_THEME",
        payload: { theme: t }
      }),
      setView: (t) => this._rdc.request({
        type: "SDK_SET_UI_VIEW",
        payload: { view: t }
      }),
      showSidebar: (t = true) => this._rdc.request({
        type: "SDK_TOGGLE_SIDEBAR",
        payload: { visible: t }
      })
    }, this.preview = {
      origin: "",
      getUrl: () => this._rdc.request({
        type: "SDK_GET_PREVIEW_URL",
        payload: {}
      }).then((t) => {
        var a;
        return (a = t == null ? void 0 : t.url) != null ? a : null;
      }),
      setUrl: (t = "/") => {
        if (typeof t != "string" || !t.startsWith("/"))
          throw new Error(`Invalid argument: expected a path starting with '/', got '${t}'`);
        return this._rdc.request({
          type: "SDK_SET_PREVIEW_URL",
          payload: { path: t }
        });
      }
    }, this._rdc = new ps(i), Object.defineProperty(this.preview, "origin", {
      value: typeof e.previewOrigin == "string" ? e.previewOrigin : null,
      writable: false
    });
  }
  applyFsDiff(i) {
    const e = (t) => t !== null && typeof t == "object";
    if (!e(i) || !e(i.create))
      throw new Error("Invalid diff object: expected diff.create to be an object.");
    if (!Array.isArray(i.destroy))
      throw new Error("Invalid diff object: expected diff.destroy to be an array.");
    return this._rdc.request({
      type: "SDK_APPLY_FS_DIFF",
      payload: i
    });
  }
  getDependencies() {
    return this._rdc.request({
      type: "SDK_GET_DEPS_SNAPSHOT",
      payload: {}
    });
  }
  getFsSnapshot() {
    return this._rdc.request({
      type: "SDK_GET_FS_SNAPSHOT",
      payload: {}
    });
  }
};
var jt = [];
var cs = class {
  constructor(i) {
    this.id = Ai(), this.element = i, this.pending = new Promise((e, t) => {
      const a = ({ data: g, ports: v }) => {
        (g == null ? void 0 : g.action) === "SDK_INIT_SUCCESS" && g.id === this.id && (this.vm = new hs(v[0], g.payload), e(this.vm), f());
      }, _ = () => {
        var g;
        (g = this.element.contentWindow) == null || g.postMessage(
          {
            action: "SDK_INIT",
            id: this.id
          },
          "*"
        );
      };
      function f() {
        window.clearInterval(u), window.removeEventListener("message", a);
      }
      window.addEventListener("message", a), _();
      let o = 0;
      const u = window.setInterval(() => {
        if (this.vm) {
          f();
          return;
        }
        if (o >= is) {
          f(), t("Timeout: Unable to establish a connection with the StackBlitz VM"), jt.forEach((g, v) => {
            g.id === this.id && jt.splice(v, 1);
          });
          return;
        }
        o++, _();
      }, es);
    }), jt.push(this);
  }
};
var fs = (n) => {
  var e;
  const i = n instanceof Element ? "element" : "id";
  return (e = jt.find((t) => t[i] === n)) != null ? e : null;
};
function ds(n, i) {
  const e = document.createElement("input");
  return e.type = "hidden", e.name = n, e.value = i, e;
}
function ms(n) {
  return n.replace(/\[/g, "%5B").replace(/\]/g, "%5D");
}
function Li({
  template: n,
  title: i,
  description: e,
  dependencies: t,
  files: a,
  settings: _
}) {
  if (!_i.includes(n)) {
    const g = _i.map((v) => `'${v}'`).join(", ");
    console.warn(`Unsupported project.template: must be one of ${g}`);
  }
  const f = [], o = (g, v, b = "") => {
    f.push(ds(g, typeof v == "string" ? v : b));
  };
  o("project[title]", i), typeof e == "string" && e.length > 0 && o("project[description]", e), o("project[template]", n, "javascript"), t && (n === "node" ? console.warn(
    "Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."
  ) : o("project[dependencies]", JSON.stringify(t))), _ && o("project[settings]", JSON.stringify(_)), Object.entries(a).forEach(([g, v]) => {
    o(`project[files][${ms(g)}]`, v);
  });
  const u = document.createElement("form");
  return u.method = "POST", u.setAttribute("style", "display:none!important;"), u.append(...f), u;
}
function gs(n, i) {
  const e = Li(n);
  return e.action = me("/run", i), e.id = "sb_run", `<!doctype html>
<html>
<head><title></title></head>
<body>
  ${e.outerHTML}
  <script>document.getElementById('${e.id}').submit();<\/script>
</body>
</html>`;
}
function vs(n, i) {
  const e = Li(n);
  e.action = de("/run", i), e.target = be(i), document.body.appendChild(e), e.submit(), document.body.removeChild(e);
}
function zt(n) {
  var e;
  return n != null && n.contentWindow ? ((e = fs(n)) != null ? e : new cs(n)).pending : Promise.reject("Provided element is not an iframe.");
}
function bs(n, i) {
  vs(n, i);
}
function ys(n, i) {
  const e = de(`/edit/${n}`, i), t = be(i);
  window.open(e, t);
}
function ws(n, i) {
  const e = de(`/github/${n}`, i), t = be(i);
  window.open(e, t);
}
function xs(n, i, e) {
  var f;
  const t = ve(n), a = gs(i, e), _ = document.createElement("iframe");
  return ge(t, _, e), (f = _.contentDocument) == null || f.write(a), zt(_);
}
function Es(n, i, e) {
  const t = ve(n), a = document.createElement("iframe");
  return a.src = me(`/edit/${i}`, e), ge(t, a, e), zt(a);
}
function Os(n, i, e) {
  const t = ve(n), a = document.createElement("iframe");
  return a.src = me(`/github/${i}`, e), ge(t, a, e), zt(a);
}
var ye = {
  connect: zt,
  embedGithubProject: Os,
  embedProject: xs,
  embedProjectId: Es,
  openGithubProject: ws,
  openProject: bs,
  openProjectId: ys
};
var Ts = (n) => {
  const { code: i, title: e, description: t } = n;
  ye.openProject(
    {
      title: e,
      description: t,
      template: "html",
      files: {
        "index.html": gt({ code: i }),
        ...n.customFiles
      }
    },
    {
      openFile: "index.html"
    }
  );
};
var ks = (n) => {
  const { code: i, title: e, description: t } = n;
  ye.openProject(
    {
      title: e,
      description: t,
      template: "node",
      files: {
        "src/Demo.tsx": i,
        "src/main.tsx": Wt($.REACT),
        "index.html": gt({ src: "/src/main.tsx" }),
        "package.json": Ft({
          type: $.REACT,
          platform: rt.STACKBLITZ,
          code: i
        }),
        "vite.config.js": Si($.REACT),
        ".stackblitzrc": Ri(),
        "tsconfig.json": Mt($.REACT),
        ...n.customFiles
      }
    },
    {
      openFile: "src/Demo.tsx"
    }
  );
};
var Rs = (n) => {
  const { code: i, title: e, description: t } = n;
  ye.openProject(
    {
      title: e,
      description: t,
      template: "node",
      files: {
        "src/Demo.vue": i,
        "src/main.ts": Wt($.VUE),
        "index.html": gt({ src: "/src/main.ts" }),
        "package.json": Ft({
          type: $.VUE,
          platform: rt.STACKBLITZ,
          code: i
        }),
        "vite.config.js": Si($.VUE),
        ".stackblitzrc": Ri(),
        "tsconfig.json": Mt($.VUE),
        ...n.customFiles
      }
    },
    {
      openFile: "src/Demo.vue"
    }
  );
};
function Ss(n) {
  var a, _, f;
  const i = (a = (n.templates || []).find(
    (o) => o.scope === "global"
  )) == null ? void 0 : a.files, e = (_ = (n.templates || []).find(
    (o) => o.scope === n.type
  )) == null ? void 0 : _.files, t = (f = (n.templates || []).find(
    (o) => o.scope === n.scope
  )) == null ? void 0 : f.files;
  if (n.customFiles = {
    ...i,
    ...e,
    ...t
  }, n.type === $.VUE)
    return Rs(n);
  if (n.type === $.REACT)
    return ks(n);
  if (n.type === $.HTML)
    return Ts(n);
}
var Cs = defineComponent({
  __name: "stackblitz",
  props: {
    code: {},
    type: {},
    title: {},
    description: {},
    templates: {},
    scope: {}
  },
  setup(n) {
    const i = n;
    function e() {
      Ss({
        code: i.code,
        type: i.type,
        title: i.title || di,
        description: i.description || mi,
        templates: i.templates || [],
        scope: i.scope
      });
    }
    return (t, a) => (openBlock(), createElementBlock("svg", {
      onClick: e,
      viewBox: "64 64 896 896",
      focusable: "false",
      "data-icon": "thunderbolt",
      width: "20px",
      height: "20px",
      fill: "currentColor",
      "aria-hidden": "true"
    }, a[0] || (a[0] = [
      createBaseVNode("path", { d: "M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7zM378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211L378.2 732.5z" }, null, -1)
    ])));
  }
});
var As = {};
var Ns = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-github"
};
function Ls(n, i) {
  return openBlock(), createElementBlock("svg", Ns, i[0] || (i[0] = [
    createBaseVNode("path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" }, null, -1),
    createBaseVNode("path", { d: "M9 18c-4.51 2-5-2-7-2" }, null, -1)
  ]));
}
var js = et(As, [["render", Ls]]);
var Ds = {};
var $s = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-gitlab"
};
function Is(n, i) {
  return openBlock(), createElementBlock("svg", $s, i[0] || (i[0] = [
    createBaseVNode("path", { d: "m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" }, null, -1)
  ]));
}
var Ps = et(Ds, [["render", Is]]);
var Bs = {};
var Ms = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  fill: "none",
  version: "1.1",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24"
};
function Ws(n, i) {
  return openBlock(), createElementBlock("svg", Ms, i[0] || (i[0] = [
    createBaseVNode("defs", null, [
      createBaseVNode("clipPath", { id: "master_svg0_27_0291" }, [
        createBaseVNode("rect", {
          x: "0",
          y: "0",
          width: "24",
          height: "24",
          rx: "0"
        })
      ])
    ], -1),
    createBaseVNode("g", { "clip-path": "url(#master_svg0_27_0291)" }, [
      createBaseVNode("g", null, [
        createBaseVNode("path", {
          d: "M4.707482,11.29327L4.707107,11.29289Q4.566455,11.152239999999999,4.382683,11.07612Q4.198912,11,4,11Q3.801088,11,3.617317,11.07612Q3.433545,11.152239999999999,3.292893,11.29289Q3.152241,11.43355,3.07612,11.61732Q3,11.80109,3,12Q3,12.02403,3.001154,12.04804Q3.010111,12.23427,3.085581,12.40477Q3.161051,12.57527,3.292893,12.70711L3.293268,12.70748L8.29289,17.7071Q8.36254,17.776699999999998,8.44443,17.8315Q8.52632,17.886200000000002,8.61732,17.9239Q8.70831,17.9616,8.80491,17.980800000000002Q8.90151,18,9,18Q9.09849,18,9.19509,17.980800000000002Q9.29169,17.9616,9.38268,17.9239Q9.47368,17.886200000000002,9.55557,17.8315Q9.63746,17.776699999999998,9.70711,17.7071L20.7071,6.707107Q20.8478,6.566454,20.9239,6.382683Q21,6.198912,21,6Q21,5.801088,20.9239,5.617317Q20.8478,5.433546,20.7071,5.292894Q20.5665,5.152241,20.3827,5.076121Q20.1989,5,20,5Q19.9741,5,19.9483,5.001339Q19.762999999999998,5.010937,19.5935,5.086334Q19.4241,5.16173,19.2929,5.292893L19.2925,5.293268L9,15.58579L4.707482,11.29327Z",
          "fill-rule": "evenodd",
          fill: "currentColor",
          "fill-opacity": "0.8500000238418579"
        })
      ])
    ], -1)
  ]));
}
var Us = et(Bs, [["render", Ws]]);
var Fs = {};
var zs = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-x-icon lucide-x"
};
function Ks(n, i) {
  return openBlock(), createElementBlock("svg", zs, i[0] || (i[0] = [
    createBaseVNode("path", { d: "M18 6 6 18" }, null, -1),
    createBaseVNode("path", { d: "m6 6 12 12" }, null, -1)
  ]));
}
var qs = et(Fs, [["render", Ks]]);
var Vs = { style: { color: "var(--vp-c-text-1)" } };
var Gs = 3e3;
var Hs = defineComponent({
  __name: "message",
  props: {
    content: { default: "复制成功！" },
    close: {},
    success: { type: Boolean, default: true }
  },
  setup(n, { expose: i }) {
    const e = Ut(), t = n, a = ref(false), _ = (g) => {
      a.value = g;
    }, f = ref(-9999), o = (g) => {
      f.value = g;
    };
    watch(a, (g) => {
      g === true && setTimeout(() => {
        a.value = false;
      }, Gs);
    });
    const u = () => {
      t.close();
    };
    return i({
      setVisible: _,
      setTopHeight: o
    }), (g, v) => (openBlock(), createBlock(Transition, {
      name: "slide-fade",
      onAfterLeave: u
    }, {
      default: withCtx(() => [
        a.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(e).bem("message-notice", "container")]),
          style: normalizeStyle({ top: f.value + "px" })
        }, [
          g.success ? (openBlock(), createBlock(Us, { key: 0 })) : (openBlock(), createBlock(qs, {
            key: 1,
            style: { color: "var(--vp-c-danger-2)" }
          })),
          createBaseVNode("span", Vs, toDisplayString(g.content), 1)
        ], 6)) : createCommentVNode("", true)
      ]),
      _: 1
    }));
  }
});
var ue = [];
var Xs = {
  open: (n, i) => {
    const e = document.createElement("div"), t = createApp(Hs, {
      content: n,
      success: i,
      close: () => {
        document.body.removeChild(e), ue.pop(), t.unmount();
      }
    }), a = t.mount(e);
    document.body.appendChild(e);
    const _ = ue.length, f = _ === 0 ? 10 : (_ + 1) * 10 + _ * 42;
    a.setTopHeight(f), a.setVisible(true), ue.push(a);
  }
};
var Qs = defineComponent({
  __name: "index",
  props: {
    content: {}
  },
  setup(n) {
    const i = Ut(), e = n;
    return (t, a) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([unref(i).bem("tooltip", "wrapper")])
    }, [
      createBaseVNode("div", {
        class: normalizeClass([unref(i).bem("tooltip", "content")])
      }, [
        renderSlot(t.$slots, "content", {}, () => [
          createTextVNode(toDisplayString(e.content), 1)
        ], true)
      ], 2),
      renderSlot(t.$slots, "default", {}, void 0, true)
    ], 2));
  }
});
var pt = et(Qs, [["__scopeId", "data-v-588bc5b3"]]);
var Kt = {
  openInStackblitz: "在 Stackblitz 中打开",
  openInCodeSandbox: "在 Codesandbox 中打开",
  openInGithub: "在 GitHub 中打开",
  openInGitlab: "在 GitLub 中打开",
  collapseCode: "收起代码",
  expandCode: "展开代码",
  copyCode: "复制代码",
  copySuccess: "已将代码复制至剪切板！",
  copyFail: "复制失败！"
};
var ji = {
  openInStackblitz: "Open In Stackblitz",
  openInCodeSandbox: "Open In Codesandbox",
  openInGithub: "Open in GitHub",
  openInGitlab: "Open in GitLab",
  collapseCode: "Collapse Code",
  expandCode: "Expand Code",
  copyCode: "Copy Code",
  copySuccess: "The code has been copied to the clipboard!",
  copyFail: "Failed to copy the code!"
};
var ft = ref({
  "zh-CN": Kt,
  "en-US": ji
});
var G = ref(Kt);
var Js = (n) => {
  ft.value = {};
  for (const i in n)
    n[i] === "zh-CN" ? ft.value[i] = Kt : n[i] === "en-US" ? ft.value[i] = ji : ft.value[i] = n[i];
  typeof document < "u" && (G.value = ft.value[document.documentElement.getAttribute("lang") || "zh-CN"]);
};
var $t;
function Zs() {
  typeof MutationObserver < "u" && typeof document < "u" && ($t = new MutationObserver((n) => {
    n.forEach((i) => {
      if (i.type === "attributes" && i.attributeName === "lang") {
        const e = document.documentElement.getAttribute("lang");
        e && (G.value = ft.value[e] || Kt);
      }
    });
  })), $t.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });
}
function Ys() {
  $t && $t.disconnect();
}
var tr2 = { style: { "flex-shrink": "0" } };
var er = ["innerHTML"];
var ir = ["onClick"];
var nr = ["onClick"];
var sr = { class: "language-html" };
var rr = ["innerHTML"];
var $r = defineComponent({
  __name: "index",
  props: {
    title: { default: "标题" },
    description: { default: "描述内容" },
    reactComponent: {},
    vueCode: {},
    reactCode: {},
    htmlCode: {},
    order: { default: "vue,react,html" },
    visible: { type: Boolean, default: true },
    select: { default: $.VUE },
    github: { default: "" },
    gitlab: { default: "" },
    reactCreateElement: {},
    reactCreateRoot: {},
    stackblitz: {},
    codesandbox: {},
    codeplayer: {},
    scope: {},
    files: {},
    lightTheme: {},
    darkTheme: {},
    theme: {},
    locale: {},
    htmlWriteWay: { default: "write" },
    background: {}
  },
  emits: ["mount"],
  setup(n, { emit: i }) {
    const e = n, t = i;
    onMounted(() => {
      t("mount"), a(), Zs();
    }), onUnmounted(() => {
      Ys();
    });
    function a() {
      if (e.locale)
        try {
          Js(JSON.parse(decodeURIComponent(e.locale)));
        } catch (R) {
          console.error(R);
        }
    }
    const _ = computed(() => JSON.parse(decodeURIComponent(e.stackblitz || "{}"))), f = computed(() => JSON.parse(decodeURIComponent(e.codesandbox || "{}")));
    computed(() => JSON.parse(decodeURIComponent(e.codeplayer || "{}")));
    const o = ref(""), u = computed(() => {
      var W;
      const M = JSON.parse(decodeURIComponent(e.files || "{}"))[c.value];
      return M && !M[o.value] && (o.value = ((W = Object.keys(M)) == null ? void 0 : W[0]) || ""), M;
    }), g = computed(() => e.order.split(",").map((R) => R.trim())), v = inject("coot-code-type", {}), b = inject(
      "set-coot-code-type",
      (R) => {
      }
    ), c = ref($.VUE);
    function k(R) {
      c.value = R, typeof b == "function" && b(R);
    }
    const C = computed(() => c.value === "react" ? "tsx" : c.value), S = Ut(), { isCodeFold: h, setCodeFold: r4 } = Kn(), { clickCopy: d } = zn(), T = computed(() => u.value && u.value[o.value] ? u.value[o.value].code : e[`${c.value}Code`]), x = ref("");
    watchEffect(async () => {
      await E(), l();
    });
    async function E() {
      var R;
      x.value = await codeToHtml2(T.value || "", {
        lang: ((R = u.value[o.value]) == null ? void 0 : R.filename.split(".").pop()) || C.value,
        themes: {
          dark: e.darkTheme || "github-dark",
          light: e.lightTheme || "github-light"
        }
      });
    }
    function l() {
      setTimeout(() => {
        z.value && !h.value && (z.value.style.height = it.value.scrollHeight + "px");
      });
    }
    const m = computed(() => [$.VUE, $.REACT, $.HTML].filter((R) => e[`${R}Code`]).sort((R, M) => g.value.indexOf(R) - g.value.indexOf(M)));
    watch(
      () => v == null ? void 0 : v.value,
      (R) => {
        R && e[`${R}Code`] && (c.value = R);
      },
      { immediate: true }
    );
    const p2 = () => {
      window.open(e.github, "_blank");
    }, O = () => {
      window.open(e.gitlab, "_blank");
    };
    watch(
      () => c.value,
      (R) => {
        !R || (R === "html" ? A() : R === "react" && P());
      },
      {
        immediate: true
      }
    );
    const s = async () => {
      const R = await d(T.value || "");
      Xs.open(
        R ? G.value.copySuccess : G.value.copyFail,
        R
      );
    }, y = ref();
    let w;
    function A() {
      nextTick(() => {
        if (!y.value || !e.htmlCode)
          return;
        const R = y.value.querySelector("iframe"), M = document.head.querySelectorAll("style"), W = document.head.querySelectorAll('link[as="style"]'), vt = document.head.querySelectorAll('link[as="font"]'), H = Array.from(M).map((Q) => `<style replace="true">${Q.innerText}</style>`).join(`
`), bt = Array.from(W).map((Q) => Q.outerHTML).join(`
`), ut = Array.from(vt).map((Q) => Q.outerHTML).join(`
`);
        let X = R.contentDocument || R.contentWindow.document;
        typeof X.write == "function" && e.htmlWriteWay === "write" ? (X.open(), X.write(
          oi({
            code: e.htmlCode || "",
            styles: H,
            links: bt + `
` + ut
          })
        ), X.close()) : (R.srcdoc = oi({
          code: e.htmlCode || "",
          styles: H,
          links: bt + `
` + ut
        }), R.onload = () => {
          X = R.contentDocument || R.contentWindow.document;
        });
        const xt = w = function() {
          requestAnimationFrame(() => {
            const Q = X.documentElement.offsetHeight + "px";
            R.style.height = Q, y.value && (y.value.style.height = Q), X.documentElement && (X.documentElement.className = document.documentElement.className), xt === w && w();
          });
        };
        w();
      });
    }
    const N = ref();
    let j = null;
    function P() {
      nextTick(() => {
        e.reactComponent && c.value === "react" && e.reactCode && (j || (j = e.reactCreateRoot(N.value)), j.render(e.reactCreateElement(e.reactComponent, {}, null)));
      });
    }
    onUnmounted(() => {
      j && (j.unmount(), j = null);
    }), watch(
      () => [N.value, e.reactComponent],
      (R) => {
        N.value ? P() : j && (j.unmount(), j = null);
      },
      { immediate: true, deep: true }
    ), watch(
      () => e.reactCode,
      (R, M) => {
        R && R !== M && j && j.render(e.reactCreateElement(e.reactComponent, {}, null));
      },
      { immediate: true, deep: true }
    ), watch(
      () => e.select,
      (R) => {
        R && e[`${R}Code`] && (c.value = R);
      },
      {
        immediate: true
      }
    ), watch(
      () => m.value,
      () => {
        e[`${c.value}Code`] || (c.value = m.value[0]);
      },
      { immediate: true, deep: true }
    );
    function F(R) {
      o.value = R, z.value && (z.value.style.height = "auto");
    }
    const z = ref(), it = ref();
    return watch(
      () => h.value,
      (R) => {
        nextTick(async () => {
          z.value && (R ? z.value.style.height = 0 : (await E(), l()));
        });
      }
    ), (R, M) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([unref(S).e("container")])
    }, [
      createBaseVNode("section", {
        class: normalizeClass([unref(S).bem("preview"), "vp-raw"]),
        style: normalizeStyle({ background: e.background })
      }, [
        c.value === "vue" ? renderSlot(R.$slots, "vue", { key: 0 }) : c.value === "html" ? (openBlock(), createElementBlock("div", {
          key: 1,
          ref_key: "htmlContainerRef",
          ref: y
        }, M[3] || (M[3] = [
          createBaseVNode("iframe", { style: { width: "100%", height: "auto", border: "none" } }, null, -1)
        ]), 512)) : c.value === "react" ? (openBlock(), createElementBlock("div", {
          key: 2,
          ref_key: "reactContainerRef",
          ref: N
        }, null, 512)) : createCommentVNode("", true)
      ], 6),
      createBaseVNode("section", {
        class: normalizeClass([unref(S).bem("description")])
      }, [
        R.title ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(S).bem("description", "title")])
        }, [
          createBaseVNode("div", tr2, toDisplayString(R.title), 1)
        ], 2)) : createCommentVNode("", true),
        R.description ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass([unref(S).bem("description", "content")]),
          innerHTML: R.description
        }, null, 10, er)) : createCommentVNode("", true),
        e.description || !e.title && !e.description ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: normalizeClass([unref(S).bem("description", "split-line")])
        }, null, 2)) : createCommentVNode("", true),
        m.value.length > 1 && R.visible ? (openBlock(), createElementBlock("div", {
          key: 3,
          class: normalizeClass([unref(S).bem("lang-tabs")])
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, (W) => (openBlock(), createElementBlock("div", {
            key: W,
            class: normalizeClass([unref(S).bem("tab"), c.value === W && unref(S).bem("active-tab")]),
            onClick: (vt) => k == null ? void 0 : k(W)
          }, toDisplayString(W), 11, ir))), 128))
        ], 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass([unref(S).bem("description", "handle-btn")])
        }, [
          _.value.show ? (openBlock(), createBlock(pt, {
            key: 0,
            content: unref(G).openInStackblitz
          }, {
            default: withCtx(() => [
              createVNode(Cs, {
                code: T.value,
                type: c.value,
                scope: R.scope || "",
                templates: _.value.templates || []
              }, null, 8, ["code", "type", "scope", "templates"])
            ]),
            _: 1
          }, 8, ["content"])) : createCommentVNode("", true),
          f.value.show ? (openBlock(), createBlock(pt, {
            key: 1,
            content: unref(G).openInCodeSandbox
          }, {
            default: withCtx(() => [
              createVNode(ts, {
                code: T.value,
                type: c.value,
                scope: R.scope || "",
                templates: f.value.templates || []
              }, null, 8, ["code", "type", "scope", "templates"])
            ]),
            _: 1
          }, 8, ["content"])) : createCommentVNode("", true),
          R.github ? (openBlock(), createBlock(pt, {
            key: 2,
            content: unref(G).openInGithub
          }, {
            default: withCtx(() => [
              createVNode(js, { onClick: p2 })
            ]),
            _: 1
          }, 8, ["content"])) : createCommentVNode("", true),
          R.gitlab ? (openBlock(), createBlock(pt, {
            key: 3,
            content: unref(G).openInGitlab
          }, {
            default: withCtx(() => [
              createVNode(Ps, { onClick: O })
            ]),
            _: 1
          }, 8, ["content"])) : createCommentVNode("", true),
          unref(h) ? (openBlock(), createBlock(pt, {
            key: 5,
            content: unref(G).expandCode
          }, {
            default: withCtx(() => [
              createVNode(Ki, {
                onClick: M[1] || (M[1] = (W) => unref(r4)(false))
              })
            ]),
            _: 1
          }, 8, ["content"])) : (openBlock(), createBlock(pt, {
            key: 4,
            content: unref(G).collapseCode
          }, {
            default: withCtx(() => [
              createVNode(Hi, {
                onClick: M[0] || (M[0] = (W) => unref(r4)(true))
              })
            ]),
            _: 1
          }, 8, ["content"])),
          createVNode(pt, {
            content: unref(G).copyCode
          }, {
            default: withCtx(() => [
              createVNode(Zi, { onClick: s })
            ]),
            _: 1
          }, 8, ["content"])
        ], 2)
      ], 2),
      createBaseVNode("section", {
        class: normalizeClass([unref(S).bem("source")]),
        ref_key: "sourceRef",
        ref: z
      }, [
        createBaseVNode("div", {
          ref_key: "sourceContentRef",
          ref: it
        }, [
          Object.keys(u.value).length ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([unref(S).bem("file-tabs")])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(u.value), (W) => (openBlock(), createElementBlock("div", {
              key: W,
              class: normalizeClass([
                unref(S).bem("tab"),
                o.value === W && unref(S).bem("active-tab")
              ]),
              onClick: (vt) => F(W)
            }, toDisplayString(W), 11, nr))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("pre", sr, [
            createBaseVNode("div", { innerHTML: x.value }, null, 8, rr)
          ])
        ], 512)
      ], 2),
      unref(h) ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(S).bem("fold")),
        onClick: M[2] || (M[2] = (W) => unref(r4)(true))
      }, [
        createVNode(nn),
        createTextVNode(toDisplayString(unref(G).collapseCode), 1)
      ], 2))
    ], 2));
  }
});
var ar = defineComponent({
  __name: "placeholder",
  setup(n) {
    const i = Ut("placeholder");
    return (e, t) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([unref(i).e("container")])
    }, t[0] || (t[0] = [
      createBaseVNode("div", { class: "loader" }, null, -1),
      createBaseVNode("div", { class: "loading-text" }, "loading", -1)
    ]), 2));
  }
});
var Ir = et(ar, [["__scopeId", "data-v-5eb3f8d4"]]);
var pi = [
  /<demo(\s|\n)((.|\n)*)><\/demo>/,
  /<demo(\s|\n)((.|\n)*)\/>/
];
var or = /<\s*script[^>]*\blang=['"]ts['"][^>]*/;
var _r = /<\s*script[^>]*\bsetup\b[^>]*/;
var ur = /<\s*script\s+(setup|lang='ts'|lang="ts")?\s*(setup|lang='ts'|lang="ts")?\s*>/;
var J = (n, i, e, t) => {
  const a = n.sfcBlocks.scripts, _ = a.findIndex((u) => !!(_r.test(u.tagOpen) || or.test(u.tagOpen))), f = e || "";
  let o = "";
  if (t === "dynamicImport" ? o = e ? `
      const ${f} = shallowRef();
      onMounted(async () => {
        ${f}.value = (await import('${i}')).default;
      });
      `.trim() : `
      onMounted(async () => {
        await import('${i}');
      });
      `.trim() : t === "inject" ? o = `
      ${e}
    `.trim() : o = e ? `import ${f} from '${i}'` : `import '${i}'`, _ === -1) {
    const u = {
      type: "script",
      tagClose: "<\/script>",
      tagOpen: "<script setup lang='ts'>",
      content: `<script setup lang='ts'>
        ${o}
        <\/script>`,
      contentStripped: o
    };
    a.push(u);
  } else {
    const u = a[0];
    if (u.content.includes(i) && (!e || u.content.includes(f)))
      a[0].content = u.content;
    else {
      const g = `<script lang="ts" setup>
`;
      a[0].content = a[0].content.replace(
        ur,
        g
      ), a[0].content = a[0].content.replace(
        g,
        `<script setup>

      ${o}
`
      );
    }
  }
};
var lr = (n) => {
  let i = true;
  const e = [];
  for (; i; ) {
    const t = n.lastIndexOf("/");
    if (t === -1)
      i = false;
    else {
      const a = n.substring(t + 1);
      e.unshift(a), n = n.substring(0, t);
    }
  }
  return "Temp" + btoa(
    encodeURIComponent(
      e.join("-").split(".").slice(0, -1).join(".")
    )
  ).replace(/=/g, "Equal");
};
var pr = /title="(.*?)"/;
var hr = /vue="(.*?)"/;
var cr = /html="(.*?)"/;
var fr = /react="(.*?)"/;
var dr = /description="(.*?)"/;
var mr = /order="(.*?)"/;
var gr = /select="(.*?)"/;
var vr = /github="(.*?)"/;
var br = /gitlab="(.*?)"/;
var yr = /stackblitz="(.*?)"/;
var wr = /codesandbox="(.*?)"/;
var xr = /codeplayer="(.*?)"/;
var Er = /scope="(.*?)"/;
var Or = /vueFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/;
var Tr = /reactFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/;
var kr = /htmlFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/;
var Rr = /ssg="(.*?)"/;
var Sr = /htmlWriteWay="(.*?)"/;
var Cr = /background="(.*?)"/;
var hi = (n, i, e, t) => {
  var Ee, Oe, Te, ke, Re;
  const {
    demoDir: a,
    tab: _ = {},
    stackblitz: f = { show: false },
    codesandbox: o = { show: false },
    codeplayer: u = { show: false }
  } = t || {};
  let {
    order: g = "vue,react,html",
    visible: v = true,
    select: b = (_.order || "vue,react,html").split(",")[0] || "vue"
  } = _;
  const c = {
    vue: "",
    title: "",
    description: "",
    html: "",
    react: ""
  }, k = i.content.match(pr), C = i.content.match(hr), S = i.content.match(cr), h = i.content.match(fr), r4 = i.content.match(dr), d = i.content.match(mr), T = i.content.match(gr), x = i.content.match(vr), E = i.content.match(br), l = i.content.match(yr), m = i.content.match(wr), p2 = i.content.match(xr), O = ((Ee = i.content.match(Er)) == null ? void 0 : Ee[1]) || "", s = i.content.match(Or), y = i.content.match(Tr), w = i.content.match(kr), A = !!((Oe = i.content.match(Rr)) != null && Oe[1]), N = ((Te = i.content.match(Sr)) == null ? void 0 : Te[1]) || "write", j = (ke = i.content.match(Cr)) == null ? void 0 : ke[1], P = (Re = e.realPath) != null ? Re : e.path, F = a || import_path.default.dirname(P);
  d != null && d[1] && (g = d[1]), T != null && T[1] && (b = T[1]);
  let z = "", it = "";
  x != null && x[1] && (z = x[1]), E != null && E[1] && (it = E[1]), l != null && l[1] && (f.show = l[1] === "true"), m != null && m[1] && (o.show = m[1] === "true"), p2 != null && p2[1] && (u.show = p2[1] === "true"), C != null && C[1] && (c.vue = import_path.default.join(F, C[1]).replace(/\\/g, "/")), S != null && S[1] && (c.html = import_path.default.join(F, S[1]).replace(/\\/g, "/")), h != null && h[1] && (c.react = import_path.default.join(F, h[1]).replace(/\\/g, "/")), c.title = k ? k[1] : "", c.description = r4 ? r4[1] : "";
  const R = c.vue ? import_path.default.resolve(
    a || import_path.default.dirname(P),
    (C == null ? void 0 : C[1]) || "."
  ).replace(/\\/g, "/") : "", M = c.html ? import_path.default.resolve(
    a || import_path.default.dirname(P),
    (S == null ? void 0 : S[1]) || "."
  ).replace(/\\/g, "/") : "", W = c.react ? import_path.default.resolve(
    a || import_path.default.dirname(P),
    (h == null ? void 0 : h[1]) || "."
  ).replace(/\\/g, "/") : "", vt = import_path.default.resolve(
    F,
    c.vue || c.react || c.html || "."
  ).replace(/\\/g, "/"), H = lr(vt), bt = `react${H}`;
  J(
    e,
    "vitepress-demo-plugin",
    "{ VitepressDemoBox, VitepressDemoPlaceholder }"
  ), J(e, "vitepress-demo-plugin/dist/style.css"), J(e, "vue", "{ ref, shallowRef, onMounted }"), c.vue && J(
    e,
    R,
    H,
    A ? void 0 : "dynamicImport"
  ), c.react && (J(
    e,
    "react",
    "{ createElement as reactCreateElement }"
  ), J(
    e,
    "react-dom/client",
    "{ createRoot as reactCreateRoot }"
  ), J(
    e,
    W,
    bt,
    "dynamicImport"
  ));
  const ut = "__placeholder_visible_key__";
  J(
    e,
    ut,
    `const ${ut} = ref(true);`,
    "inject"
  );
  const X = c.html ? `TempCodeHtml${H}` : "''", xt = c.react ? `TempCodeReact${H}` : "''", Q = c.vue ? `TempCodeVue${H}` : "''";
  c.html && J(
    e,
    `${M}?raw`,
    X
  ), c.react && J(
    e,
    `${W}?raw`,
    xt
  ), c.vue && J(
    e,
    `${R}?raw`,
    Q
  );
  const at = {
    vue: {},
    react: {},
    html: {}
  };
  function qt(Z) {
    return Z.replace(/'/g, '"').replace(/\\n/g, "").trim().replace(/^"/, "").replace(/"$/, "").replace(/,(\s|\n)*\}$/, "}").replace(/,(\s|\n)*\]$/, "]");
  }
  const we = {
    vue: qt((s == null ? void 0 : s[1]) || ""),
    react: qt((y == null ? void 0 : y[1]) || ""),
    html: qt((w == null ? void 0 : w[1]) || "")
  };
  for (const Z in we) {
    let Se = we[Z];
    if (Se)
      try {
        const ht = JSON.parse(Se);
        if (Array.isArray(ht))
          ht.forEach((Y) => {
            const Et = import_path.default.basename(Y);
            at[Z][Et] = {
              filename: Y,
              code: ""
            };
          });
        else if (typeof ht == "object")
          for (const Y in ht)
            at[Z][Y] = {
              filename: ht[Y],
              code: ""
            };
        for (const Y in at[Z]) {
          const Et = at[Z][Y].filename;
          if (Et) {
            const Ce = import_path.default.resolve(a || import_path.default.dirname(P), Et || ".").replace(/\\/g, "/");
            if (import_fs.default.existsSync(Ce)) {
              const Di = import_fs.default.readFileSync(Ce, "utf-8");
              at[Z][Y].code = Di;
            } else
              delete at[Z][Y];
          } else
            delete at[Z][Y];
        }
      } catch {
      }
  }
  let xe = "";
  return (t == null ? void 0 : t.locale) && typeof t.locale == "object" && (xe = encodeURIComponent(JSON.stringify(t.locale))), `
  ${A ? "" : `<vitepress-demo-placeholder v-show="${ut}" />`}
  ${A ? "" : "<ClientOnly>"}
    <vitepress-demo-box 
      title="${c.title}"
      description="${c.description}"
      locale="${xe}"
      select="${b}"
      order="${g}"
      github="${z}"
      gitlab="${it}"
      theme="${(t == null ? void 0 : t.theme) || ""}"
      lightTheme="${(t == null ? void 0 : t.lightTheme) || ""}"
      darkTheme="${(t == null ? void 0 : t.darkTheme) || ""}"
      stackblitz="${encodeURIComponent(JSON.stringify(f))}"
      codesandbox="${encodeURIComponent(JSON.stringify(o))}"
      codeplayer="${encodeURIComponent(JSON.stringify(u))}"
      files="${encodeURIComponent(JSON.stringify(at))}"
      scope="${O || ""}"
      htmlWriteWay="${N}"
      background="${j}"
      :visible="!!${v}"
      @mount="() => { ${ut} = false; }"
      ${c.html ? `
            :htmlCode="${X}"
            ` : ""}
      ${c.vue ? `
            :vueCode="${Q}"
            ` : ""}
      ${c.react ? `
            :reactCode="${xt}"
            :reactComponent="${bt}"
            :reactCreateRoot="reactCreateRoot"
            :reactCreateElement="reactCreateElement"
            ` : ""}
      >
      ${c.vue ? `
            <template v-if="${H}" #vue>
              <${H}></${H}>
            </template>
            ` : ""}
    </vitepress-demo-box>
  ${A ? "" : "</ClientOnly>"}`.trim();
};
var Pr = (n, i) => {
  const e = n.renderer.rules.html_inline, t = n.renderer.rules.html_block;
  n.renderer.rules.html_inline = (a, _, f, o, u) => {
    const g = a[_];
    return g.content = g.content.replace(/<!--[\s\S]*?-->/g, ""), pi.some((v) => v.test(g.content)) ? hi(n, g, o, i) : e(a, _, f, o, u);
  }, n.renderer.rules.html_block = (a, _, f, o, u) => {
    const g = a[_];
    return g.content = g.content.replace(/<!--[\s\S]*?-->/g, ""), pi.some((v) => v.test(g.content)) ? hi(n, g, o, i) : t(a, _, f, o, u);
  };
};
export {
  $r as VitepressDemoBox,
  Ir as VitepressDemoPlaceholder,
  Pr as vitepressDemoPlugin
};
/*! Bundled license information:

vitepress-demo-plugin/dist/index.js:
  (*!
   * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
  (*!
   * condense-newlines <https://github.com/jonschlinkert/condense-newlines>
   *
   * Copyright (c) 2014 Jon Schlinkert, contributors.
   * Licensed under the MIT License
   *)
  (*!
   * pretty <https://github.com/jonschlinkert/pretty>
   *
   * Copyright (c) 2013-2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=vitepress-demo-plugin.js.map
