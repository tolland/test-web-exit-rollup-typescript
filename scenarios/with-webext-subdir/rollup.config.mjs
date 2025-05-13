import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

const isWatch = process.env.ROLLUP_WATCH === 'true';

export default {
    input: {
        'WebExtension/background': 'src/WebExtension/background.ts',
        'WebExtension/sidebar/sidebar': 'src/WebExtension/sidebar/sidebar.ts',
    },
    output: {
        dir: 'dist/',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        resolve({browser: true}),
        typescript({
            tsconfig: 'tsconfig.json',
            compilerOptions: {
                noEmit: false,
                module: 'esnext',
                target: 'ES2020',
                moduleResolution: 'node',
                outDir: 'dist',
            },
        }),
        isWatch && serve(),
    ],
}; 