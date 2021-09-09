import React from 'react';

import fire from '../fire.js';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import HideArticle from '../utility_components/hide-article/hide-articlev2.js';
import CheckCache from '../utility_components/handleCache/checkCache.js';

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
            arrayStartState: 30,
            arrayEndState: 35,
            origin: props.origin,
            articlesArray2:[],     
            dbRef: props.databaseReference,

        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scroll);      
        const editedArticlesArray = JSON.parse(localStorage.getItem("editedArticleArray"));
        console.log(editedArticlesArray)
        
        if(editedArticlesArray != null)this.setState({articlesArray:editedArticlesArray})

        if(this.state.origin === undefined){
            this.setState({
                articlesArray: this.props.articlesArray
            })
        }else{
            console.log("On Tags Page")
        }

        console.log(this.state.dbRef)
  
        // Detect if scroll bar necessary
            // Still doesn't solve the issue of what happens when the initally loaded new articles are hidden, if there are no articles, then no scroll. 
        // const root = document.compatMode === 'BackCompat'? document.body : document.documentElement;
        // const isVerticalScrollbar = root.scrollHeight>root.clientHeight;
        // const isHorizontalScrollbar = root.scrollWidth>root.clientWidth;
        // console.log(isHorizontalScrollbar)
        // console.log(isVerticalScrollbar)


        // if(isVerticalScrollbar === false){
        //     this.scroll();
        // }
    }

    scroll = () => {


        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset + 5;
        
        // console.log("DocHeight:" + docHeight + " " + "WindowBottom: " + windowBottom)

 
        if(windowBottom >= docHeight){
            // if(windowBottom > 1200){
            const dbRef =  this.state.dbRef;
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
                console.log(this.state.articlesArray2)
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
      }

    render(){
        // console.log(JSON.parse(localStorage.getItem("editedArticleArray")))
        // console.log("Render Scroll Check")
        const articlesArray = this.state.articlesArray;
        console.log(articlesArray)
        

        // Load new Articles into view on scroll.
        const pageView = articlesArray.map((value,key) => {
        
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
            
            <React.Fragment>
                {pageView}
                {/* <NewsItemLoopView databaseProp={new1} /> */}
                
            </React.Fragment>
            
            
        )
    }
}

export default ScrollCheck;