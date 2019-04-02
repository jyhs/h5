import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home/index';
import CityComm from '../components/CityComm/index';
import FishStores from '../components/FishStores/index';
import CoopStores from '../components/CoopStores/index';
import GroupHelp from '../components/GroupHelp/index';
import Ency from '../components/Ency/index';
import EncyDetail from '../components/EncyDetail/index';
import Group from '../components/Group/index';
import GroupShop from '../components/GroupShop/index';
import GroupAdd from '../components/GroupAdd/index';
import GroupEdit from '../components/GroupEdit/index';
import GroupAdmin from '../components/GroupAdmin/index';
import BillDetail from '../components/BillDetail/index';
import Search from '../components/Search/index';
import UserEntry from '../components/UserEntry/index';
import Mine from '../components/Mine/index';
import MyCarts from '../components/MyCarts/index';
import MyOrders from '../components/MyOrders/index';
import MyOpen from '../components/MyOpen/index';
import MyGroups from '../components/MyGroups/index';
import MySetting from '../components/MySetting/index';
import MsSeller from '../components/MsSeller/index';
import MeSeller from '../components/MeSeller/index';
import EncyFocus from '../components/EncyFocus/index';
import CartDetail from '../components/CartDetail/index';
import CartAdmin from '../components/CartAdmin/index';
import OrderDetail from '../components/OrderDetail/index';
import OpenAdmin from '../components/OpenAdmin/index';
import SellerAdmin from '../components/SellerAdmin/index';

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
                    path: '/groupShop/:groupId',
                    name: 'HomeGroupShop',
                    component: GroupShop,
                    children: [
                        {
                            path: '/groupShop/:groupId/cart/:cartId',
                            name: 'HomeCartDetail',
                            component: CartDetail
                        }
                    ]
                },
                {
                    path: '/cityComm',
                    name: 'CityComm',
                    component: CityComm
                },
                {
                    path: '/fishStores',
                    name: 'FishStores',
                    component: FishStores
                },
                {
                    path: '/coopStores',
                    name: 'CoopStores',
                    component: CoopStores
                },
                {
                    path: '/groupHelp',
                    name: 'GroupHelp',
                    component: GroupHelp
                }
            ]
        },
        {
            path: '/ency',
            name: 'Ency',
            component: Ency
        },
        {
            path: '/ency/:id/detail',
            name: 'EncyDetail',
            component: EncyDetail
        },
        {
            path: '/group',
            name: 'Group',
            component: Group,
            children: [
                {
                    path: ':groupId',
                    name: 'GroupGroupShop',
                    component: GroupShop
                },
                {
                    path: 'add/:billId',
                    name: 'GroupAdd',
                    component: GroupAdd
                },
                {
                    path: '/bill/:billId/detail',
                    name: 'BillDetail',
                    component: BillDetail
                }
            ]
        },
        {
            path: '/search',
            component: Search,
            children: [
                {
                    path: ':id',
                    component: EncyDetail
                }
            ]
        },
        {
            path: '/user/entry',
            component: UserEntry
        },
        {
            path: '/mine',
            component: Mine,
            children: [
                {
                    path: '/myCarts',
                    component: MyCarts,
                    children: [
                        {
                            path: '/cart/:groupId/:cartId/update',
                            name: 'MyCartsCartDetail',
                            component: CartDetail
                        }
                    ]
                },
                {
                    path: '/myOrders',
                    component: MyOrders,
                    children: [
                        {
                            path: '/order/:groupId/:cartId/detail',
                            component: OrderDetail
                        }
                    ]
                },
                {
                    path: '/myOpen',
                    component: MyOpen,
                    children: [
                        {
                            path: '/open/:groupId/:userId/admin',
                            component: OpenAdmin,
                            children: [
                                {
                                    path: '/cart/:groupId/:userId/:cartId/admin',
                                    component: CartAdmin
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/myGroups',
                    component: MyGroups,
                    children: [
                        {
                            path: '/group/:id/edit',
                            component: GroupEdit
                        },
                        {
                            path: '/group/:groupId/:userId/admin',
                            component: GroupAdmin,
                            children: [
                                {
                                    path: '/cart/:groupId/:userId/:cartId/admin',
                                    component: CartAdmin
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/mySetting',
                    component: MySetting
                },
                {
                    path: '/msSeller',
                    component: MsSeller
                },
                {
                    path: '/meSeller',
                    component: MeSeller,
                    children: [
                        {
                            path: '/seller/:groupId/admin',
                            component: SellerAdmin
                        }
                    ]
                },
                {
                    path: '/encyFocus',
                    component: EncyFocus,
                    children: [
                        {
                            path: ':id',
                            component: EncyDetail
                        }
                    ]
                }
            ]
        }
    ]
})
