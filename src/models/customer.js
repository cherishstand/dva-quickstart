import { fetchList } from '../services/customer';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  namespace: 'customer',

  state: {
    list: [],
    total: null,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
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
     const { data } = yield call(fetchList);
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
    showModal(){}, // 控制 Modal 显示状态的 reducer
    hideModal(){},
    fetchListSuccess(state, action){
      return {...state, ...action.payload, loading: false};
    },
    createSuccess(){},
    deleteSuccess(){},
    updateSuccess(){},
  }
}
