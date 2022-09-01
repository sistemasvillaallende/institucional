/* eslint-disable no-unused-vars */
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Index',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Index.vue'),
},{
    path: '/Autoridades',
    name: 'Autoridades',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Autoridades.vue'),
}, {
    path: '/News/:id',
    name: 'News',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/News.vue'),
},  {
    path: '/Secretaria/:id',
    name: 'Secretaria',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Secretaria.vue'),
},  {
    path: '/Page/:id',
    name: 'Page',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Page.vue'),
},  {
    path: '/PageConfig/:id',
    name: 'PageConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/PageConfig.vue'),
},  {
    path: '/PageList',
    name: 'PageList',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/PageList.vue'),
},  
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,

    routes
})
export default router