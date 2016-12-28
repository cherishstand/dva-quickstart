import request from '../utils/request';
import qs from 'qs';
const BASIC_URL = `http://192.168.123.162/oa`
export async function fetchItem(path, id) {
    return request(`${BASIC_URL}/${path}/${id}`);
}
export async function fetchIdsByType(path){
    return request(`${BASIC_URL}/${path}`);
}
export async function fetchItems(path, ids) {
    // return request(`${BASIC_URL}/${path}/${id}`);
    return Promise.all(ids.map(id => fetchItem(path, id)));
}
export async function fetchUI(mode) {
    return request(`${BASIC_URL}/modules/${mode}`);
}
