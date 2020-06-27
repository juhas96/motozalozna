import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppForm from './AppForm';
import AppTable from './AppTable';
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <AppForm />
//   </React.StrictMode>,
//   document.getElementById('form')
// );

ReactDOM.render(
  <React.StrictMode>
    <AppTable />
  </React.StrictMode>,
  document.getElementById('table')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
