import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import VueLazyload from 'vue-lazyload';
import VueQuillEditor from 'vue-quill-editor';
import {DatetimePlugin} from 'vux';
import fastclick from 'fastclick';
// import VConsole from 'vconsole';
import App from './App';
import ToastPlugin from './plugins/Toast';
import MaskPlugin from './plugins/Mask';
import router from './router';
import store from './store';
import {loadCurrentInfo} from './common/util/cache';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import './common/fonts/iconfont.css';
import './common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueAxios, Axios);
Vue.use(VueQuillEditor);
Vue.use(DatetimePlugin);
Vue.use(ToastPlugin);
Vue.use(MaskPlugin);
Vue.use(VueLazyload, {
    loading: require('./assets/loading.svg')
});
Vue.use(Vuex);

Vue.config.productionTip = false;
fastclick.attach(document.body);

// const vConsole = new VConsole();
// vConsole.setOption('maxLogNumber', 5000);

Vue.prototype.$setgoindex = function () {
    if (window.history.length <= 1) {
        if (location.href.indexOf('?') === -1) {
            window.location.href = location.href + '?goindex=true'
        } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
            window.location.href = location.href + '&goindex=true'
        }
    }
};

router.beforeEach((to, from, next) => {
    const currentInfo = loadCurrentInfo();
    wx.miniProgram.postMessage({
        data: {
            param: `type=home&shareId=${currentInfo.userId}`,
            shareUserId: currentInfo.userId || 0,
            auth: currentInfo.auth || 0,
            title: `礁岩海水`,
            imageUrl: `https://static.huanjiaohu.com/image/share/default.jpg?r=${Math.random()}`
        }
    });
    next();
});

// http request 拦截器
Axios.interceptors.request.use(
    config => {
        const currentInfo = loadCurrentInfo();
        config.headers.Authorization = currentInfo.auth;
        Vue.$vux.mask.show();
        return config;
    },
    error => {
        Vue.$vux.toast.show({
            type: 'warning',
            text: '请求异常，请稍后重试',
            time: 3000
        });
        Vue.$vux.mask.hide();
        return Promise.reject(error);
    }
);

// http response 拦截器
Axios.interceptors.response.use(
    response => {
        Vue.$vux.mask.hide();
        const errorNo = Number(response.data.errno);
        if (errorNo === 406) {
            Vue.$vux.toast.show({
                type: 'warning',
                text: response.data.errmsg,
                time: 3000
            });
        } else if (errorNo === 0) {
            Vue.$vux.toast.show({
                type: 'success',
                text: '操作成功'
            });
        }
        return response;
    },
    error => {
        Vue.$vux.mask.hide();
        const {response} = error;
        const errorCodes = [500];
        const logoutCodes = [401, 403];
        if (errorCodes.includes(response.status)) {
            Vue.$vux.toast.show({
                type: 'warning',
                text: '请求异常，请稍后重试',
                time: 3000
            });
        } else if (logoutCodes.includes(response.status)) {
            window.localStorage.removeItem('SeawaterLoginUserId');
            window.localStorage.removeItem(`SeawaterAuthorization`);
            Vue.$vux.toast.show({
                type: 'warning',
                text: '请重新登录',
                time: 3000
            });
        } else {
            Vue.$vux.toast.show({
                type: 'warning',
                text: '请求异常，请稍后重试',
                time: 3000
            });
        }

        return Promise.reject(error);
    }
);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
});
