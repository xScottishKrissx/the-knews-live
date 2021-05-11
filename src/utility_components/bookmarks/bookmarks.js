import React,{Component} from 'react';
import fire from '../../fire.js';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCard.js';

import CustomCardSize from '../custom-tile-size/custom-card-sizeV2.js';
// Bookmarks
import clearAllBookmarks from './clearAllBookmarks.js';
import markAllUnread from './markAllUnread.js';

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
        }
        this.getCardSize = this.getCardSize.bind(this);
        this.clearBookmarks = this.clearBookmarks.bind(this);
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
              // console.log("App.js Mounted")
      const cleanDB = fire.database().ref('items').orderByKey().limitToFirst(97);  
      cleanDB.on('value', (snapshot) => {
          let newsItems = snapshot.val();
          // console.log(newsItems);
          let newState = [];
          for(let newsItem in newsItems){
              newState.push({
                  key: newsItem,
                  bookmarked:newsItems[newsItem].bookmarked,
                  read:newsItems[newsItem].read,
                  hidden:newsItems[newsItem].hidden,
                  author: newsItems[newsItem].author,
                  title: newsItems[newsItem].title,
                  likes: newsItems[newsItem].likes,
                  dislikes: newsItems[newsItem].dislikes,
                  id:newsItems[newsItem].id,
                  tag:newsItems[newsItem].tag,
                  text:newsItems[newsItem].text
              });
              // console.log(newState)
          }
          this.setState({
            fullDatabaseCall: newState,
              articlesArray: newState.slice(0,30),
              leftoverArticles: newState.slice(30,97)
              
            })    
        //   console.log(this.state.fullDatabaseCall)
      })  

        const database = 
            JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || 
            JSON.parse(localStorage.getItem("bookmarkArray")) // Don't think this is necessary.
        // console.log(database)

        if(database === null){
            this.setState({bookmarks:[]})
        }else{
            const getBookmarks = database.filter(obj => obj.bookmarked === true && obj.hidden === false) 
            console.log(getBookmarks)
            this.setState({bookmarks:getBookmarks})
        }

    }
    clearBookmarks(){
        clearAllBookmarks();
        this.setState({bookmarks:[]})
    }
    
    componentDidUpdate(){
        const bookmarks = JSON.parse(localStorage.getItem("bookmarkArray")) 
        // console.log(bookmarks)
        // console.log(this.state.toggle)
        if(bookmarks){
            const markAsBookmark = bookmarks.filter(obj => obj.bookmarked === true || obj.read === true)

            var thing = markAsBookmark.map(el => {
                // console.log(el.id)
                if(el.read === true && el != null )

                    if(document.getElementById(el.id)){
                        document.getElementById(el.id).classList.add('markAsRead')
                    }

                    if(el.bookmarked === true && el != null){
                        if(document.getElementById(el.id)){
                            document.getElementById(el.id + "bookmarkIcon").classList.add('bookmarkStyle')
                            // document.getElementById(el.id).classList.remove('markAsRead')
                        }
                    }

                });
                
        }

    }
    render(){
        localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))   
        // console.log(JSON.parse(localStorage.getItem("changedFullDatabaseCall")))

        return(
            <div id="bookmarkWrapper">
            <h1>Bookmarks</h1>
            <p>You have bookmarked {this.state.bookmarks.length} items. Enjoy</p>
            <button onClick={() => this.clearBookmarks()}>Clear All Bookmarks</button>
            <button onClick={() => markAllUnread()}>Mark All As Unread</button>

            <CustomCardSize getCardSizeToParent={this.getCardSize} />
            <div id="bookmarkItemsWrapper">
                {this.state.bookmarks.length === 0 ?
                <p>You haven't bookmarked anything yet :(</p>
                :
                <RenderCard 
                    // Bookmarking
                    database={this.state.bookmarks} 
                    bookmarked={true}
                    // Hiding
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