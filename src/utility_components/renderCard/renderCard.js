import React from 'react'
import './renderCard.css';
// Things needed for map items test
// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import swipeRightAction from '../../utility_components/swipeRightAction.js';
import swipeLeftAction from '../../utility_components/swipeLeftAction.js';
// import CheckCache from '../../utility_components/handleCache/checkCache.js';

// import HideArticle from '../../utility_components/hide-article/hide-article.js';
import HideArticle from '../../utility_components/hide-article/hide-articlev2.js';

import Caption from '../../home-page/news-item-loop/news-item-caption/news-item-caption.js';
// import { ShowArticleTest } from '../showArticleTest-OLD';

import hideArticleFeedback from '../hide-article/hideArticleFeedback.js';

import removeBookmark from '../bookmarks/removeBookmark.js';

import MarkAsRead from '../bookmarks/markAsRead.js';
import OnCardBookMarkControls from '../bookmarks/onCardBookmarkControls';

export const RenderCard = (props) => {

    function markAsReadAndHide(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall){
        HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);
        hideArticleFeedback()
        removeBookmark(id)
    }

    
    function markAsRead(id,fullDatabaseCall){
        MarkAsRead(id,fullDatabaseCall)
    ;}

    const pageView = props.database.map((value,key) => {
        
        
        return(              
            <div id={value.id} key={value.id} className="myClass" name="original-tags-load" >   
                
    
                
                {props.bookmarked === false ?
                
                <div className="bookmarkControlsWrapper">
                    <button onClick={()=>markAsRead(value.id,value.read)}>Mark As Read</button>
                    <button onClick={()=>swipeLeftAction(value.id,props.fullDatabaseCall )}>
                        <span class="material-icons" >bookmark</span></button>
                    <button onClick={()=>markAsReadAndHide(
                        value.id,
                        props.postsArray,
                        props.arrayFromDatabase,
                        props.leftoverArticles,
                        props.fullDatabaseCall,
                        )}>Mark As Read and Hide</button>
                    
                    </div>
                 
                :
                <OnCardBookMarkControls 
                        id={value.id}
                        fullDatabaseCall={props.fullDatabaseCall}
                        postsArray={props.postsArray}
                        leftoverArticles={props.leftoverArticles}
                        arrayFromDatabase={props.arrayFromDatabase}
                        bookmarkedStatus={value.bookmarked}
                        readStatus={value.read}
                        
                />
                }
   
                

                <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                    <SwipeableListItem 
                        
                        swipeLeft={{
                            content:<div>Bookmarking Article...</div>,
                            action: () => swipeLeftAction(value.id,props.fullDatabaseCall ),
                            
                        }}

                        swipeRight={{
                            content: <div>Hiding article...</div>, 
                            
                            action: () => swipeRightAction(
                                value.id, 
                                props.postsArray,
                                props.arrayFromDatabase,
                                props.leftoverArticles,
                                props.fullDatabaseCall,
                                props.bookmarked
                                
                            )
                        }}
                        
                    >
                            
                            <div className='news-square' name="tags-original-load-news"  key={key}  
                            style={ props.startingCardSize || props.changedCardSize } >                    
                                <Caption 
                                    pageId={value.key}
                                    articleId={value.id}
                                    title={value.title}
                                    author={value.author}
                                    likes={value.likes}
                                    dislikes={value.dislikes}
                                    articleId={value.id}
                                    tag={value.tag}
                                    imageId={value.id}
                                    showArticle={props.showArticle}
                                    // Testing

                                    />
                            </div>
                    
                    </SwipeableListItem>
                </SwipeableList>

           
            </div>
            
        )
    })
    
    return pageView;
}   

export default RenderCard