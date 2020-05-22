import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FF5722",
        secondary: "#FFCCBC",
        accent: "#E64A19"
      }
    }
  }
});
