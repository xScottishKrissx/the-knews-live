import React,{Component} from 'react';

import "../bookmarks/onCardBookmarkControls.css";

// Bookmarks
import MarkAsRead from './markAsReadV2.js';

import removeBookmark from './removeBookmark';
import createBookmark from './createBookmark';



class OnCardBookMarkControls extends Component {

    constructor(props){
        super(props);
        this.state = {
            bookmarks:[],
            bookmarked:this.props.bookmarkedStatus,
            read:this.props.readStatus
        }
        this.updateStateBasedOnProp = this.updateStateBasedOnProp.bind(this);
    }


markAsRead(id,markAs){
    MarkAsRead(id,markAs)
    if(this.props.updateProp)this.props.updateProp(markAs)    
}

hideArticle(id,fullDatabaseCall){
    console.log("Hide Article " + id + " Hide Status: " + this.props.hideStatus)
    
    // Hiding an article on the home page
    const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || fullDatabaseCall;

    var hideArticle = articles.map(el => {
        if(el.id === id && el.bookmarked === false && el != null )
            // return Object.assign({}, el, {hidden:false})
            return Object.assign({}, el, {markedforhide:true})
            return el
    });
  
    // Undo Hide Article In Article
    // in article hide button switching
    if(this.props.hideButtonSwitching === true && this.state.bookmarked === false){
        if(this.state.hideStatus === true){
            this.setState({hideStatus:false})
            var hideArticle = articles.map(el => {
                if(el.id === id && el.bookmarked === false && el != null )
                    return Object.assign({}, el, {markedforhide:false})
                    return el
            });
        }else{
            this.setState({hideStatus:true})
            var hideArticle = articles.map(el => {
                if(el.id === id && el.bookmarked === false && el != null )
                    return Object.assign({}, el, {markedforhide:true})
                    return el
            });
        }
    }    

    // hiding bookmarks on bookmark.js
    if(this.props.hideBookmarkedArticle === true ){
        var hideArticle = articles.map(el => {
            if(el.id === id && el != null )
                return Object.assign({}, el, {bookmarked:false, hidden:true})
                return el
        });
    }

    // Hiding a bookmarked article in article
    if(this.state.bookmarked === true && this.props.hideBookmarkedArticle === false){
        var hideArticle = articles.map(el => {
            if(el.id === id && el.bookmarked === true  && el != null )
                return Object.assign({}, el, {markedforhide:true})
                return el
        });
    }


    localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
    // Shows the overlay for comfirming a hide on a bookmark
    if(this.props.hidePressed)this.props.hidePressed()
}




handleClick(){   
    console.log("Handle Click")
    if(this.state.bookmarked === true){
        this.setState({bookmarked:false,hideStatus:false})
        removeBookmark(this.props.id)
        if(this.props.updateProp)this.props.updateProp(false)
    }else{
        this.setState({bookmarked:true,hideStatus:false})
        createBookmark(this.props.id,this.props.fullDatabaseCall)
        if(this.props.updateProp)this.props.updateProp(true)
    }
    
}
// Handles the change when swiping the card.
componentDidUpdate(prevProps){
    if (this.props.bookmarkedStatus !== prevProps.bookmarkedStatus) {
        this.updateStateBasedOnProp(this.props.bookmarkedStatus);
      }
}


updateStateBasedOnProp(a){ this.setState({ bookmarked:a }) }

render(){
    // console.log(this.props.bookmarkedStatus)
    return(
        <div className="onCardControls">   

{/* Mark as Read button */}
        {this.props.showMarkAsReadButton === false ?
            null
        :
            <div >
                <button title="Mark As Read" onClick={()=>this.markAsRead(this.props.id,this.props.readStatus)}> 
                {this.props.readStatus === true ? 
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
                <button className="animateVote" onClick={()=>this.handleClick(this.props.id)}>
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
                this.props.fullDatabaseCall,
                this.state.bookmarked
            )}>
                <span class="material-icons">delete</span>
            </button>
            :

            <button  onClick={() => this.hideArticle(
                this.props.id,
                this.props.postsArray,
                this.props.arrayFromDatabase,
                this.props.leftoverArticles,
                this.props.fullDatabaseCall
            )}>
              {this.props.hideStatus === true ? 
                <span title="Click to Unhide" class="material-icons">visibility_off</span>
                :                
                <span title="Click to Hide" class="material-icons">visibility</span>
              }
            </button>       
            }
        

        </div>  
    </div>
    )
}
}

export default OnCardBookMarkControls;