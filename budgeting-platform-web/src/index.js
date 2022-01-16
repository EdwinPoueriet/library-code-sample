import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {BudgetsProvider} from "./contexts/BudgetsContext";
ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
        <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

