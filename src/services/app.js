import request from '../utils/request';
import qs from 'qs';
const BASIC_URL = `http://192.168.123.162/oa/index/login`;
export async function fetchEnterpriseAccount(data) {
    return request(`${BASIC_URL}/validEntAccount`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
export async function fetchPersonalAccount(data){
    return request(`${BASIC_URL}/Login`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}
