import request from '../utils/request';
import qs from 'qs';

export async function fetchList(params) {
  return request(`http://192.168.123.162/oa/customer?type=all&limit=20&page=1s`);
}
