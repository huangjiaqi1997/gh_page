import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MusicApp from './musicApp';
import store from './store.js';

import './index.css';
import './static/fonts/iconfont.css';


ReactDOM.render(
  <Provider store={store}>
    <MusicApp />
  </Provider>,
  document.getElementById('root')
);
// "proxy": "http://localhost:9093"