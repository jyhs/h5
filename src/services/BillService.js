import Vue from 'vue';
import {ApiBasePath} from '../constants';

export default {
    getBillList(params) {
        return Vue.axios.post(`${ApiBasePath}/bill/list`, params);
    },
    getDetailsByBillId(params) {
        return Vue.axios.post(`${ApiBasePath}/bill/getDetailByBillId`, params);
    },
    getBillById(params) {
        return Vue.axios.post(`${ApiBasePath}/bill/get`, params);
    },
    getDetailsByBillIdAndCategory(params) {
        return Vue.axios.post(`${ApiBasePath}/bill/getDetailByBillIdAndCategory`, params);
    },
    getCategoriesByBillId(params) {
        return Vue.axios.post(`${ApiBasePath}/bill/getCategoryList`, params);
    }
};
