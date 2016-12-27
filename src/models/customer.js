import pathToRegexp from 'path-to-regexp';
import { fetchList } from '../services/customer';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  namespace: 'item',
  state: {
    list: [],
    total: null,
    loading: false,
    current: null,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if (pathname === '/customer') {
          dispatch({
            type: 'fetchList',
            payload: {}
          });
        }
      });
    },
  },
  effects: {
   *fetchList({ payload }, { select, call, put }) {
     yield delay(300);
     const { data } = yield call(fetchList, 'all');
     if (data) {
       yield put({
         type: 'fetchListSuccess',
         payload: {
           list: data.data,
           total: data.pages,
           current: data.current
         }
       });
     }
   },
   *create(){},
   *'delete'(){},
   *update(){},
 },
  reducers: {
    fetchList(state) {
      return { ...state, loading: true, };
    },
    showModal(){},
    hideModal(){},
    fetchListSuccess(state, action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}
