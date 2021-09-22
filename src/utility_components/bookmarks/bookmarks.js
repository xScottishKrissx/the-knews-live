import React,{Component} from 'react';
import fire from '../../fire.js';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCardState.js';

import FilterOptions from '../filterOptions/filterOptions.js';
import NavBar from '../../navBar/navBar.js';
import getCardStyle from '../cardStyle/getCardStyle.js';


class Bookmarks extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullDatabaseCall:[],
            bookmarks:[],
            // Card Size
            startingCardSize:"",
            changedCardSize:{
                width: getCardStyle()[0],
                height: getCardStyle()[1]
            },
        }
        this.getCardSize = this.getCardSize.bind(this);
        // this.clearBookmarks = this.clearBookmarks.bind(this);
    }


    getCardSize = (width,height) =>{
        this.setState({
            startingCardSize:{
                width:width,
                height:height
            }
        })
    }
    componentDidMount(){
        // console.log("Mount")

        //     const cleanDB = fire.database().ref('items').orderByKey().limitToFirst(97);  
        //     // Main Database Call
        //   cleanDB.on('value', (snapshot) => {
        //     let dbObjects = snapshot.val();
        //     let newState = [];
        //     for (let dbObject in dbObjects){
        //       newState.push({
        //         author: dbObjects[dbObject].author,
        //         bookmarked: dbObjects[dbObject].bookmarked,
        //         dislikes:dbObjects[dbObject].dislikes,
        //         email:dbObjects[dbObject].email,
        //         hidden:dbObjects[dbObject].hidden,
        //         markedforhide:dbObjects[dbObject].markedforhide,
        //         id:dbObjects[dbObject].id,
        //         key:dbObject,
        //         likes:dbObjects[dbObject].likes,
        //         liked:dbObjects[dbObject].liked,
        //         postdate:dbObjects[dbObject].postdate,
        //         read: dbObjects[dbObject].read,
        //         tag:dbObjects[dbObject].tag,
        //         text:dbObjects[dbObject].text,
        //         title:dbObjects[dbObject].title,
            
        //       })
        //     }
        //       this.setState({
        //         fullDatabaseCall: newState,
        //           articlesArray: newState.slice(0,30),
                
        //         })    
        //   })  
 
        if(this.state.getArticleBy === undefined){
            this.setState({getArticleBy:localStorage.getItem("bookmarksFilterOption")})
        }

    }
    
    componentDidUpdate(){ 
        this.updateReadStyles()
     }

    updateBookmarkCount(){ 
        // Update Bookmark count on removing/adding bookmarks
        const bookmarkArray = JSON.parse((localStorage.getItem("changedFullDatabaseCall"))) 

        let filterBookmarks = {}
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
        let markArticleRead = renderToPage.map(el => {
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

    renderMessage(filterRead){
        if(this.state.bookmarks.length > 0){ 
            return (
                    <div className="blankLoopMessage">
                        <h2>You don't have any unread bookmarks<br/></h2>
                        <span class="material-icons">auto_stories</span>
                        <p>Tips: You can show/hide you're already read cards from the <span className="material-icons">settings</span> options menu</p>
                    </div>
            )
        }

        if(filterRead.length === 0){
            return (
                <div className="blankLoopMessage">
                    <h2>You don't have any bookmarks<br/></h2>
                    <span class="material-icons">auto_stories</span>
                    <p>Tips: You can create bookmarks by pressing the <span class="material-icons" >turned_in_not</span> icon wherever you see it.</p>
                </div>
            )
        }
    }

    render(){
        localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))   

        const fullDatabaseCall = this.state.fullDatabaseCall
        const bookmarkCount = this.state.bookmarksCount;
      
        const cleanDatabaseCall = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.fullDatabaseCall
        const totalBookmarks = cleanDatabaseCall.filter(obj => obj.bookmarked === true);

        // Show / Hide Read articles
        const getShowReadArticlesChoice = localStorage.getItem("showReadCards") || "Show"
        let filterRead;
        if(getShowReadArticlesChoice === "Show")filterRead = this.state.bookmarks
        if(getShowReadArticlesChoice === "Hide")filterRead = this.state.bookmarks.filter(x => x.read === false)

        

        this.updateReadStyles()

        // console.log(filterRead)
        // console.log(this.state.bookmarks)
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
                    hideAllArticles={()=>this.hideAllArticles()}
                    bookmarkNumber={totalBookmarks.length || this.state.bookmarks.length}
                    // filter ui
                    bookmarkArray={filterRead}
                    getFilters = {bookmarkCount}
                    currentCardCount={totalBookmarks.length}
                    // Options
                    currentCardArray={filterRead}
                    updateBookmarkStatus={this.updateBookmarkStatus}

                    // Card Size
                    getCardSize={this.getCardSize}
            
            />

            {/* The Initial Render */}
            <FilterOptions fullDatabaseCall={fullDatabaseCall} getFilteredArticles={this.getFilteredArticles} bookmarked={true} />
                        
            <div id="bookmarkItemsWrapper" onClick={()=>this.updateBookmarkCount()}>
            {/* {this.props.databaseProp.length >= 1 && checkArticlesExist && renderToPage.length > 0 ?  */}
                {filterRead.length > 0 ?

                    <RenderCard 
                        // Bookmarking
                        database={filterRead.reverse()} 
                        bookmarked={true}
                        // Hiding
                        hideBookmarkedArticle={true}
                        arrayFromDatabase={this.state.fullDatabaseCall}
                        fullDatabaseCall={this.state.fullDatabaseCall}                 
                        // Custom Card Size
                        startingCardSize={this.state.startingCardSize}
                        changedCardSize={this.state.changedCardSize}

                        updateBookmarkStatus={this.updateBookmarkStatus}
                        updateHideStatus={this.updateBookmarkStatus}
                        hideBookmarkedArticle={false}                    
                    />
                :
                    this.renderMessage(filterRead)                    
                }
               
                
            </div>

            </div>
        )
    }
}

export default Bookmarks;