import React from 'react';
import {Redirect} from 'react-router-dom';

import HeaderImage from '../../utility_components/header-image/header-image.js';
import ArticleArea from './article-area/article-area.js';


import ScrollToTopButton from '../../utility_components/scrollToTop/scrollToTop.js';
import NavControls from '../../utility_components/navControls/navControls.js';
import RecommendedReading from './social/recommended-reading/recommended-reading.js';

import './news-page-view.css';
import fire from '../../fire.js'
import InArticleBookmark from './article-area/inArticleBookmark.js';
import OnCardBookMarkControls from '../../utility_components/bookmarks/onCardBookmarkControls.js';
import MarkAsRead from '../../utility_components/bookmarks/markAsRead.js';
import HandleLike from '../../utility_components/handleSocialScore/handleLike.js';

export class NewsPageVIEW extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            fullDatabaseCall:[],
            
        }
    }
    componentDidMount(){
      
        // this.setState({ownsArticle: false})

        const dbRef = fire.database().ref("items").orderByKey();   
        // Main Database Call
        dbRef.on('value', (snapshot) => {
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
              liked:dbObjects[dbObject].liked,
              postdate:dbObjects[dbObject].postdate,
              read: dbObjects[dbObject].read,
              tag:dbObjects[dbObject].tag,
              text:dbObjects[dbObject].text,
              title:dbObjects[dbObject].title,
             
            })
          }
          
          this.setState({
            fullDatabaseCall: newState,
            articlesArray: newState.slice(0,30),
            leftoverArticles: newState.slice(30,97)
          })
 
          
          // Check if User is Logged In...
          // const checkUser = fire.auth().currentUser;
  
          // If they Exist Check to see if they have already created article
          // if(checkUser){
          //   console.log(checkUser.email);
          //   if(checkUser.email === "chrisdunne66@gmail.com"){
          //       this.setState({ownsArticle: true})
          //   }
          // //... if they haven't then don't do anything.
          // }else{
          //   console.log("Not Logged In")
          // }
        })
    }

    componentWillUnmount(){
        // console.log("Unmount on practice-form.js")
        fire.database().ref("items").off();     
      }
    render(){
      // console.log("Render news-page-view.js")

        
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.database
        console.log(database)
        const getArticle = database.filter(obj => obj.id === this.props.articleId)
       console.log(getArticle)
        const NewsPageView = getArticle.map((value) => {
            // console.log(value.likes)
            //console.log("current author email:: " + value.email)
            
            
            MarkAsRead(value.id, false)
            return(
              
                <div className='news-page-wrapper' key={value.id}> 
                    {/* Header Image */}
                    <div className='article-banner-image-wrapper'>
                        {/* <HeaderImage props={value.id} /> */}
                        <h1>Header Image</h1>
                    </div>
                    <HandleLike id={value.id} likes={value.likes} dislikes={value.dislikes} databaseId={value.key} liked={value.liked}/>
                    {/* Bookmark Controls */}
                    <div id="bookmarkControls">
                      <OnCardBookMarkControls                         
                        bookmarkedStatus={value.bookmarked}
                        fullDatabaseCall={this.state.fullDatabaseCall}
                        id={value.id}
                        readStatus={value.read}
                        showMarkAsReadButton={false}

                        // hiding
                        arrayFromDatabase={this.state.articlesArray}
                        leftoverArticles={this.state.leftoverArticles}
                        fullDatabaseCall={this.state.fullDatabaseCall}
                      />
                    </div>
                   
                   {/* Header, Sub Title and Body of Article */}
                    <ArticleArea 
                        title={value.title}
                        tag={value.tag}
                        postdate={value.postdate}
                        author={value.author}
                        text={value.text}
                        likes={value.likes}
                        dislikes={value.dislikes}
                        id={value.key}
                        articleId={value.id}
                        email={value.email}
                        owns={this.state.ownsArticle}

                        // Bookmarking
                        bookmarked={value.bookmarked}
                        read={value.read}

                        //Hiding
                        arrayFromDatabase={this.state.articlesArray}
                        leftoverArticles={this.state.leftoverArticles}
                        fullDatabaseCall={this.state.fullDatabaseCall}
                       
                    />
                    
                    <RecommendedReading />
                    <ScrollToTopButton />   
                </div>
            )
        })
        return (
            
            <div>

                
                {/* <NavControls currentarticleid={this.props.params} arrayFromDatabase={this.state.articlesArray}/> */}
                
                {this.props.params === "5" ?
                
                <Redirect to='/home' />
                :  
                NewsPageView
                }
                             
            </div>
        )

    }
    
}
export default NewsPageVIEW;





    



