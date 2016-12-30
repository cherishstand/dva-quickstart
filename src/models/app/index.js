export default {
    namespace: 'app',
    state: {
        login: false,
        loginButtonLoading: false,
        accunt: {
            businessAccount: '123456',
            personalAccount: '123456'
        }
    },
    subscriptions: {
        setup({dispatch}) {
            dispatch({type: 'queryUser'})
        }
    },
    effects: {
        *login({paylod}, {call, put, select})
    }
}
