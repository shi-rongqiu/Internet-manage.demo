import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/index'
import Login from '@/components/login'

import Total from '@/components/index/index'
import Visual from '@/components/index/visual'

import Home from '@/components/control/index'
import Warning from '@/components/control/warning'
import Timing from '@/components/control/timing'
import DataDetail from '@/components/control/detail'


import Arithmetic from '@/components/arithmetic/index'
import Detail from '@/components/arithmetic/detail'
import AddApply from '@/components/arithmetic/addApply'
import InstallList from '@/components/arithmetic/installList'

import Manage from '@/components/preception/manage'
import Site from '@/components/preception/site'
import Preception from '@/components/preception/PMS'
import Graph from '@/components/preception/graph'
import DataManage from '@/components/preception/dataManage'
import AddSensor from '@/components/preception/addSensor'
import Log from '@/components/preception/log'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'total',
          component: Total
        },
        {
          path: '/index/visual',
          name: 'visual',
          component: Visual
        },
        {
          path: '/control',
          name: 'home',
          component: Home
        },
        {
          path: '/control/warning',
          name: 'warning',
          component: Warning
        },
        {
          path: '/control/timing',
          name: 'timing',
          component: Timing
        },
        {
          path: '/control/detail',
          name: 'dataDetail',
          component: DataDetail
        },
        {
          path: '/preception',
          name: 'manage',
          component: Manage
        },
        {
          path: '/preception/site',
          name: 'site',
          component: Site
        },
        {
          path: '/preception/graph',
          name: 'graph',
          component: Graph
        },
        {
          path: '/preception/PMS',
          name: 'preception',
          component: Preception
        },
        {
          path: '/preception/data',
          name: 'dataManage',
          component: DataManage
        },
        {
          path: '/preception/add',
          name: 'addSensor',
          component: AddSensor
        },
        {
          path: '/preception/log',
          name: 'log',
          component: Log
        },
        {
          path: '/arithmetic',
          name: 'arithmetic',
          component: Arithmetic
        },
        {
          path: '/arithmetic/detail/:id',
          name: 'detail',
          component: Detail,
          props: true
        },
        {
          path: '/arithmetic/add',
          name: 'addApply',
          component: AddApply
        },
        {
          path: '/arithmetic/log',
          name: 'installList',
          component: InstallList
        }
      ]
    }
  ]
})
