import React , { PropTypes }from 'react';
import {createForm} from 'rc-form';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import config from '../utils/config';
import styles from './Login.less';
let Login = ({
    onOK,
    loginButtonLoading,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        getFieldProps
    }
}) => {
    function handleOk() {
        validateFieldsAndScroll((error, values) => {
            if(error)return
            onOk(values)
        })
    }
    document.onkeyup = e => e.keycode===13 && handleOk()
    return(
        <div className={styles.form}>
            <div className={styles.logo}>
                <img src={config.logoSrc} />
            </div>
            <List>
                <InputItem
                    {...getFieldDecorator('businessAccount', {
                        rules: [
                            {
                                required: true,
                                message: '请填写企业帐号'
                            }
                        ]
                    })}
                    placeholder=''
                >
                企业帐号
                </InputItem>
                <InputItem
                    {...getFieldDecorator('personalAccount', {
                        rules: [
                            {
                                required: true,
                                message: '请填写个人帐号'
                            }
                        ]
                    })}
                    placeholder=''
                >
                个人帐号
                </InputItem>
                <InputItem
                    {...getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请填写密码'
                            }
                        ]
                    })}
                    type='password'
                    placeholder=''
                >
                密码
                </InputItem>
            </List>
            <WhiteSpace size='lg'/>
            <Button type='primary' onClick={handleOk} loading={loginButtonLoading}>登录</Button>
        </div>
    )
}
Login = createForm()(Login)
export default Login
