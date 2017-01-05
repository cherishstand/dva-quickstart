import React from 'react';
import { InputItem, DatePicker, TextareaItem } from 'antd-mobile';
import moment from 'moment';
const zhNow = moment().locale('zh-cn').utcOffset(8);
const DateGroup = React.createClass({
    getInitialState() {
        const { defaultValue } = this.props;
        let defaultDate = defaultValue ? moment(this.props.defaultValue, 'YYYY/MM/DD') : null;
        return {
            date: defaultDate,
            visible: false,
            dpValue: null
        }
    },
    onChange(date) {
        this.setState({date})
        console.log(date);
    },
    render(){
            const { defaultValue, title, children, name } = this.props;
            return (
                <DatePicker
                    mode='date'
                    name={name}
                    defaultDate={this.state.date}
                    title={title}
                    onChange={this.onChange}
                    value={this.state.date}
                >
                    {children}
                </DatePicker>
            )
    }
})
const InputGroup = ({ placeholder, children }) => {
    return (
        <InputItem
            placeholder={placeholder}
        >
            {children}
        </InputItem>
    )
}
const TextareaGroup = ({ placeholder, defaultValue }) => {
    return (
        <TextareaItem
            placeholder={placeholder}
            autoHeight
            labelNumber={5}
            defaultValue={defaultValue}
        />
    )
}

module.exports = {
    DateGroup,
    InputGroup,
    TextareaGroup
}
