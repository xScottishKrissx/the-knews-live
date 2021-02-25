import React from 'react';

import fire from '../fire.js';


import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
// import NewsItemLoopView from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/news-item-loop-view.js';
// import RenderCards from './render-cards-unused/renderCards.js';
import HideArticle from '../utility_components/hide-article/hide-article.js';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import CheckCache from './checkCache.js';
import SwipeLeftContent from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';

class ScrollCheck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            arrayStartState: 5,
            arrayEndState: 10,
            test: props.tagState || props.authorState || props.postdateState,
            // test: this.props.location.state.tag,
            searchDBFor: props.searchDBFor,
            authorState:props.authorState,
            origin: props.origin,
            articlesArray2:[],     
            orderByChild:props.orderByChild,
            dbRef: props.databaseReference    
        }
    }
    componentDidMount(){
        window.addEventListener('scroll', this.scroll);

        // console.log("SearchDBFor -> " + this.state.searchDBFor)
        // console.log("Current Tag --> " + this.props.tagState)

        
        const articlesFromCache = localStorage.getItem("articlesArray")
        
        const parsedArticleArray = JSON.parse(articlesFromCache)

        this.setState({
            articleArray:parsedArticleArray
        })


        // console.log(this.state.authorState)

        // console.log("Order Database By 1 --> " + this.state.searchDBFor)
        // console.log("Order Database By 2 --> " + this.state.orderByChild)

        // console.log(this.state.dbRef)


        const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
        console.log(localStorageHiddenPosts)
    }

    scroll = () => {
       
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);

        const windowBottom = windowHeight + window.pageYOffset + 100;
        // console.log("windowBottom " + windowBottom)
        // console.log("Window.PageYOffset " + window.pageYOffset)

        // const windowBottom = windowHeight + window.pageYOffset;

        if(windowBottom >= docHeight){
            // console.log("SearchDBFor -> " + this.state.searchDBFor || this.state.authorState)
            // console.log("SearchDBFor -> " + this.state.authorState)
            // console.log(this.state.searchDBFor)
            // console.log("Post Date State --> " + this.state.postdateState)
            
            // console.log("Order Database By --> " + this.state.orderByChild)
            // const getNewArticlesUsing = this.state.authorState || this.state.searchDBFor;
            // console.log(getNewArticlesUsing)


            // const dbRef = fire.database().ref('items').orderByChild(this.state.orderByChild).startAt(getNewArticlesUsing).endAt(getNewArticlesUsing)
           
                const dbRef = this.state.dbRef;
           dbRef.on('value', (snapshot) => {
               let newsItems = snapshot.val();
               let newState = [];
               for(let newsItem in newsItems){
                   newState.push({
                       key: newsItem,
                       author: newsItems[newsItem].author,
                       title: newsItems[newsItem].title,
                       id:newsItems[newsItem].id,
                       tag:newsItems[newsItem].tag,
                       text:newsItems[newsItem].text

                   });
               }
               
               



                const arrayStart = this.state.arrayStartState;
                const arrayEnd = this.state.arrayEndState;
                this.setState({               
                articlesArray2: newState.slice(arrayStart,arrayEnd),
                arrayStartState: this.state.arrayStartState + 5,
                arrayEndState: this.state.arrayEndState + 5
                })

                const renderNewArticlesOnScroll = this.state.articlesArray.concat(this.state.articlesArray2);
                this.setState({
                    articlesArray:renderNewArticlesOnScroll
                })    



        //How about instead of hiding artcles after they load, I remove them before they render by removing them from the array?

        // So the idea is to loop through the list of hidden posts and check that against the articles array. Then remove anything that matches before feeding it to the render.

        // Should do this in the the main view but will also be ideal for getting this to work on scroll.
                // console.log(this.state.articlesArray[0].id)
                // // console.log(localStorage.getItem("hiddenPostList"))   
                // const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
                // const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number) 
                // console.log(this.state.articlesArray[0].id)
                // console.log(formattedPostsArray)
                // for(var i = 0; i < this.state.articlesArray.length; i++){
                //     console.log(i)
                //     if(this.state.articlesArray[i].id === 546){
                //         console.log("Match!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                //     }
                //     else{
                //         // console.log("No")
                //         console.log("this.state.articles: " + this.state.articlesArray[i].id)
                //         console.log("formatted posts array: " + formattedPostsArray[i])
                //     }
                // }
                
           })
            console.log("Bottom Reached")
        }else{
            // console.log("Not At Bottom Yet")
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
      }

    render(){
        // console.log(this.state.articlesArray3)
        // console.log(this.state.articlesArray)
        const new1 = this.state.articlesArray;
        
        //How about instead of hiding artcles after they load, I remove them before they render by removing them from the array?

        
        


        // Load new Articles into view on scroll.
        const pageView = new1.map((value,key) => {
            // console.log(this.state.articlesArray[0].author)   
        
        // <RenderCards id={value.id} />
        
            const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
            const style = {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "400px",
            }   
            return(            
                
                <div id={value.id} key={value.id} className="myClass">   
                    <div className='news-square'  key={key} id={value.id}>    
                    <CheckCache id={value.id} />
                    <HideArticle articleId={value.id}/>    
                                    
                    <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                        <SwipeableListItem 
                            
                            swipeLeft={{
                                content: <SwipeLeftContent 
                                        id={value.id} 
                                        title={value.title} 
                                        author={value.author} 
                                        text={value.text} 
                                        closePopup={this.closePopup} 
                                        headerImage={value.id} />,
                                action: () => this.swipeLeftAction(value.text, value.id) 
                            }}
                            
                            swipeRight={{
                                content: <div>Hiding article...</div>, 
                                action: () => this.swipeRightAction(value.id)
                            }}
                        >
                                
                                <div className='news-square'  key={key}  
                                style={ this.state.startingCardSize || this.state.changedCardSize } >                    
                                    <Caption 
                                        pageid={value.key}
                                        style={style}
                                        title={value.title}
                                        author={value.author}
                                        likes={value.likes}
                                        dislikes={value.dislikes}
                                        articleId={value.id}
                                        />
                                </div>
                        
                        </SwipeableListItem>
                        </SwipeableList>
                            
                    </div>
                </div>
                
            )
        })

        return(
            
            <React.Fragment>
                {pageView}
                {/* <NewsItemLoopView databaseProp={new1} /> */}
                
                   
            </React.Fragment>
            
        )
    }
}

export default ScrollCheck;