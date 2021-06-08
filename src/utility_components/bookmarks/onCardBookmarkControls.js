import React,{Component} from 'react';

import "../bookmarks/bookmarks.css";


// Bookmarks
import MarkAsRead from '../bookmarks/markAsRead.js';
import swipeLeftAction from '../../utility_components/swipeLeftAction.js';

// Hiding
import HideArticle from '../../utility_components/hide-article/hide-articlev2.js';
import hideArticleFeedback from '../hide-article/hideArticleFeedback.js';
import removeBookmark from './removeBookmark';
import updateBookmarkStyles from './updateBookmarkStyle';
import createBookmark from './createBookmark';


class OnCardBookMarkControls extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookmarks:[],
    }
}


markAsRead(id){

    if(this.state.read === false){
        MarkAsRead(id,this.state.read)
        this.setState({read:true})
       
    }else{
        MarkAsRead(id,this.state.read)
        this.setState({read:false})
    }
}

hideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall){
    HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);

    // console.log(arrayFromDatabase.length)
    // handleHideArticleFeedback();
    const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || fullDatabaseCall;
    console.log(articles)
    var hideArticle = articles.map(el => {
        if(el.id === id && el.bookmarked === false && el != null )
            return Object.assign({}, el, {hidden:true})
            return el
    });
    if(this.props.hideBookmarkedArticle === true){
        console.log("Perma Hide Bookmark")
        var hideArticle = articles.map(el => {
            if(el.id === id && el != null )
                return Object.assign({}, el, {bookmarked:false, hidden:true})
                return el
        });

        localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
    }
    localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))

    // document.getElementById(id).classList.add('markAsRead')
    // console.log(JSON.parse((localStorage.getItem("bookmarkArray"))))
    hideArticleFeedback()
    // removeBookmark(id)
}

componentDidMount(){
    this.setState({
        bookmarked:this.props.bookmarkedStatus,
        read:this.props.readStatus
    })
    // if(JSON.parse(localStorage.getItem("bookmarkArray")) === null){
    //     // console.log("Thing is null")
    //     this.setState({toggle:false, read:false})
    // } 
}

componentDidUpdate(){
    // updateBookmarkStyles();

}

// toggle(id){
//     console.log("Button Clicked")
//     if(this.state.toggle === false){
//         this.setState({toggle: true})
//         console.log("Bookmark Created")
//         swipeLeftAction(this.props.id,this.props.fullDatabaseCall)
//     }
//     if(this.state.toggle === true){
//         this.setState({toggle: false})
//         console.log("Bookmark Removed")
//         removeBookmark(id)
//     }
// }

handleClick(){

    // console.log(this.props.bookmarkedStatus)
    // console.log(this.state.bookmarked)

    // console.log(this.props.bookmarkedStatus)
    // console.log(this.state.bookmarked)
    
    if(this.state.bookmarked === true){
        this.setState({bookmarked:false})
        removeBookmark(this.props.id)
    }else{
        this.setState({bookmarked:true})
        createBookmark(this.props.id,this.props.fullDatabaseCall)
    }
}

render(){
    // console.log(this.props.hideBookmarkedArticle)
    return(
        <div className="onCardControls">
                    
        
        {this.props.showMarkAsReadButton === false ?
            null
        :
        <div className="markAsReadButtonWrapper">
            <button title="Mark As Read" onClick={()=>this.markAsRead(this.props.id)}> 
                <span class="material-icons" >done</span>
            </button>
        </div>  
        }

        <div className="bookmarkButtonWrapper">
            {this.state.bookmarked === false ? 
        
                <button onClick={()=>this.handleClick(this.props.id)}>
                    <span  class="material-icons" id={this.props.id + "bookmarkIcon"}>turned_in_not</span>
                    
                </button>
                :
                <button onClick={()=>this.handleClick(this.props.id)}>
                    <span  class="material-icons" id={this.props.id + "bookmarkIcon"}>turned_in</span> 
                   
                </button>
                
                
            }
        </div>
        <div className="hideArticleButtonWrapper">
            {this.props.hideBookmarkedArticle === true ?
            <button title="Permanently Remove Bookmark and Hide" onClick={() => this.hideArticle(
                this.props.id,
                this.props.postsArray,
                this.props.arrayFromDatabase,
                this.props.leftoverArticles,
                this.props.fullDatabaseCall
            )}>
                <span class="material-icons">delete</span>
            </button>
            :
            <button title="Hide Article" onClick={() => this.hideArticle(
                this.props.id,
                this.props.postsArray,
                this.props.arrayFromDatabase,
                this.props.leftoverArticles,
                this.props.fullDatabaseCall
            )}>
                <span class="material-icons">visibility_off</span>
            </button>
            }
        

        </div>  
    </div>
    )
}
}

export default OnCardBookMarkControls;