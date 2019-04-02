import Vue from 'vue';
import {ApiBasePath} from '../constants';

export default {
    getGroupList(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/list`, params);
    },
    getMyGroups(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/myGroupList`, params);
    },
    getGroupById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/get`, params);
    },
    updateGroup(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/update`, params);
    },
    finishGroupById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/finish`, params);
    },
    reopenGroupById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/reopen`, params);
    },
    addGroupByBillId(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/add`, params);
    },
    downloadGroupById(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/download`, params);
    },
    groupToNextStep(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/next`, params);
    },
    groupBackPreStep(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/back`, params);
    },
    updatePickupAddress(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/updatePickupAddress`, params);
    },
    deliveryGroup(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/delivery`, params);
    },
    supplierConfirm(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/supplierConfirm`, params);
    },
    groupEvidenceList(params) {
        return Vue.axios.post(`${ApiBasePath}/group/group/groupEvidenceList`, params);
    }
};
