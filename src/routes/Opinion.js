import React from 'react';
import Header from '../components/common/Header';
import { TextareaItem, Button } from 'antd-mobile';
import styles from './Opinion.less';
const About = React.createClass({
    render(){
        return(
            <div>
                <Header path={this.props.location.pathname}/>
                <div className={styles.nomal}>
                    <p className={styles.subheader}>请留下您宝贵的建议</p>
                    <div className={styles.inner}>
                        <TextareaItem rows={7} placeholder='点击填写' className={styles.textarea}/>
                    </div>
                    <Button type='primary' className={styles.btn}>提交反馈</Button>
                </div>
            </div>
        )
    }
})
export default About
