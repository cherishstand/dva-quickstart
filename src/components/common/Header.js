import React ,{ Component, PropTypes } from 'react';
import { NavBar, Icon, Popover } from 'antd-mobile';
import { Link } from 'dva/router';
import Popovers from './Popovers';
import {CONFIG} from '../../utils/typeItem';
import DropDownMenu from './DropDownMenu';
import styles from './Header.css';

class Header extends Component {
    render(){
        let iconName = 'left'
        let rightContent = null
        let title = ''
        const { path, loading, handleAciveType, headerTitle} = this.props;
        switch(path){
            case '/':
                iconName = null
                rightContent = <Link to='setting' style={{color: 'inherit'}}><Icon type='setting'/></Link>
                title = '卓谷科技'
                break
            case '/contacts':
            case '/customer':
                rightContent = <Popovers path={path}><Icon type='plus'/></Popovers>
                title = <DropDownMenu
                            path={path}
                            handleAciveType={handleAciveType}
                            typeItem={CONFIG[path.replace('/', '')]}
                        >
                        </DropDownMenu>
                break
            case '/setting':
                title = '设置'
                break
            case '/setting/about':
                title = '关于我们'
                break
            case '/setting/opinion':
                title = '意见反馈'
                break
            case '/create':
                rightContent=<div>保存</div>
                break;
            case '/photo':
                title = '拍照'
                break;
            case '/audits':
                title = '审批中心'
                break;
            case '/check':
                title = '签到考勤'
                rightContent = <div>历史<Icon type='notification' style={{paddingLeft: 8}}/></div>
                break;
            default :
                rightContent = <Icon type='logout'/>
                title = '详情'
                break;
        }
        return(
            <div>
                <NavBar
                    leftContent={iconName ? '返回': null}
                    iconName={iconName}
                    mode="light"
                    rightContent={rightContent}
                    onLeftClick={this.context.router.goBack}
                    className={styles.boxshow}
                    >
                        {headerTitle || title}
                    </NavBar>
            </div>
        )
    }
}
Header.contextTypes = {
    router: PropTypes.object
}
export default Header
