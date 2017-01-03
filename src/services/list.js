import request from '../utils/request';
import qs from 'qs';
const BASIC_URL = `http://192.168.123.162/oa`
export async function fetchItem(path, id) {
    return request(`${BASIC_URL}/${path}/${id}`);
}
export async function fetchIdsByType(path, activeType, itemsPerPage, page){
    return request(`${BASIC_URL}/${path}?type=${activeType}&limit=${itemsPerPage}&page=${page}`);
}
export async function fetchIdsBySearch(path, payload){
    return request(`${BASIC_URL}/${path}?query=${payload}`);
}
export async function fetchItems(path, ids) {
    return Promise.all(ids.map(id => fetchItem(path, id)));
}
export async function fetchUI(mode) {
    return request(`${BASIC_URL}/modules/${mode}`);
}
