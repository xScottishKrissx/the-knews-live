import React,{Component} from 'react';
import fire from '../../fire.js';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCard.js';

import CustomCardSize from '../custom-tile-size/custom-card-sizeV2.js';
// Bookmarks
import clearAllBookmarks from './clearAllBookmarks.js';
import markAllUnread from './markAllUnread.js';

import hideAllArticles from './hideAllArticles.js';
import updateBookmarkStyles from './updateBookmarkStyle.js';
import FilterOptions from '../filterOptions/filterOptions.js';
import NavBar from '../../navBar/navBar.js';
import { database } from 'firebase';
import markAllRead from './markAllRead.js';


class Bookmarks extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullDatabaseCall:[],
            bookmarks:[],

                    // Card Size
        startingCardSize:"",
        changedCardSize:{
            width: JSON.parse(localStorage.getItem("myData"))[0] ,
            height: JSON.parse(localStorage.getItem("myData"))[1]
            },
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
        
        // the issue with navbar filtering is here...
        // console.log(database)
        // if(database === null){
        //     this.setState({bookmarks:[],})
        // }else{
        //     const getBookmarks = database.filter(obj => obj.bookmarked === true && obj.tag === localStorage.getItem("bookmarksFilterOption") ) 
        //     this.setState({bookmarks:getBookmarks})
        // }

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
        // console.log("update")
        // console.log(this.state.bookmarks.length)
        // console.log(localStorage.getItem("bookmarkLength"))
    }

    updateBookmarkCount(){ 
        // Update Bookmark count on removing/adding bookmarks
        const bookmarkArray = JSON.parse((localStorage.getItem("bookmarkArray"))) 
        var filterBookmarks = {}
        if(this.state.getArticleBy === "All"){
            console.log("Filter By All")
            filterBookmarks = bookmarkArray.filter(x => x.bookmarked === true)
        }else{
            console.log("Filter By Tag")
            filterBookmarks = bookmarkArray.filter(x => x.bookmarked === true && x.tag === this.state.getArticleBy)
        }
        this.setState({ bookmarksCount: filterBookmarks.length}) 
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
        const fullDatabaseCall = this.props.location.state.fullDatabaseCall
        
        const bookmarkCount = this.state.bookmarksCount || this.state.bookmarks.length;
        return(
        <div id="bookmarkWrapper">



            {/* After Render*/}
            <NavBar filter={true} cardStyle={true} liteKnews={false} bookmarks={false} options={true}
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
                    bookmarkNumber={this.state.bookmarksCount || this.state.bookmarks.length}



                    // Card Size
                    getCardSize={this.getCardSize}
            
            />
            {/* The Initial Render */}
            <FilterOptions fullDatabaseCall={fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles} bookmarked={true} />

           
            <div id="bookmarksHeader">
                <h1><span class="material-icons">bookmarks</span>Bookmarks</h1> 
                {this.state.getArticleBy === "All" ? 
                    <span>You have {bookmarkCount} items to read across all tags</span>
                    :
                    <span>You have {bookmarkCount} items to read in {this.state.getArticleBy}</span>
                }
                <hr/>
            </div> 
            
            
            

            
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
            
            </div>
        )
    }
}

export default Bookmarks;