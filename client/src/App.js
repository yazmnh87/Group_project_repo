import React, { Component } from 'react';
import NavBar from "./NavBar"
import UserProfile from "./UserProfile"
import './App.css';
import CoinInfo from './CoinInfo';
import {Switch, Route} from "react-router-dom"
import News from "./News"

class App extends Component {
  render() {
    return (
      
      <div className="AppDiv">
        <NavBar/>
        <UserProfile/>
        <Switch>
          <Route exact path="/" component={CoinInfo}/>
          <Route path="/news" component={News}/>
        </Switch>
      </div>
    
    );
  }
}

export default App;
