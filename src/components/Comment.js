import React from 'react';
import { List, InputItem, DatePicker, TextareaItem } from 'antd-mobile';
import { DateGroup, InputGroup, TextareaGroup } from './CommentUI';
import { createForm } from 'rc-form';
const Item = List.Item;
import styles from './Item.less';
let Comment = React.createClass({
    getInitialState(){
        return{
            editable: false
        }
    },
    handleChange({name}){
        console.log(name);
    },
    drawing(){
        const { ui, item, form: { getFieldsValue, getFieldDecorator, validateFields } } = this.props;
        const layout = [];
        for(let attr in ui) {
            if(attr !== 'pick_list') {
                layout.push(
                    <div key={attr}>
                        <div className={styles.subheader}>{ui[attr].blocklabel}</div>
                        <div className={styles.listContext}>
                            <List>
                                {ui[attr].fields.map((field, index) => {
                                    switch(field.uitype){
                                        case '17':
                                            return  <InputGroup key={index} placeholder='点击编辑' className={styles.input}>
                                                        {field.fieldlabel}
                                                    </InputGroup>
                                            break;
                                        case '5':
                                            return  <DateGroup
                                                        title="选择日期"
                                                        key={index}
                                                        name={field.fieldname}
                                                        defaultValue={item[field.fieldname]}
                                                    >
                                                        <Item arrow="empty" className={styles.item}>{field.fieldlabel}</Item>
                                                    </DateGroup>
                                            break
                                        case '19':
                                        case '21':
                                            return <TextareaGroup
                                                    placeholder="请输入"
                                                    key={index}
                                                    title={field.fieldlabel}
                                                    name={field.fieldname}
                                                    className={styles.item}
                                                    defaultValue={item[field.fieldname]}
                                                    />
                                        default:
                                            return <Item key={index} className={styles.item}>{field.fieldlabel}</Item>
                                    }
                                })}
                            </List>
                        </div>
                    </div>
                )
            }
        }
        return layout;
    },
    render(){
        const layout = this.drawing();
        return(
            <List style={{height: 'calc(100vh - 0.9rem)', overflowY: 'auto', overflowX: 'hidden'}}>{layout}</List>
        )
    }
})
Comment = createForm()(Comment);
export default Comment;
