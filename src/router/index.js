import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
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
                    meta:{isAuth:true, title:'摄像头分布'},
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
// 全局前置路由守卫————初始化及每次路由切换之前被调用
// router.beforeEach((to,from,next) => {
//     if(to.meta.isAuth) {    // 判断是否需要权限鉴定
//         if(store.state.token.token){
//             next();
//         }else{
//             alert('请登录!');
//             next('/')
//         }
//     }else{
//         next();
//     }
// })
router.afterEach((to,from) => {
    document.title = to.meta.title;
})
export default router