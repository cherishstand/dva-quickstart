import React from 'react';
import Layout from '../components/Layout';
import { connect } from 'dva';
import Search from '../components/common/Search';
import Loading from '../components/common/Loading'
import ItemList from '../components/ItemList';
import { listSelector } from '../models/list/selectors';
const ListPage = ({loading, ids, location, current, total, dispatch}) => {
    return (
        <Layout>
            <Search />
            {
                loading ? <Loading /> :
                <ItemList
                    loading={loading}
                    dataSource={ids}
                    location={location}
                    current={current}
                    total={total}
                    dispatch={dispatch}
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
