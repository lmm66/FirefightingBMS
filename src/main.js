import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from "./store"    
import qs from 'qs'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
// 按需引入ElementUI组件库
import ElementUI from './element/index';
// 引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';
import cookie from './util/cookie';
Vue.prototype.cookie = cookie;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$qs = qs
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
