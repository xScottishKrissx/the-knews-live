import React from 'react';
import {Redirect} from 'react-router-dom';
import fire from '../../fire.js'

import './news-page-view.css';
import NavBar from '../../navBar/navBar';
import HeaderImage from '../../utility_components/header-image/header-image.js';
import ArticleArea from './article-area/article-area.js';
import ScrollToTopButton from '../../utility_components/scrollToTop/scrollToTop.js';
import OnCardBookMarkControls from '../../utility_components/bookmarks/onCardBookmarkControls.js';
import MarkAsRead from '../../utility_components/bookmarks/markAsReadV2.js';
import HandleLike from '../../utility_components/handleSocialScore/handleLike.js';
import RecReading from './recommended-reading/recReading.js';
import NextArticle from './nextArticle.js';


import Button from 'react-bootstrap/esm/Button';

import {Helmet} from 'react-helmet';

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
              disliked:dbObjects[dbObject].disliked,
              email:dbObjects[dbObject].email,
              hidden:dbObjects[dbObject].hidden,
              markedforhide:dbObjects[dbObject].markedforhide,
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

    componentDidMount(){
      document.addEventListener("keyup", this.controls, false);
    }
    componentWillUnmount(){ fire.database().ref("items").off(); }

    // Used to update the article array with the latest bookmark status
    updateArticle = () => {
      const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
      this.props.updateArticle(articles)
    }

    // Shows the confirmation box if attempting to hide a bookmarked article
    handleHideClick = (bookmarked) => { 
      this.setState({showBox:bookmarked})
      console.log("Show box")
      console.log(this.state.showBox)
    }

    // The confirmation box itself.
    handleHideBookmarkedArticle(id,x){
      console.log(x)
      const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
      var hideArticle = articles.map(el => {
          if(el.id === id && el.bookmarked === true && el != null )
              return Object.assign({}, el, {hidden:x, markedforhide:x})
              return el
      });
      this.setState({showBox:false})
      localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
      this.props.updateArticle(hideArticle)
    }

    markAsRead(id,markAs){
      MarkAsRead(id,markAs)
      if(this.props.updateProp)this.props.updateProp(markAs)      
    }

    controls = (event) => {
      // Escape
      if(event.keyCode === 27 )this.setState({exit:true})
      }

    render(){
        window.scrollTo(0,0);

        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.database
        // console.log(database)
        const id = parseInt(this.props.params)
        const getArticle = database.filter(obj => obj.id === id)
        const setRandomColour = JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"};
        const NewsPageView = getArticle.map((value) => {


            this.markAsRead(value.id,value.readStatus)
            return(
              
                <div className='news-page-wrapper' key={value.id}> 

                    <Helmet>
                      <title>{value.title} | theKnews | christopher dunne</title>
                      <meta property="og:type" content="website"></meta>
                      <meta property="og:url" content={"https://christopherdunne.co.uk/theKnews/home/articles/news-page/" + value.id} />
                      <meta property="og:title" content={value.title} />
                      <meta property="og:description" content="Welcome to theKnews" />
                      <meta property="og:image" content="https://christopherdunne.co.uk/wp-content/uploads/2021/06/IMG_20180405_135532.jpg" />

                    </Helmet>


                    <NavBar 
                    // Menu Config
                    score={true} 
                    bookmarkControls={true}
                    bookmarks={true}
                    homeButtonOn={true}
                    hideButtonSwitching={true}

                    // Handle Like
                    id={value.id} 
                    likes={value.likes}
                    dislikes={value.dislikes} 
                    databaseId={value.key} 
                    liked={value.liked}
                    disliked={value.disliked}

                    // bookmarkControls
                    bookmarkedStatus={value.bookmarked}
                    fullDatabaseCall={this.state.fullDatabaseCall}
                    id={value.id}
                    readStatus={value.read}
                    showMarkAsReadButton={false}
                    arrayFromDatabase={this.state.articlesArray}
                    leftoverArticles={this.state.leftoverArticles}
                    fullDatabaseCall={this.state.fullDatabaseCall}

                    hideStatus={value.markedforhide}

                    hidePressed={()=>this.handleHideClick(value.bookmarked)}
                    updateArticle={this.updateArticle}
                  />
                    
                  <div style={setRandomColour} id="articleLine"></div>
                  {/* Header Image */}
                  <div className='article-banner-image-wrapper'>
                      <HeaderImage 
                        props={value.id} 
                        headline={value.title} 
                        author={value.author} 
                        postdate={value.postdate} 
                        tag={value.tag}
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
                        showHideInfo={value.markedforhide}
                       
                    />

                    {/* Show hide article dialogue box */}
                    
                     {this.state.showBox === true ? 
                      <div className="hideArticleDialogueBox" >

                          {value.markedforhide === false ? 
                            <div id="confirmHideBox">
                              <h3>Hide Article?</h3>
                              <p>This article is bookmarked, hide anyway?</p>
                              <div id="confirmHideButtons">                            
                                  <Button onClick={()=>this.handleHideBookmarkedArticle(value.id,true)} variant="outline-dark">Yes</Button>                          
                                  <Button onClick={()=>this.handleHideBookmarkedArticle(value.id,false)} variant="outline-dark">No</Button>
                              </div>
                              <p>Pressing "Yes" will remove the article from your feed. It will not be visible until you reset the website using the full website reset option, or by using the unhide button at the top of this page.</p>
                            </div>
                          :
                            <div id="cancelHideBox">
                              <h3>Cancel Hide?</h3>
                              <div id="cancelHideButtons">
                                <Button onClick={()=>this.handleHideBookmarkedArticle(value.id,false)} variant="outline-dark">Yes</Button>
                                <Button onClick={()=>this.handleHideBookmarkedArticle(value.id,true)} variant="outline-dark">No</Button>
                              </div>
                              <p>Pressing "Yes" will restore this article to your feed.</p>
                            </div>
                          }


                        </div>

                    :
                    null
                    } 
                    
                    

                    {/* <NextArticle id={value.id} database={database}/> */}
                    {/* <RecReading fullDatabaseCall={database}/>                     */}
                    <ScrollToTopButton  />   
                </div>
            )
        })
        return (
            
            <div>

                
                {/* <NavControls currentarticleid={this.props.params} arrayFromDatabase={this.state.articlesArray}/> */}
                
                {this.props.params === "5" || this.state.exit === true ? 
                <Redirect to='/theKnews/home' />
                :  
                NewsPageView
                }
                             
            </div>
        )

    }
    
}
export default NewsPageVIEW;





    



