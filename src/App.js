import React, {Component} from 'react';

import './App.css';

import fire from './fire.js';
// import {Route, Redirect, Switch} from 'react-router-dom';

import Header from './header/header.js';
// import Footer from './footer/footer.js';
// import DeploymentMessage from './deployment-message/deploymentmessage.js';
import { Routes } from './routes/routes';




class App extends Component {

  constructor(props){
    super(props);
    this.state = {fullDatabaseCall:[], }
}

componentDidMount(){
  const cleanDB = fire.database().ref('items').orderByKey().limitToFirst(97);  
  cleanDB.on('value', (snapshot) => {
      let newsItems = snapshot.val();
      // console.log(newsItems);
      let newState = [];
      for(let newsItem in newsItems){
          newState.push({
              key: newsItem,
              hidden:newsItems[newsItem].hidden,
              author: newsItems[newsItem].author,
              title: newsItems[newsItem].title,
              likes: newsItems[newsItem].likes,
              dislikes: newsItems[newsItem].dislikes,
              id:newsItems[newsItem].id,
              tag:newsItems[newsItem].tag,
              text:newsItems[newsItem].text
          });
          // console.log(newState)
      }
      this.setState({fullDatabaseCall: newState})    

  })  
  localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))      
  console.log(this.state.fullDatabaseCall)
}


  render(){
    
    console.log("Render App!")
    return(
      <div>
        {/* <h1>the Knews - Live</h1> */}

      {/* <DeploymentMessage /> */}
      
      <Header />
      <Routes />
      {/* <Footer /> */}
        
      </div>
    )
  }
}

export default App;
