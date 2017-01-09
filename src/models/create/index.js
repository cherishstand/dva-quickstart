import {
    fetchTypeList
} from '../../services/create'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
    namespace: 'create',
    state: {
        isFocusSave: false,
        typeList: null
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                const mode = query.mode
                const type = query.type || ''
                if(pathname === '/create') {
                    dispatch({type: 'queryUItype', payload: { mode, type }})
                }
            })
        }
    },
    effects: {
        *queryUItype({ payload }, { call, put }) {
            yield delay(300);
            const { mode, type } = payload
            let data = yield call(fetchTypeList, mode, type),
                typeDate = data.data
            yield put({type: 'saveUItypeList', payload: { typeDate }})
        }
    },
    reducers: {
        saveUItypeList(state, { payload: { typeDate } }) {
            return { ...state, typeList: typeDate }
        }
    }
}
