import React from 'react'
import Header from '../components/common/Header'
import Loading from '../components/common/Loading'
import { connect } from 'dva';
const CreatePage = ({
    location: { pathname },
    loading,
    typeList
}) => {
    return (
        <div>
            <Header path={pathname}/>
            {
                loading ? <Loading /> : null
            }
        </div>
    )
}
export default connect(state => {
    return {
        loading: state.loading.models.create,
        typeList:state.create.typeList
    }
})(CreatePage)
