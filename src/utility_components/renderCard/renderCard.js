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

export const RenderCard = (props) => {
    // console.log(props.database)
    // console.log(props.arrayFromDatabase)
    // console.log(props.fullDatabaseCall)
    
    function handleClick(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall){
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
    function markAsRead(id){removeBookmark(id);}
    
   
    const pageView = props.database.map((value,key) => {
        
        // console.log(props.arrayFromDatabase.length)
        return(              
            <div id={value.id} key={value.id} className="myClass" name="original-tags-load" >   
                
                {/* <CheckCache id={value.id}/> */}

                {/* <HideArticle articleId={value.id} arrayFromDatabase={props.arrayFromDatabase} leftoverArticles={props.leftoverArticles} fullDatabaseCall={props.fullDatabaseCall}/>   */}

                {props.bookmarked === true ?
                <div className="bookmarkControlsWrapper">
                    <button onClick={()=>markAsRead(value.id)}>Mark As Read</button>
                    <button onClick={()=>swipeLeftAction(value.id,props.fullDatabaseCall )}>Bookmark</button>
                    <button onClick={()=>markAsReadAndHide(value.id,props.postsArray,props.arrayFromDatabase,props.leftoverArticles,props.fullDatabaseCall)}>Mark As Read and Hide</button>
                    </div>
                :
                <div className="hideArticleButtonWrapper">
                    <button id={value.id} onClick={() => handleClick(value.id,props.postsArray,props.arrayFromDatabase,props.leftoverArticles,props.fullDatabaseCall)}>X</button>
                 </div>  
                }


                {/* <div onClick={() => showArticle(value.id)}>Show Article1</div> */}
                

                <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                    <SwipeableListItem 
                        
                        swipeLeft={{
                            content:<div>Coming Soon...</div>,
                            // content: <SwipeLeftContent 
                            //         id={value.id} 
                            //         title={value.title} 
                            //         author={value.author} 
                            //         text={value.text} 
                            //         closePopup={closePopup} 
                            //         headerImage={value.id} />,
                            // action: () => swipeLeftAction(value.text, value.id) 
                            // action: () => props.showArticle() 
                            action: () => swipeLeftAction(value.id,props.fullDatabaseCall ),
                            
                        }}
                        
                        swipeRight={{
                            content: <div>Hiding article...</div>, 
                            action: () => swipeRightAction(
                                value.id, 
                                props.postsArray,
                                props.arrayFromDatabase,
                                props.leftoverArticles,
                                props.fullDatabaseCall
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