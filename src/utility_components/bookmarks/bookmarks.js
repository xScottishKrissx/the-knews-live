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

    // clearBookmarks(){
    //     clearAllBookmarks();
    //     this.setState({bookmarks:[]})
    // }
    // hideAllArticles(){
    //     hideAllArticles();
    //     this.setState({bookmarks:[]})
    // }
    
    componentDidUpdate(){
        updateBookmarkStyles();
    }

    // filterViews
    getFilteredArticles = (filteredByTag,getArticleBy) => {
        console.log(filteredByTag)
        console.log(getArticleBy)
        this.setState({
            bookmarks: filteredByTag,
            getArticleBy:getArticleBy,
        })
        
    }

    render(){
        localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))   
        const fullDatabaseCall = this.props.location.state.fullDatabaseCall
        
        return(
            <div id="bookmarkWrapper">
            {/* After Render*/}
            <NavBar filter={true} cardStyle={true} liteKnews={false} bookmarks={false} options={true}
                    // fullDatabaseCall={fullDatabaseCall} 
                    getFilteredArticles = {this.getFilteredArticles}
                    bookmarked={true}
                    getArticleBy={this.state.getArticleBy}
                    getCardSize={this.getCardSize}
            
            />
            {/* The Initial Render */}
            <FilterOptions fullDatabaseCall={fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles} bookmarked={true} />
            <h1>Bookmarks</h1>
          
            <p>You have {this.state.bookmarks.length} items to read.</p>
            
            {/* <button onClick={() => this.clearBookmarks()}>Clear All Bookmarks</button>
            <button onClick={() => markAllUnread()}>Mark All As Unread</button>
            <br/>
            <button onClick={() => this.hideAllArticles()}>Hide All Articles</button> */}

            

            
            <div id="bookmarkItemsWrapper">
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