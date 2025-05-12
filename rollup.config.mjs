// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import copyWatch from 'rollup-plugin-copy-watch';
import webext from 'rollup-plugin-webext';

const isWatch = process.env.ROLLUP_WATCH === 'true';
const production = false;
const copyPlugin = isWatch ? copyWatch : copy;

export const extension = {
    input: {
        'background': 'src/WebExtension/background.ts',
        'content': 'src/WebExtension/content-script.ts',
    },
    output: {
        dir: 'dist/WebExtension/',
        format: 'es',
        sourcemap: true,
        // sourcemapBaseUrl : "http://localhost:10001/dist/WebExtension",
    },
    plugins: [
        typescript({
            compilerOptions: {
                noEmit: false,
                module: 'esnext',
                lib: ['ESNext', 'DOM', 'DOM.Iterable'],
                target: 'ES2020',
                moduleResolution: 'node',
                sourceMap: true,
                // inlineSources: true,
                outDir: 'dist/WebExtension',
            },
            filterRoot: 'src',
            include: [
                'WebExtension/**/*.ts'
            ],
            exclude: ['node_modules', 'dist', 'release'],
        }),
        copyPlugin({
            flatten: false,
            targets: [
                {
                    src: 'src/**/*.{css,png,json,html}',
                    dest: 'dist',
                },
            ],
        }),
        webext(),
    ],
    watch: {
        clearScreen: false,
    },
    external: [],
};


export default [extension];
