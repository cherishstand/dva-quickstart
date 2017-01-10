import React , { PropTypes }from 'react';
import {createForm} from 'rc-form';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import classnames from 'classnames';
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
    function handleOk(event) {
        event.preventDefault();
        validateFields((error, values) => {
            if (!error) {
                onOK(values);
            } else {
                return false;
            }

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
                    rules: [{required: true, message: '请填写企业帐号'}]
                })(<InputItem placeholder='请填写企业帐号'>企业帐号</InputItem>)}
                {getFieldDecorator('username', {
                    rules: [{required: true, message: '请填写个人帐号'}]
                })(<InputItem placeholder='请填写个人帐号'>个人帐号</InputItem>)}
                {getFieldDecorator('password', {
                    rules: [{required: true, message: '请填写密码'}]
                })(<InputItem placeholder='请填写密码' type='password'>密码</InputItem>)}
                <WhiteSpace size='lg'/>
                <Button onClick={handleOk} loading={loginButtonLoading} style={{backgroundColor: '#6bcd49', color: '#fff'}}>登录</Button>
            </form>
        </div>
    )
}
export default createForm()(Login)
