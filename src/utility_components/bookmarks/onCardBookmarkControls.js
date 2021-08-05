import React,{Component} from 'react';

import "../bookmarks/onCardBookmarkControls.css";

// Bookmarks
import MarkAsRead from '../bookmarks/markAsRead.js';

// Hiding
import HideArticle from '../../utility_components/hide-article/hide-articlev2.js';
import hideArticleFeedback from '../hide-article/hideArticleFeedback.js';
import removeBookmark from './removeBookmark';
import createBookmark from './createBookmark';

class OnCardBookMarkControls extends Component {

    constructor(props){
        super(props);
        this.state = {
            bookmarks:[],
            bookmarked:this.props.bookmarkedStatus
        }
        this.updateStateBasedOnProp = this.updateStateBasedOnProp.bind(this);
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
    // HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);

    const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || fullDatabaseCall;
    console.log(articles)
    var hideArticle = articles.map(el => {
        if(el.id === id && el.bookmarked === false && el != null )
            // return Object.assign({}, el, {hidden:false})
            return Object.assign({}, el, {markedforhide:true})
            return el
    });

    localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
    
    // Shows the overlay
    if(this.props.hidePressed)this.props.hidePressed()


    if(this.props.hideBookmarkedArticle === true){
        // console.log("Perma Hide Bookmark")
        var hideArticle = articles.map(el => {
            if(el.id === id && el != null )
                return Object.assign({}, el, {bookmarked:false, hidden:true})
                return el
        });

        localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
    }


    // hideArticleFeedback()
    // document.getElementById(this.props.id + "markedAsHiddenOverlay").classList.add("displayFlex")
}




handleClick(){   
    if(this.state.bookmarked === true){
        this.setState({bookmarked:false})
        removeBookmark(this.props.id)
        if(this.props.updateProp)this.props.updateProp(false)
        
    }else{
        this.setState({bookmarked:true})
        createBookmark(this.props.id,this.props.fullDatabaseCall)
        if(this.props.updateProp)this.props.updateProp(true)
    }
    
}
// Handles the change when swiping the card.
componentDidUpdate(prevProps){
    // console.log("Prev Props: " + prevProps.bookmarkedStatus)
    // console.log("Current Prop: " + this.props.bookmarkedStatus)
    if (this.props.bookmarkedStatus !== prevProps.bookmarkedStatus) {
        this.updateStateBasedOnProp(this.props.bookmarkedStatus);
      }
}
updateStateBasedOnProp(a){ this.setState({ bookmarked:a }) }

render(){
    return(
        <div className="onCardControls">   
        {/* <p>Hello</p> */}
{/* Mark as Read button */}
        {this.props.showMarkAsReadButton === false ?
            null
        :
            <div className="">
                <button title="Mark As Read" onClick={()=>this.markAsRead(this.props.id)}> 
                {this.state.read === true ? 
                    <span class="material-icons" >check_circle</span>
                    :
                    <span class="material-icons" >check_circle_outline</span>
                }
                </button>
        </div>  
        }

{/* Bookmark button */}
        <div>
            {this.state.bookmarked === false ? 
        
                <button onClick={()=>this.handleClick(this.props.id)}>
                    <span  class="material-icons" id={this.props.id + "bookmarkIcon"}>turned_in_not</span>                    
                </button>
                :
                <button onClick={()=>this.handleClick(this.props.id)}>
                    <span class="material-icons increaseCardBookmarkOpacity" id={this.props.id + "bookmarkIcon"}>turned_in</span>              
                </button>   
            }
        </div>

{/* Hide Article Button */}
        <div>
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