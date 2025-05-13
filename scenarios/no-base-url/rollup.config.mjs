import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: {
        'background': 'src/background.ts',
        'sidebar/sidebar': 'src/sidebar/sidebar.ts',
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
    ],
}; 