import Vue from 'vue';
import {ApiBasePath} from '../constants';

export default {
    register(params = {}) {
        return Vue.axios.post(`${ApiBasePath}/user/register`, params);
    },
    login(params = {}) {
        return Vue.axios.post(`${ApiBasePath}/user/loginByPassword`, params);
    },
    logout() {
        return Vue.axios.post(`${ApiBasePath}/user/logout`);
    },
    loginByWechat(params) {
        return Vue.axios.post(`${ApiBasePath}/user/loginByCode`, params);
    },
    getUserList(params) {
        return Vue.axios.post(`${ApiBasePath}/user/list`, params);
    },
    getUserById(params) {
        return Vue.axios.post(`${ApiBasePath}/user/getById`, params);
    },
    getUsersByType(params) {
        return Vue.axios.post(`${ApiBasePath}/user/getByType`, params);
    },
    uploadUserAvatar(formData) {
        return Vue.axios.post(`${ApiBasePath}/user/uploadAvatar`, formData);
    },
    updateUser(params) {
        return Vue.axios.post(`${ApiBasePath}/user/update`, params);
    },
    checkUsername(params) {
        return Vue.axios.post(`${ApiBasePath}/user/checkName`, params);
    }
};
