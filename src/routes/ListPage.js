import React from 'react';
import Layout from '../components/Layout';
import { connect } from 'dva';
import Header from '../components/common/Header';
import Search from '../components/common/Search';
import Loading from '../components/common/Loading'
import ItemList from '../components/ItemList';
import { listSelector } from '../models/list/selectors';
const ListPage = ({ids, location, loading, dispatch, query, activeType, totalPage, current, next}) => {
    let handleSearch = (value) => {
        dispatch({
            type: 'list/setQuery',
            payload: value
        })
    };
    return (
        <Layout>
            <Header path={location.pathname} loading={loading} dispatch={dispatch}/>
            <Search value={query} handleSearch={handleSearch}/>
            {
                loading ? <Loading /> :
                    <ItemList
                        dataSource={ids}
                        location={location}
                        dispatch={dispatch}
                        totalPage={totalPage}
                        current={current}
                        next={next}
                        activeType={activeType}
                    />
            }
        </Layout>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.loading.global,
        ...listSelector(state, ownProps)
    }
}
export default connect(mapStateToProps)(ListPage);
