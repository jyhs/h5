import Vue from 'vue';
import Router from 'vue-router';
import GroupShop from '../components/GroupShop/index';
import UserEntry from '../components/UserEntry/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/userEntry'
        },
        {
            path: '/groupShop',
            name: 'HomeGroupShop',
            component: GroupShop
        },
        {
            path: '/userEntry',
            name: 'UserEntry',
            component: UserEntry
        }

    ]
})
