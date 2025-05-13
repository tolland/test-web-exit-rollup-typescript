import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

const isWatch = process.env.ROLLUP_WATCH === 'true';

export default {
    input: {
        'background': 'src/background.ts',
        'sidebar/sidebar': 'src/sidebar/sidebar.ts',
    },
    output: {
        dir: 'dist/',
        format: 'es',
        sourcemap: true,
        sourcemapBaseUrl: "http://localhost:10001/dist/WebExtension",
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