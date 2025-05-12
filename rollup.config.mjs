// rollup.config.mjs
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-import-css';
import copy from 'rollup-plugin-copy';
import copyWatch from 'rollup-plugin-copy-watch';
import webext from 'rollup-plugin-webext';
import serve from 'rollup-plugin-serve';

const isWatch = process.env.ROLLUP_WATCH === 'true';
const production = false;
const copyPlugin = isWatch ? copyWatch : copy;

export const extension = {
    input: {
        'background': 'src/WebExtension/background.ts',
        'content': 'src/WebExtension/content.ts',
        'popup/popup': 'src/WebExtension/popup/popup.js',
        'sd_parsers': 'src/sd_parsers/index.ts',
        'sidebar/sidebar': 'src/WebExtension/sidebar/sidebar.ts',
        'viewer/viewer': 'src/WebExtension/viewer/viewer.ts',
        'browser-action/popup': 'src/WebExtension/browser-action/popup.ts',
        'options/options': 'src/WebExtension/options/options.js',
        'navigate-collection/index':
            'src/WebExtension/navigate-collection/index.ts',
    },
    output: {
        dir: 'dist/WebExtension/',
        format: 'es',
        sourcemap: 'inline',
        // sourcemapBaseUrl : "http://localhost:10001/dist/WebExtension",
    },
    plugins: [
        resolve({ browser: true, preferBuiltins: false }),
        commonjs(),
        css(),
        json(),
        typescript({
            tsconfig: 'tsconfig.base.json',
            compilerOptions: {
                noEmit: false,
                module: 'esnext',
                lib: ['ESNext', 'DOM', 'DOM.Iterable'],
                target: 'ES2020',
                moduleResolution: 'node',
                sourceMap: true,
                inlineSources: true,
                // sourceRoot: ".",
                // inlineSources: true
                outDir: 'dist/WebExtension',
            },
            filterRoot: 'src',
            include: [
                'WebExtension/**/*.ts',
                'types/**/*.ts',
                'sd_parsers/**/*.ts',
                'services/**/*.ts',
                'lib/**/*.ts',
                '**/*.ts',
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
        isWatch && serve(),
        webext({
            dir: 'dist/WebExtension',
        }),
    ],
    watch: {
        clearScreen: false,
    },
    external: [],
};

export const content_script = {
    input: {
        'content-script': 'src/WebExtension/content-script.ts',
    },
    output: {
        dir: 'dist/WebExtension',
        format: 'iife',
        sourcemap: true,
        name: '_',
        globals: {},
    },
    plugins: [
        resolve({ browser: true, preferBuiltins: false }),
        commonjs(),
        css(),
        json(),
        typescript({
            tsconfig: 'tsconfig.base.json',
            sourceMap: !production,
            inlineSources: !production,
            compilerOptions: {
                noEmit: false,
                module: 'esnext',
                lib: ['ESNext', 'DOM', 'DOM.Iterable'],
                target: 'ES2020',
                outDir: './dist/WebExtension',
                moduleResolution: 'node',
            },
        }),
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
    external: [],
};

export default [extension, content_script];
