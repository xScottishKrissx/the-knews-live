import React,{Component} from 'react';
import fire from '../../fire.js';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCard.js';

class Bookmarks extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullDatabaseCall:[],
            bookmarks:[]
        }
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
              articlesArray: newState.slice(0,30),
              leftoverArticles: newState.slice(30,97),
              fullDatabaseCall: newState
            })    
          // console.log(this.state.fullDatabaseCall)
      })  
      localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))   

        const database = JSON.parse(localStorage.getItem("bookmarkArray"))
        // console.log(database)

        if(database === null){
            this.setState({bookmarks:[]})
        }else{
            const getBookmarks = database.filter(obj => obj.bookmarked === true) 
            this.setState({bookmarks:getBookmarks})
        }

    }
    render(){


        return(
            <div id="bookmarkWrapper">
            <h1>Bookmarks</h1>
            {this.state.bookmarks.length === 0 ?
            <p>You haven't bookmarked anything yet :(</p>
            :
            <RenderCard 
                database={this.state.bookmarks} 
                arrayFromDatabase={this.state.fullDatabaseCall}
                leftoverArticles={this.state.leftoverArticles}
                bookmarked={true}
            />
            }
            
            </div>
        )
    }
}

export default Bookmarks;