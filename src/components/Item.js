import React from 'react';
<<<<<<< HEAD
import { List, InputItem, DatePicker, TextareaItem } from 'antd-mobile';
=======
import Comment from './Comment';
>>>>>>> 2660e76beed062a99136b7ceb20e1823b4b0d6fc
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
<<<<<<< HEAD
    return(
        <div className={styles.lists}>
            {draw()}
        </div>
    )
}
=======
})

>>>>>>> 2660e76beed062a99136b7ceb20e1823b4b0d6fc
export default Items
