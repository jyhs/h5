import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/index';
import GroupShop from '../components/GroupShop/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/groupShop',
                    name: 'HomeGroupShop',
                    component: GroupShop
                }
            ]
        }

    ]
})
