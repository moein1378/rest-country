import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import { router } from "@/router";
import axios from "@/configs/axios.config";
import { quasarConfig } from "@/configs/quasar.config";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(router);
app.use(axios);
app.use(Quasar, quasarConfig);

app.mount("#app");
