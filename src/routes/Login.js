import React , { PropTypes }from 'react';
import {createForm} from 'rc-form';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import qs from 'qs';
import config from '../utils/config';
import styles from './Login.less';
let Login = ({
    onOK,
    loginButtonLoading,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldProps
    }
}) => {
    function handleOk() {
        validateFields((error, values) => {
            if(error)return
            onOK(values);
        })
    }
    document.onkeyup = e => e.keycode===13 && handleOk()
    return(
        <div className={styles.form}>
            <div className={styles.logo}>
                <img src={config.logoSrc} />
            </div>
            <form>
                {getFieldDecorator('corporate_account', {
                    rules: [
                        {
                            required: true,
                            message: '请填写企业帐号'
                        }
                    ]
                })(<InputItem placeholder='请填写企业帐号'>企业帐号</InputItem>)}
                {getFieldDecorator('username', {
                    rules: [
                        {
                            required: true,
                            message: '请填写个人帐号'
                        }
                    ]
                })(<InputItem placeholder='请填写个人帐号'>个人帐号</InputItem>)}
                {getFieldDecorator('password', {
                    rules: [
                        {
                            required: true,
                            message: '请填写密码'
                        }
                    ]
                })(<InputItem placeholder='请填写密码' type='password'>密码</InputItem>)}
            </form>
            <WhiteSpace size='lg'/>
            <Button type='primary' onClick={handleOk} loading={loginButtonLoading}>登录</Button>
        </div>
    )
}
export default createForm()(Login)
