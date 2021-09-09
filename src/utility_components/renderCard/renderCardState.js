import React from 'react'
import './renderCard.css';
// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import swipeRightAction from '../swipeRightAction.js';
import swipeLeftAction from '../swipeLeftAction.js';

import Caption from '../../home-page/news-item-loop/news-item-caption/news-item-caption.js';

import createBookmark from '../bookmarks/createBookmark';
import removeBookmark from '../bookmarks/removeBookmark';

import OnCardBookMarkControls from '../onCardControls/onCardBookmarkControls';

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

        localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
        if(this.props.hidePressed)this.props.hidePressed()
        // Shows the overlay
        this.props.updateBookmarkStatus(hideArticle)
    }



    updateProp(){
        // Handles updating the bookmark when clicking the bookmark icon
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.fullDatabaseCall
        
        this.props.updateBookmarkStatus(articles)
    }


    unhideArticle(id){
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        const unhideArticle = articles.map(el => {
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
        const hideBookmarkedArticle = articles.map(el => {
            if(el.id === id && el.markedforhide === true && el.bookmarked === true && el != null )
                return Object.assign({}, el, {markedforhide:true, bookmarked:false})
                return el
        });
        this.props.updateHideStatus(hideBookmarkedArticle)
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideBookmarkedArticle))
    }

    swipeProgress(progress){ this.setState({progress:progress }) }

    updateReadStyles = (value,id,read) => {
        // const renderToPage = this.state.renderArray.slice(0,10) || this.props.databaseProp ;
        console.log("UpdateReadStyles")
        console.log(id,read)

        // if(read === true){
        //     if( document.getElementById(id)){
        //         document.getElementById(id).classList.add('markAsRead')
        //     }            
        // }else{
        //     if( document.getElementById(id)){
        //         document.getElementById(id).classList.remove('markAsRead')
        //     }   
        // }

        // const markArticleRead = renderToPage.map(el => {
        //     if(el.read === true && el != null )if( document.getElementById(el.id)){
        //         document.getElementById(el.id).classList.add('markAsRead')
        //     }
        //     if(el.read === false && el != null )if( document.getElementById(el.id)){
        //         document.getElementById(el.id).classList.remove('markAsRead')
        //     }
        // });
    }

    render(){
        // console.log(this.state.progress)
    
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
                        postsArray={this.props.postsArray}
                        leftoverArticles={this.props.leftoverArticles}
                        arrayFromDatabase={this.props.arrayFromDatabase}

                        bookmarkTest={this.state.bookmarked}
                        updateProp={()=>this.updateProp()}
                        hidePressed={()=> this.updateProp()}   

                        
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
                                    <span>100%</span> 
                                    }                                         
                                     
                                    {value.bookmarked === false ? 
                                        <span className="displaySwipeText">Bookmarking <br/>Article</span>
                                            :
                                        <span className="displaySwipeText2">Removing Bookmark</span>
                                    }       

                                    {this.state.progress >= 40 ? <span>-<br/>Complete</span> :null }     
                                </div>,
                            action: () => this.swipeLeftAction(value.id,true,this.props.fullDatabaseCall,value.bookmarked),
                            
                        }}
                        
                        onSwipeProgress={progress => this.swipeProgress(progress)}

                        swipeRight={{
                            content: 
                                    <div className="swipeIndicatorHide">
                                        {this.state.progress <= 40 ? 
                                        <span>{Math.round(this.state.progress * 2.5) +  "%"}</span> 
                                        :
                                        <span>100%</span> 
                                        }   
                                         
                                        <span>Hiding article...</span> 

                                        {this.state.progress >= 40 ? <span>-<br/>Complete</span> :null }
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