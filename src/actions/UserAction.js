import UserService from '../services/UserService';

/**
 * 注册
 * @param commit
 * @param params
 * @returns {Promise.<*|{type, alias, describe}|{}>}
 */
export async function register({commit}, params) {
    const response = await UserService.register(params);
    return response.data;
}

/**
 * 登录
 * @param commit
 * @param params
 * @returns {Promise.<*|{type, alias, describe}|{}>}
 */
export async function login({commit}, params) {
    const response = await UserService.login(params);
    return response.data;
}

/**
 * 登出
 * @param commit
 * @param params
 * @returns {Promise.<*|{type, alias, describe}|{}>}
 */
export async function logout({commit}) {
    const response = await UserService.logout();
    return response.data;
}
/**
 * 通过微信登录
 * @param commit
 * @param params
 * @returns {Promise.<*|{type, alias, describe}|{}>}
 */
export async function loginByWechat({commit}, params) {
    const response = await UserService.loginByWechat(params);
    return response.data;
}

/**
 * 获取用户列表
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getUserList({commit}, params) {
    const response = await UserService.getUserList(params);
    return response.data || {};
}

/**
 * 通过id获取用户
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function getUserById({commit}, params) {
    const response = await UserService.getUserById(params);
    return response.data;
}

/**
 * 通过type获取用户
 * @param commit
 * @param params
 * @returns {Promise<*>}
 */
export async function getUsersByType({commit}, params) {
    const response = await UserService.getUsersByType(params);
    return response.data;
}

/**
 * 上传用户头像
 * @param commit
 * @param formData
 * @returns {Promise.<{}>}
 */
export async function uploadUserAvatar({commit}, {formData}) {
    const response = await UserService.uploadUserAvatar(formData);
    return response.data || {};
}

/**
 * 更新用户
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function updateUser({commit}, params) {
    const response = await UserService.updateUser(params);
    return response.data || {};
}

/**
 * 检查用户名是否重复
 * @param commit
 * @param params
 * @returns {Promise.<{}>}
 */
export async function checkUsername({commit}, params) {
    const response = await UserService.checkUsername(params);
    return response.data || {};
}
