import React from 'react';

import fire from '../fire.js';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import HideArticle from '../utility_components/hide-article/hide-article.js';
import CheckCache from '../utility_components/checkCache.js';

import SwipeLeftContent from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';



class ScrollCheck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            // The array start and end state should start depending on where the initial load call ends
            //  articlesArray: newState.slice(0,35)
            // example - newState.slice(0,20) ---> arrayStartState should start at 20 
            // arrayEndState --> Determines how many articles should load per bottom of window scroll.
            //  if you want 10 per load then it should be 10 higher than array start state.
            arrayStartState: 35,
            arrayEndState: 40,
            test: props.tagState || props.authorState || props.postdateState,
            searchDBFor: props.searchDBFor,
            authorState:props.authorState,
            origin: props.origin,
            articlesArray2:[],     
            orderByChild:props.orderByChild,
            dbRef: props.databaseReference,
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scroll);

        console.log(this.state.searchDBFor)
        console.log(this.state.origin)
        console.log(this.state.dbRef)
        console.log(this.state.articlesArray)
        
        const articlesFromCache = localStorage.getItem("articlesArray")
        // console.log(articlesFromCache)
        const parsedArticleArray = JSON.parse(articlesFromCache)

        this.setState({
            articlesArray:parsedArticleArray
        })
        console.log(this.state.articlesArray)

        if(this.state.articlesArray === null){
            console.log("Articles Array Empty")
        }
    }

    scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset + 10;

          
        if(windowBottom >= docHeight){
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
           })
            // console.log("Bottom Reached")
        }else{
            // console.log("Not At Bottom Yet")
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
        console.log(this.state.articlesArray)
      }

    render(){
        const new1 = this.state.articlesArray;
        if(this.state.articlesArray === null){
            console.log("Articles Array Empty")
        }
        console.log(new1)
        // Load new Articles into view on scroll.
        const pageView = new1.map((value,key) => {
        
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
                                
                                <div className='news-square' name="scroll-check.js" key={key}  
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