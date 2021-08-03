import React,{Component} from 'react';
import fire from '../../fire.js';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCard.js';

// Bookmarks
import clearAllBookmarks from './clearAllBookmarks.js';
import markAllUnread from './markAllUnread.js';

import hideAllArticles from './hideAllArticles.js';
import updateBookmarkStyles from './updateBookmarkStyle.js';
import FilterOptions from '../filterOptions/filterOptions.js';
import NavBar from '../../navBar/navBar.js';
import markAllRead from './markAllRead.js';
import PageTitle from '../pageTitle/pageTitle.js';
import Footer from '../../footer/footer.js';

class Bookmarks extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullDatabaseCall:[],
            bookmarks:[],

                    // Card Size
        startingCardSize:"",
        // changedCardSize:{
        //     width: JSON.parse(localStorage.getItem("myData"))[0] || "250px",
        //     height: JSON.parse(localStorage.getItem("myData"))[1] || "300px"
        //     },
            // getArticleBy:localStorage.getItem("bookmarksFilterOption")


        }
        this.getCardSize = this.getCardSize.bind(this);
        // this.clearBookmarks = this.clearBookmarks.bind(this);
    }


    getCardSize(width,height){
        // console.log(width +" "+ height)
        this.setState({
            startingCardSize:{
                width:width,
                height:height
            }
        })
    }
    componentDidMount(){
        // console.log(JSON.parse(localStorage.getItem("myData"))[0])
        if(JSON.parse(localStorage.getItem("myData"))[0] === null){
            // console.log(JSON.parse(localStorage.getItem("myData"))[0])
        }


        // var cardSize = {}
        const cardSizeInStorage = JSON.parse(localStorage.getItem("myData"))
        if(cardSizeInStorage === null){
            // cardSize = ["260px","400px"]
            this.setState({changedCardSize:{
                width:"260px",
                height:"400px"
            }})
        }else{
            this.setState({changedCardSize:{
                width:cardSizeInStorage[0],
                height:cardSizeInStorage[1]
            }})
            // cardSize = [cardSizeInStorage[0], cardSizeInStorage[1]]
        }


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
      })  


        if(this.state.getArticleBy === undefined){
            this.setState({getArticleBy:localStorage.getItem("bookmarksFilterOption")})
        }

    }

    clearBookmarks(){
        clearAllBookmarks();
        this.setState({bookmarks:[]})
    }
    hideAllArticles(){
        hideAllArticles();
        this.setState({bookmarks:[]})
    }
    
    componentDidUpdate(){
        updateBookmarkStyles();
    }

    updateBookmarkCount(){ 
        // Update Bookmark count on removing/adding bookmarks
        const bookmarkArray = JSON.parse((localStorage.getItem("bookmarkArray"))) 
        var filterBookmarks = {}
        if(this.state.getArticleBy === "All"){
            // console.log("Filter By All")
            filterBookmarks = bookmarkArray.filter(x => x.bookmarked === true)
        }else{
            // console.log("Filter By Tag")
            filterBookmarks = bookmarkArray.filter(x => x.bookmarked === true && x.tag === this.state.getArticleBy)
        }
        this.setState({ bookmarksCount: filterBookmarks.length}) 
        // console.log(this.state.bookmarks)
    }

    // filterViews
    getFilteredArticles = (filteredByTag,getArticleBy,length) => {
        // console.log(filteredByTag)
        // console.log(getArticleBy)
        // console.log(length)
        this.setState({
            bookmarks: filteredByTag,
            getArticleBy:getArticleBy,
            bookmarksCount:length
        })
        
    }


    render(){


        localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))   
        
        const fullDatabaseCall = this.state.fullDatabaseCall
        const bookmarkCount = this.state.bookmarksCount;
        // console.log(bookmarkCount)
        return(

        <div id="bookmarkWrapper">


            <NavBar 
                    // Selecting buttons for navbar
                    filter={true} 
                    cardStyle={true} 
                    homeButtonOn={true}
                    pageTitle="Your Bookmarks"
                    // options={true} 
                    
                    // Bookmarks
                    fullDatabaseCall={fullDatabaseCall} 
                    getFilteredArticles = {this.getFilteredArticles}
                    bookmarked={true}
                    getArticleBy={this.state.getArticleBy}
                    // Bookmark UI
                    clearBookmarks={() => this.clearBookmarks()}
                    markAllUnread={() => markAllUnread()}
                    markAllRead={() => markAllRead()}
                    hideAllArticles={()=>this.hideAllArticles()}
                    bookmarkNumber={bookmarkCount || this.state.bookmarks.length}
                    // filter ui
                    bookmarkArray={this.state.bookmarks}



                    // Card Size
                    getCardSize={this.getCardSize}
            
            />
            {/* The Initial Render */}
            <FilterOptions fullDatabaseCall={fullDatabaseCall} getFilteredArticles={this.getFilteredArticles} bookmarked={true} />
            
            {/* <PageTitle pageTitle="BOOKMARKS"/> */}
            
            <div id="bookmarkItemsWrapper" onClick={()=>this.updateBookmarkCount()}>
                {this.state.bookmarks.length === 0 ?
                <p>You haven't bookmarked anything yet :(</p>
                :
                <RenderCard 
                    // Bookmarking
                    database={this.state.bookmarks} 
                    bookmarked={true}
                    // Hiding
                    hideBookmarkedArticle={true}
                    arrayFromDatabase={this.state.fullDatabaseCall}
                    fullDatabaseCall={this.state.fullDatabaseCall}
                    leftoverArticles={this.state.leftoverArticles}                    
                    // Custom Card Size
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    
                />
                }
            </div>
            {/* <Footer /> */}
            </div>
        )
    }
}

export default Bookmarks;