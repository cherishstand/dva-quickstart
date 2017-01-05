import React from 'react';
import Comment from './Comment';
import styles from './Item.less';
let Items = React.createClass({
    render(){
        const { ui, item} = this.props;
        return(
            <div className={styles.lists}>
                <Comment ui={ui} item={item}/>
            </div>
        )
    }
})
export default Items
