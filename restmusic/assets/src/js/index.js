//import '../../../node_modules/bootstrap/dist/css/bootstrap.css';


import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/index.scss';
import Base from './components/base'
import MyRoute from './components/main'
import AuthComp from './components/auth'
import { BrowserRouter } from 'react-router-dom';
import {store} from '../store'
import { Provider } from 'react-redux'




class App extends React.Component {
  render () {
    return (
        <div>
          <Base/>
          <MyRoute/>
        </div>
    )
  }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('react-app')
);