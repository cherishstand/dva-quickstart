import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import {
    fetchIdsByType,
    fetchItems,
    fetchItem,
    fetchUI,
    fetchIdsBySearch
 } from '../../services/fn';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ITEM_PATHS = ['customer', 'orders', 'contacts', 'records'];

export default {
  namespace: 'list',
  state: {
    query: '',
    page: 1,
    activeMatch: 'all',
    activeType: null,
    itemsPerPage: 20,
    lists: {
        customer: [],
        orders: [],
        contacts: [],
        records: []
    },
    itemsById: null,
    totalPage: null,
    current: 1,
    next: null,
  },
  subscriptions: {
    listSubscriber({ dispatch, history }) {
        let activeType = null;
        function requestList(type){
            dispatch({ type: 'saveActiveType', payload: type })
            dispatch({ type: 'fetchList', payload: { type } });
        }
      history.listen(({pathname})  => {
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
    },
  },
  effects: {
    *fetchList({ payload }, { select, call, put }) {
        yield delay(300);
        const { type } = payload;
        const itemsPerPage = yield select(state => state.list.itemsPerPage);
        const activeMatch = yield select(state => state.list.activeMatch);
        const page = yield select(state => state.list.page);
        const ids = yield call(fetchIdsByType, type, activeMatch, itemsPerPage, page),
                    data = ids.data,
                    totalPage = ids.pages,
                    current = ids.current,
                    next = ids.next;
        yield put({ type: 'saveList', payload: { data, type, totalPage, current }});
    },
    *fetchComments({ payload }, { call, put }) {
        yield delay(300);
        const {type, itemId, mode} = payload;
        const itemData = yield call(fetchItem, type, itemId),
                        uiDate = yield call(fetchUI, mode),
                        item = itemData.data,
                        ui = uiDate.data;
        yield put({type: 'saveItems', payload: {item, ui}})
    },
    setQuery: [function*({ payload }, { put, call, select }) {
        yield delay(300);
        const type = yield select(state => state.list.activeType);
        if(payload !== ''){
            let data = yield call(fetchIdsBySearch, type, payload);
            if(data.code === 200) {
                data = data.data;
                yield put({type: 'saveList', payload: {type, data}})
            }
        }
    }, {type: 'takeLatest'}]
 },
  reducers: {
    saveList(state, { payload }) {
        const { data, type, totalPage, current, next} = payload;
        return { ...state, lists: { ...state.lists, [type]: data }, totalPage: totalPage, current: current, next: next}
    },
    saveItems(state, { payload }) {
        return { ...state, itemsById: { ...payload }};
    },
    saveActiveType(state, { payload: activeType }){
        return { ...state, activeType };
    },
    setQuery(state, { payload }) {
        return { ...state, query: payload}
    },
    saveActiveMatch(state, { payload }) {
        return {...state, activeMatch: payload}
    },
    refetchList(state, { payload }){
        return {...state, page: payload}
    }
  }
}
