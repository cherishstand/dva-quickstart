import React from 'react'
import Header from '../components/common/Header'
import { connect } from 'dva';
const CreatePage = ({ location: { pathname }}) => {
    return (
        <Header path={pathname}/>
    )
}




export default connect(state => {
    return {
        loading: state.loading.models.create,
        typeList:state.create.typeList
    }
})(CreatePage)
