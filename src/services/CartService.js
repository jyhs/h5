import Vue from 'vue';
import {ApiBasePath} from '../constants';

export default {
    getCartById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/get`, params);
    },
    getMyCarts(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/list`, params);
    },
    getCartsByGroupId(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/listByGroupId`, params);
    },
    getActiveCart(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/getCurrentCartByGroupId`, params);
    },
    addCart(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/add`, params);
    },
    updateCart(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/update`, params);
    },
    updateCartPay(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/updatePay`, params);
    },
    getDetailsByCartId(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/listDetail`, params);
    },
    updateCartDetail(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/updateDetail`, params);
    },
    saveOrUpdateCartDetail(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/addOrUpdateDetail`, params);
    },
    deleteCartDetailById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/deleteDetail`, params);
    },
    deleteCartById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/delete`, params);
    },
    calculateLostAdd(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/lostAdd`, params);
    },
    calculateLostSub(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/lostSub`, params);
    },
    calculateDamageAdd(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/damageAdd`, params);
    },
    calculateDamageSub(params) {
        return Vue.axios.post(`${ApiBasePath}/group/cart/damageSub`, params);
    }
};
