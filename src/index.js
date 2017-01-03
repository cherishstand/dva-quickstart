import './index.html';
import './index.css';
import createLoading from 'dva-loading';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import dva from 'dva';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/create'));
app.model(require('./models/list'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
