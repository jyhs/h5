import Vue from 'vue';
import {ApiBasePath} from '../constants';

export default {
    getCategories() {
        return Vue.axios.get(`${ApiBasePath}/group/material/category`);
    },
    getEncyById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/material/get`, params);
    },
    getEncyList(params) {
        return Vue.axios.post(`${ApiBasePath}/group/material/list`, params);
    },
    getFocusedEncyList() {
        return Vue.axios.get(`${ApiBasePath}/group/material/focusList`);
    },
    getEncyImagesById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/material/getImage`, params);
    },
    focusEncy(params) {
        return Vue.axios.post(`${ApiBasePath}/group/material/focus`, params);
    },
    getAllCategory() {
        return Vue.axios.get(`${ApiBasePath}/group/material/categoryAll`);
    }
};
