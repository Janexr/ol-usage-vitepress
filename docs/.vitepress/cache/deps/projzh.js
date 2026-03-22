import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/projzh/util.js
var require_util = __commonJS({
  "node_modules/projzh/util.js"(exports) {
    exports.forEachPoint = function(func) {
      return function(input, opt_output, opt_dimension) {
        var len = input.length;
        var dimension = opt_dimension ? opt_dimension : 2;
        var output;
        if (opt_output) {
          output = opt_output;
        } else {
          if (dimension !== 2) {
            output = input.slice();
          } else {
            output = new Array(len);
          }
        }
        for (var offset = 0; offset < len; offset += dimension) {
          func(input, output, offset);
        }
        return output;
      };
    };
  }
});

// node_modules/projzh/projection/baidu-mercator.js
var require_baidu_mercator = __commonJS({
  "node_modules/projzh/projection/baidu-mercator.js"(exports) {
    var forEachPoint = require_util().forEachPoint;
    var MCBAND = [
      1289059486e-2,
      836237787e-2,
      5591021,
      348198983e-2,
      167804312e-2,
      0
    ];
    var LLBAND = [75, 60, 45, 30, 15, 0];
    var MC2LL = [
      [
        1410526172116255e-23,
        898305509648872e-20,
        -1.9939833816331,
        200.9824383106796,
        -187.2403703815547,
        91.6087516669843,
        -23.38765649603339,
        2.57121317296198,
        -0.03801003308653,
        173379812e-1
      ],
      [
        -7435856389565537e-24,
        8983055097726239e-21,
        -0.78625201886289,
        96.32687599759846,
        -1.85204757529826,
        -59.36935905485877,
        47.40033549296737,
        -16.50741931063887,
        2.28786674699375,
        1026014486e-2
      ],
      [
        -3030883460898826e-23,
        898305509983578e-20,
        0.30071316287616,
        59.74293618442277,
        7.357984074871,
        -25.38371002664745,
        13.45380521110908,
        -3.29883767235584,
        0.32710905363475,
        685681737e-2
      ],
      [
        -1981981304930552e-23,
        8983055099779535e-21,
        0.03278182852591,
        40.31678527705744,
        0.65659298677277,
        -4.44255534477492,
        0.85341911805263,
        0.12923347998204,
        -0.04625736007561,
        448277706e-2
      ],
      [
        309191371068437e-23,
        8983055096812155e-21,
        6995724062e-14,
        23.10934304144901,
        -23663490511e-14,
        -0.6321817810242,
        -0.00663494467273,
        0.03430082397953,
        -0.00466043876332,
        25551644e-1
      ],
      [
        2890871144776878e-24,
        8983055095805407e-21,
        -3068298e-14,
        7.47137025468032,
        -353937994e-14,
        -0.02145144861037,
        -1234426596e-14,
        10322952773e-14,
        -323890364e-14,
        826088.5
      ]
    ];
    var LL2MC = [
      [
        -0.0015702102444,
        111320.7020616939,
        1704480524535203,
        -10338987376042340,
        26112667856603880,
        -35149669176653700,
        26595700718403920,
        -10725012454188240,
        1800819912950474,
        82.5
      ],
      [
        8277824516172526e-19,
        111320.7020463578,
        6477955746671607e-7,
        -4082003173641316e-6,
        1077490566351142e-5,
        -1517187553151559e-5,
        1205306533862167e-5,
        -5124939663577472e-6,
        9133119359512032e-7,
        67.5
      ],
      [
        0.00337398766765,
        111320.7020202162,
        4481351045890365e-9,
        -2339375119931662e-8,
        7968221547186455e-8,
        -1159649932797253e-7,
        9723671115602145e-8,
        -4366194633752821e-8,
        8477230501135234e-9,
        52.5
      ],
      [
        0.00220636496208,
        111320.7020209128,
        51751.86112841131,
        3796837749470245e-9,
        992013.7397791013,
        -122195221711287e-8,
        1340652697009075e-9,
        -620943.6990984312,
        144416.9293806241,
        37.5
      ],
      [
        -3441963504368392e-19,
        111320.7020576856,
        278.2353980772752,
        2485758690035394e-9,
        6070.750963243378,
        54821.18345352118,
        9540.606633304236,
        -2710.55326746645,
        1405.483844121726,
        22.5
      ],
      [
        -3218135878613132e-19,
        111320.7020701615,
        0.00369383431289,
        823725.6402795718,
        0.46104986909093,
        2351.343141331292,
        1.58060784298199,
        8.77738589078284,
        0.37238884252424,
        7.45
      ]
    ];
    function getRange(v, min, max) {
      v = Math.max(v, min);
      v = Math.min(v, max);
      return v;
    }
    function getLoop(v, min, max) {
      var d = max - min;
      while (v > max) {
        v -= d;
      }
      while (v < min) {
        v += d;
      }
      return v;
    }
    function convertor(input, output, offset, table) {
      var px = input[offset];
      var py = input[offset + 1];
      var x = table[0] + table[1] * Math.abs(px);
      var d = Math.abs(py) / table[9];
      var y = table[2] + table[3] * d + table[4] * d * d + table[5] * d * d * d + table[6] * d * d * d * d + table[7] * d * d * d * d * d + table[8] * d * d * d * d * d * d;
      output[offset] = x * (px < 0 ? -1 : 1);
      output[offset + 1] = y * (py < 0 ? -1 : 1);
    }
    exports.forward = forEachPoint(function(input, output, offset) {
      var lng = getLoop(input[offset], -180, 180);
      var lat = getRange(input[offset + 1], -74, 74);
      var table = null;
      var j;
      for (j = 0; j < LLBAND.length; ++j) {
        if (lat >= LLBAND[j]) {
          table = LL2MC[j];
          break;
        }
      }
      if (table === null) {
        for (j = LLBAND.length - 1; j >= 0; --j) {
          if (lat <= -LLBAND[j]) {
            table = LL2MC[j];
            break;
          }
        }
      }
      output[offset] = lng;
      output[offset + 1] = lat;
      convertor(output, output, offset, table);
    });
    exports.inverse = forEachPoint(function(input, output, offset) {
      var y_abs = Math.abs(input[offset + 1]);
      var table = null;
      for (var j = 0; j < MCBAND.length; j++) {
        if (y_abs >= MCBAND[j]) {
          table = MC2LL[j];
          break;
        }
      }
      convertor(input, output, offset, table);
    });
  }
});

