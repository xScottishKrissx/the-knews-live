import React from 'react';
import fire from '../../../../fire.js'
import '../news-item-loop-view/news-item-loop-view.css';
import Caption from '../../news-item-caption/news-item-caption.js';
import CustomCardSize from '../../custom-tile-size/custom-card-size.js';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import SwipeLeftContent from './swipe-views/article-modal.js';
import HideArticle from '../../../../utility_components/hide-article/hide-article';
import ScrollCheck from '../../../../utility_components/ScrollCheck';
// import RenderCards from '../../../../utility_components/render-cards-unused/renderCards.js';
// import RenderCardStyle from '../../../../utility_components/render-cards-unused/renderCardStyles.js';
// import CheckCache from '../../../../utility_components/checkCache.js';


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
        // console.log(this.props.databaseProp)
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
            
            return (         
                <div id={value.id} key={value.id} className="myClass">                   
                    {/* <span className="hideArticleBtn" onClick={() => this.swipeRightAction(value.id)}>Hide</span>        */}
                    {/* <CheckCache id={value.id}/> */}
                    
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
                <ScrollCheck databaseReference={fire.database().ref('items').orderByKey().limitToFirst(10) } />
                <CustomCardSize getCardSizeToParent={this.getCardSize} />
            </div>
        )
    }
}

export default NewsItemLoopView;