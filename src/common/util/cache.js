import storage from 'good-storage';

export const SEARCH_KEY = '__search__';
export const PROVINCES_KEY = '__provinces__';
export const CHINA_CITIES_KEY = '__china_cities__';
export const PROVINCE_CITIES_KEY = '__province_cities__';
export const BILL_DETAILS_KEY = '__billId_details__';
export const BILL_SUB_DETAILS_KEY = '__billIdAndSub_details__';
export const CURRENT_INFO_KEY = '__current_info__';
const SEARCH_MAX_LEN = 15;

export const KeyMap = {
    provinces: {
        key: PROVINCES_KEY
    },
    chinaCities: {
        key: CHINA_CITIES_KEY
    },
    provinceCities: {
        key: PROVINCE_CITIES_KEY,
        reg: /province/
    },
    billDetail: {
        key: BILL_DETAILS_KEY,
        reg: /billId/
    },
    billSubDetail: {
        key: BILL_SUB_DETAILS_KEY,
        reg: /billIdAndSub/
    },
    search: {
        key: SEARCH_KEY
    }
};

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare);
    if (index > -1) {
        arr.splice(index, 1)
    }
}

function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare);
    if (index === 0) {
        return;
    }
    if (index > 0) {
        arr.splice(index, 1);
    }
    arr.unshift(val);
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

export function loadDataByKey(key, param, from = 'local') {
    let storageKey = KeyMap[key].key;
    if (KeyMap[key].reg) {
        storageKey = KeyMap[key].key.replace(KeyMap[key].reg, param);
    }
    if (from === 'local') {
        return storage.get(storageKey, []);
    } else {
        return storage.session.get(storageKey, []);
    }
}

export function saveDataByKey(key, data, param, from = 'local') {
    let storageKey = KeyMap[key].key;
    if (KeyMap[key].reg) {
        storageKey = KeyMap[key].key.replace(KeyMap[key].reg, param);
    }
    if (from === 'local') {
        storage.set(storageKey, data);
    } else {
        storage.session.set(storageKey, data);
    }
    return data;
}

export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, []);
    deleteFromArray(searches, (item) => {
        return item === query;
    });
    storage.set(SEARCH_KEY, searches);
    return searches;
}

export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, []);
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LEN);
    storage.set(SEARCH_KEY, searches);
    return searches;
}

export function clearSearch() {
    storage.set(SEARCH_KEY, []);
    return [];
}

export function loadCurrentInfo() {
    return storage.get(CURRENT_INFO_KEY, {
        userId: '',
        auth: '',
        noticeId: 0,
        province: 'sh',
        provinceName: '上海'
    });
}

export function saveCurrentInfo(currentInfo) {
    storage.set(CURRENT_INFO_KEY, currentInfo);
    return currentInfo;
}
