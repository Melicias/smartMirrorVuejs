import { createApp } from "vue";
import App from "./App.vue";
import GridLayout from "vue3-drr-grid-layout";
import "vue3-drr-grid-layout/dist/style.css";
import "./assets/main.css";
import VCalendar from "v-calendar";
import VueSplide from "@splidejs/vue-splide";
import "v-calendar/dist/style.css";
import "@fontsource/roboto";
import socket from "./services/socket";
import store from "./store";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
//import { Vue } from "vue-class-component";

library.add(fas);
dom.watch();

createApp(App)
  .use(GridLayout)
  .use(VCalendar, {})
  .use(VueSplide)
  .use(store)
  .mount("#app");
