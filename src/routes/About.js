import React from 'react';
import { Icon } from 'antd-mobile';
import Header from '../components/common/Header';
import styles from './About.less';
import config from '../utils/config';
const About = React.createClass({
    render(){
        return(
            <div>
                <Header path={this.props.location.pathname}/>
                <div className={styles.view}>
                    <div className={styles.logo}>
                        <img src={config.logoSrc}></img>
                        <p>{'版本:1.0.0'}</p>
                    </div>
                    <div className={styles.des}>我公司秉承“为客户创造价值”的经营理念，致力于为中小企业提供客户关系管理（CRM）和销售管理解决方案，帮助中小企业提高运营效率，节约运营成本，促进企业成长。</div>
                    <div className={styles.link}>
                        <p>
                            <Icon type='link'/>
                            <span style={{color: '#fff'}}> 网址: </span>
                            <span style={{color: '#108ee9'}}>http://www.zoogooo.com</span>
                        </p>
                        <p>
                            <Icon type='check-circle-o'/>
                            <span style={{color: '#fff'}}> 电话: </span>
                            <span style={{color: '#108ee9'}}>0816-2219710</span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
})
export default About
