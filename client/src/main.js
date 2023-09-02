import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import VueSweetalert2 from "vue-sweetalert2";

 
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "ant-design-vue/dist/antd.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);
const pinia = createPinia();
app.use(Antd);
app.use(router);
app.use(VueSweetalert2);
app.use(pinia);

// window.Swal = app.config.globalProperties.$swal;
app.mount("#app");
