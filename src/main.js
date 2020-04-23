import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from '@/router/index';
import store from '@/store/index';
import './plugins/element';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import gojs from 'gojs';

// use
Vue.use(mavonEditor);

Vue.config.productionTip = false;
Vue.prototype.$go = gojs;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
