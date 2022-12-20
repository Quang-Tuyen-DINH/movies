import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from "./Store/Index";
import './index.scss';
import App from './Containers/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);
