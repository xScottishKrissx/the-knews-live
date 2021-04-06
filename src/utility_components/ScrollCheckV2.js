import React from 'react';

import fire from '../fire.js';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import HideArticle from '../utility_components/hide-article/hide-article.js';
import CheckCache from '../utility_components/checkCache.js';

import SwipeLeftContent from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';



class ScrollCheckV2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            arrayStartState: 0,
            arrayEndState: 5,
            origin: props.origin,
            // dbRef: props.databaseReference,
            mainArray:[]
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scroll);      

        const editedArticlesArray = JSON.parse(localStorage.getItem("editedArticleArray"));
        // console.log(editedArticlesArray)
        if(editedArticlesArray != null)this.setState({articlesArray:editedArticlesArray})

        if(this.state.origin === undefined){
            this.setState({
                articlesArray: this.props.articlesArray
            })
        }else{
            console.log("On Tags Page")
        }

        // console.log(JSON.parse(localStorage.getItem("editedArticleArray")))
        // console.log(JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")))
        // console.log(JSON.parse(localStorage.getItem("testNewArticlesOnRender")))
    }

    scroll = () => {

        // A bunch of stuff used to detect the current scroll position...
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        // ...this is what is actually used.
        const windowBottom = windowHeight + window.pageYOffset;
    
        // Grabbing the articles used for the on scroll event. If the event has been triggered and an article has been hidden then I used the array in local storage, if not then I use the default leftover article array from props.
        const editedArticlesArray = JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")) || this.props.leftoverArticles;

        if(windowBottom >= docHeight){
            console.log("Load New Articles")
            
            // console.log(editedArticlesArray)

            // Get the articles that should be rendered on scroll...
            // console.log(editedArticlesArray.splice(0,5))

            // Then join with the main array
            const renderNewArticlesOnScroll = this.state.mainArray.concat(editedArticlesArray.slice(this.state.arrayStartState,this.state.arrayEndState));
            console.log(renderNewArticlesOnScroll)

            // Setting state will then update the page with the new articles attached to the end of the array.
            this.setState({
                mainArray:renderNewArticlesOnScroll,
                arrayStartState: this.state.arrayStartState + 5,
                arrayEndState: this.state.arrayEndState + 5
            })    
        }else{
            // console.log("Not At Bottom Yet")
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
      }

    render(){
        // console.log("Render Scroll Check")
        const mainArray = this.state.mainArray;
        console.log(this.props.leftoverArticles)
        // Load new Articles into view on scroll.
        const pageView = mainArray.map((value,key) => {
        
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

                    <HideArticle 
                        articleId={value.id} 
                        scrollCheckHide={mainArray}
                        arrayFromDatabase={this.props.articlesArray}
                        leftoverArticles={this.props.leftoverArticles}
                        />    

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
                                        pageId={value.key}
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

export default ScrollCheckV2;