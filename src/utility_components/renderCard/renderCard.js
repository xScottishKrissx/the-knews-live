// Things needed for map items test
// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import SwipeLeftContent from '../../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';
import swipeLeftAction from '../../utility_components/swipeLeftAction.js';
import closePopup from '../../utility_components/closePopup.js';
import swipeRightAction from '../../utility_components/swipeRightAction.js';




import CheckCache from '../../utility_components/checkCache.js';
import HideArticle from '../../utility_components/hide-article/hide-article.js';
import Caption from '../../home-page/news-item-loop/news-item-caption/news-item-caption.js';

export const RenderCard = (props) => {
    const pageView = props.database.map((value,key) => {
        return(              
            <div id={value.id} key={value.id} className="myClass" name="original-tags-load">   
                
                <CheckCache id={value.id}/>

                <HideArticle articleId={value.id} arrayFromDatabase={props.arrayFromDatabase} leftoverArticles={props.leftoverArticles} fullDatabaseCall={props.fullDatabaseCall}/>    

                <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                    <SwipeableListItem 
                        
                        swipeLeft={{
                            content: <SwipeLeftContent 
                                    id={value.id} 
                                    title={value.title} 
                                    author={value.author} 
                                    text={value.text} 
                                    closePopup={closePopup} 
                                    headerImage={value.id} />,
                            action: () => swipeLeftAction(value.text, value.id) 
                        }}
                        
                        swipeRight={{
                            content: <div>Hiding article...</div>, 
                            action: () => swipeRightAction(value.id, props.postsArray)
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