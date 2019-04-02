import BillService from '../services/BillService';
import {loadDataByKey, saveDataByKey} from '../common/util/cache';
/**
 * 获取订货单列表
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getBillList({commit}, params) {
    const response = await BillService.getBillList(params);
    return response.data;
}

/**
 * 获取出货单明细根据id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getDetailsByBillId({commit}, params) {
    let details = loadDataByKey('billDetail', params.billId, 'session');
    if (!details.length) {
        const response = await BillService.getDetailsByBillId(params);
        details = response.data.data;
        saveDataByKey('billDetail', details, params.billId, 'session');
    }
    return details;
}

/**
 * 获取出货单通过id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getBillById({commit}, params) {
    const response = await BillService.getBillById(params);
    return response.data || {};
}

/**
 * 根据分类获取团单明细
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function getDetailsByBillIdAndCategory({commit}, params) {
    const storageKey = `${params.category}Of${params.billId}`;
    let details = loadDataByKey('billSubDetail', storageKey, 'session');
    if (!details.length) {
        const response = await BillService.getDetailsByBillIdAndCategory(params);
        details = response.data.data;
        saveDataByKey('billSubDetail', details, storageKey, 'session');
    }
    return details;
}

/**
 * 获取billId对应的category
 * @param commit
 * @param params
 * @returns {Promise<*|{}>}
 */
export async function getCategoriesByBillId({commit}, params) {
    const response = await BillService.getCategoriesByBillId(params);
    return response.data;
}
