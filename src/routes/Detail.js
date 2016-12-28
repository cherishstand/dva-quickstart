import React, {Component} from 'react';
import { connect } from 'dva';
import Loading from '../components/common/Loading';
import Items from '../components/Item';
const Detail =({ ui, item, loading}) => {
    return (
        <div>
        {   loading ? <Loading /> :
            <Items ui={ui} item={item}/>
        }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        loading: state.list.global,
        ...state.list.itemsById
    }
}
export default connect(mapStateToProps)(Detail)
