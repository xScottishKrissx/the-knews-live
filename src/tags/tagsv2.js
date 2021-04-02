import React from 'react';
import fire from '../fire.js';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import NavControls from '../utility_components/navControls.js';
import '../tags/tags.css';
import CustomCardSize from '../home-page/news-item-loop/custom-tile-size/custom-card-size.js';
import ScrollCheck from '../utility_components/ScrollCheck.js';

// Working with Cache 
import ClearCache from '../utility_components/ClearCache.js';
import CheckCache from '../utility_components/checkCache.js';
import HideArticle from '../utility_components/hide-article/hide-article.js';

// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import SwipeLeftContent from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';
import swipeLeftAction from '../utility_components/swipeLeftAction.js';
import closePopup from '../utility_components/closePopup.js';
import swipeRightAction from '../utility_components/swipeRightAction.js';
import ScrollCheckV2 from '../utility_components/ScrollCheckV2.js';



class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            searchDBFor: this.props.location.state.searchDBFor,
            
            // Hiding Posts
            postsArray:[],

            // Custom Card Size
            startingCardSize:"",
            changedCardSize:{width: localStorage.getItem("myData")},       
            
        }
        this.getCardSize = this.getCardSize.bind(this);
    }

    // There must be a way to only have one of these across the entire project.
    getCardSize(value){
        this.setState({
            startingCardSize:{
                width:value
            }
        })
    }

    componentDidMount(){
        console.log(this.state.articlesArray)

        // console.log("Search Database For:: " + this.state.searchDBFor)



        // console.log(localStorage.getItem("unchangedFullDatabaseCall"))
        // Grab an array to be filtered, either the edited articles array or a fresh database call.
        // There are issues when it comes to hiding articles but let's get the page working in the first place.



        //  I need to get the 2 separate arrays - The Initial load and the leftover articles after editing.
        // console.log(JSON.parse(localStorage.getItem("editedArticleArray")))
        // console.log(JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")))

        // ...join those 2 arrays together
        if(JSON.parse(localStorage.getItem("editedArticleArray")) === null){
            console.log("handle null")
        }
        const combinedEditedArrayFromStorage = JSON.parse(localStorage.getItem("editedArticleArray")).concat(JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")));
        // console.log(combinedEditedArrayFromStorage)


        //.. use that joined array as the reference for tags or grab a fresh database call.
        const mainArray = combinedEditedArrayFromStorage || JSON.parse(localStorage.getItem("unchangedFullDatabaseCall"));
        console.log(mainArray)


        // Filter for the correct tag
        const key = this.state.searchDBFor;
        var filteredTagArray = mainArray.filter(obj => obj.tag == key);
        console.log(filteredTagArray)
        // console.log(filteredTagArray.slice(21))

        // store the array with the articles into state.
        this.setState({
            articlesArray:filteredTagArray.slice(0,19),
            leftoverArticles:filteredTagArray.slice(21)
        })
        console.log(this.state.articlesArray)
    }

    clickyButton(){
        console.log("Refresh Something")
    }
   


    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
      }

    render(){
        console.log("Render Tags.v2")
        console.log(this.state.articlesArray)
        console.log(this.state.leftoverArticles)

        const mapTags = this.state.articlesArray;
        // console.log(this.props.location.state.tag3)
        console.log(mapTags)

        const pageView = mapTags.map((value,key) => {
            return(
                
                   
                <div id={value.id} key={value.id} className="myClass" name="original-tags-load">   
                    
                    <CheckCache id={value.id}/>

                    <HideArticle articleId={value.id}/>    

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
                                action: () => swipeRightAction(value.id, this.state.postsArray)
                            }}
                        >
                                
                                <div className='news-square' name="tags-original-load-news"  key={key}  
                                style={ this.state.startingCardSize || this.state.changedCardSize } >                    
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

        return(
            
            <div className="tags-wrapper">
                <div className="tags-item-wrapper">
                        <ClearCache />


                        <NavControls props="only-home-button"/>
                        {this.props.location.state.author === undefined ?
                        <h1>Showing articles from {this.props.location.state.searchDBFor}</h1>
                        : 
                        <h1>Showing articles from {this.props.location.state.author}</h1>
                        }              
                        
                        {pageView}

                        <ScrollCheckV2 
                            leftoverArticles={this.state.leftoverArticles}
                        />
                </div>
                <CustomCardSize getCardSizeToParent={this.getCardSize}/>
            </div>
            
            
        )
    }
}
export default Tags;