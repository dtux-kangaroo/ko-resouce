import Vue from 'vue';
import Router from 'vue-router';
import tip404 from  '@/pages/error/404'
import MainLayout from '@/layout/mainLayout';
import SideLayout from '@/layout/sideLayout'
import TopLayout from '@/layout/topLayout'
import load from '@/components/load'
import User from '@/pages/user';
const Home = () => ({component: import('@/pages/home/index'),loading: load});
const Login =()=>({component: import('@/pages/login'),loading: load})
const Table =()=>({component: import('@/pages/table'),loading: load})
const Analysis =()=>({component: import('@/pages/analysis'),loading: load})



Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
     path:'/index',component:MainLayout,
     children:[
      {path: '',name: 'home',component: Home},
      {path: 'table',name: 'tabel',component: Table},
      {path: 'analysis',name: 'analysis',component: Analysis},
      {path: 'user',name: 'user',component: User},
      { path: '404',name:'404', component:tip404},
     ]
    },
    {
      path:'/back',component:MainLayout,
      children:[
        {path: 'form',name: 'form',component: Analysis},
      ]
    },
    {
      path:'/part',component:MainLayout,
      children:[
        {path: 'draggable',name: 'draggable',component: Analysis},
      ]
    },
    {path: '/login',name: 'login',component: Login},
    {path: '/',redirect: '/index'},
    { path: '*', redirect: '/index/404'}
  ]
})
