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
    updateProp(){
        // Handles updating the bookmark when clicking the bookmark icon
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        
        this.props.updateBookmarkStatus(articles)
    }
    hideOverlay(id){
        document.getElementById(id + "markedAsHiddenOverlay").classList.remove("displayFlex")
    }
    hidePressed(){
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        this.props.updateHideStatus(articles)
    }
    render(){

    const pageView = this.props.database.map((value,key) => {
        
        return(              
            <div id={value.id} key={value.id} className="myClass" name="original-tags-load">   
    
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
                        updateProp={()=>this.updateProp(value.bookmarked)}
                        hidePressed={()=> this.hidePressed()}         
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
                            
                            action: () => swipeRightAction(
                                value.id, 
                                this.props.postsArray,
                                this.props.arrayFromDatabase,
                                this.props.leftoverArticles,
                                this.props.fullDatabaseCall,
                                this.props.bookmarked
                                
                            )
                        }}
                        // onSwipeProgress={progress => console.log(progress)}
                        
                        
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
                                    // Testing

                                    />
                            </div>
                            {value.markedforhide === true  ? 
                                <div className="markedAsHideOverlayWrapper" id={value.id + "markedAsHiddenOverlay"}>
                                    <div>
                                        <h3>Marked As Hidden</h3>
                                        {/* <p>You've marked this card as hidden. It will be removed when the page reloads or you activate the filter menu.</p>
                                        <p>It will not appear unless you reset the website or you press the undo button below.</p> */}
                                        <button onClick={()=>this.hideOverlay(value.id)}>Undo</button>
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