import React from 'react';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import SwipeLeftContent from '../../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';


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
        // this.getCardSize = this.getCardSize.bind(this);
    }

    render(){

        const imgUrl = "https://unsplash.it/500/200?random=" + this.state.id;
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
           
                  
            <div className='news-square' name="render-cards.js" key={this.state.key} id={this.state.id}>    
                
            <HideArticle articleId={this.state.id}/>                
            <Caption 
                pageid={this.state.key2} 
                style={style} 
                title={this.state.title}
                author={this.state.author}
                likes={this.state.likes}
                dislikes={this.state.dislikes}
            />           
        </div>                                
        )
    }
}

// export default RenderCards;