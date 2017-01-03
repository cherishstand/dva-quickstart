import request from '../utils/request';
const BASIC_URL = `http://192.168.123.162/oa`
export async function fetchTypeList(mode, type) {
    return type ? request(`${BASIC_URL}/modules/${mode}?type=${type}`) : request(`${BASIC_URL}/modules/${mode}`)

}
