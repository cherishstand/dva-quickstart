import React, { Component, PropTypes } from 'react';
import Header from '../components/common/Header';
import { Link } from 'dva/router';
import { WhiteSpace, Button, Flex, Toast } from 'antd-mobile';
import styles from './SettingPage.less';
import Layout from '../components/Layout';
const SettingPage = React.createClass({
    _handleClick(){
        Toast.info('清除缓存成功', 1);
    },
    _loginOut() {
        console.log(1);
    },
    render(){
        const { location } = this.props;
        return(
            <div>
                <Header path={location.pathname}/>
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <Flex direction='column' justify='center'>
                            <div className={styles.item}><Link to='/setting/about'>关于我们</Link></div>
                            <WhiteSpace />
                                <div className={styles.item}><Link to='/setting/opinion'>意见反馈</Link></div>
                            <WhiteSpace />
                            <div className={styles.item} onClick={this._handleClick}>清除缓存</div>
                        </Flex>
                    </div>
                    <Button type="primary" className={styles.btn} onClick={this._loginOut}>退出登录</Button>
                </div>
            </div>
        )
    }
})
export default SettingPage;
