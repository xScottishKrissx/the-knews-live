import React from 'react'
import './renderCard.css';
// Things needed for map items test
// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import swipeRightAction from '../swipeRightAction.js';
import swipeLeftAction from '../swipeLeftAction.js';

import Caption from '../../home-page/news-item-loop/news-item-caption/news-item-caption.js';

import OnCardBookMarkControls from '../bookmarks/onCardBookmarkControls';
import createBookmark from '../bookmarks/createBookmark';


class RenderCardState extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    swipeLeftAction(id,b,database,bookmarked){
        // this.setState({bookmarked:b})
        createBookmark(id,database)
        // this.setState({bookmarked:b})
        // console.log(this.props.database)
        // console.log(bookmarked)
        
        const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        this.props.testThing(articles)
    }
    // console.log(this.props.database.length)
    render(){
        // const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        // console.log(articles)
        console.log(this.props.database[0])
    const pageView = this.props.database.map((value,key) => {
        
        // console.log(this.props.hideBookmarkedArticle)
        // console.log(this.props.loadingProgress)
        // console.log(value.bookmarked)
        return(              
            <div id={value.id} key={value.id} className="myClass" name="original-tags-load">   
    
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
 
                />
               
               <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                    <SwipeableListItem                    
                        
                        swipeLeft={{
                            content:<div>Bookmarking Article..{this.props.showProgress}</div>,
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
                            
                    
                    </SwipeableListItem>
                </SwipeableList>

           
            </div>
            
        )
    })

    
    return pageView;
}   
}

export default RenderCardState