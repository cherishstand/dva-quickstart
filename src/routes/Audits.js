import React from 'react'
import Header from '../components/common/Header'
import { Tabs } from 'antd-mobile'
const TabPane = Tabs.TabPane;
function callback() {
    console.log(1);
}
const Audits = ({
    location: { pathname }
}) => {
    return (
        <div>
            <Header path={pathname}/>

            <Tabs defaultActiveKey="1" onchange={callback}>
                <TabPane tab="已审批" key="1">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 175px)' }}>
                        选项卡一内容
                    </div>
                </TabPane>
                <TabPane tab="待审批" key="2">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 175px)' }}>
                        选项卡一内容
                    </div>
                </TabPane>
                <TabPane tab="近30天" key="3">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 175px)' }}>
                        选项卡一内容
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}


export default Audits
