import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import router from 'router.js'
//import router from 'vue-router'
import axios from 'axios'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import $storage from './plugins/storage';


Vue.config.productionTip = false
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:5000';
}
else {
    axios.defaults.baseURL = 'https://vecino.villaallende.gov.ar/institucional_api';
}
axios.defaults.headers.common['Access-Control-Allow-Origin'] = window.location.origin;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = '*';
Vue.prototype.$http = axios;
Vue.prototype.$httpAnonimo = axios;
Vue.prototype.$storage = $storage;
Vue.prototype.$urlBase = axios.defaults.baseURL;
new Vue({
    render: h => h(App),
    router,
    vuetify,
    axios,
}).$mount('#app')
