import React from 'react';
import { RefreshControl, ListView , List, ActivityIndicator} from 'antd-mobile';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import styles from './ItemList.less';
import {Link} from 'dva/router';
import Spinner from './common/Spinner';
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
            return  <div key={rowData.id} className={styles.items}>
                        <Link to={{pathname:`/customer/${rowData.id}`, query: {mode: 6}}}>
                                    <List.Item className={styles.item} >{rowData.text}</List.Item>
                        </Link>
                    </div>
        }
        this._onEndReached = (event) => {
            const { dispatch, totalPage, current, next } = this.props;
            if(totalPage > current){
                dispatch({
                    type: 'list/refetchList',
                    payload: next
                })
            }
        }
        this._genRows = (data) => {
            const dataBlob = [];
            const { pathname } = props.location;
            console.log(pathname);
            for(let ii=0; ii < data.length; ii++) {
                switch(pathname) {
                    case '/customer':
                        dataBlob.push({text:data[ii].accountname, id: data[ii].accountid})
                        break;
                    case '/contacts':
                        dataBlob.push({ text:data[ii].lastname,
                                        id: data[ii].contactid,
                                        company: data[ii].account_type,
                                        position: data[ii].contact_no,
                                        mobile: data[ii].mobile
                                    })
                        break;
                    case '/records':
                        dataBlob.push({
                            text: data[ii].accountname,
                            id: data[ii].contactrecordID,
                            company: data[ii].accountname,
                            position: data[ii].lastname,
                            lastcontactdate: data[ii].lastcontactdate
                        })
                        break;
                    case '/orders':
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
        }
    }
    _genRows(data){
        const dataBlob = [];
        for(let ii=0; ii< data.length;ii++){
            dataBlob.push({text:data[ii].accountname, id: data[ii].accountid})
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
        return(
            <ListView
                dataSource={this.state.data}
                renderRow={this._renderRow}
                className={styles.container}
                style={{height: 'calc(100vh - 1.78rem)', overflowX: 'hidden', backgroundColor: '#fff'}}
                scrollRenderAheadDistance={500}
                initialListSize={20}
                pageSize={4}
                scrollEventThrottle={20}
                onEndReached={this._onEndReached}
                onEndReachedThreshold={20}
            >
            </ListView>
        )
    }
}
export default ItemList
