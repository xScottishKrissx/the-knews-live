import React, {Component} from 'react';

import './App.css';


// import {Route, Redirect, Switch} from 'react-router-dom';

import Header from './header/header.js';
// import Footer from './footer/footer.js';
import DeploymentMessage from './deployment-message/deploymentmessage.js';
import { Routes } from './routes/routes';




class App extends Component {



  render(){
    return(
      <div>
        {/* <h1>the Knews - Live</h1> */}

      <DeploymentMessage />
      
      <Header />
      <Routes />
      {/* <Footer /> */}
        
      </div>
    )
  }
}

export default App;
