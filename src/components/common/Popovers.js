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
        const {children, placement} = this.props
        return(
                <Popover mask
                    visible={this.state.visible}
                    name='createMenu'
                    animationType='slide-up'
                    overlay={[
                        (<Link to='/customer' activeClassName={styles.active}>
                            <Popover.Item key='4' value='scan' style={{padding: '0 60px 0 20px'}}>创建</Popover.Item>
                        </Link>),
                        (<Link to='/customer' activeClassName={styles.active}>
                            <Popover.Item key='5' value='special' style={{padding: '0 60px 0 20px'}}>快速创建</Popover.Item>
                        </Link>),
                    ]}
                    popupAlign={{
                        offset: [-10, 15]
                    }}
                    placement={placement}
                    onVisibleChange={this._handleVisibleChange}
                    onSelect={this._onSelect}
                    style={{background: 'red'}}
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
