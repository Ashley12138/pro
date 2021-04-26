import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '登录',
    component: () => import('../views/Login.vue'),
    meta:{
      title:"登录",
      showNav: true,
      requireAuth:''
    }
  },
  {
    path: '/Index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    meta:{
      title:"首页·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/BannerMain',
    name:'BannerMain',
    component: () => import('../views/BannerMain.vue'),
    meta:{
      title:"轮播图·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/BalanceMain',
    name:'BalanceMain',
    component: () => import('../views/BalanceMain.vue'),
    meta:{
      title:"资金管理·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/PayMain',
    name:'PayMain',
    component: () => import('../views/PayMain.vue'),
    meta:{
      title:"用户支付管理·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/StoreMain',
    name:'StoreMain',
    component: () => import('../views/StoreMain.vue'),
    meta:{
      title:"店铺管理·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/WithdrawalMain',
    name:'WithdrawalMain',
    component: () => import('../views/WithdrawalMain.vue'),
    meta:{
      title:"提现审核·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/UserMain',
    name:'UserMain',
    component: () => import('../views/UserMain.vue'),
    meta:{
      title:"微信用户管理·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/AddressMain',
    name:'AddressMain',
    component: () => import('../views/AddressMain.vue'),
    meta:{
      title:"用户地址管理·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/OrderMain',
    name:'OrderMain',
    component: () => import('../views/OrderMain.vue'),
    meta:{
      title:"订单管理·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/AuditStoreMain',
    name:'AuditStoreMain',
    component: () => import('../views/AuditStoreMain.vue'),
    meta:{
      title:"审核店铺管理·食惠吃管理平台",
      // requireAuth:true
    }
  },
  {
    path:'/ServiceMain',
    name:'ServiceMain',
    component: () => import('../views/ServiceMain.vue'),
    meta:{
      title:"客服管理·食惠吃管理平台",
      // requireAuth:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
