import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

const Login = () => import('@/pages/Login');
const Layout = () => import('@/pages/Layout');
const Index = () => import('@/pages/Index');
const Menu = () => import('@/pages/Menu');
const Role = () => import('@/pages/Role');
const User = () => import('@/pages/User');
const Category = () => import('@/pages/Category');
const Specs = () => import('@/pages/Specs');
const Goods = () => import('@/pages/Goods');
const Member = () => import('@/pages/Member');
const Banner = () => import('@/pages/Banner');
const Seckill = () => import('@/pages/Seckill');
// const SideBar = () => import('@/components/common/SideBar');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login', // 登录
      name: 'Login',
      component: Login
    }, {
      path: '/',
      component: Layout,
      children: [{
        path: 'index', // 首页
        component: Index
      }, {
        path: 'menu', // 菜单管理
        component: Menu
      }, {
        path: 'role', // 角色管理
        component: Role
      }, {
        path: 'user', // 管理员管理
        component: User
      }, {
        path: 'category', // 商品分类
        component: Category
      }, {
        path: 'specs', // 商品规格
        component: Specs
      }, {
        path: 'goods', // 商品管理
        component: Goods
      }, {
        path: 'member', // 会员管理
        component: Member
      }, {
        path: 'banner', // 轮播图管理
        component: Banner
      }, {
        path: 'seckill', // 秒杀活动
        component: Seckill
      }, {
        path: '',
        redirect: '/index'
      }]
    }
  ]
})
