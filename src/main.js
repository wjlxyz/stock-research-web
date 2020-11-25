import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
Vue.use(ElementUI)
