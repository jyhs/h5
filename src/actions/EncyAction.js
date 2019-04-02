import EncyService from '../services/EncyService';

/**
 * 获取分类
 * @param commit
 * @returns {Promise.<{}>}
 */
export async function getCategories({commit}) {
    const response = await EncyService.getCategories();
    return response.data || {};
}

/**
 * 通过id获取生物
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getEncyById({commit}, params) {
    const response = await EncyService.getEncyById(params);
    return response.data || {};
}

/**
 * 获取生物资料
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getEncyList({commit}, params) {
    const response = await EncyService.getEncyList(params);
    return response.data || {};
}

/**
 * 获取关注的生物资料
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function getFocusedEncyList({commit}, params) {
    const response = await EncyService.getFocusedEncyList(params);
    return response.data || {};
}

/**
 * 获取某生物的所有图片
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getEncyImagesById({commit}, params) {
    const response = await EncyService.getEncyImagesById(params);
    return response.data || {};
}

/**
 * 关注生物
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function focusEncy({commit}, params) {
    const response = await EncyService.focusEncy(params);
    return response.data;
}

/**
 * 获取所有类
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function getAllCategory({commit}, params) {
    const response = await EncyService.getAllCategory(params);
    return response.data;
}
