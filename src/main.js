import {
    createApp,
    h
} from 'vue'
import App from './App.vue'

import router from './router';

import store from '@/store'
const app = createApp({
    render() {
        return h(App);
    }
});
app.use(store);
app.use(router);
app.mount('#app');