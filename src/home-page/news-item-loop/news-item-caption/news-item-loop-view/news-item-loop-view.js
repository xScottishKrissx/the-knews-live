import React from 'react';
import fire from '../../../../fire.js'
import '../news-item-loop-view/news-item-loop-view.css';
import Caption from '../../news-item-caption/news-item-caption.js';
import CustomCardSize from '../../custom-tile-size/custom-card-size.js';


import HideArticle from '../../../../utility_components/hide-article/hide-article';
import ScrollCheck from '../../../../utility_components/ScrollCheck';
import RenderCards from '../../../../utility_components/render-cards-unused/renderCards.js';
import RenderCardStyle from '../../../../utility_components/render-cards-unused/renderCardStyles.js';
import CheckCache from '../../../../utility_components/checkCache.js';

// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import SwipeLeftContent from './swipe-views/article-modal.js';
import swipeLeftAction from '../../../../utility_components/swipeLeftAction.js';
import swipeRightAction from '../../../../utility_components/swipeRightAction.js';
import closePopup from '../../../../utility_components/closePopup.js';

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

    componentWillUnmount(){
        fire.database().ref("items").off();
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
            
            return (         
                <div id={value.id} key={value.id} className="myClass">                   
                    {/* <span className="hideArticleBtn" onClick={() => this.swipeRightAction(value.id)}>Hide</span>        */}
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
                                
                                <div className='news-square'  key={key}  name="news-item-loop-view.js"
                                style={ this.state.startingCardSize || this.state.changedCardSize} >                    
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
                      
            );
            
      }) 
        return(
            
            <div className="newsItemLoopViewWrapper">
                
                {HomePageView}
                <ScrollCheck 
                    databaseReference={fire.database().ref('items').orderByKey().limitToFirst(100) }
                    swipeLeftAction={swipeLeftAction}
                    closePopup={closePopup}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    
                    />
                <CustomCardSize getCardSizeToParent={this.getCardSize} />
            </div>
        )
    }
}

export default NewsItemLoopView;