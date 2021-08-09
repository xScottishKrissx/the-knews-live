import React from 'react';
import {Redirect} from 'react-router-dom';
import fire from '../../fire.js'

import './news-page-view.css';
import NavBar from '../../navBar/navBar';
import HeaderImage from '../../utility_components/header-image/header-image.js';
import ArticleArea from './article-area/article-area.js';
import ScrollToTopButton from '../../utility_components/scrollToTop/scrollToTop.js';
import OnCardBookMarkControls from '../../utility_components/bookmarks/onCardBookmarkControls.js';
import MarkAsRead from '../../utility_components/bookmarks/markAsRead.js';
import HandleLike from '../../utility_components/handleSocialScore/handleLike.js';
import RecReading from './recommended-reading/recReading.js';
import NextArticle from './nextArticle.js';

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

    componentWillUnmount(){
        // console.log("Unmount on practice-form.js")
        fire.database().ref("items").off();     
      }


      handleHideClick =(bookmarked,markedforhide) => {
        this.setState({showBox:bookmarked})      
        // if(bookmarked === false)this.setState({showHideMessage:true})

        console.log(markedforhide)

        // Next Step of undoing hide
        if(markedforhide === true)console.log("Unhide Article On Click")
        if(markedforhide === false)console.log("Hide Article On Click")
      }

      updateArticle =(x) => {
        // console.log("Update Bookmark" + x)
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        this.props.updateArticle(articles)
      }

      confirmHide(id){
        // console.log("Confirm Hide!! :)")

        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        // console.log(articles)
        var hideArticle = articles.map(el => {
            if(el.id === id && el.bookmarked === true && el != null )
                // return Object.assign({}, el, {hidden:false})
                return Object.assign({}, el, {hidden:true})
                return el
        });
        // console.log(hideArticle)
        // localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
        this.setState({showBox:false})
        // this.setState({showHideMessage:true})
        
      }
      cancelHide(){
        this.setState({showBox:false})
      }
    render(){
      
      

      // console.log("Render news-page-view.js")
      window.scrollTo(0,0);

        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.database
        // const database = this.props.database
        // const database = this.props.database
        console.log(database)
        // console.log(this.props.params)
        const id = parseInt(this.props.params)
        const getArticle = database.filter(obj => obj.id === id)
        //  console.log(getArticle)
        const NewsPageView = getArticle.map((value) => {
            // console.log(value.likes)
            //console.log("current author email:: " + value.email)
            
            // console.log(value.liked + " " + value.disliked)

            MarkAsRead(value.id, false)
            // console.log(this.state.showBox)
            // console.log(value.bookmarked)
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

                    hidePressed={()=>this.handleHideClick(value.bookmarked,value.markedforhide)}
                    updateArticle={this.updateArticle}
                  />
                    
                    
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

                        {/* <h1>Header Image</h1> */}
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
                        showHideInfo={this.state.showHideMessage}
                       
                    />
                    {this.state.showBox === true ? 
                                        <div className="confirmHide" >
                                        <div >
                                            <h3>Confirm Hide</h3>
                                            <p>This article is bookmarked, hide anyway?</p>
                                            <div>
                                                <span onClick={()=>this.confirmHide(value.id)}>Confirm</span>
                                                <span onClick={()=>this.cancelHide()}>Cancel</span>
                                            </div>
                                        </div>
                                      </div>
                                      :
                                      null}
                    {/* <NextArticle id={value.id} database={database}/> */}
                    {/* <RecReading fullDatabaseCall={database}/>                     */}
                    <ScrollToTopButton  />   
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





    



