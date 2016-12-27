import React ,{ Component, PropTypes } from 'react';
import { NavBar, Icon, Popover } from 'antd-mobile';
import { Link } from 'dva/router';
import Popovers from './Popovers';
import styles from './Header.css';

class Header extends Component {
    render(){
        let iconName = null;
        let rightContent = null;
        let title = '';
        switch(this.props.path){
            case '/':
                rightContent = <Link to='setting' style={{color: 'inherit'}}><Icon type='setting'/></Link>
                title = '卓谷科技'
                break
            case '/customer':
                iconName = 'left'
                rightContent = <Popovers path={this.props.path} placement='bottomRight'><Icon type='plus'/></Popovers>
                title = <Popovers path={this.props.path} placement='bottom'>全部<span className='am-popover-arrow'></span></Popovers>
                break
            case '/setting':
                iconName = 'left'
                title = '设置'
                break
            default :
                iconName = 'left'
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
Header.defaultProps = {
  title: '卓谷科技'
}
export default Header
