import React,{Component} from 'react';

import "../bookmarks/bookmarks.css";


// Bookmarks
import MarkAsRead from '../bookmarks/markAsRead.js';
import swipeLeftAction from '../../utility_components/swipeLeftAction.js';

// Hiding
import HideArticle from '../../utility_components/hide-article/hide-articlev2.js';
import hideArticleFeedback from '../hide-article/hideArticleFeedback.js';
import removeBookmark from './removeBookmark';

class OnCardBookMarkControls extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookmarks:[],
            toggle:false,
    }
}

// componentDidMount(){
//     const database = JSON.parse(localStorage.getItem("bookmarkArray"))
//     // console.log(this.props.id)
//     const getBookmarks = database.filter(obj => obj.bookmarked === true) 
//     // console.log(getBookmarks)

//         var setBookmarkTrue = getBookmarks.map(el => {
//         if(el.id === this.props.id && el != null && el.bookmarked === true ){
//             document.getElementById(this.props.id + "bookmarkIcon").classList.add('bookmarkStyle2')
//         }
//      });
// }
markAsRead(id,fullDatabaseCall){
    // removeBookmark(id)
    MarkAsRead(id,fullDatabaseCall)
}

hideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall){
    HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);
    // console.log(arrayFromDatabase.length)
    // handleHideArticleFeedback();
    hideArticleFeedback()

}

toggle(id){
    console.log(JSON.parse((localStorage.getItem("bookmarkArray"))))
    // console.log("toggle " + id)
    // console.log(JSON.parse(localStorage.getItem("changedFullDatabaseCall")))

    if(this.state.toggle === false){
        this.setState({toggle: true})
        // document.getElementById(id + "bookmarkIcon").classList.add('bookmarkStyle')
        // document.getElementById(id).classList.remove('markAsRead')
        console.log("Bookmark Created")
        swipeLeftAction(this.props.id,this.props.fullDatabaseCall)
    }

    if(this.state.toggle === true){
        this.setState({toggle: false})
        // document.getElementById(id + "bookmarkIcon").classList.remove('bookmarkStyle2')
        console.log("Bookmark Removed")
        removeBookmark(id)
    }
    console.log(this.state.toggle)
    

    // console.log(setBookmarkTrue)
}
// componentDidUpdate(){
//     const databaseRef = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
//     var setBookmarkTrue = databaseRef.map(el => {
//         if(el.id === this.props.id && el != null && el.bookmarked === true ){
//             document.getElementById(this.props.id + "bookmarkIcon").classList.add('bookmarkStyle')
//         }
//     });

//     var setBookmarkTrue2 = databaseRef.map(el => {
//         if(el.id === this.props.id && el != null && el.bookmarked === false ){
//             document.getElementById(this.props.id + "bookmarkIcon").classList.remove('bookmarkStyle')
//         }
//     });
// }


render(){
    // console.log(this.state.toggle)
    // console.log(this.state.toggle)
    
    
    return(
        <div className="onCardControls">
                    
        {/* <button onClick={() => updateStateTest('someVar')}></button> */}

        <div className="markAsReadButtonWrapper">
            <button title="Mark As Read" onClick={()=>this.markAsRead(this.props.id)}> 
                <span class="material-icons" >done</span>
            </button>
        </div>  

        {/* <div className="testButton">
            <button title="Mark As Read" onClick={()=>this.toggle(this.props.id)}> 
                <span class="material-icons" >done</span>
            </button>
        </div>   */}

        <div className="bookmarkButtonWrapper">
            <button title="Bookmark Article" onClick={()=>this.toggle(this.props.id)}>
                <span  class="material-icons" id={this.props.id + "bookmarkIcon"}>turned_in_not</span>           
            </button>
        </div>  

        <div className="hideArticleButtonWrapper">
            <button title="Hide Article" onClick={() => this.hideArticle(this.props.id,this.props.postsArray,this.props.arrayFromDatabase,this.props.leftoverArticles,this.props.fullDatabaseCall)}>
                <span class="material-icons">visibility_off</span>
            </button>
        </div>  
    </div>
    )
}
}

export default OnCardBookMarkControls;