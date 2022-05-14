import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueMeta from 'vue-meta';


Vue.config.productionTip = true
Vue.use(VueMeta);
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
