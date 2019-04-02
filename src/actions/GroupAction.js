import GroupService from '../services/GroupService';

/**
 * 获取团购列表
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getGroupList({commit}, params) {
    const response = await GroupService.getGroupList(params);
    return response.data;
}

export async function getMyGroups({commit}, params) {
    const response = await GroupService.getMyGroups(params);
    return response.data;
}

/**
 * 获取团购通过id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getGroupById({commit}, params) {
    const response = await GroupService.getGroupById(params);
    return response.data || {};
}

/**
 * 更新团购清单
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateGroup({commit}, params) {
    const response = await GroupService.updateGroup(params);
    return response.data || {};
}

/**
 * 开团人马上结束团购
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function finishGroupById({commit}, params) {
    const response = await GroupService.finishGroupById(params);
    return response.data;
}

/**
 * 重新开始团单
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function reopenGroupById({commit}, params) {
    const response = await GroupService.reopenGroupById(params);
    return response.data;
}

/**
 * 添加团购通过billId及userId
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function addGroupByBillId({commit}, params) {
    const response = await GroupService.addGroupByBillId(params);
    return response.data;
}

/**
 * 下载用户团单
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function downloadGroupById({commit}, params) {
    const response = await GroupService.downloadGroupById(params);
    return response.data || {};
}

/**
 * 下一步
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function groupToNextStep({commit}, params) {
    const response = await GroupService.groupToNextStep(params);
    return response.data || {};
}

/**
 * 上一步
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function groupBackPreStep({commit}, params) {
    const response = await GroupService.groupBackPreStep(params);
    return response.data || {};
}

/**
 * 跟新地址
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function updatePickupAddress({commit}, params) {
    const response = await GroupService.updatePickupAddress(params);
    return response.data || {};
}

/**
 * 确认并发货
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function deliveryGroup({commit}, params) {
    const response = await GroupService.deliveryGroup(params);
    return response.data || {};
}

/**
 * 商户确认
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function supplierConfirm({commit}, params) {
    const response = await GroupService.supplierConfirm(params);
    return response.data || {};
}

/**
 * 获取上传图像列表
 * @param commit
 * @param params
 * @returns {Promise<void>}
 */
export async function groupEvidenceList({commit}, params) {
    const response = await GroupService.groupEvidenceList(params);
    return response.data || {};
}
