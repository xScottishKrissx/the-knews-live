import React,{Component} from 'react';
import fire from '../../fire.js';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCard.js';

import CustomCardSize from '../custom-tile-size/custom-card-sizeV2.js';
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

        const database = JSON.parse(localStorage.getItem("bookmarkArray"))
        // console.log(database)

        if(database === null){
            this.setState({bookmarks:[]})
        }else{
            const getBookmarks = database.filter(obj => obj.bookmarked === true) 
            this.setState({bookmarks:getBookmarks})
        }

    }
    clearBookmarks(){
        localStorage.removeItem("bookmarkArray")
        this.setState({bookmarks:[]})
    }
    render(){
        localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))   
        // console.log(this.state.fullDatabaseCall)
        //   console.log(JSON.parse(localStorage.getItem("cleanDatabaseCall")))

        return(
            <div id="bookmarkWrapper">
            <h1>Bookmarks</h1>
            <p>You have bookmarked {this.state.bookmarks.length} items. Enjoy</p>
            <button onClick={() => this.clearBookmarks()}>Clear All Bookmarks</button>

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