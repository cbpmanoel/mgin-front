import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import process from "node:process";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import svgLoader from "vite-svg-loader";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Load environment variables based on the mode (development, production, etc.)
    const env = loadEnv(mode, process.cwd(), "VITE_");

    return {
        plugins: [vue(), vueDevTools(), svgLoader()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: env.VITE_API_BASE_URL || "http://localhost:8000",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    };
});