// node_modules/projzh/projection/spherical-mercator.js
var require_spherical_mercator = __commonJS({
  "node_modules/projzh/projection/spherical-mercator.js"(exports) {
    var forEachPoint = require_util().forEachPoint;
    var RADIUS = 6378137;
    var MAX_LATITUDE = 85.0511287798;
    var RAD_PER_DEG = Math.PI / 180;
    exports.forward = forEachPoint(function(input, output, offset) {
      var lat = Math.max(Math.min(MAX_LATITUDE, input[offset + 1]), -MAX_LATITUDE);
      var sin = Math.sin(lat * RAD_PER_DEG);
      output[offset] = RADIUS * input[offset] * RAD_PER_DEG;
      output[offset + 1] = RADIUS * Math.log((1 + sin) / (1 - sin)) / 2;
    });
    exports.inverse = forEachPoint(function(input, output, offset) {
      output[offset] = input[offset] / RADIUS / RAD_PER_DEG;
      output[offset + 1] = (2 * Math.atan(Math.exp(input[offset + 1] / RADIUS)) - Math.PI / 2) / RAD_PER_DEG;
    });
  }
});

// node_modules/projzh/projection/index.js
var require_projection = __commonJS({
  "node_modules/projzh/projection/index.js"(exports) {
    exports.baiduMercator = require_baidu_mercator();
    exports.sphericalMercator = require_spherical_mercator();
  }
});

