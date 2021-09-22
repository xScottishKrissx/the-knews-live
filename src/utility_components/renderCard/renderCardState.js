import React from 'react'
import './renderCard.css';
// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import Caption from './cardCaption/cardCaption.js';

import toggleBookmark from '../bookmarks/bookmarkFunctions/toggleBookmark';

import OnCardBookMarkControls from '../onCardControls/onCardBookmarkControls';

class RenderCardState extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    updateMainArray(){
        // Handles updating the main array
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.fullDatabaseCall
        this.props.updateBookmarkStatus(articles)
    }

    swipeLeftAction(id,b,database,bookmarked){
         // Handles updating the bookmark when swiping
        if(bookmarked === true){ toggleBookmark(id,database,"remove") }
        if(bookmarked === false){ toggleBookmark(id,database,"create") }
            
        this.updateMainArray()
    }

    // this entire thing is a mess.
    swipeRightAction(id,fullDatabaseCall,bookmarked){
        console.log("Hide!")
    
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || fullDatabaseCall;

        // Hide an article as normal
        let hideArticle = {}
        hideArticle = articles.map(el => {
            if(el.id === id && el.bookmarked === false && el != null )
                // return Object.assign({}, el, {hidden:false})
                return Object.assign({}, el, {markedforhide:true})
                return el
        });       

        // Hiding a bookmarked article
        if(bookmarked === true && this.props.hideBookmarkedArticle === false){
            hideArticle = articles.map(el => {
                if(el.id === id && el.bookmarked === true  && el != null )
                    return Object.assign({}, el, {markedforhide:true})
                    return el
            });
        }


        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
        if(this.props.hidePressed)this.props.hidePressed()
        // Shows the overlay
        this.updateMainArray()
    }

    unhideArticle(id){
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        const unhideArticle = articles.map(el => {
            if(el.id === id && el.markedforhide === true && el != null )
                return Object.assign({}, el, {markedforhide:false})
                return el
        });
    
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(unhideArticle))
        this.updateMainArray()
    }


    hideBookmarkedArticle(id){
        
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        const hideBookmarkedArticle = articles.map(el => {
            if(el.id === id && el.markedforhide === true && el.bookmarked === true && el != null )
                return Object.assign({}, el, {markedforhide:true, bookmarked:false})
                return el
        });

        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideBookmarkedArticle))
        this.updateMainArray()
    }

    swipeProgress(progress){ this.setState({progress:progress }) }

 

    render(){

    
    const pageView = this.props.database.map((value,key) => {
    // this.updateReadStyles(value,value.id,value.read)
          
        return(              
            <div id={value.id} key={value.id} className="myClass"   name="original-tags-load">   

                {value.markedforhide === false  ?
                    <OnCardBookMarkControls 
                        id={value.id}
                        bookmarkedStatus={value.bookmarked}
                        readStatus={value.read}
                        hideBookmarkedArticle={this.props.hideBookmarkedArticle}
                        
                        fullDatabaseCall={this.props.fullDatabaseCall}
                        arrayFromDatabase={this.props.arrayFromDatabase}

                        // bookmarkTest={this.state.bookmarked}
                        updateMainArray={()=>this.updateMainArray()}
                        hidePressed={()=> this.updateMainArray()}   

                        
                        liked={value.liked}
                        disliked={value.disliked}
                    />
                : 
                null
                }

               
               <SwipeableList threshold={0.4}>
                    <SwipeableListItem                    
                        blockSwipe={value.markedforhide}
                        swipeLeft={{
                            content:                            
                                <div className="swipeIndicatorBookmark">   
                                    {this.state.progress <= 40 ? 
                                    <span>{Math.round(this.state.progress * 2.5) +  "%"}</span> 
                                    :
                                    <i class="bi bi-check"></i>
                                    }                                         
                                     
                                    {value.bookmarked === false ? 
                                        <span className="displaySwipeText">Bookmarking <br/>Article</span>
                                            :
                                        <span className="displaySwipeText2">Removing Bookmark</span>
                                    }       

                                    {/* {this.state.progress >= 40 ? <span>-<br/>Complete</span> :null }      */}
                                </div>,
                            action: () => this.swipeLeftAction(value.id,true,this.props.fullDatabaseCall,value.bookmarked),
                            
                        }}
                        
                        onSwipeProgress={progress => this.swipeProgress(progress)}
                        containerStyle={{
                            transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
                        }}

                        swipeRight={{
                            content: 
                                    <div className="swipeIndicatorHide">
                                        {this.state.progress <= 40 ? 
                                        <span>{Math.round(this.state.progress * 2.5) +  "%"}</span> 
                                        :
                                        <i class="bi bi-check"></i>
                                        }   
                                         
                                        <span>Hiding article...</span> 

                                        {/* {this.state.progress >= 40 ? <span>-<br/>Complete</span> :null } */}
                                    </div>, 
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
                                            <span>
                                                {/* <i class="bi bi-info-square-fill"></i> */}
                                                <span>This card will not be visible when the page is refreshed</span>
                                            </span>
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