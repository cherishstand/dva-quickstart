import React from 'react';
import Layout from '../components/Layout';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Header from '../components/common/Header';
import Search from '../components/common/Search';
import Loading from '../components/common/Loading'
import ItemList from '../components/ItemList';
import { listSelector } from '../models/list/selectors';
const ListPage = ({
    ids,
    location: { pathname },
    loading,
    dispatch,
    query,
    activePath,
    totalPage,
    current,
    next
}) => {
    let handleSearch = (value) => {
        dispatch({
            type: 'list/setQuery',
            payload: value
        })
    };
    let handleAciveType = (value) => {
        dispatch(routerRedux.push({
            pathname: '/' + activePath,
            query: {type: value}
        }))
    };
    return (
        <Layout>
            <Header path={pathname} handleAciveType={handleAciveType}/>
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
                        activePath={activePath}
                    />
            }
        </Layout>
    )
}
const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.loading.models.list,
        ...listSelector(state, ownProps)
    }
}
export default connect(mapStateToProps)(ListPage);
