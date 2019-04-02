import CartService from '../services/CartService';

/**
 * 获取购物车通过id
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getCartById({commit}, params) {
    const response = await CartService.getCartById(params);
    return response.data || {};
}
/**
 * 获取所有购物车通过userId
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getMyCarts({commit}, params) {
    const response = await CartService.getMyCarts(params);
    return response.data || {};
}

/**
 * 获取团单下所有购物车
 * @param commit
 * @param params
 * @returns {Promise.<void>}
 */
export async function getCartsByGroupId({commit}, params) {
    const response = await CartService.getCartsByGroupId(params);
    return response.data;
}

/**
 * 获取当前的购物车
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function getActiveCart({commit}, params) {
    const response = await CartService.getActiveCart(params);
    return response.data;
}

/**
 * 添加购物车
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function addCart({commit}, params) {
    const response = await CartService.addCart(params);
    return response.data || {};
}

/**
 * 更新购物车
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateCart({commit}, params) {
    const response = await CartService.updateCart(params);
    return response.data || {};
}

/**
 * 更新购物车是否支付
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateCartPay({commit}, params) {
    const response = await CartService.updateCartPay(params);
    return response.data || {};
}

/**
 * 更新购物车明细
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateCartDetail({commit}, params) {
    const response = await CartService.updateCartDetail(params);
    return response.data || {};
}

/**
 * 保存更新购物车明细
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function saveOrUpdateCartDetail({commit}, params) {
    const response = await CartService.saveOrUpdateCartDetail(params);
    return response.data || {};
}

/**
 * 获取购物车下的所有明细
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getDetailsByCartId({commit}, params) {
    const response = await CartService.getDetailsByCartId(params);
    return response.data || {};
}

/**
 * 删除明细从购物车中
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function deleteCartDetailById({commit}, params) {
    const response = await CartService.deleteCartDetailById(params);
    return response.data || {};
}

/**
 * 删除购物车
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function deleteCartById({commit}, params) {
    const response = await CartService.deleteCartById(params);
    return response.data || {};
}

/**
 * 缺货Add
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function calculateLostAdd({commit}, params) {
    const response = await CartService.calculateLostAdd(params);
    return response.data || {};
}

/**
 * 缺货Sub
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function calculateLostSub({commit}, params) {
    const response = await CartService.calculateLostSub(params);
    return response.data || {};
}

/**
 * 报损Add
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function calculateDamageAdd({commit}, params) {
    const response = await CartService.calculateDamageAdd(params);
    return response.data || {};
}

/**
 * 报损Add
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function calculateDamageSub({commit}, params) {
    const response = await CartService.calculateDamageSub(params);
    return response.data || {};
}
