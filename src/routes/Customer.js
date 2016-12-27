import React, {Component} from 'react';
import { connect } from 'dva';
import Loading from '../components/common/Loading';
import Search from '../components/common/Search';
const Customer = ({dispatch, location, customer}) => {
    const {list, current, total, loading} = customer
    const CustomerListProps = {
        dataSource: list,
        current,
        loading,
        total,
        location
    }
    return(
        <div>
            <Search />
            {
                loading ? <Loading />: <CustomerList {...CustomerListProps} />
            }
        </div>
    )
}
const mapStateToProps = ({ customer }) => {
  return {customer};
}
export default connect(mapStateToProps)(Customer)
