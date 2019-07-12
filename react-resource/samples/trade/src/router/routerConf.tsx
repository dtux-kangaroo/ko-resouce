
import { lazy } from 'react';
import MainLayout  from 'layout/mainLayout';
import SideLayout  from 'layout/sideLayout';
import Page404 from 'pages/error/404';
import Login from 'pages/auth/login/index';
// 行业指标

const  CompanyManage= lazy(() => import('pages/industryIndex/companyManage'));
const  IndustryManage= lazy(() => import('pages/industryIndex/industryManage'));
const  IndustryChild= lazy(() => import('pages/industryIndex/industryChild'));
const  CompanyDetails= lazy(() => import('pages/industryIndex/companyDetails'));
const  BusinessScenarioDetail= lazy(() => import('pages/industryIndex/businessScenarioDetail'));

// 系统管理
const  UserManage= lazy(() => import('pages/systemManage/userManage'));


const routerConf = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/industry-index',
    redirect:'/industry-index/company-manage'
  },
  {
    path:'/industry-index/company-manage',
    layout: SideLayout,
    component: CompanyManage,
    children:[]
  },
  {
    path:'/industry-index/industry-manage',
    layout: SideLayout,
    component: IndustryManage,
    children:[]
  },
  {
    path:'/industry-index/industry-child',
    layout: SideLayout,
    component: IndustryChild,
    children:[]
  },
  {
    path:'/industry-index/company-details',
    layout: SideLayout,
    component: CompanyDetails,
    children:[]
  },
  {
    path:'/industry-index/business-scenario-detail',
    layout: SideLayout,
    component: BusinessScenarioDetail,
    children:[]
  },
  {
    path:'/system-manage/user-manage',
    layout: MainLayout,
    component: UserManage,
    children:[]
  },
  {
   path:'/login',
   layout: null,
   component: Login,
  },
  {
		path: '*',
    layout: MainLayout,
    component: Page404,
  }
];

export default routerConf;
