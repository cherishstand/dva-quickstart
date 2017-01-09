import React, {Component} from 'react';
import { Popover, Icon, Menu } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import styles from './HeaderMenu.less';
const LIST_TYPE = {
    customer: {'all': '全部','may':'潜在客户','vip':'VIP客户','dealed':'成交客户','hot':'热点客户','tdays':'30天未更新','month':'本月创建'}
}
const Popovers = React.createClass({
    getInitialState(){
        return{
            visible: false,
            selected: '全部'
        }
    },
    _onSelect(opt){
        this.setState({
            visible: false,
            selected: opt.props.title
        })
        this.props.handleAciveType(opt.props.value)
    },
    _handleVisibleChange(visible){
        this.setState({visible})
    },
    render(){
        const {children, typeItem} = this.props
        const { visible } = this.state;
        const overlay = [];
        for(let type in typeItem) {
            const isFocused = typeItem[type] === this.state.selected;
            overlay.push(
                <Popover.Item
                    key={type}
                    value={type}
                    title={typeItem[type]}
                    className={classnames({[styles.item]: true, [styles.isFocus]: isFocused})}>
                        {typeItem[type]}
                        {isFocused ? <Icon type='check' className={styles.icon} style={{color: '#ff4081'}}/> : null}
                </Popover.Item>
            )
        }
        return(
                <Popover
                    mask
                    visible={this.state.visible}
                    name='dropDownMenu'
                    className={styles.inner}
                    overlay={overlay}
                    popupAlign={{
                        offset: [0, 15]
                    }}
                    placement='bottom'
                    onVisibleChange={this._handleVisibleChange}
                    onSelect={this._onSelect}
                    overlayStyle={{width: '65%'}}
                >
                    <div style={{
                        height: '100%',
                        padding: '0 0.3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                        {this.state.selected}<div className={styles.caret}></div>
                    </div>
                </Popover>
        )
    }
})

export default Popovers
