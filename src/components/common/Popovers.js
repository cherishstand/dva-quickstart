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
        const {children} = this.props
        return(
                <Popover
                    mask
                    visible={this.state.visible}
                    name='createMenu'
                    className={styles.inner}
                    overlay={[
                        (<Popover.Item key='4' value='scan' className={styles.item}>创建</Popover.Item>),
                        (<Popover.Item key='5' value='special' className={styles.item}>快速创建</Popover.Item>),
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
