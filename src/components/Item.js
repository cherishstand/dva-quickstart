import React from 'react';
import { List, InputItem, DatePicker, TextareaItem } from 'antd-mobile';
import styles from './Item.less';
const Item = List.Item;
const Brief = Item.Brief;
let Items = ({ui, item}) => {
    const draw = () => {
        const layout = [];
        for(let attr in ui) {
            if(attr !== 'pick_list') {
                layout.push(
                    <div key={attr} className={styles.listContext}>
                        <div className={styles.subheader}>{ui[attr].blocklabel}</div>
                        <div>
                            <List>
                                {ui[attr].fields.map((field, index) => {
                                    switch(field.uitype){
                                        case '17':

                                            return <InputItem placeholder="请输入" key={index} name={field.fieldname} className={styles.input}>{field.fieldlabel}</InputItem>
                                            break;

                                        case '5':
                                            return  <DatePicker
                                                        mode="date"
                                                        title="选择日期"
                                                        key={index}
                                                    >
                                                        <Item arrow="horizontal">{field.fieldlabel}</Item>
                                                    </DatePicker>
                                            break
                                        case '19':
                                        case '21':
                                            return <TextareaItem
                                                    placeholder="请输入"
                                                    key={index}
                                                    title={field.fieldlabel}
                                                    autoHeight
                                                    labelNumber={5}
                                                    name={field.fieldname}
                                                    defaultValue={item[field.fieldname]}
                                                    />
                                        default:
                                            return <Item extra={item[field.fieldname]}>{field.fieldlabel}</Item>
                                    }
                                })}
                            </List>
                        </div>
                    </div>
                )
            }
        }
        return layout
    }
    return(
        <div className={styles.lists}>
            {draw()}
        </div>
    )
}
export default Items
