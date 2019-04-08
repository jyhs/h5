import Vue from 'vue';
import Router from 'vue-router';
import GroupShop from '../components/GroupShop/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/groupShop'
        },
        {
            path: '/groupShop',
            name: 'HomeGroupShop',
            component: GroupShop
        }

    ]
})
