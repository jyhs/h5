import Vue from 'vue';
import Vuex from 'vuex';
import * as TYPES from '../constants/types';
import * as CommonAction from '../actions/CommonAction';
import * as UserAction from '../actions/UserAction';
import * as EncyAction from '../actions/EncyAction';
import * as BillAction from '../actions/BillAction';
import * as GroupAction from '../actions/GroupAction';
import * as CartAction from '../actions/CartAction';
import {loadDataByKey, loadCurrentInfo} from '../common/util/cache';

Vue.use(Vuex);
const state = {
    loadingShow: false,
    groupsInCurProvince: [],
    currentInfo: loadCurrentInfo(),
    updateInfo: {
        groupChange: false,
        encyFocus: false
    },
    searchHistory: loadDataByKey('search')
};

const getters = {
    loadingShow: state => state.loadingShow,
    groupsInCurProvince: state => state.groupsInCurProvince,
    currentInfo: state => state.currentInfo,
    updateInfo: state => state.updateInfo,
    searchHistory: state => state.searchHistory
};

const mutations = {
    [TYPES.LOADING](state, loadingShow) {
        state.loadingShow = loadingShow;
    },
    [TYPES.GroupsInCurProvince](state, groupsInCurProvince) {
        state.groupsInCurProvince = groupsInCurProvince;
    },
    [TYPES.SetCurrentInfo](state, currentInfo) {
        state.currentInfo = currentInfo;
    },
    [TYPES.SetUpdateInfo](state, updateInfo) {
        state.updateInfo = updateInfo;
    },
    [TYPES.SetSearchHistory](state, history) {
        state.searchHistory = history
    }
};

const actions = {
    ...CommonAction,
    ...UserAction,
    ...EncyAction,
    ...BillAction,
    ...GroupAction,
    ...CartAction
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
