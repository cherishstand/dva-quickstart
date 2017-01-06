import React from 'react';
import {ListView , List, Icon, Flex, Popup, Button, WhiteSpace} from 'antd-mobile';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import classnames from 'classnames';
import styles from './ItemList.less';
import {Link} from 'dva/router';
import Spinner from './common/Spinner';
let wrapProps;
const Item = List.Item;
const Brief = Item.Brief;
const handleClose = () => {
    Popup.hide()
}
const PopupContent = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const touchPhone = event.currentTarget.getAttribute('data-value');
    Popup.show(
        <div style={{padding: 30}}>
            <Button type='primary' onClick={handleClose}><a href={`tel:${touchPhone}`}>{`拨打:${touchPhone}`}</a></Button>
            <WhiteSpace size='lg'/>
            <Button type='ghost' onClick={handleClose} style={{backgroundColor: '#ddd', color: '#fff', border: 'none'}}>取消</Button>
        </div>, { animationType: 'slide-up' }
    )
}
class ItemList extends React.Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            data: ds.cloneWithRows(this._genRows(props.dataSource)),
            isLoading: false,
        }
        this._renderRow = (rowData: string, sectionID: number, rowID: number) => {
            switch(props.activePath) {
                case 'customer':
                    return  <div key={rowData.id} className={styles.items}>
                                <Link to={{pathname:`/${props.activePath}/${rowData.id}`, query: {mode: 6}}}>
                                            <Item className={styles.item} >{rowData.text}</Item>
                                </Link>
                            </div>
                    break;
                case 'contacts':
                return  <div key={rowData.id} className={styles.items}>
                            <Link to={{pathname:`/${props.activePath}/${rowData.id}`, query: {mode: 4}}}>
                                        <div className={classnames({[styles.item]: true, [styles.contacts]: true})}>
                                            <p className={styles.text}>{rowData.text}</p>
                                            <Flex className={styles.brief}>
                                                <Flex.Item className={styles.i}><Icon type='cloud'/>{rowData.company}</Flex.Item>
                                                <Flex.Item className={styles.i}><Icon type='tags-o'/>{rowData.position}</Flex.Item>
                                                <Flex.Item className={styles.i}><Icon type='share-alt'/>{rowData.mobile}</Flex.Item>
                                            </Flex>
                                            <span className={styles.btn} onClick={PopupContent} data-value={rowData.mobile}><Icon type='phone' /></span>
                                        </div>
                            </Link>
                        </div>
                case 'records':
                    return  <div key={rowData.id} className={styles.items}>
                    <Link to={{pathname:`/${props.activePath}/${rowData.id}`, query: {mode: 4}}}>
                                <div className={classnames({[styles.item]: true, [styles.contacts]: true})}>
                                    <p className={styles.text}>{rowData.text}</p>
                                    <Flex className={styles.brief}>
                                        <Flex.Item className={styles.i}><Icon type='cloud'/>{rowData.company}</Flex.Item>
                                        <Flex.Item className={styles.i}><Icon type='tags-o'/>{rowData.position}</Flex.Item>
                                    </Flex>
                                    <span className={styles.btn}>{rowData.lastcontactdate}</span>
                                </div>
                    </Link>
                            </div>
                    break;
            }
            return
        }
        this._onEndReached = (event) => {
            const { dispatch, totalPage, current, next } = props;
            // if(totalPage > current){
            //     dispatch({
            //         type: 'list/refetchList',
            //         payload: next
            //     })
            // }
        }
        this._renderFooter = () => {
            return  <div style={{ padding: 10, textAlign: 'center' }}>
                        {this.state.isLoading ? '加载中...' : '加载完毕'}
                    </div>
        }
    }
    _genRows(data){
        const dataBlob = [];
        for(let ii=0; ii< data.length;ii++){
            switch(this.props.activePath) {
                case 'customer':
                    dataBlob.push({
                        text:data[ii].accountname,
                        id: data[ii].accountid
                    })
                    break;
                case 'contacts':
                    dataBlob.push({
                        text:data[ii].lastname,
                        id: data[ii].contactid,
                        company: data[ii].accountname,
                        position: data[ii].title,
                        mobile: data[ii].mobile
                    })
                    break;
                case 'records':
                    dataBlob.push({
                        text: data[ii].accountname,
                        id: data[ii].contactrecordID,
                        company: data[ii].accountname,
                        position: data[ii].lastname,
                        lastcontactdate: data[ii].lastcontactdate
                    })
                    break;
                case 'orders':
                    dataBlob.push({
                        text: data[ii].last_name,
                        id: data[ii].salesorderid,
                        acount: data[ii].id,
                        modifiedtime: data[ii].modifiedtime,
                        price: data[ii].listprice
                    })
                    break;
            }
        }
        return dataBlob;
    }

    _renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool){
        return(
            <div key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
                }}
            />
        )
    }
    render(){
        const { dataSource } = this.props;
        return(
            <div>
            {
                dataSource && dataSource instanceof Array
                ? <ListView
                    dataSource={this.state.data}
                    renderRow={this._renderRow}
                    className={styles.container}
                    style={{height: 'calc(100vh - 1.78rem)', overflowX: 'hidden', backgroundColor: '#fff'}}
                    scrollRenderAheadDistance={500}
                    initialListSize={20}
                    scrollEventThrottle={20}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={20}
                >
                </ListView>
                : <div className={styles.emtpy}>所查询数据为空</div>
            }
            </div>
        )
    }
}
export default ItemList
