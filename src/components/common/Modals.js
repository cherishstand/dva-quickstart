import React from 'react';
import { Modal, Button } from 'antd-mobile';
const Alert = Modal.alert;

const Modals = ({ children }) => {
    return (
        <div onClick={ () => Alert('保存', '确认保存当前操作???', [
            { text: '取消' },
            { text: '确认', style: { fontWeight: 'bold' } },
        ]) }>{children}</div>
    )
}
export default Modals;
