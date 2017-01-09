import { fetchEnterpriseAccount, fetchPersonalAccount } from '../../services/app';
import qs from 'qs';
const delay = ms => new Promise((resolve) => setTimeout(resolve, ms));
export default {
    namespace: 'app',
    state: {
        login: false,
        loginButtonLoading: false,
        modelList: []
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({type: 'queryLoginStatus'})
        }
    },
    effects: {
        *login({ payload }, { call, put }) {
            yield put({type: 'showLoginButtonLoading'});
            const enterprise = yield call(fetchEnterpriseAccount, qs.parse(payload))
        },
        *queryLoginStatus({ payload }, { call, put }) {
            const loginStatus = localStorage.getItem('zoogoooAccent');
            // if(loginStatus) {
            //     yield put({ type: 'loginSuccess' })
            // }
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
                loginButtonLoading: false,
            }
        },
        loginFail(state) {
            return {
                ...state,
                login: true,
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
