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
    path: '/Login',
    name: 'Login',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Login.vue'),
},{
    path: '/Autoridades',
    name: 'Autoridades',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Autoridades.vue'),
},{
    path: '/Home',
    name: 'Home',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/Home.vue'),
},{
    path: '/MenuConfig/:id',
    name: 'MenuConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/MenuConfig.vue'),
},  {
    path: '/News/:id',
    name: 'News',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/News.vue'),
}, {
    path: '/CarruselConfig/:id',
    name: 'CarruselConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/CarruselConfig.vue'),
}, {
    path: '/NoticiaPrincipalConfig/:id',
    name: 'NoticiaPrincipalConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/NoticiaPrincipalConfig.vue'),
}, {
    path: '/Contacto/:id',
    name: 'Contacto',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/Contacto.vue'),
}, {
    path: '/ExtensionPanelsConfig/:id',
    name: 'ExtensionPanelsConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/ExtensionPanelsConfig.vue'),
},{
    path: '/GaleriaConfig/:id',
    name: 'GaleriaConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/GaleriaConfig.vue'),
},{
    path: '/GaleriaNewsConfig/:id',
    name: 'GaleriaNewsConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/GaleriaNewsConfig.vue'),
},{
    path: '/HTMLConfig/:id',
    name: 'HTMLConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/HTMLConfig.vue'),
},{
    path: '/NoticiasConfig/:id',
    name: 'NoticiasConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/NoticiasConfig.vue'),
}, {
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
    path: '/AgendaConfig/:id/:id_page',
    name: 'AgendaConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/AgendaConfig.vue'),
},  {
    path: '/EventoConfig/:id/:id_seccion',
    name: 'EventoConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/EventoConfig.vue'),
},  {
    path: '/CardConfig/:id_page/:id_seccion',
    name: 'CardConfig',
    component: () =>
        import( /* webpackChunkName: "Home" */ '../views/Admin/CardConfig.vue'),
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