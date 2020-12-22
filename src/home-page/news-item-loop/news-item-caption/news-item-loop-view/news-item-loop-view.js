import React from 'react';
import fire from '../../../../fire.js'
import '../news-item-loop-view/news-item-loop-view.css';
import Caption from '../../news-item-caption/news-item-caption.js';
import CustomCardSize from '../../custom-tile-size/custom-card-size.js';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import SwipeLeftContent from '../news-item-loop-view/swipe-views/swipe-left-content.js';
import HideArticle from '../../../../utility_components/hide-article/hide-article';
import ScrollCheck from '../../../../utility_components/ScrollCheck';


class NewsItemLoopView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        // Card Size
        startingCardSize:"",
        changedCardSize:{width: localStorage.getItem("myData")},
        postsArray:[],
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

    swipeLeftAction(text,id){
        document.getElementById("popup" + id).style.display = "block";
        document.getElementById("articlePopupBackground"  + id).style.display = "block";
        document.body.style.overflow = "hidden";       
    }
        closePopup = (id) => {
            document.getElementById("popup" + id).style.display = "none";
            document.getElementById("articlePopupBackground" + id).style.display = "none";            
            document.body.style.overflow = "auto";
            console.log(id)
        }

    swipeRightAction(id){   
        // console.log("Post Disappearing is Post:: " + id)
        // console.log(this.state.postsArray)
        document.getElementById(id).style.display = "none";
        this.state.postsArray.push(id)
        localStorage.setItem("hiddenPostList", this.state.postsArray);
        // console.log(localStorage.getItem("hiddenPostList"));
    }

    render(){
        const HomePageView = this.props.databaseProp.map((value,key) => {           
            // There is probably a better way of doing this...
            const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
            ///... and this.
            const style = {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "400px",
                // width:"100%"
            }    
            
            // This is checking to see if there are hidden posts in cache. If there are then they're set to be hidden before render.
            console.log("Home Page Hidden Post List -> " + localStorage.getItem("hiddenPostList"));
            const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
            const checkExist = setInterval(function() {
                if (!!localStorageHiddenPosts && document.getElementById(value.id)) {
                console.log("Exists!");
                clearInterval(checkExist);
                const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)

                    for(var i = 0; i < formattedPostsArray.length; i++){
                        if(!!formattedPostsArray && formattedPostsArray[i].toString() === value.id.toString()){
                            // console.log("Hidden Post Identified")
                            document.getElementById(value.id).style.display = "none";
                            console.log("Success: " + value.id + " hidden");
                            console.log(formattedPostsArray[i]);
                        }
                    }        

                }
            }, 100); // check every 100ms

            return (         
                
                // <RenderCards />
                
                <div id={value.id} key={value.id} className="myClass">                   
                    {/* <span className="hideArticleBtn" onClick={() => this.swipeRightAction(value.id)}>Hide</span>        */}

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
                      
            );
            
      }) 
        return(
            
            <div className="newsItemLoopViewWrapper">
                
                {HomePageView}
                <ScrollCheck databaseReference={fire.database().ref('items').orderByKey().limitToFirst(100) } />
                <CustomCardSize getCardSizeToParent={this.getCardSize} />
            </div>
        )
    }
}

export default NewsItemLoopView;