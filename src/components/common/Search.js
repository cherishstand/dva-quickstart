import React, {component, PropTypes} from 'react';
import { SearchBar } from 'antd-mobile';
const Search = React.createClass({
  getInitialState() {
    return {
      value: '',
    };
  },
  onChange(value) {
    this.setState({ value });
  },
  clear() {
    this.setState({ value: '' });
  },
  render() {
    return (<div>
      <SearchBar
        value={this.state.value}
        placeholder="搜索"
        onSubmit={(value) => {}}
        onClear={(value) => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        onChange={this.onChange}
      />
    </div>);
  },
});
export default Search
