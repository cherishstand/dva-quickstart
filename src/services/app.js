import request from '../utils/request';
import qs from 'qs';
const BASIC_URL = `http://192.168.123.162/oa/index/login`;
export async function fetchEnterpriseAccount(postData) {
    let data = qs.stringify(postData);
    return request(`${BASIC_URL}/validEntAccount`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData
    });
}
export async function fetchPersonalAccount(postData){
    let data = qs.stringify(postData);
    return request(`${BASIC_URL}/Login`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    });
}
