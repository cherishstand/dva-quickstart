import { fetchEnterpriseAccount, fetchPersonalAccount } from '../../services/app'

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
        *login({ payload }, { call, put, select }) {
            yield put({type: 'showLoginButtonLoading'});
            const { corporate_account, username, password } = payload;
            const EnterpriseAccountData = yield call(fetchEnterpriseAccount, corporate_account);
            const PersonalAccountDate = yield call(fetchPersonalAccount, username, password);
            if (EnterpriseAccountData.code === 1 && PersonalAccountDate.code === 200) {
                yield put({type: 'loginSuccess', payload: { PersonalAccountDate }})
            } else {
                yield put({type: 'loginFail', payload: { PersonalAccountDate }})
            }
        },
        *queryLoginStatus({ payload }, { call, put }) {
            const loginStatus = localStorage.getItem('zoogoooAccent');
            if(loginStatus) {
                yield put({ type: 'loginSuccess' })
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
                loginButtonLoading: false,
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
