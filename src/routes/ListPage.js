import React ,{ Component, PropTypes } from 'react';
import Layout from '../components/Layout';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Header from '../components/common/Header';
import Search from '../components/common/Search';
import Loading from '../components/common/Loading'
import ItemList from '../components/ItemList';
import NProgress from 'nprogress';
import { listSelector } from '../models/list/selectors';
class ListPage extends Component {
    static propTypes = {
        location: PropTypes.object,
        query: PropTypes.string,
        dispatch: PropTypes.func,
        loading: PropTypes.bool
    };
    constructor(props) {
        super(props);
        const { dispatch, activePath} = props;
        this.handleSearch = (value) => {
            dispatch({
                type: 'list/setQuery',
                payload: value
            })
        }
        this.handleAciveType = value => {
            dispatch({
                type: 'list/fetchList',
                payload: { path: activePath, activeType: value }
            })
        }
    }
    componentDidMount() {
        if(!this.props.loading) {
            NProgress.done()
        }
    }
    componentWillReceiveProps(nextProps) {
        if(!nextProps.loading) {
            NProgress.done();
        }
    }
    render() {
        const {
            ids,
            location: { pathname },
            loading,
            query,
            dispatch,
            activePath,
            totalPage,
            current,
            next
        } = this.props;
        return (
            <Layout>
                <Header path={pathname} handleAciveType={this.handleAciveType}/>
                <Search value={query} handleSearch={this.handleSearch}/>
                {
                    loading ? null : 
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

}
const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.loading.models.list,
        ...listSelector(state, ownProps)
    }
}
export default connect(mapStateToProps)(ListPage);