// node_modules/projzh/datum/gcj-02.js
var require_gcj_02 = __commonJS({
  "node_modules/projzh/datum/gcj-02.js"(exports) {
    var forEachPoint = require_util().forEachPoint;
    var PI = Math.PI;
    var AXIS = 6378245;
    var OFFSET = 0.006693421622965943;
    function delta(wgLon, wgLat) {
      var dLat = transformLat(wgLon - 105, wgLat - 35);
      var dLon = transformLon(wgLon - 105, wgLat - 35);
      var radLat = wgLat / 180 * PI;
      var magic = Math.sin(radLat);
      magic = 1 - OFFSET * magic * magic;
      var sqrtMagic = Math.sqrt(magic);
      dLat = dLat * 180 / (AXIS * (1 - OFFSET) / (magic * sqrtMagic) * PI);
      dLon = dLon * 180 / (AXIS / sqrtMagic * Math.cos(radLat) * PI);
      return [dLon, dLat];
    }
    function outOfChina(lon, lat) {
      if (lon < 72.004 || lon > 137.8347) {
        return true;
      }
      if (lat < 0.8293 || lat > 55.8271) {
        return true;
      }
      return false;
    }
    function transformLat(x, y) {
      var ret = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      ret += (20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2 / 3;
      ret += (20 * Math.sin(y * PI) + 40 * Math.sin(y / 3 * PI)) * 2 / 3;
      ret += (160 * Math.sin(y / 12 * PI) + 320 * Math.sin(y * PI / 30)) * 2 / 3;
      return ret;
    }
    function transformLon(x, y) {
      var ret = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      ret += (20 * Math.sin(6 * x * PI) + 20 * Math.sin(2 * x * PI)) * 2 / 3;
      ret += (20 * Math.sin(x * PI) + 40 * Math.sin(x / 3 * PI)) * 2 / 3;
      ret += (150 * Math.sin(x / 12 * PI) + 300 * Math.sin(x / 30 * PI)) * 2 / 3;
      return ret;
    }
    exports.toWGS84 = forEachPoint(function(input, output, offset) {
      var lng = input[offset];
      var lat = input[offset + 1];
      if (!outOfChina(lng, lat)) {
        var deltaD = delta(lng, lat);
        lng = lng - deltaD[0];
        lat = lat - deltaD[1];
      }
      output[offset] = lng;
      output[offset + 1] = lat;
    });
    exports.fromWGS84 = forEachPoint(function(input, output, offset) {
      var lng = input[offset];
      var lat = input[offset + 1];
      if (!outOfChina(lng, lat)) {
        var deltaD = delta(lng, lat);
        lng = lng + deltaD[0];
        lat = lat + deltaD[1];
      }
      output[offset] = lng;
      output[offset + 1] = lat;
    });
  }
});

// node_modules/projzh/datum/bd-09.js
var require_bd_09 = __commonJS({
  "node_modules/projzh/datum/bd-09.js"(exports) {
    var forEachPoint = require_util().forEachPoint;
    var gcj02 = require_gcj_02();
    var PI = Math.PI;
    var X_PI = PI * 3e3 / 180;
    var toGCJ02 = exports.toGCJ02 = forEachPoint(function(input, output, offset) {
      var x = input[offset] - 65e-4;
      var y = input[offset + 1] - 6e-3;
      var z = Math.sqrt(x * x + y * y) - 2e-5 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) - 3e-6 * Math.cos(x * X_PI);
      output[offset] = z * Math.cos(theta);
      output[offset + 1] = z * Math.sin(theta);
      return output;
    });
    var fromGCJ02 = exports.fromGCJ02 = forEachPoint(function(input, output, offset) {
      var x = input[offset];
      var y = input[offset + 1];
      var z = Math.sqrt(x * x + y * y) + 2e-5 * Math.sin(y * X_PI);
      var theta = Math.atan2(y, x) + 3e-6 * Math.cos(x * X_PI);
      output[offset] = z * Math.cos(theta) + 65e-4;
      output[offset + 1] = z * Math.sin(theta) + 6e-3;
      return output;
    });
    exports.toWGS84 = function(input, opt_output, opt_dimension) {
      var output = toGCJ02(input, opt_output, opt_dimension);
      return gcj02.toWGS84(output, output, opt_dimension);
    };
    exports.fromWGS84 = function(input, opt_output, opt_dimension) {
      var output = gcj02.fromWGS84(input, opt_output, opt_dimension);
      return fromGCJ02(output, output, opt_dimension);
    };
  }
});

// node_modules/projzh/datum/index.js
var require_datum = __commonJS({
  "node_modules/projzh/datum/index.js"(exports) {
    exports.bd09 = require_bd_09();
    exports.gcj02 = require_gcj_02();
  }
});

// node_modules/projzh/index.js
var require_projzh = __commonJS({
  "node_modules/projzh/index.js"(exports) {
    var projection = require_projection();
    var datum = require_datum();
    exports.smerc2bmerc = function(input, opt_output, opt_dimension) {
      var output = projection.sphericalMercator.inverse(input, opt_output, opt_dimension);
      output = datum.bd09.fromWGS84(output, output, opt_dimension);
      return projection.baiduMercator.forward(output, output, opt_dimension);
    };
    exports.bmerc2smerc = function(input, opt_output, opt_dimension) {
      var output = projection.baiduMercator.inverse(input, opt_output, opt_dimension);
      output = datum.bd09.toWGS84(output, output, opt_dimension);
      return projection.sphericalMercator.forward(output, output, opt_dimension);
    };
    exports.bmerc2ll = function(input, opt_output, opt_dimension) {
      var output = projection.baiduMercator.inverse(input, opt_output, opt_dimension);
      return datum.bd09.toWGS84(output, output, opt_dimension);
    };
    exports.ll2bmerc = function(input, opt_output, opt_dimension) {
      var output = datum.bd09.fromWGS84(input, opt_output, opt_dimension);
      return projection.baiduMercator.forward(output, output, opt_dimension);
    };
    exports.ll2smerc = projection.sphericalMercator.forward;
    exports.smerc2ll = projection.sphericalMercator.inverse;
    exports.datum = datum;
    exports.projection = projection;
  }
});
export default require_projzh();
//# sourceMappingURL=projzh.js.map
