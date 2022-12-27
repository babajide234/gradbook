import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/argon-dashboard.css';
import './assets/css/nucleo-icons.css';
import './assets/css/nucleo-svg.css';
import './assets/js/argon-dashboard.js';
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
  </React.StrictMode>
)
