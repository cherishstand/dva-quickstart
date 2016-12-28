import React from 'react';
import { RefreshControl, ListView , List, ActivityIndicator} from 'antd-mobile';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import styles from './ItemList.less';
import {Link} from 'dva/router';
import Spinner from './common/Spinner';
const hashCode = (str) => {
    let hash = 15;
    for (let ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};
class ItemList extends React.Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            data: ds.cloneWithRows(this._genRows(this.props.dataSource)),
            isLoading: false,
        }
    }
    _genRows(data){
        const dataBlob = [];
        for(let ii=0; ii< data.length;ii++){
            dataBlob.push({text:data[ii].accountname, id: data[ii].accountid})
        }
        return dataBlob;
    }
    _renderRow(rowData: string, sectionID: number, rowID: number){
        const rowHash = Math.abs(hashCode(rowData));
        return(
            <div key={rowHash} className={styles.items}>
                <Link to={{pathname:`/customer/${rowData.id}`, query: {mode: 6}}}>
                            <List.Item className={styles.item} >{rowData.text}</List.Item>
                </Link>
            </div>
        )
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
    _onEndReached(event){
        console.log(4);
    }
    render(){
        return(
            <ListView
                dataSource={this.state.data}
                renderRow={this._renderRow}
                renderFooter={() => <div style={{ padding: 10, textAlign: 'center'}}>
                    {this.state.isLoading ? '加载中...' : '加载完毕'}
                </div>}
                className={styles.container}
                style={{height: 'calc(100vh - 178px)', overflowX: 'hidden', backgroundColor: '#fff'}}
                scrollRenderAheadDistance={500}
                initialListSize={20}
                scrollEventThrottle={20}
                onEndReached={this._onEndReached}
                onEndReachedThreshold={10}
            >
            </ListView>
        )
    }
}
export default ItemList
