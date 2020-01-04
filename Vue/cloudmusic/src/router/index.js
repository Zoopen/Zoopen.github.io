import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeRecommend from '@/views/HomeRecommend.vue'
import HomeHot from '@/views/HomeHot.vue'
import HomeSearch from '@/views/HomeSearch.vue'
import Player from '@/views/Player.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: 'recommend',
    children:[{
      path: 'recommend',
      component:HomeRecommend
    },{
      path: 'hot',
      component:HomeHot
    },{
      path: 'search',
      component:HomeSearch
    }]
  },
  {
    path:'/playlist',
    name:'playlist',
    component:()=>import('@/views/PlayList.vue')
  },
  {
    path:'/player',
    component:Player,
  }

]

const router = new VueRouter({
  routes
})

export default router
