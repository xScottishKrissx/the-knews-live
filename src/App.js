import React, {Component} from 'react';

import './App.css';

import fire from './fire.js';
// import {Route, Redirect, Switch} from 'react-router-dom';

import Header from './header/header.js';
// import Footer from './footer/footer.js';
import DeploymentMessage from './deployment-message/deploymentmessage.js';
import { Routes } from './routes/routes';
import OptionsMenu from './utility_components/optionsMenu/optionsMenu';

import {Helmet} from 'react-helmet';

import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {

  constructor(props){
    super(props);
    this.state = {fullDatabaseCall:[], }
}

componentDidMount(){
  
  // console.log("App.js Mounted")
  const cleanDB = fire.database().ref('items').orderByKey().limitToFirst(97);  
  // Main Database Call
  cleanDB.on('value', (snapshot) => {
    let dbObjects = snapshot.val();
    let newState = [];
    for (let dbObject in dbObjects){
      newState.push({
        author: dbObjects[dbObject].author,
        bookmarked: dbObjects[dbObject].bookmarked,
        dislikes:dbObjects[dbObject].dislikes,
        disliked:dbObjects[dbObject].disliked,
        email:dbObjects[dbObject].email,
        hidden:dbObjects[dbObject].hidden,
        id:dbObjects[dbObject].id,
        key:dbObject,
        likes:dbObjects[dbObject].likes,
        liked:dbObjects[dbObject].liked,
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
handleClick(){
  console.log("Undo")
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
        <button onClick={() => this.handleClick()}>Undo</button>
      </div>

      <Helmet>
        <title>Home | theKnews | christopherdunne.co.uk </title>
        {/* This might not work until it's on the server. */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nytimesbits" />
        <meta name="twitter:creator" content="@nickbilton" />
        <meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
        <meta property="og:title" content="A Twitter for My Sister" />
        <meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
        <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />
      </Helmet>

      {/* <Header /> */}
      <Routes />
      {/* <OptionsMenu urlInfo={window.location.pathname}/> */}
      {/* <Footer /> */}
        
      </div>
    )
  }
}

export default App;
