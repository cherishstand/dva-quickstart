import React from 'react'
import Header from '../components/common/Header'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile'
import styles from './Photo.less'
const Photo = ({
    location: { pathname }
}) => {
    return (
        <div>
            <Header path={pathname}/>
            <div className={styles.container}>
                <div>
                    <input type='text' placeholder='请选择客户'/>
                    <input type='text' placeholder='请输入描述'/>
                </div>
                <img src='' style={{width: '4.2rem', height: '4.2rem'}}/>
                <WhiteSpace size="lg" />
                <Button type='primary'>添加图片</Button>
                <WhiteSpace size="lg" />
                <Button type='primary'>发送</Button>
            </div>
        </div>
    )
}

export default Photo
