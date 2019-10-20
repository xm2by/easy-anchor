import Vue from 'vue'
import App from './App.vue'
import Anchor from './components/anchor/index'

Vue.config.productionTip = false
Vue.use(Anchor)

new Vue({
  render: h => h(App),
}).$mount('#app')