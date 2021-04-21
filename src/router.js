import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Bclass from './components/Bclass.vue'
import Bdormitory from './components/Bdormitory.vue'
import Index from './components/Index.vue'
import Bstudent from './components/Bstudent.vue'
import Sdhygiene from './components/Sdhygiene.vue'
import Sdattence from './components/Sdattence.vue'
import Sddevice from './components/Sddevice.vue'
import Sdleave from './components/Sdleave.vue'
import Sdattenceexception from './components/Sdattenceexception.vue'
Vue.use(Router)

const router = new Router({
        routes: [{
                path: '/',
                name: '/login',
                redirect: '/login'

            },
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/home',
                name: 'home',
                component: Home,
                redirect: '/bclass',
                children: [
                    { path: '/bclass', component: Bclass },
                    { path: '/bdormitory', component: Bdormitory },
                    { path: '/index', component: Index },
                    { path: '/bstudent', component: Bstudent },
                    { path: '/sdhygiene', component: Sdhygiene },
                    { path: '/sdattence', component: Sdattence },
                    { path: '/sddevice', component: Sddevice },
                    { path: '/sdleave', component: Sdleave },
                    { path: '/sdattenceexception', component: Sdattenceexception }
                ]
            },

        ]
    })
    //挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next();
})

export default router