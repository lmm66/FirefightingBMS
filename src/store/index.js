// 引入Vue
import Vue from 'vue';
// 引入Vuex
import Vuex from 'vuex';
import tab from './tab'
import token from './token'
import houseName from './firehouse'
// 应用Vuex插件
Vue.use(Vuex);
 
// 创建并导出store
export default new Vuex.Store({
    modules: {
        tab,
        token,
        houseName
    }
});
 