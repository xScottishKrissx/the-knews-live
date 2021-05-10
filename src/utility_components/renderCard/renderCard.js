import React from 'react'
import './renderCard.css';
// Things needed for map items test
// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import SwipeLeftContent from '../../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';
// import swipeLeftAction from '../../utility_components/swipeLeftAction.js';
import closePopup from '../../utility_components/closePopup.js';
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
    // console.log(props.database)
    // console.log(props.arrayFromDatabase)
    // console.log(props.fullDatabaseCall)
    // const toggleColour  =   props.updateStateTest;
    
    // console.log(props.changedFullDatabaseCall)
    

    function hideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall){
        HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);
        // console.log(arrayFromDatabase.length)
        // handleHideArticleFeedback();
        hideArticleFeedback()

    }
    function markAsReadAndHide(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall){
        HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);
        hideArticleFeedback()
        removeBookmark(id)
    }

    
    function markAsRead(id,fullDatabaseCall){
        // removeBookmark(id)
        MarkAsRead(id,fullDatabaseCall)
    ;}

    const pageView = props.database.map((value,key) => {
        
        // console.log(props.arrayFromDatabase.length)
        
        return(              
            <div id={value.id} key={value.id} className="myClass" name="original-tags-load" >   
                
                {/* <CheckCache id={value.id}/> */}

                {/* <HideArticle articleId={value.id} arrayFromDatabase={props.arrayFromDatabase} leftoverArticles={props.leftoverArticles} fullDatabaseCall={props.fullDatabaseCall}/>   */}
                
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
                // <div className="onCardControls">
                    
                //     {/* <button onClick={() => updateStateTest('someVar')}></button> */}

                //     <div className="markAsReadButtonWrapper">
                //         <button title="Mark As Read" onClick={()=>markAsRead(value.id)}> 
                //             <span class="material-icons" >done</span>
                //         </button>
                //     </div>  

                //     <div className="bookmarkButtonWrapper">
                //         <button title="Bookmark Article" onClick={()=>swipeLeftAction(value.id,props.fullDatabaseCall,props.changedFullDatabaseCall )}>
                //             <span  class="material-icons" id={value.id + "bookmarkIcon"}>turned_in_not</span> 
                //         </button>
                //     </div>  

                //     <div className="hideArticleButtonWrapper">
                //         <button title="Hide Article" onClick={() => hideArticle(value.id,props.postsArray,props.arrayFromDatabase,props.leftoverArticles,props.fullDatabaseCall)}>
                //             <span class="material-icons">visibility_off</span>
                //         </button>
                //     </div>  

  



                // </div>
                }
                  {/* <div>
                        <h3>Thing</h3>
                        <button onClick={()=>toggleColour(true)}>Toggle Colour</button>
                  </div> */}

                {/* <div onClick={() => showArticle(value.id)}>Show Article1</div> */}
                

                <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                    <SwipeableListItem 
                        
                        swipeLeft={{
                            content:<div>Coming Soon...</div>,
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
                                    title={value.title}
                                    author={value.author}
                                    likes={value.likes}
                                    dislikes={value.dislikes}
                                    articleId={value.id}
                                    tag={value.tag}
                                    imageId={value.id}

                                    // Testing
                                    showArticle={props.showArticle}
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