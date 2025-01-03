import "./assets/css/main.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Material from "@primevue/themes/material";

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Material,
        options: {
            prefix: "p",
            darkModeSelector: false || "none",
            cssLayer: false,
        },
    },
});

app.mount("#app");
