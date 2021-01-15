import React from 'react';

import fire from '../fire.js';


import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import NewsItemLoopView from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/news-item-loop-view.js';
import RenderCards from './render-cards-unused/renderCards.js';
import HideArticle from '../utility_components/hide-article/hide-article.js';

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

        console.log(this.state.dbRef)
    }

    scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
          
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
                this.setState({
                    articlesArray:renderNewArticlesOnScroll
                })    
                console.log(this.state.articlesArray)       
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
                
                <div id={value.id} key={value.id} className="myClass">   
                    <div className='news-square'  key={key} id={value.id}>    
                    <HideArticle articleId={value.id}/>    
                                    
                        <Caption 
                            pageid={value.key} 
                            style={style} 
                            title={value.title}
                            author={value.author}
                            likes={value.likes}
                            dislikes={value.dislikes}
                            
                            />
                            
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