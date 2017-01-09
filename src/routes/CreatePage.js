import React from 'react';
import Header from '../components/common/Header';
import Loading from '../components/common/Loading';
import { List } from 'antd-mobile';
import { InputGroup, TextareaGroup, DateGroup } from '../components/CommentUI';
import styles from './CreatePage.less';
import { connect } from 'dva';
const CreatePage = ({
    location: { pathname, query },
    loading,
    typeList
}) => {
    let pages = () => {
        let layout = [];
        for(let key of typeList) {
            if(key !== 'pick_list') {
                layout.push(
                    <div key={key}>
                        <div className={styles.subheader}>{typeList[key].blocklabel}</div>
                    </div>
                )
            }
        }
        return layout
    }
    return (
        <div>
            <Header path={pathname} headerTitle={ query.type ? '快速创建' : '创建' } />
            {
                loading
                ?  <Loading />
                : <List className={styles.createPage}>
                    {() => pages()}
                </List>
            }
        </div>
    )
}
export default connect(state => {
    return {
        loading: state.loading.models.create,
        ...state.create
    }
})(CreatePage)
