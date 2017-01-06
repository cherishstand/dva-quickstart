import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'dva/router';
import App from './routes/App';
import SettingPage from './routes/SettingPage';
import ItemPage from './routes/ItemPage';
import ListPage from './routes/ListPage';
import About from './routes/About';
import Opinion from './routes/Opinion';
import Login from './routes/Login';
import Photo from './routes/Photo';
import Audits from './routes/Audits'
import Check from './routes/Check'
import CreatePage from './routes/CreatePage'
const Mater = ({children}) => {
    return (
        <div>{children}</div>
    )
}
export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={App}/>
        <Route path='/photo' component={Photo} />
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
        <Route path='/audits' component={Audits}/>
        <Route path='/check' component={Check}/>
        <Route path='/create' component={CreatePage}/>
      </Route>
    </Router>
  );
};
