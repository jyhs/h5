import * as TYPES from '../constants/types';
import CommonService from '../services/CommonService';
import {loadDataByKey, saveDataByKey, deleteSearch, saveSearch, clearSearch, saveCurrentInfo} from '../common/util/cache';

/**
 * 保存当前登录信息
 * @param commit
 * @param currentInfo
 */
export function setCurrentInfo({commit}, currentInfo) {
    saveCurrentInfo(currentInfo);
    commit(TYPES.SetCurrentInfo, currentInfo);
}

/**
 * 保存更新相关信息
 * @param commit
 * @param updateInfo
 */
export function setUpdateInfo({commit}, updateInfo) {
    commit(TYPES.SetUpdateInfo, updateInfo);
}

/**
 * 发送短信验证码
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function sendVerification({commit}, params) {
    const response = await CommonService.sendVerification(params);
    return response.data;
}

/**
 * 获取省份
 * @param commit
 * @returns {Promise.<Array>}
 */
export async function getProvinces({commit}) {
    let provinces = loadDataByKey('provinces');
    if (provinces.length === 0) {
        const response = await CommonService.getProvinces();
        for (let province of response.data) {
            provinces.push({
                name: province.name,
                value: province.code
            });
        }
        saveDataByKey('provinces', provinces);
    }
    return provinces;
}

/**
 * 获取某个省份的所有城市
 * @param commit
 * @param params
 * @returns {Promise.<Array>}
 */
export async function getCitiesInProvince({commit}, params) {
    let cities = loadDataByKey('provinceCities', params.province);
    if (!cities.length) {
        const citiesObj = await CommonService.getCitiesInProvince(params);

        for (let item of citiesObj.data) {
            cities.push({
                key: item.mark,
                value: item.name
            });
        }
        saveDataByKey('provinceCities', cities, params.province);
    }
    return cities;
}

/**
 * 获取中国所有城市
 * @param commit
 * @returns {Promise<*>}
 */
export async function getChinaCities({commit}) {
    let cities = loadDataByKey('chinaCities');
    if (cities.length === 0) {
        const response = await CommonService.getChinaCities();
        cities = response.data.map(item => {
            return {
                value: item.code,
                name: item.name,
                parent: item.parent
            }
        });
        saveDataByKey('chinaCities', cities);
    }
    return cities;
}

export function loadingShow({commit}, loadingShow) {
    commit(TYPES.LOADING, loadingShow);
}

/**
 * 是否弹公告
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function checkNotice({commit}, params) {
    const response = await CommonService.checkNotice(params);
    return response.data;
}

/**
 * 获取公告
 * @param commit
 * @returns {Promise<*>}
 */
export async function getNoticeImage({commit}) {
    const response = await CommonService.getNoticeImage();
    return response.data;
}

/**
 * 更新是否阅读公告
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function insertNotice({commit}, params) {
    const response = await CommonService.insertNotice(params);
    return response.data;
}

/**
 * 获取广告
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function getAdByProvinceCode({commit}, params) {
    const response = await CommonService.getAdByProvinceCode(params);
    return response.data;
}

export const deleteSearchHistory = function ({commit}, query) {
    commit(TYPES.SetSearchHistory, deleteSearch(query));
};

export const saveSearchHistory = function ({commit}, query) {
    commit(TYPES.SetSearchHistory, saveSearch(query));
};

export const clearSearchHistory = function ({commit}) {
    commit(TYPES.SetSearchHistory, clearSearch());
};
