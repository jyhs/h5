/**
 * 延迟执行
 * @param func
 * @param delay
 * @returns {Function}
 */
export function debounce(func, delay) {
    let timer;

    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay)
    }
}

/**
 * 判断是否为空，包括null, undefined, '', {}, []等
 */
export const isEmpty = (val) => {
    if (!val && val !== 0) {
        return true;
    } else if (typeof val === 'string' && !val.trim()) {
        return true;
    } else if (Array.prototype.isPrototypeOf(val) && val.length === 0) {
        return true;
    } else if (Object.prototype.isPrototypeOf(val) && Object.keys(val).length === 0) {
        return true;
    }

    return false;
};

/**
 * 构造表单
 * @param {*} params
 */
export const toFormData = (params) => {
    const formData = new window.FormData();
    for (let key of Object.keys(params)) {
        formData.append(key, params[key]);
    }

    return formData;
};

/**
 * 构建时间参数格式
 * @param date
 * @returns {string}
 */
export const formatDateTimeParam = (date) => {
    let dateDate;
    if (typeof date === 'string') {
        dateDate = new Date(date);
    } else {
        dateDate = date;
    }
    const month = (dateDate.getMonth() + 1) < 10 ? `0${dateDate.getMonth() + 1}` : dateDate.getMonth() + 1;
    const day = dateDate.getDate() < 10 ? `0${dateDate.getDate()}` : dateDate.getDate();
    const hour = dateDate.getHours() < 10 ? `0${dateDate.getHours()}` : dateDate.getHours();
    const min = dateDate.getMinutes() < 10 ? `0${dateDate.getMinutes()}` : dateDate.getMinutes();
    const second = dateDate.getSeconds() < 10 ? `0${dateDate.getSeconds()}` : dateDate.getSeconds();

    return `${dateDate.getFullYear()}-${month}-${day}T${hour}:${min}:${second}`;
};

/**
 * 生成当前日期
 * @returns {string}
 */
export const formatStartDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${padLeftZero(today.getMonth() + 1)}-${padLeftZero(today.getDate())}`
};

export const timeDiffFromNow = (d1) => {
    const dateEnd = new Date(d1.replace(/-/g, '/'));
    const dateBegin = new Date();
    const dateDiff = dateEnd.getTime() - dateBegin.getTime();
    const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    const leave1 = dateDiff % (24 * 3600 * 1000);
    const hours = Math.floor(leave1 / (3600 * 1000));
    const leave2 = leave1 % (3600 * 1000);
    const minutes = Math.floor(leave2 / (60 * 1000));
    const leave3 = leave2 % (60 * 1000);
    const seconds = Math.round(leave3 / 1000);
    return {
        day: dayDiff,
        hour: hours,
        minute: minutes,
        second: seconds
    }
};

/**
 * 转换参数中的如空字符串等为undefined
 * @param params
 */
export const convertToUndefined = (params) => {
    const newParams = {};
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            newParams[key] = params[key] || undefined;
        }
    }
    return newParams;
};

/**
 * 格式化url params
 * @param paramsStr
 */
export const formatUrlParams = (paramsStr) => {
    const paramsObj = {};
    const params = paramsStr.split('&');
    for (let param of params) {
        const pair = param.split('=');
        paramsObj[pair[0]] = pair[1];
    }

    return paramsObj;
};

function padLeftZero(num) {
    return num < 10 ? `0${num}` : num;
}
