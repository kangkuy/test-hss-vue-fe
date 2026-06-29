import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import { ConfirmationService } from "primevue";
import Aura from "@primeuix/themes/aura";
import Lara from "@primeuix/themes/lara";
import Nora from "@primeuix/themes/nora";
import Material from "@primeuix/themes/material";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faUser,
  faTrash,
  faPen,
  faPlus,
  faMagnifyingGlass,
  faRightFromBracket,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUser,
  faTrash,
  faPen,
  faPlus,
  faMagnifyingGlass,
  faRightFromBracket,
  faEye,
);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(ConfirmationService);
app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
