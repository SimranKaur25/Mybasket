import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Mobile from './components/Mobile';
import Password from './components/Password';
import Categories from './components/Categories';
import OrderStatus from './components/OrderStatus';
import RegistrationForm from  './components/RegitrationForm';





function App() {
  return (
    <div className="App">
          <BrowserRouter>
              <Switch>
              
                  <Route path='/MyBasket/Home' component={Home}></Route>
                  <Route path='/MyBasket/Login' component={Mobile}></Route>
                 <Route path='/MyBasket/Password' component={Password}></Route> 
                 <Route path='/MyBasket/Categories' component={Categories}></Route> 
                 <Route path='/MyBasket/OrderStatus' component={OrderStatus}></Route>
                 <Route path='/MyBasket/RegistrationForm' component={RegistrationForm}></Route>

              </Switch>  
          </BrowserRouter>
    </div>
  )
}

export default App;
