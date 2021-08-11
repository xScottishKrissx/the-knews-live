import React from 'react'
import './renderCard.css';
// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import swipeRightAction from '../swipeRightAction.js';
import swipeLeftAction from '../swipeLeftAction.js';

import Caption from '../../home-page/news-item-loop/news-item-caption/news-item-caption.js';

import OnCardBookMarkControls from '../bookmarks/onCardBookmarkControls';
import createBookmark from '../bookmarks/createBookmark';
import removeBookmark from '../bookmarks/removeBookmark';

class RenderCardState extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    swipeLeftAction(id,b,database,bookmarked){
         // Handles updating the bookmark when swiping
        if(bookmarked === true){ removeBookmark(id) }
        if(bookmarked === false){ createBookmark(id,database) }
            
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))

        this.props.updateBookmarkStatus(articles)
    }

    // this entire thing is a mess.
    swipeRightAction(id,fullDatabaseCall,bookmarked){
        console.log("Hide!")
    
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || fullDatabaseCall;

        // Hide an article as normal
        var hideArticle = articles.map(el => {
            if(el.id === id && el.bookmarked === false && el != null )
                // return Object.assign({}, el, {hidden:false})
                return Object.assign({}, el, {markedforhide:true})
                return el
        });       

        // Hiding a bookmarked article
        if(bookmarked === true && this.props.hideBookmarkedArticle === false){
            var hideArticle = articles.map(el => {
                if(el.id === id && el.bookmarked === true  && el != null )
                    return Object.assign({}, el, {markedforhide:true})
                    return el
            });
        }

        localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
        if(this.props.hidePressed)this.props.hidePressed()
        // Shows the overlay
        this.props.updateBookmarkStatus(hideArticle)
    }



    updateProp(){
        // Handles updating the bookmark when clicking the bookmark icon
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        this.props.updateBookmarkStatus(articles)
    }


    unhideArticle(id){
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        var unhideArticle = articles.map(el => {
            if(el.id === id && el.markedforhide === true && el != null )
                return Object.assign({}, el, {markedforhide:false})
                return el
        });
    
        localStorage.setItem("bookmarkArray", JSON.stringify(unhideArticle))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(unhideArticle))
        this.props.updateHideStatus(unhideArticle)
    }


    hideBookmarkedArticle(id){
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        var hideBookmarkedArticle = articles.map(el => {
            if(el.id === id && el.markedforhide === true && el.bookmarked === true && el != null )
                return Object.assign({}, el, {markedforhide:true, bookmarked:false})
                return el
        });
        this.props.updateHideStatus(hideBookmarkedArticle)
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideBookmarkedArticle))
    }



    render(){

    const pageView = this.props.database.map((value,key) => {
        return(              
            <div id={value.id} key={value.id} className="myClass" name="original-tags-load">   

                {/* {value.read === true ? 
                <h1>Read</h1>
                :
                <h1>Unread</h1>    
                }  */}
                {value.markedforhide === false  ?
                    <OnCardBookMarkControls 
                        id={value.id}
                        bookmarkedStatus={value.bookmarked}
                        readStatus={value.read}
                        hideBookmarkedArticle={this.props.hideBookmarkedArticle}
                        
                        fullDatabaseCall={this.props.fullDatabaseCall}
                        postsArray={this.props.postsArray}
                        leftoverArticles={this.props.leftoverArticles}
                        arrayFromDatabase={this.props.arrayFromDatabase}

                        bookmarkTest={this.state.bookmarked}
                        updateProp={()=>this.updateProp()}
                        hidePressed={()=> this.updateProp()}   
                    />
                : 
                null
                }

               
               <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                    <SwipeableListItem                    
                        blockSwipe={value.markedforhide}
                        swipeLeft={{
                            content:                            
                                <div>
                                    {value.bookmarked === false ? 
                                        <span> Bookmarking Article..</span> 
                                            : 
                                        <span>Removing Bookmark</span>
                                    }                                   
                                </div>
                                ,
                            action: () => this.swipeLeftAction(value.id,true,this.props.fullDatabaseCall,value.bookmarked),
                            
                        }}

                        swipeRight={{
                            content: <div>Hiding article...</div>, 
                            action:() => this.swipeRightAction(value.id,this.props.fullDatabaseCall,value.bookmarked)
                        }}
                    >
                            
                            <div className='news-square' name="tags-original-load-news"  key={key}  
                            style={ this.props.startingCardSize || this.props.changedCardSize } >                    
                                <Caption 
                                    pageId={value.key}
                                    articleId={value.id}
                                    title={value.title}
                                    author={value.author}
                                    likes={value.likes}
                                    dislikes={value.dislikes}
                                    tag={value.tag}
                                    imageId={value.id}
                                    showArticle={this.props.showArticle}

                                    />
                            </div>


                            {value.markedforhide === true  && value.bookmarked === false? 
                                <div className="markedAsHideOverlayWrapper" id={value.id + "markedAsHiddenOverlay"}>
                                    <div>
                                        <h3>Marked As Hidden</h3>
                                        <div className="undoHideButton" onClick={()=>this.unhideArticle(value.id)}>
                                            <span>
                                                <span class="material-icons">cancel</span>
                                                <span>Cancel</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                            }

                            {
                            value.markedforhide === true && 
                            value.bookmarked === true  ? 
                                <div className="markedAsHideOverlayWrapper" id={value.id + "confirmHide"}>
                                    <div>
                                        <h3>Confirm Hide</h3>
                                        <p>Hide this bookmarked article?</p>
                                        <div className="undoHideButton" >
                                            <span onClick={()=>this.hideBookmarkedArticle(value.id)}>
                                                <span class="material-icons">verified</span>
                                                <span>Confirm</span>
                                            </span>

                                            <span onClick={()=>this.unhideArticle(value.id)}>
                                                <span class="material-icons">cancel</span>
                                                <span>Cancel</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                                
                            }           
 
                            
                    
                    </SwipeableListItem>
                </SwipeableList>

           
            </div>
            
        )
    })

    
    return pageView;
}   
}

export default RenderCardState