import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// const _import = require('./_import_' + process.env.NODE_ENV)

import Layout from '../views/layout/Layout';

import Login from '../views/login/Login'
import Register from '../views/login/Register'
import StoreInfoModify from '../views/personal/StoreInfoModify'
import PrizeManager from '../views/personal/PrizeManager'
import PasswordModify from '../views/personal/PasswordModify'
import Feedback from '../views/personal/Feedback'
import PrizeDetailInfo from '../views/personal/PrizeDetailInfo'
import ActiveItemEdit from '../views/index/ActiveItemEdit'
import MenuItemEdit from '../views/index/MenuItemEdit'
import HomeIndex from '../views/page/Index'
import Active from '../views/page/Active'
import Benefit from '../views/page/Benefit'
import Personal from '../views/page/Personal'
/**
 * hidden 是否在 导航栏显示
 * @type {*[]}
 */
export const constantRouterMap = [
    {
        path: '/login',
        name: 'login',
        component: Login,//_import('login/Login'),
        hidden: true
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        hidden: true
    },
    {
        path: '/personal/infoManager',
        name: 'infoManager',
        component: StoreInfoModify,
        hidden: true
    },
    {
        path: '/personal/prizeManager',
        name: 'prizeManager',
        component: PrizeManager,
        hidden: true
    },
    {
        path: '/personal/passwordModify',
        name: 'passwordModify',
        component: PasswordModify,
        hidden: true
    },
    {
        path: '/personal/feedback',
        name: 'feedback',
        component: Feedback,
        hidden: true
    },
    {
        path: '/personal/prizeManager/prizeDetailInfo',
        name: 'prizeDetailInfo',
        component: PrizeDetailInfo,
        hidden: true
    },
    {
        path: '/index/activeItemManager',
        name: 'activeItemManager',
        component: ActiveItemEdit,
        hidden: true
    },
    {
        path: '/index/menuItemManager',
        name: 'menuItemManager',
        component: MenuItemEdit,
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'HomeIndex',
        children: [
            {
                path: 'HomeIndex',
                name: 'HomeIndex',
                component: HomeIndex,
                meta: {
                    title: '首页',
                }
            },
            {
                path: 'Active',
                name: 'Active',
                component: Active,
                meta: {
                    title: '活动发布',
                }
            },{
                path: 'Benefit',
                name: 'Benefit',
                component: Benefit,
                meta: {
                    title: '优惠发布',
                }
            },{
                path: 'Personal',
                name: 'Personal',
                component: Personal,
                meta: {
                    title: '个人中心',
                }
            }
        ]
    },


];

const router =  new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
});

export default router