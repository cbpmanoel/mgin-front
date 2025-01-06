import "./assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { clickOutside } from "./directives/clickOutside";

const app = createApp(App);
app.directive("click-outside", clickOutside);

app.use(router);

app.mount("#app");
