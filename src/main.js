import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
import *as filters from './filters/index'
Vue.config.productionTip = false
Vue.use(ElementUI);
// 定义公共方法
import axios from "axios";
Vue.prototype.axios=axios.create({
  baseURL:"http://linlilian.cn/jeecg-boot"
});
// 全局注册，使用方法为：this.qs
Vue.prototype.qs = qs

// 全局注册过滤器
Object.keys(filters).forEach((key) => {
	// console.log(filters[key]);
	Vue.filter(key, filters[key]);
});

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const requireAuth = to.meta.requireAuth
  // 判断该路由是否需要登录权限
  if (requireAuth) {
    // 已登录
    if (window.sessionStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
