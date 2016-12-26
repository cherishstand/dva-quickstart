import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile';
const Loading = () => {
    return(
        <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <ActivityIndicator text="加载中..."/>
        </div>
    )
}
export default Loading
