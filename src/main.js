import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from "element-ui/lib/locale";
import VueDataTables from 'vue-data-tables'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
locale.use(lang)
Vue.use(VueDataTables)
Vue.use(axios)
new Vue({
  render: h => h(App),
}).$mount('#app')

