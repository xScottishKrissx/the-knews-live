import React from 'react';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import SwipeLeftContent from '../../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/swipe-left-content.js';


import HideArticle from '../hide-article/hide-article.js';
import Caption from '../../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import RenderCardStyle from './renderCardStyles.js';
import CustomCardSize from '../../home-page/news-item-loop/custom-tile-size/custom-card-size.js';



class RenderCards extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id:props.id,
            title: props.title,
            author: props.author,
            text: props.text,
            likes: props.likes,
            dislikes: props.dislikes,
            closePopup: props.closePopup,
            headerImage:props.id,
            key: props.key,
            key2: props.key2,
            startingCardSize: props.startingCardSize,
            changedCardSize: props.changedCardSize,

            startingCardSize:"",
            changedCardSize:{width: localStorage.getItem("myData")},
            postsArray:[],
            // style: props.style
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


        const id = this.state.id;
        const title = this.state.title;
        const author = this.state.author;
        const text = this.state.text;
        const likes = this.state.likes;
        const dislikes = this.state.dislikes;
        const closePopup = this.state.closePopup;
        const headerImageId = this.props.id
        const key = this.state.key;
        const key2 = this.state.key2;
        const startingCardSize = this.state.startingCardSize;
        const changedCardSize = this.state.changedCardSize;
        // const style = this.state.style;

        // There is probably a better way of doing this...
        const imgUrl = "https://unsplash.it/500/200?random=" + id;
        ///... and this.
        const style = {
            backgroundImage: 'url(' + imgUrl + ')',
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "400px",
            // width:"100%"
        }   
        return(
           
            <div id={id} key={id} className="myClass">                   
                    {/* <span className="hideArticleBtn" onClick={() => this.swipeRightAction(value.id)}>Hide</span>        */}
                    <CustomCardSize getCardSizeToParent={this.getCardSize} />
                    <HideArticle articleId={id}/> 
                    

                    <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                        <SwipeableListItem 
                            
                            swipeLeft={{
                                content: <SwipeLeftContent 
                                        id={id} 
                                        title={title} 
                                        author={author} 
                                        text={text} 
                                        closePopup={this.closePopup} 
                                        headerImage={headerImageId} />,
                                action: () => this.swipeLeftAction(text, id) 
                            }}
                            
                            swipeRight={{
                                content: <div>Hiding article...</div>, 
                                action: () => this.swipeRightAction(id)
                            }}
                        >
                                
                                <div className='news-square'  key={key}  
                                style={startingCardSize || changedCardSize } >                    
                                    <Caption 
                                        pageid={key2}
                                        style={style}
                                        title={title}
                                        author={author}
                                        likes={likes}
                                        dislikes={dislikes}
                                        articleId={id}
                                        />
                                        
                                </div>
                        
                        </SwipeableListItem>
                        </SwipeableList>
                        
                </div>
        )
        
    }
    
}

export default RenderCards;