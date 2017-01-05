import pathToRegexp from 'path-to-regexp';
import {
    fetchIdsByType,
    fetchItems,
    fetchItem,
    fetchUI,
    fetchIdsBySearch
} from '../../services/list';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ITEM_PATHS = ['customer', 'orders', 'contacts', 'records'];
export default {
  namespace: 'list',
  state: {
    query: '',
    page: 1,
    activePath: null,
    activeType: 'all',
    itemsPerPage: 15,
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
        let activePath = null;
        let activeType = null;
        function requestList(path, activeType){
            dispatch({ type: 'saveActivePath', payload: path })
            dispatch({ type: 'fetchList', payload: { path, activeType } });
        }
      history.listen(({ pathname, query })  => {
            activeType = query.type || 'all'
            for(let path of ITEM_PATHS) {
                if(pathname === '/' + path){
                    requestList(path, activeType);
                    if(activePath !== path){
                        activePath = path;
                    }
                }
            }
      });
    },
    itemSubscriber({dispatch, history}) {
        return history.listen(({ pathname, query}) => {
            let mode = query.mode
            for(let type of ITEM_PATHS) {
                const match = pathToRegexp(`/${type}/:itemId`).exec(pathname);
                if(match){
                    const itemId = match[1];

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
    *fetchList({ payload: {  path, activeType } }, { select, call, put }) {
        yield delay(300);
        const itemsPerPage = yield select(state => state.list.itemsPerPage)
        const page = yield select(state => state.list.page)
        const ids = yield call(fetchIdsByType, path, activeType, itemsPerPage, page),
                    isEmtpy = ids.code === 200,
                    data = isEmtpy && ids.data,
                    totalPage = isEmtpy && ids.pages,
                    current = isEmtpy && ids.current,
                    next = isEmtpy && ids.next;
        yield put({ type: 'saveList', payload: { data, path, totalPage, current, next }});
    },
    *fetchComments({ payload: { type, itemId, mode } }, { call, put }) {
        yield delay(300);
        const itemData = yield call(fetchItem, type, itemId),
                        uiDate = yield call(fetchUI, mode),
                        item = itemData.data,
                        ui = uiDate.data;
        yield put({type: 'saveItems', payload: {item, ui}})
    },
    setQuery: [function*({ payload: query }, { put, call, select }) {
        yield delay(300);
        const path = yield select(state => state.list.activePath);
        if(query !== ''){
            let data = yield call(fetchIdsBySearch, path, query);
            if(data.code === 200) {
                data = data.data;
                yield put({type: 'saveList', payload: {path, data}})
            }
        }
    }, {type: 'takeLatest'}],
    *refetchList({ payload }, { call, select, put }) {
        yield delay(300);
        const page = yield select(state => state.list.page)
        const path = yield select(state => state.list.activePath)
        const activeType = yield select(state => state.list.activeType)
        const itemsPerPage = yield select(state => state.list.itemsPerPage)
        const oldDate = yield select(state => state.list.lists[path])
        const ids = yield call(fetchIdsByType, path, activeType, itemsPerPage, page),
                    isEmtpy = ids.code === 200,
                    data = isEmtpy && oldDate.concat(ids.data),
                    totalPage = isEmtpy && ids.pages,
                    current = isEmtpy && ids.current,
                    next = isEmtpy && ids.next;
        yield put({ type: 'saveList', payload: { data, path, totalPage, current, next }});
    }
 },
  reducers: {
    saveList(state, { payload: { data, path, totalPage, current, next } }) {
        return {
            ...state,
            lists: { ...state.lists, [path]: data },
            totalPage: totalPage,
            current: current,
            next: next
        }
    },
    saveItems(state, { payload }) {
        return { ...state, itemsById: { ...payload }};
    },
    saveActivePath(state, { payload: activePath }){
        return { ...state, activePath };
    },
    setQuery(state, { payload }) {
        return { ...state, query: payload}
    },
    saveActiveType(state, { payload }) {
        return {...state, activeType: payload}
    },
    refetchList(state, { payload }){
        return {...state, page: payload}
    }
  }
}
