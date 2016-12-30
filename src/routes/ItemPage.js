import React, {Component} from 'react';
import { connect } from 'dva';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';
import Items from '../components/Item';
const ItemPage =({ ui, item, loading, location}) => {
    return (
        <div>
        <Header path={location.pathname} loading={loading}/>
        {   loading ? <Loading /> :
            <Items ui={ui} item={item}/>
        }
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        loading: state.loading.global,
        ...state.list.itemsById
    }
}
export default connect(mapStateToProps)(ItemPage)
