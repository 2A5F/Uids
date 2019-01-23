import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: './tsout/uid.js',
    output: {
        file: './dist/uid.js',
        format: 'umd',
        name: 'uid'
    },
    plugins: [commonjs(), resolve()]
};