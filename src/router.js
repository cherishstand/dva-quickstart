import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute} from 'dva/router';
import Index from './routes/Index';
import Customer from './routes/Customer';
import Setting from './routes/Setting';
import Detail from './routes/Detail';
import Header from './components/common/Header';
import ListPage from './routes/ListPage';
const App = ({children, location}) => {
  return (
    <div>
      <Header path={location.pathname}/>
      {children}
    </div>
  )
}
export default ({history}) => {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path='setting' component={Setting}/>
        <Route path='customer'>
            <IndexRoute component={ListPage}/>
            <Route path=':id' component={Detail}/>
        </Route>
      </Route>
    </Router>
  );
};
