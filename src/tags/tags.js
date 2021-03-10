import React from 'react';
import fire from '../fire.js';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import NavControls from '../utility_components/navControls.js';



import '../tags/tags.css';
import HideArticle from '../utility_components/hide-article/hide-article.js';
import ScrollCheckTags from '../utility_components/ScrollCheckTags.js';
import NewsItemLoopView from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/news-item-loop-view.js';
import ClearCache from '../utility_components/ClearCache.js';
import CheckCache from '../utility_components/checkCache.js';

// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import SwipeLeftContent from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';
import swipeLeftAction from '../utility_components/swipeLeftAction.js';
import closePopup from '../utility_components/closePopup.js';
import swipeRightAction from '../utility_components/swipeRightAction.js';
import CustomCardSize from '../home-page/news-item-loop/custom-tile-size/custom-card-size.js';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            test: this.props.location.state.tag || this.props.location.state.author || this.props.location.state.postdate,
            // test: this.props.location.state.tag,
            tagState: this.props.location.state.tag,
            searchDBFor: this.props.location.state.searchDBFor,
            origin: this.props.location.state.origin,

            orderByChild: this.props.location.state.orderByChild,

            getNewArticlesUsing: this.props.location.state.author || this.props.location.state.searchDBFor,
            
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
        console.log(this.state.origin)
        console.log(this.state.searchDBFor)
        console.log(this.state.orderByChild)

        // console.log(localStorage.getItem("articlesArray"))
        if(this.state.origin === "Article"){
            const dbRef = fire.database().ref('items')
                .orderByChild(this.state.searchDBFor)
                .startAt(this.state.test)
                .endAt(this.state.test);

            dbRef.on('value', (snapshot) => {
                let newsItems = snapshot.val();
                // console.log(newsItems);
                let newState = [];
                for(let newsItem in newsItems){
                    newState.push({
                        key: newsItem,
                        author: newsItems[newsItem].author,
                        title: newsItems[newsItem].title,
                        likes: newsItems[newsItem].likes,
                        dislikes: newsItems[newsItem].dislikes,
                        id:newsItems[newsItem].id,
                        tag:newsItems[newsItem].tag,
                        text:newsItems[newsItem].text
                    });
                }
                this.setState({
                    articlesArray: newState.slice(0,10)
                })
                // console.log(this.state.articlesArray)
                // localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
                window.addEventListener('scroll', this.scroll);
            })
        }

        if(this.state.origin === "Tagbar"){
           console.log("Origin is Tagbar")
            console.log("Search DB For --> " + this.props.location.state.searchDBFor)
            const dbRef = fire.database().ref('items')
                .orderByChild("tag")
                .startAt(this.props.location.state.searchDBFor)
                .endAt(this.props.location.state.searchDBFor)
                .limitToFirst(60)
                ;
            const dbref = fire.database().ref('items')
                            .orderByChild(this.state.orderByChild)
                            .startAt(this.state.getNewArticlesUsing)
                            .endAt(this.state.getNewArticlesUsing)
           
            dbRef.on('value', (snapshot) => {
                let newsItems = snapshot.val();
                // console.log(newsItems);
                let newState = [];
                for(let newsItem in newsItems){
                    newState.push({
                        key: newsItem,
                        author: newsItems[newsItem].author,
                        title: newsItems[newsItem].title,
                        likes: newsItems[newsItem].likes,
                        dislikes: newsItems[newsItem].dislikes,
                        id:newsItems[newsItem].id,
                        tag:newsItems[newsItem].tag,
                        text:newsItems[newsItem].text
                    });
                    // console.log(newState)
                }
    
                this.setState({
                    articlesArray: newState.slice(0,10)
                })
                // console.log(this.state.articlesArray)
                // localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
                // console.log(localStorage.getItem("articlesArray"))
                window.addEventListener('scroll', this.scroll);
            })
            console.log(this.state.articlesArray)
        }else{
            console.log("Something is wrong.")
        }
        console.log(this.state.articlesArray)

        // console.log("Current Tag --> " + this.state.tagState)
    }

   


    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
      }

    render(){
        const mapTags = this.state.articlesArray;
        
        console.log(mapTags)

        const pageView = mapTags.map((value,key) => {
            const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
            const style = {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "400px",
            }   

            // console.log("Home Page Hidden Post List -> " + localStorage.getItem("hiddenPostList"));
            // const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
            // const checkExist = setInterval(function() {
            //     if (!!localStorageHiddenPosts && document.getElementById(value.id)) {
            //     console.log("Exists!");
            //     clearInterval(checkExist);
            //     const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)

            //         for(var i = 0; i < formattedPostsArray.length; i++){
            //             if(!!formattedPostsArray && formattedPostsArray[i].toString() === value.id.toString()){
            //                 // console.log("Hidden Post Identified")
            //                 document.getElementById(value.id).style.display = "none";
            //                 console.log("Success: " + value.id + " hidden");
            //                 console.log(formattedPostsArray[i]);
            //             }
            //         }        

            //     }
            // }, 100); // check every 100ms

            

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
                                style={ this.state.startingCardSize || this.props.changedCardSize } >                    
                                    <Caption 
                                        pageid={value.key}
                                        style={style}
                                        title={value.title}
                                        author={value.author}
                                        likes={value.likes}
                                        dislikes={value.dislikes}
                                        articleId={value.id}
                                        tag={value.tag}
                                        />
                                </div>
                        
                        </SwipeableListItem>
                        </SwipeableList>


                </div>
                
            )
        })
        console.log(this.props.location.state.searchDBFor)
        console.log(this.props.location.state.origin)
        // console.log(this.state.articlesArray)
        console.log("Get New Articles Using --> " + this.state.getNewArticlesUsing)
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

                        {/* <NewsItemLoopView databaseProp={new1}/>           */}
                        {pageView}


                        <ScrollCheckTags 
                            tagState={this.props.location.state.tag}
                            authorState={this.props.location.state.author}
                            postdateState={this.props.location.state.postdate}
                            searchDBFor={this.props.location.state.searchDBFor}
                            origin={this.props.location.state.origin}
                            articlesArray={this.state.articlesArray}

                            orderByChild={this.state.orderByChild}
                            startAt={this.state.getNewArticlesUsing}

                            databaseReference = {
                                fire.database().ref('items').orderByChild(this.state.orderByChild).startAt(this.state.getNewArticlesUsing).endAt(this.state.getNewArticlesUsing)}
                         
                        /> 
                </div>
                <CustomCardSize getCardSizeToParent={this.getCardSize}/>
            </div>
            
            
        )
    }
}
export default Tags;