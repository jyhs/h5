import Vue from 'vue';
import {ApiBasePath} from '../constants';

export default {
    sendVerification(params) {
        return Vue.axios.post(`${ApiBasePath}/tools/sendVerification`, params);
    },
    getProvinces() {
        return Vue.axios.get(`${ApiBasePath}/location/getProvinces`);
    },
    getCitiesInProvince(params) {
        return Vue.axios.post(`${ApiBasePath}/location/getCityByProvince`, params);
    },
    getChinaCities() {
        return Vue.axios.get(`${ApiBasePath}/location/getChina`);
    },
    checkNotice(params) {
        return Vue.axios.post(`${ApiBasePath}/notice/check`, params);
    },
    getNoticeImage() {
        return Vue.axios.get(`${ApiBasePath}/notice/get`);
    },
    insertNotice(params) {
        return Vue.axios.post(`${ApiBasePath}/notice/add`, params);
    },
    getAdByProvinceCode(params) {
        return Vue.axios.post(`${ApiBasePath}/ad/getNumber`, params);
    }
};
