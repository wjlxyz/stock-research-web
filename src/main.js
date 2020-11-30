import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from "element-ui/lib/locale";
import VueDataTables from 'vue-data-tables'
import axios from 'axios'
import routes from "@/routes";

Vue.config.productionTip = false
Vue.use(ElementUI)
locale.use(lang)
Vue.use(VueDataTables)
Vue.prototype.$ajax=axios
const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return require('./pages/' + matchingView + '.vue')
    }
  },
  render: h => h(App),
}).$mount('#app')

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})

