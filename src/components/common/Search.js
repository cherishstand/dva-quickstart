import React, {component, PropTypes} from 'react';
import { SearchBar } from 'antd-mobile';
const Search = React.createClass({
  getInitialState() {
    return {
      value: '',
    };
  },
  handleValueChange(value) {
    this.props.handleSearch(value);
  },
  clear() {
    this.setState({ value: '' });
  },
  handleEnterKeyDown(value){
      console.log(1);
  },
  render() {
    return (<div id='search'>
      <SearchBar
        value={this.props.value || ''}
        placeholder="搜索"
        onClear={() => {}}
        onKeyDown={this.handleEnterKeyDown}
        onChange={this.handleValueChange}
      />
    </div>);
  },
});
export default Search
