import React from 'react';

import fire from '../fire.js';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import NewsItemLoopView from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/news-item-loop-view.js';
import RenderCards from './render-cards-unused/renderCards.js';
import HideArticle from '../utility_components/hide-article/hide-article.js';
import CheckCache from '../utility_components/checkCache.js';
import SwipeLeftContent from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';
import CustomCardSize from '../home-page/news-item-loop/custom-tile-size/custom-card-size.js';


class ScrollCheck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            arrayStartState: 10,
            arrayEndState: 15,
            test: props.tagState || props.authorState || props.postdateState,
            // test: this.props.location.state.tag,
            searchDBFor: props.searchDBFor,
            authorState:props.authorState,
            origin: props.origin,
            articlesArray2:[],     
            orderByChild:props.orderByChild,
            dbRef: props.databaseReference,

            // Custom Card Size
            startingCardSize:"",
            changedCardSize:{width: localStorage.getItem("myData")}

        }
        this.getCardSize = this.getCardSize.bind(this);
        
    }
    getCardSize(value){
        this.setState({
            startingCardSize:{
                width:value
            }
        })
    }


    componentDidMount(){
        window.addEventListener('scroll', this.scroll);

        // console.log("SearchDBFor -> " + this.state.searchDBFor)
        // console.log("Current Tag --> " + this.props.tagState)

        
        const articlesFromCache = localStorage.getItem("articlesArray")
        
        const parsedArticleArray = JSON.parse(articlesFromCache)

        console.log(parsedArticleArray)
        this.setState({
            articlesArray:parsedArticleArray
        })
        console.log(this.state.articlesArray)

        // console.log(this.state.authorState)

        // console.log("Order Database By 1 --> " + this.state.searchDBFor)
        // console.log("Order Database By 2 --> " + this.state.orderByChild)

        // console.log(this.state.dbRef)
        console.log(localStorage.getItem("myData"));
    }

    scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset + 10;
        // console.log("windowBottom " + windowBottom)
        // console.log("Window.PageYOffset " + window.pageYOffset)
          
        if(windowBottom >= docHeight){
            // console.log("SearchDBFor -> " + this.state.searchDBFor || this.state.authorState)
            // console.log("SearchDBFor -> " + this.state.authorState)
            // console.log(this.state.searchDBFor)
            // console.log("Post Date State --> " + this.state.postdateState)
            
            // console.log("Order Database By --> " + this.state.orderByChild)
            // const getNewArticlesUsing = this.state.authorState || this.state.searchDBFor;
            // console.log(getNewArticlesUsing)


            // const dbRef = fire.database().ref('items').orderByChild(this.state.orderByChild).startAt(getNewArticlesUsing).endAt(getNewArticlesUsing)
           console.log(this.state.articlesArray)
            const dbRef = this.state.dbRef;
           dbRef.on('value', (snapshot) => {
               let newsItems = snapshot.val();
               let newState = [];
               for(let newsItem in newsItems){
                   newState.push({
                       key: newsItem,
                       author: newsItems[newsItem].author,
                       title: newsItems[newsItem].title,
                       text: newsItems[newsItem].text,
                       id:newsItems[newsItem].id,
                       tag:newsItems[newsItem].tag
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
                console.log(renderNewArticlesOnScroll)
                this.setState({
                    articlesArray:renderNewArticlesOnScroll
                })    
                // console.log(this.state.articlesArray)       
           })
            console.log("Bottom Reached")
        }else{
            console.log("Not At Bottom Yet")
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
        // console.log(new1)
        
        // Load new Articles into view on scroll.
        const pageView = new1.map((value,key) => {
            
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
                
                <div id={value.id} key={value.id} className="myClass" name="new-articles">   

                    <div className='news-square'  key={key} id={value.id}>    
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
                                        closePopup={this.props.closePopup} 
                                        headerImage={value.id} />,
                                action: () => this.props.swipeLeftAction(value.text, value.id) 
                            }}
                            
                            swipeRight={{
                                content: <div>Hiding article...</div>, 
                                action: () => this.swipeRightAction(value.id)
                            }}
                        >
                                
                                <div className='news-square'  key={key}  
                                style={ this.props.startingCardSize || this.props.changedCardSize } >                    
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

                        {/* <Caption 
                            pageid={value.key} 
                            style={style} 
                            title={value.title}
                            author={value.author}
                            likes={value.likes}
                            dislikes={value.dislikes}
                            
                            /> */}
                            
                    </div>
                </div>
                
            )
        })

        return(
            
            <React.Fragment>
                {pageView}
                {/* <NewsItemLoopView databaseProp={new1} /> */}
               
            {/* <CustomCardSize getCardSizeToParent={this.getCardSize} />        */}
            </React.Fragment>
            
            
        )
    }
}

export default ScrollCheck;