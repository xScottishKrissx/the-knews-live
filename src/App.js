import React, {Component} from 'react';
import './App.css';
import fire from './fire.js'
// import {Route, Redirect, Switch} from 'react-router-dom';
import Header from './header/header.js';
// import Footer from './footer/footer.js';
// import DeploymentMessage from './deployment-message/deploymentmessage.js';

import { Routes } from './routes/routes';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        articlesArray: [],
        postsArray:[],
        hiddenPosts:localStorage.getItem("hiddenPostList"),
        leftoverArticles:[],
        fullDatabaseCall:[]
    }
}
componentDidMount(){    

    // This is retrieving a list of id's relating to posts hidden which is stored in local cache.
    if(localStorage.getItem("hiddenPostList") === null){
        this.setState({
            postsArray:[]
        }) 
    }else{
        this.setState({
            postsArray:[localStorage.getItem("hiddenPostList").split(',').map(Number)]
        })
    }    
    const dbRef = fire.database().ref('items').orderByKey().limitToFirst(100);    
    dbRef.on('value', (snapshot) => {
        let articles = snapshot.val();
        let newState = [];
        for(let item in articles){
            newState.push({
                key: item,  author: articles[item].author,
                title: articles[item].title,
                id:articles[item].id,
                tag:articles[item].tag,
                email:articles[item].email,
                text: articles[item].text,
                likes: articles[item].likes,
                dislikes: articles[item].dislikes,
                postdate: articles[item].postdate,
            });
        }
        this.setState({
          //Set's the initial number of articles loaded into home.
          articlesArray: newState.slice(0,30),
          leftoverArticles: newState.slice(30,97),
          fullDatabaseCall: newState
      })
    })
}

componentWillUnmount(){
    fire.database().ref("items").off();
    localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
}

render(){
  console.log("Render App.js")
  
  localStorage.setItem("unchangedFullDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))
  const arrayWithArticlesHidden = JSON.parse(localStorage.getItem("editedArticleArray"));
  console.log(this.state.articlesArray)
  // console.log(this.state.fullDatabaseCall)
  console.log(arrayWithArticlesHidden)
  return(
    <div>
      {/* <h1>the Knews - Live</h1> */}
      {/* <DeploymentMessage /> */}
    
      <Header 
        databaseProp={arrayWithArticlesHidden || this.state.articlesArray} 
        leftoverArticles={this.state.leftoverArticles} />
      <Routes 
        databaseProp={arrayWithArticlesHidden || this.state.articlesArray} 
        leftoverArticles={this.state.leftoverArticles} 
      />
        {/* <Footer /> */}
        
    </div>
    )
  }

  }
         
export default App;