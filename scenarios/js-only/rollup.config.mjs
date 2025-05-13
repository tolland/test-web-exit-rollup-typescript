import resolve from '@rollup/plugin-node-resolve';

export default {
    input: {
        'background': 'src/background.js',
        'sidebar/sidebar': 'src/sidebar/sidebar.js',
    },
    output: {
        dir: 'dist/',
        format: 'es',
        sourcemap: true,
        sourcemapBaseUrl: "http://localhost:10001/dist",
    },
    plugins: [
        resolve({browser: true}),
    ],
}; 