import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'dva/router';
import App from './routes/App';
import SettingPage from './routes/SettingPage';
import ItemPage from './routes/ItemPage';
import ListPage from './routes/ListPage';
import About from './routes/About';
import Opinion from './routes/Opinion';
import Login from './routes/Login';
import CreatePage from './routes/CreatePage'
const Mater = ({children}) => {
    return (
        <div>{children}</div>
    )
}
export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={Mater}>
        <IndexRoute component={App}/>
        <Route path='/setting'>
            <IndexRoute component={SettingPage}/>
            <Route path='about' component={About} />
            <Route path='opinion' component={Login} />
        </Route>
        <Route path='/customer'>
            <IndexRoute component={ListPage}/>
            <Route path=':itemId' component={ItemPage}/>
        </Route>
        <Route path='/contacts'>
            <IndexRoute component={ListPage}/>
            <Route path=':itemId' component={ItemPage}/>
        </Route>
        <Route path='/records'>
            <IndexRoute component={ListPage}/>
            <Route path=':itemId' component={ItemPage}/>
        </Route>
        <Route path='/create' component={CreatePage}/>
      </Route>
    </Router>
  );
};
