import pathToRegexp from 'path-to-regexp';
import {
    fetchIdsByType,
    fetchItems,
    fetchItem,
    fetchUI
 } from '../../services/fn';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ITEM_PATHS = ['customer', 'orders', 'contacts', 'records'];

export default {
  namespace: 'list',
  state: {
    activeType: null,
    itemsPerPage: 20,
    lists: {
        customer: [],
        order: [],
        contact: [],
        record: []
    },
    total: null,
    loading: false,
    current: null,
    itemsById: null
  },
  subscriptions: {
    listSubscriber({ dispatch, history }) {
        let activeType = null;
        function requestList(type, _page = 1){
            const page = _page;
            dispatch({type: 'saveActiveType', payload: type})
            dispatch({ type: 'fetchList', payload: { type, page } });
        }
      history.listen(({pathname}) => {
              for(let type of ITEM_PATHS) {
                 if(pathname === '/' + type){
                    requestList(type);
                    if(activeType !== type){
                        activeType = type;
                    }
                 }
              }
      });
    },
    itemSubscriber({dispatch, history}) {
        return history.listen(({ pathname, query}) => {
            for(let type of ITEM_PATHS) {
                const match = pathToRegexp(`/${type}/:itemId`).exec(pathname);
                if(match){
                    const itemId = match[1];
                    const mode = query.mode
                    dispatch({
                        type: 'fetchComments',
                        payload: { type, itemId, mode},
                    })
                }
            }
        })
    }
  },
  effects: {
   *fetchList({ payload }, { select, call, put }) {
         yield delay(300);
         const { type, page } = payload;
         const ids = yield call(fetchIdsByType, type);
         const data = ids.data;
         const itemsPerPage = yield select(state => state.list.itemsPerPage);
         yield put({ type: 'saveList', payload: { data, type } });
    },
    *fetchComments({ payload }, { call, put }) {
        yield delay(300);
        const {type, itemId, mode} = payload;
        let itemData = yield call(fetchItem, type, itemId);
        let uiDate = yield call(fetchUI, mode);
        let item = itemData.data, ui = uiDate.data;
        yield put({type: 'saveItems', payload: {item, ui}})
    }
 },
  reducers: {
    saveList(state, { payload }) {
        const { data, type } = payload;
        return { ...state, lists: { ...state.lists, [type]: data }, loading: true }
    },
    saveItems(state, { payload }) {
        return { ...state, itemsById: { ...payload }, loading: true};
    },
    saveActiveType(state, { payload: activeType }){
        return { ...state, activeType };
    }
  }
}
