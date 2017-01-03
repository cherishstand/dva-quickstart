import React, {Component} from 'react'
import {Link} from 'dva/router';
import Header from '../components/common/Header';
import styles from './App.css';
import { Icon } from 'antd-mobile';
const App = React.createClass({
  render() {
    return (<div>
        <Header path={this.props.location.pathname}/>
        <nav>
              <ul className={styles.menu}>
                <li><Link to="/customer"><Icon type='user'/><span>客户</span></Link></li>
                <li><Link to="/contacts"><Icon type='mail'/><span>联系人</span></Link></li>
                <li><Link to="/records"><i className="material-icons">&#xE8B0;</i>联系记录</Link></li>
                <li><Link to="/orders"><i className="material-icons">&#xE8FE;</i>销售订单</Link></li>
                <li><Link to="/audit"><i className="material-icons">&#xE90A;</i>审批中心</Link></li>
                <li><Link to="/check"><i className="material-icons">&#xE85E;</i>签到考勤</Link></li>
                <li><Link to="/photo"><i className="material-icons">&#xE439;</i>拍照</Link></li>
                <li><Link to="/bulletin"><i className="material-icons">&#xE85A;</i>公告</Link></li>
                <li><Link to="/work"><i className="material-icons">&#xE886;</i>工作协同</Link></li>
                <li><Link to="/servers"><i className="material-icons">&#xE873;</i>客户服务单</Link></li>
              </ul>
        </nav>
    </div>);
  },
});
export default App