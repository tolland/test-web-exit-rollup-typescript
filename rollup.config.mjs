// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import copyWatch from 'rollup-plugin-copy-watch';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

const isWatch = process.env.ROLLUP_WATCH === 'true';
const production = false;
const copyPlugin = isWatch ? copyWatch : copy;


const fixRollupPathProblem = (relativeSourcePath, sourcemapPath) => {
    // relativeSourcePath is the path Rollup *thinks* is correct (e.g., ../../../src/...)
    // sourcemapPath is the absolute path to the generated .map file

    // Simple fix: If the path starts with the incorrect prefix, replace it.
    const wrongPrefix = '../../../src/';
    const correctPrefix = '../../src/';

    if (relativeSourcePath.startsWith(wrongPrefix)) {
        const correctedPath = correctPrefix + relativeSourcePath.substring(wrongPrefix.length);
        // console.log(`Sourcemap Fix: ${relativeSourcePath} -> ${correctedPath}`); // Optional: for debugging
        return correctedPath;
    }

    // Fallback: return the original path if it doesn't match the expected wrong pattern
    // console.warn(`Sourcemap Path: ${relativeSourcePath} did not match expected prefix ${wrongPrefix}`);
    return relativeSourcePath;
}

export const extension = {
    cache: '.rollup.tscache',
    input: {
        'background': 'src/WebExtension/background.ts',
        'content-script': 'src/WebExtension/content-script.ts',
        'sidebar/sidebar': 'src/WebExtension/sidebar/sidebar.ts',
    },
    output: {
        dir: 'dist/WebExtension/',
        format: 'es',
        sourcemap: 'true',
        //sourcemapBaseUrl: "http://localhost:10001/dist/WebExtension",
        // sourcemapPathTransform: fixRollupPathProblem,
    },
    plugins: [
        resolve({browser: true, preferBuiltins: false}),
        typescript({
            tsconfig: 'tsconfig.json',
            compilerOptions: {
                noEmit: false,
                module: 'esnext',
                lib: ['ESNext', 'DOM', 'DOM.Iterable'],
                target: 'ES2020',
                moduleResolution: 'node',
                outDir: 'dist/WebExtension',
            },
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
    ],
    watch: {
        clearScreen: false,
    },
    external: [],
};


export default [extension];
