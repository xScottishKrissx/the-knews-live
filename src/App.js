import React, {Component} from 'react';

import './App.css';

import fire from './fire.js';
// import {Route, Redirect, Switch} from 'react-router-dom';

import Header from './header/header.js';
// import Footer from './footer/footer.js';
// import DeploymentMessage from './deployment-message/deploymentmessage.js';
import { Routes } from './routes/routes';
import OptionsMenu from './utility_components/optionsMenu/optionsMenu';




class App extends Component {

  constructor(props){
    super(props);
    this.state = {fullDatabaseCall:[], }
}

componentDidMount(){
  
  // console.log("App.js Mounted")
  const cleanDB = fire.database().ref('items').orderByKey().limitToFirst(97);  
  cleanDB.on('value', (snapshot) => {
    let dbObjects = snapshot.val();
    let newState = [];
    for (let dbObject in dbObjects){
      newState.push({
        author: dbObjects[dbObject].author,
        bookmarked: dbObjects[dbObject].bookmarked,
        dislikes:dbObjects[dbObject].dislikes,
        email:dbObjects[dbObject].email,
        hidden:dbObjects[dbObject].hidden,
        id:dbObjects[dbObject].id,
        key:dbObject,
        likes:dbObjects[dbObject].likes,
        postdate:dbObjects[dbObject].postdate,
        read: dbObjects[dbObject].read,
        tag:dbObjects[dbObject].tag,
        text:dbObjects[dbObject].text,
        title:dbObjects[dbObject].title,
       
      })
    }
      this.setState({fullDatabaseCall: newState})    
      // console.log(this.state.fullDatabaseCall)
  })  
  localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))      
}


  render(){
    
    // console.log("Render App!")
    // console.log(window.location.pathname)
    return(
      <div>
        {/* <h1>the Knews - Live</h1> */}

      {/* <DeploymentMessage /> */}

      <div id="hideArticleMessageWrapper">
        <p id="hideArticleMessage">You have hidden an article. It will not appear again until you reset the page using <span className="material-icons">restart_alt</span> at the top right of page</p>
      </div>
      
      <Header />
      <Routes />
      <OptionsMenu urlInfo={window.location.pathname}/>
      {/* <Footer /> */}
        
      </div>
    )
  }
}

export default App;
