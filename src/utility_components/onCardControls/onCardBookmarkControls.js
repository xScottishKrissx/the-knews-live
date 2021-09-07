import React,{Component} from 'react';

import "./onCardBookmarkControls.css";

// Bookmarks
import removeBookmark from '../bookmarks/removeBookmark';
import createBookmark from '../bookmarks/createBookmark';
import SocialScore from './socialScore/socialScore';
import Bookmark from './bookmark/bookmark';
import MarkAsReadButton from './markAsReadButton/markAsReadButton';
import HideArticleButton from './hideArticleButton/hideArticleButton';

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

hideArticle =(id) => {
    const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.fullDatabaseCall;

    // console.log(articles)
    var hideArticle = articles.map(el => {
        if(el.id === id && el.bookmarked === false && el != null )
            return Object.assign({}, el, {markedforhide:true})
            return el
    });

    // Hiding a bookmarked article
        if(this.state.bookmarked === true ){
            var hideArticle = articles.map(el => {
                if(el.id === id && el.bookmarked === true  && el != null )
                    return Object.assign({}, el, {markedforhide:true})
                    return el
            });
        }
  
    // Undo Hide Article In Article 
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

    localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
    // Shows the overlay for comfirming a hide on a bookmark
    if(this.props.hidePressed)this.props.hidePressed()
}




    handleClick(){   

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

                <SocialScore 
                    liked={this.props.liked} 
                    disliked={this.props.disliked}
                />

                <Bookmark 
                    bookmarked={this.state.bookmarked} 
                    id={this.props.id} 
                    handleClick={()=>this.handleClick()} 
                />

                <MarkAsReadButton 
                    id={this.props.id} 
                    showMarkAsReadButton={this.props.showMarkAsReadButton} 
                    readStatus={this.props.readStatus} 
                    updateProp={this.props.updateProp} 
                />

                <HideArticleButton 
                    hideArticle={this.hideArticle} 
                    hideBookmarkedArticle={this.props.hideBookmarkedArticle} 
                    hideStatus={this.props.hideStatus} 
                    id={this.props.id} 
                />
            </div>
        )
    }
}

export default OnCardBookMarkControls;