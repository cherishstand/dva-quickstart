import React ,{ Component, PropTypes } from 'react';
import { NavBar, Icon, Popover } from 'antd-mobile';
import { Link } from 'dva/router';
import Popovers from './Popovers';
import {CONFIG} from '../../utils/typeItem';
import DropDownMenu from './DropDownMenu';
import styles from './Header.css';

class Header extends Component {
    render(){
        let iconName = 'left';
        let rightContent = null;
        let title = '';
        const { path, loading, dispatch} = this.props;
        switch(path){
            case '/':
                iconName = null
                rightContent = <Link to='setting' style={{color: 'inherit'}}><Icon type='setting'/></Link>
                title = '卓谷科技'
                break
            case '/customer':
                rightContent = <Popovers path={path}><Icon type='plus'/></Popovers>
                title = <DropDownMenu path={path} dispatch={dispatch} typeItem={CONFIG[path.replace('/','')]}>全部<span className='am-popover-arrow'></span></DropDownMenu>
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
                        {title}
                    </NavBar>
            </div>
        )
    }
}
Header.contextTypes = {
    router: PropTypes.object
}
export default Header
