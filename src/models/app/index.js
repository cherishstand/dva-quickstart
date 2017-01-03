export default {
    namespace: 'app',
    state: {
        login: false,
        loginButtonLoading: false,
        user: {
            name: "吴彦祖"
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({type: 'queryUser'})
        }
    },
    effects: {
        *login({ paylod }, { call, put, select }) {
            yield put({type: 'showLoginButtonLoading'})
            const data = yield call(login, parse(payload))
            if (data.success) {
                yield put({type: 'loginSuccess', payload: { data }})
            } else {
                yield put({type: 'loginFail', payload: { data }})
            }
        },
        *queryUser({ paylod }, { call, put }) {
            const data = yield call(userInfo, parse(payload))
            if(data.success) {
                yield put({
                    type: 'loginSuccess',
                    payload: {
                        user: {
                            name: data.username
                        }
                    }
                })
            } else {

            }
        },
        *logout({ payload }, { call, put }) {
            const data = yield call(logout, parse(payload))
            if(data.success) {
                yield put({type: 'logoutSuccess'})
            }
        }
    },
    reduces: {
        loginSuccess(state, action) {
            return {
                ...state,
                ...action.payload,
                login: true,
                loginButtonLoading: false
            }
        },
        loginFail(state) {
            return {
                ...state,
                login: false,
                loginButtonLoading: false
            }
        },
        showLoginButtonLoading(state) {
            return {
                ...state,
                loginButtonLoading: true
            }
        }
    }
}
