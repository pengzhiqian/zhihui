import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入全局样式表
import './assets/css/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
import axios from 'axios';
Vue.prototype.axios = axios
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
//配置请求的跟路径
axios.defaults.baseURL = 'http://122.112.253.28:8095/prod-api/'
axios.interceptors.request.use(config => {
    console.log(config);
    config.headers.Authorization = window.sessionStorage.getItem('token')
        //最后必须 return config
    return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')