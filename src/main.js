import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from "element-ui/lib/locale";
import VueDataTables from 'vue-data-tables'
import axios from 'axios'
import router from "./router";

Vue.config.productionTip = false
Vue.use(ElementUI)
locale.use(lang)
Vue.use(VueDataTables)
Vue.prototype.$ajax=axios

new Vue({
  el: '#app',
  router,
  components: {App},
  render: h => h(App),
}).$mount('#app')

