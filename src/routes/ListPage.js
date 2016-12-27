import React from 'react';
import Layout from '../components/Layout';
import { connect } from 'dva';
import Search from '../components/common/Search';
import Loading from '../components/common/Loading'
import ItemList from '../components/ItemList';
const ListPage = ({loading, list, location, current, total, dispatch}) => {
    return (
        <Layout>
            <Search />
            {
                <ItemList
                    loading={loading}
                    dataSource={list}
                    location={location}
                    current={current}
                    total={total}
                    dispatch={dispatch}
                />
            }
        </Layout>
    )
}
ListPage.defaultProps = {

}
const mapStateToProps = (state) => {
    return {
        loading: state.loading.global,
        ...state.item
    }
}
export default connect(mapStateToProps)(ListPage);
