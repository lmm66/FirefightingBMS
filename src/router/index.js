import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import cookie from '../util/cookie';
Vue.use(VueRouter);

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            path: '/',
            name:'login',
            meta:{title:'登录'},
            component: () => import ("../pages/UserLogin.vue"),
        },
        {
            path: '/main',
            name: 'main',
            component: () => import ("../pages/Main.vue"),
            children: [
                {
                    path: 'home',
                    name: 'home',
                    meta:{isAuth:true, title:'首页'},
                    component: () => import ("../pages/Home.vue"),
                },
                {
                    path: 'firehouse',
                    name: 'firehouse',
                    meta:{isAuth:true, title:'消防站管理'},
                    component: () => import ("../pages/Firehouse.vue"),
                },
                {
                    path: 'firemen',
                    name: 'firemen',
                    meta:{isAuth:true, title:'消防员管理'},
                    component: () => import ("../pages/Firemen.vue"),
                },
                {
                    path: 'fireSystem',
                    name: 'fireSystem',
                    meta:{isAuth:true, title:'火源识别系统'},
                    component: () => import ("../pages/FireSystem.vue"),
                },
                {
                    path: 'camera',
                    name: 'camera',
                    meta:{isAuth:true, title:'道路检测标记'},
                    component: () => import ("../pages/Camera.vue"),
                },
                {
                    path: 'message',
                    name: 'message',
                    meta:{isAuth:true, title:'报警信息汇总'},
                    component: () => import ("../pages/Message.vue"),
                },
                {
                    path: 'datas',
                    name: 'datas',
                    meta:{isAuth:true, title:'数据分析'},
                    component: () => import ("../pages/Datas.vue"),
                },
            ]
        },
    ]
})
router.beforeEach((to,from,next) => {
    if(to.meta.isAuth) {    
        if(cookie.getCookie("LoginName")){
            next();
        }else{
            alert('请登录!');
            next('/')
        }
    }else{
        next();
    }
})
router.afterEach((to,from) => {
    document.title = to.meta.title;
})
export default router