import React,{Component} from 'react';
import fire from '../../fire.js';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCardState.js';

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
        }
        this.getCardSize = this.getCardSize.bind(this);
        // this.clearBookmarks = this.clearBookmarks.bind(this);
    }


    getCardSize(width,height){
        this.setState({
            startingCardSize:{
                width:width,
                height:height
            }
        })
    }
    componentDidMount(){
        const cardSizeInStorage = JSON.parse(localStorage.getItem("myData"))
        if(cardSizeInStorage === null){
            this.setState({changedCardSize:{
                width:"260px",
                height:"400px"
            }})
        }else{
            this.setState({changedCardSize:{
                width:cardSizeInStorage[0],
                height:cardSizeInStorage[1]
            }})
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
    
    componentDidUpdate(){ updateBookmarkStyles(); }

    updateBookmarkCount(){ 
        // Update Bookmark count on removing/adding bookmarks
        const bookmarkArray = JSON.parse((localStorage.getItem("bookmarkArray"))) 

        var filterBookmarks = {}
        if(this.state.getArticleBy === "All"){
            filterBookmarks = bookmarkArray.filter(x => x.bookmarked === true)
            
        }else{
            filterBookmarks = bookmarkArray.filter(x => x.bookmarked === true && x.tag === this.state.getArticleBy)

        }


        this.setState({ bookmarksCount: filterBookmarks.length}) 
    }

    // filterViews
    getFilteredArticles = (filteredByTag,getArticleBy,length) => {
       
        this.setState({
            bookmarks: filteredByTag,
            getArticleBy:getArticleBy,
            bookmarksCount:length
        })
        
    }

    updateBookmarkStatus = (articles) => {
           const filterForBookmarks = articles.filter(x=>x.bookmarked === true)
           const filterChoice = localStorage.getItem("bookmarksFilterOption")
           const filteredArticles = filterForBookmarks.filter(x=> x.tag === filterChoice )
    
            if(filterChoice.includes("All")){
                this.setState({ bookmarks:filterForBookmarks })                
            }else{
                this.setState({ bookmarks:filteredArticles }) 
            }
        }

        updateReadStyles = () => {
            const renderToPage = this.state.bookmarks ;
            // console.log("UpdateReadStyles")
            var markArticleRead = renderToPage.map(el => {
                if(el.read === true && el != null )if( document.getElementById(el.id)){
                    document.getElementById(el.id).classList.add('markAsRead')
                }
                if(el.read === false && el != null )if( document.getElementById(el.id)){
                    document.getElementById(el.id).classList.remove('markAsRead')
                }
            });
        }

        updateHideStatus = (articles) =>{
            this.setState({bookmarks:articles})
        }
    render(){
        localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))   
        // console.log(this.state.bookmarks)
        const fullDatabaseCall = this.state.fullDatabaseCall
        const bookmarkCount = this.state.bookmarksCount;


        this.updateReadStyles()

        var cleanDatabaseCall = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.fullDatabaseCall
        var totalBookmarks = cleanDatabaseCall.filter(obj => obj.bookmarked === true);
        // console.log(totalBookmarks.length)

        return(

        <div id="bookmarkWrapper">


            <NavBar 
                    // Selecting buttons for navbar
                    filter={true} 
                    cardStyle={true} 
                    homeButtonOn={true}
                    options={true}
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
                    bookmarkNumber={totalBookmarks.length || this.state.bookmarks.length}
                    // filter ui
                    bookmarkArray={this.state.bookmarks}
                    getFilters = {bookmarkCount}
                    currentCardCount={totalBookmarks.length}
                    // Options
                    currentCardArray={this.state.bookmarks}
                    updateBookmarkStatus={this.updateBookmarkStatus}



                    // Card Size
                    getCardSize={this.getCardSize}
            
            />
            {/* The Initial Render */}
            <FilterOptions fullDatabaseCall={fullDatabaseCall} getFilteredArticles={this.getFilteredArticles} bookmarked={true} />
            
            {/* <PageTitle pageTitle="BOOKMARKS"/> */}
            
            <div id="bookmarkItemsWrapper" onClick={()=>this.updateBookmarkCount()}>
                {this.state.bookmarks.length === 0 ?
                    <div className="blankLoopMessage">
                        <h2>You don't have any bookmarks<br/></h2>
                        <span class="material-icons">auto_stories</span>
                        <p>Tips: You can create bookmarks by pressing the <span  class="material-icons" >turned_in_not</span> icon wherever you see it.</p>
                    </div>
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

                    updateBookmarkStatus={this.updateBookmarkStatus}
                    updateHideStatus={this.updateBookmarkStatus}
                    hideBookmarkedArticle={false}                    
                />
                }
            </div>
            {/* <Footer /> */}
            </div>
        )
    }
}

export default Bookmarks;