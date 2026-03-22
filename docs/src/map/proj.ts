import { applyTransform } from 'ol/extent';
import { Projection, addProjection, addCoordinateTransforms, get } from 'ol/proj';
import * as projzh from 'projzh';

type TransformFn = (input: number[], opt_output?: number[], opt_dimension?: number) => number[];

interface Projzh {
    projection: {
        sphericalMercator: {
            inverse: TransformFn;
            forward: TransformFn;
        };
    };
    datum: {
        gcj02: {
            fromWGS84: TransformFn;
            toWGS84: TransformFn;
        };
        bd09: {
            fromWGS84: TransformFn;
            toWGS84: TransformFn;
        };
    };
    ll2bmerc: TransformFn;
    bmerc2ll: TransformFn;
    smerc2bmerc: TransformFn;
    bmerc2smerc: TransformFn;
}

const GCJ02_Mercator: Record<string, TransformFn> = {
    smerc2gcj(input, opt_output, opt_dimension) {
        let output = projzh.projection.sphericalMercator.inverse(input, opt_output, opt_dimension);
        output = projzh.datum.gcj02.fromWGS84(output, output, opt_dimension);
        return projzh.projection.sphericalMercator.forward(output, output, opt_dimension);
    },
    gcj2smerc(input, opt_output, opt_dimension) {
        let output = projzh.projection.sphericalMercator.inverse(input, opt_output, opt_dimension);
        output = projzh.datum.gcj02.toWGS84(output, output, opt_dimension);
        return projzh.projection.sphericalMercator.forward(output, output, opt_dimension);
    },
    ll2gcj(input, opt_output, opt_dimension) {
        const output = projzh.datum.gcj02.fromWGS84(input, opt_output, opt_dimension);
        return projzh.projection.sphericalMercator.forward(output, output, opt_dimension);
    },
    gcj2ll(input, opt_output, opt_dimension) {
        const output = projzh.projection.sphericalMercator.inverse(input, opt_output, opt_dimension);
        return projzh.datum.gcj02.toWGS84(output, output, opt_dimension);
    }
};

const GCJ02_WGS84: Record<string, TransformFn> = {
    smerc2gcj(input, opt_output, opt_dimension) {
        const output = projzh.projection.sphericalMercator.inverse(input, opt_output, opt_dimension);
        return projzh.datum.gcj02.fromWGS84(output, output, opt_dimension);
    },
    gcj2smerc(input, opt_output, opt_dimension) {
        const output = projzh.datum.gcj02.toWGS84(input, opt_output, opt_dimension);
        return projzh.projection.sphericalMercator.forward(output, output, opt_dimension);
    },
    ll2gcj(input, opt_output, opt_dimension) {
        return projzh.datum.gcj02.fromWGS84(input, opt_output, opt_dimension);
    },
    gcj2ll(input, opt_output, opt_dimension) {
        return projzh.datum.gcj02.toWGS84(input, opt_output, opt_dimension);
    }
};

// 添加 gcj02 坐标系
export function addGcj02MercatorProjection(): void {
    if (get('GCJ02')) return;
    const extent = [-180, -90, 180, 90];
    const gcj02 = new Projection({
        code: 'GCJ02',
        extent: applyTransform(extent, GCJ02_Mercator.ll2gcj),
        units: 'm'
    });

    addProjection(gcj02);
    addCoordinateTransforms('EPSG:4326', gcj02, GCJ02_Mercator.ll2gcj, GCJ02_Mercator.gcj2ll);
    addCoordinateTransforms('EPSG:3857', gcj02, GCJ02_Mercator.smerc2gcj, GCJ02_Mercator.gcj2smerc);
}

// 添加 gcj02 坐标系
export function addGcj02Projection(): void {
    if (get('GCJ02-WGS84')) return;
    const extent = [-180, -90, 180, 90];
    const gcj02 = new Projection({
        code: 'GCJ02-WGS84',
        extent: applyTransform(extent, GCJ02_WGS84.ll2gcj),
        units: 'degrees'
    });

    addProjection(gcj02);
    addCoordinateTransforms('EPSG:4326', gcj02, GCJ02_WGS84.ll2gcj, GCJ02_WGS84.gcj2ll);
    addCoordinateTransforms('EPSG:3857', gcj02, GCJ02_WGS84.smerc2gcj, GCJ02_WGS84.gcj2smerc);
}

const BD_WGS84: Record<string, TransformFn> = {
    smerc2bd(input, opt_output, opt_dimension) {
        const output = projzh.projection.sphericalMercator.inverse(input, opt_output, opt_dimension);
        return projzh.datum.bd09.fromWGS84(output, output, opt_dimension);
    },
    bd2smerc(input, opt_output, opt_dimension) {
        const output = projzh.datum.bd09.toWGS84(input, opt_output, opt_dimension);
        return projzh.projection.sphericalMercator.forward(output, output, opt_dimension);
    },
    ll2bd(input, opt_output, opt_dimension) {
        return projzh.datum.bd09.fromWGS84(input, opt_output, opt_dimension);
    },
    bd2ll(input, opt_output, opt_dimension) {
        return projzh.datum.bd09.toWGS84(input, opt_output, opt_dimension);
    }
};

// 添加百度坐标系
export function addBdMercatorProjection(): void {
    if (get('baidu')) return;
    const extent = [72.004, 0.8293, 137.8347, 55.8271];
    const baiduMercator = new Projection({
        code: 'baidu',
        extent: applyTransform(extent, projzh.ll2bmerc),
        units: 'm'
    });

    addProjection(baiduMercator);
    addCoordinateTransforms('EPSG:4326', baiduMercator, projzh.ll2bmerc, projzh.bmerc2ll);
    addCoordinateTransforms('EPSG:3857', baiduMercator, projzh.smerc2bmerc, projzh.bmerc2smerc);
}
// 添加百度坐标系
export function addBdProjection(): void {
    if (get('baidu-WGS84')) return;
    const extent = [72.004, 0.8293, 137.8347, 55.8271];
    const baidu = new Projection({
        code: 'baidu-WGS84',
        extent: applyTransform(extent, BD_WGS84.ll2bd),
        units: 'degrees'
    });

    addProjection(baidu);
    addCoordinateTransforms('EPSG:4326', baidu, BD_WGS84.ll2bd, BD_WGS84.bd2ll);
    addCoordinateTransforms('EPSG:3857', baidu, BD_WGS84.smerc2bd, BD_WGS84.bd2smerc);
}
