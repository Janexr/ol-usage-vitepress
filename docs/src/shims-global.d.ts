declare module 'projzh'{
    type TransformFn = (input: number[], opt_output?: number[], opt_dimension?: number) => number[];
    export const projection: {
        sphericalMercator: {
            inverse: TransformFn;
            forward: TransformFn;
        };
    }
    export const datum: {
        gcj02: {
            fromWGS84: TransformFn;
            toWGS84: TransformFn;
        };
        bd09: {
            fromWGS84: TransformFn;
            toWGS84: TransformFn;
        };
    };
    export const ll2bmerc: TransformFn;
    export const bmerc2ll: TransformFn;
    export const smerc2bmerc: TransformFn;
    export const bmerc2smerc: TransformFn;
}

declare module '*.png'