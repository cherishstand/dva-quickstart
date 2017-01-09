import React, {Component} from 'react';
import { Popover, Icon } from 'antd-mobile';
import { Link } from 'dva/router';
import styles from './Popovers.less';
const Popovers = React.createClass({
    getInitialState(){
        return{
            visible: false,
            selected: ''
        }
    },
    _onSelect(opt){
        this.setState({
            visible: false,
            selected: opt.props.value
        })
    },
    _handleVisibleChange(visible){
        this.setState({visible})
    },
    render(){
        const {children, path} = this.props
        return(
                <Popover
                    mask
                    visible={this.state.visible}
                    name='createMenu'
                    openMenu={(name) => console.log(name)}
                    className={styles.inner}
                    overlay={[
                        (<Link to={{pathname: '/create', query: {mode: 6}}}>
                            <Popover.Item key='1' value='创建' className={styles.item}>创建</Popover.Item>
                        </Link>),
                        (<Link to={{pathname: '/create', query: {mode: 6, type: 'quick_create'}}}>
                            <Popover.Item key='2' value='快速创建' className={styles.item}>快速创建</Popover.Item>
                        </Link>),
                    ]}
                    popupAlign={{
                        offset: [-10, 15]
                    }}
                    onVisibleChange={this._handleVisibleChange}
                    onSelect={this._onSelect}
                >
                    <div style={{
                        height: '100%',
                        padding: '0 0.3rem',
                        marginRight: '-0.3rem',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                        {children}
                    </div>
                </Popover>
        )
    }
})

export default Popovers
