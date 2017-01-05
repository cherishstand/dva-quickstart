import React from 'react'
import Header from '../components/common/Header'
import { Tabs, Flex, Button } from 'antd-mobile'
import styles from './Check.less'
const TabPane = Tabs.TabPane;

class Map extends React.Component<any, any> {
    static defaultProps = {
        id: 'location'
    }
    static propTypes = {
        id: React.PropTypes.string
    }
    constructor(props){
        super(props)
        this.state = {
            map: null,
            point: null
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.storeAddress !== this.props.storeAddress || nextProps.mapArea !== this.props.mapArea) {
            this.addressToPoint(nextProps);
        }
        if (!nextProps.storeAddress && !nextProps.mapArea && nextProps.storeAddress !== this.props.storeAddress) {
            this.setState({
                map: this.createBMap(this.props.id)
            })
        }
    }
    componentDidMount() {
        this.setState({
            map: this.createBMap(this.props.id)
        })
    }
    createBMap(id) {
        let  map = new BMap.Map(id);
        let  point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point, 17);
        map.addControl(new BMap.NavigationControl());
        let  geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if(this.getStatus() == BMAP_STATUS_SUCCESS) {
                let mk = new BMap.Marker(r.point);
                mk.setAnimation(BMAP_ANIMATION_BOUNCE);
                map.addOverlay(mk);
                map.panTo(r.point);
            } else {
                console.log('failed'+this.getStatus());
            }
        }, {enableHighAccuracy: true})
        // map.enableScrollWheelZoom();
        return map
    }
    render() {
        return (
            <div id={this.props.id} {...this.props}></div>
        )
    }
}
const Check = ({
    location: { pathname }
}) => {
    return (
        <div>
            <Header path={pathname}/>
            <Tabs defaultActiveKey='1' destroyInactiveTabPane={true}>
                <TabPane tab="我的签到" key="1">
                    <div className={styles.content}>
                        <Map className={styles.map} style={{height: 'calc(100vh - 3.71rem)'}}/>
                        <div className={styles.click}>
                            <input type='text' placeholder='请点击选择客户'/>
                            <input type='text' placeholder='请输入描述'/>
                            <Button size="small" type="primary" inline className={styles.btn}>签到</Button>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="下属签到" key="2">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 1.75rem)' }}>
                        选项卡一内容
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Check
