import React,{Component} from 'react';

import "./onCardBookmarkControls.css";

// Bookmarks
import MarkAsRead from '../bookmarks/markAsReadV2';
import removeBookmark from '../bookmarks/removeBookmark';
import createBookmark from '../bookmarks/createBookmark';
import SocialScore from './socialScore/socialScore';



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
    // Hiding an article on the home page
    const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || fullDatabaseCall;

    // console.log(articles)
    var hideArticle = articles.map(el => {
        console.log("Option 1")
        if(el.id === id && el.bookmarked === false && el != null )
            return Object.assign({}, el, {markedforhide:true})
            return el
    });

    // Hiding a bookmarked article
        if(this.state.bookmarked === true ){
            console.log("Option 3")
            var hideArticle = articles.map(el => {
                if(el.id === id && el.bookmarked === true  && el != null )
                    return Object.assign({}, el, {markedforhide:true})
                    return el
            });
        }
  
    // Undo Hide Article In Article 
    if(this.props.hideButtonSwitching === true && this.state.bookmarked === false){
        if(this.state.hideStatus === true){
            console.log("Option 2a")
            this.setState({hideStatus:false})
            var hideArticle = articles.map(el => {
                if(el.id === id && el.bookmarked === false && el != null )
                    return Object.assign({}, el, {markedforhide:false})
                    return el
            });
        }else{
            console.log("Option 2b")
            this.setState({hideStatus:true})
            var hideArticle = articles.map(el => {
                if(el.id === id && el.bookmarked === false && el != null )
                    return Object.assign({}, el, {markedforhide:true})
                    return el
            });
        }
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

    return(
        <div className="onCardControls">   
        <SocialScore liked={this.props.liked} disliked={this.props.disliked}/>

{/* Bookmark button */}
<div className="onCardBookmarkedButton">
            {this.state.bookmarked === false ? 
        
                <button title="Click to bookmark this article" onClick={()=>this.handleClick(this.props.id)}>
                    <span  class="material-icons" id={this.props.id + "bookmarkIcon"}>turned_in_not</span>                    
                </button>
                :
                <button title="Click to un-bookmark this article" className="animateScale" onClick={()=>this.handleClick(this.props.id)}>
                    <span class="material-icons increaseCardBookmarkOpacity" id={this.props.id + "bookmarkIcon"}>turned_in</span>              
                </button>   
            }
        </div>
        

{/* Mark as Read button */}
        {this.props.showMarkAsReadButton === false ?
            null
        :
            <div className="onCardMarkAsReadButton" >
                <button  onClick={()=>this.markAsRead(this.props.id,this.props.readStatus)}> 
                {this.props.readStatus === true ? 
                    <span title="Mark As Unread" class="material-icons" >check_circle</span>
                    :
                    <span title="Mark As Read" class="material-icons" >check_circle_outline</span>
                }
                </button>
        </div>  
        }



{/* Hide Article Button */}
        <div className="onCardHideButton">
            {this.props.hideBookmarkedArticle === true ?
            <button title="Permanently Remove Bookmark and Hide" onClick={() => this.hideArticle(
                this.props.id,
                this.props.fullDatabaseCall,
                this.props.postsArray,
                this.props.arrayFromDatabase,
                this.props.leftoverArticles,
                this.state.bookmarked
            )}>
                <span class="material-icons">delete</span>
            </button>
            :

            <button onClick={() => this.hideArticle(
                this.props.id,
                this.props.fullDatabaseCall,
                this.props.postsArray,
                this.props.arrayFromDatabase,
                this.props.leftoverArticles,
            )}>
              {this.props.hideStatus === true ? 
              <span className="animateScale">
                <span title="Click to Unhide" class="material-icons">visibility_off</span>
                </span>
                :                
                <span  title="Click to Hide" class="material-icons">visibility</span>
              }
              
            </button>       
            }
        

        </div>  
    </div>
    )
}
}

export default OnCardBookMarkControls;