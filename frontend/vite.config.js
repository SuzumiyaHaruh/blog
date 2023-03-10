import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        // proxy: {
        //     "/api": "http://localhost:1337",
        //     "/upload": "http://localhost:1337",
        // },
        proxy: {
            // 接口地址代理
            '/api': {
                target: 'http://localhost:1337', // 接口的域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                rewrite: path => path.replace(/^\/api/, '/api')
            },
        }
    },
});
