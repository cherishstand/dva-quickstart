import request from '../utils/request';
import Firebase from 'firebase';
import qs from 'qs';
const BASIC_URL = `http://192.168.123.162/oa`;
const API = new Firebase('https://zoogooo-14962.firebaseio.com');
API.set('hello world!')
export async function fetchItem(path, id) {
    return request(`${BASIC_URL}/${path}/${id}`);
}
export async function fetchIdsByType(path, activeMatch, itemsPerPage, page){
    return request(`${BASIC_URL}/${path}?type=${activeMatch}&limit=${itemsPerPage}&page=${page}`);
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

const fetch = (child) => {
  return new Promise((resolve, reject) => {
    API.child(child).once('value', (snapshot) => {
      const val = snapshot.val();
      if(val) {
        resolve(val);
      } else {
        setTimeout(() => {
          fetch(child).then(val => resolve(val));
        }, 500);
      }
    })
  })
}

console.log(fetch('/'));
