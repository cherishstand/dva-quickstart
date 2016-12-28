import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'dva/router';
import Index from './routes/Index';
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
            <Route path=':itemId' component={Detail}/>
        </Route>
        <Route path='contacts'>
            <IndexRoute component={ListPage}/>
            <Route path=':itemId' component={Detail}/>
        </Route>
      </Route>
    </Router>
  );
};
