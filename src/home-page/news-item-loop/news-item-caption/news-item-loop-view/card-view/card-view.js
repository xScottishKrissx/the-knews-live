import React from 'react';

import './card-view.css';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import HeaderImage from '../../../../../news-page/news-page-view/header-image/header-image.js'
import Caption from '../../../news-item-caption/news-item-caption.js';
import CustomCardSize from '../../../custom-tile-size/custom-card-size.js';


class CardView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            postsArray:[],
            startingCardSize:"",
            changedCardSize:{width: localStorage.getItem("myData")}, 
            size:"medium"
        }
        this.getCardSize = this.getCardSize.bind(this);

        this.makeCardBigger = this.makeCardBigger.bind(this);
    }
    getCardSize(value){
        this.setState({
            startingCardSize:{
                width:value
            },
            changedCardSize:{
                    width:"300rem"
            }
        })
    }

    makeCardBigger(value){
        this.setState({
            size:"small"
        })
        console.log("Make " + value)
        console.log("this.state.size is:: " + this.state.size)
    }


    swipeLeftAction(text,id){
        document.getElementById("popup" + id).style.display = "block";
        document.getElementById("articlePopupBackground"  + id).style.display = "block";
        document.body.style.overflow = "hidden";       
    }
    closePopup(id){
        document.getElementById("popup" + id).style.display = "none";
        document.getElementById("articlePopupBackground" + id).style.display = "none";            
        document.body.style.overflow = "auto"
    }

    swipeRightAction(id){
        document.getElementById(id).style.display = "none";
        this.state.postsArray.push(id)
        localStorage.setItem("hiddenPostList", this.state.postsArray);
    }

    render(){
        const id = this.props.id;
        const title = this.props.title;
        const author = this.props.author;
        const text = this.props.text;
        const articleKey = this.props.articleKey;
        const likes = this.props.likes;
        const dislikes = this.props.dislikes;

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

        console.log(localStorage.getItem("myData"))

        return(
            
            <div>
                <span className="hideArticleBtn" onClick={() => this.swipeRightAction(id)}>Hide</span>
                <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                        <SwipeableListItem 
                            
                            swipeLeft={{
                                
                            content: 
                            <div>
                                <div className="articlePopupBackground" id={"articlePopupBackground" + id} onClick={()=> this.closePopup(id)} ></div>
                                    <div className="article-popup" id={"popup" + id}>
                                    
                                        {/* <img src="https://the-knews.s3.eu-west-2.amazonaws.com/027+-+0fVAsZf.jpg" /> */}
                                        <HeaderImage props={id} />
                                        <p>{title}</p>
                                        <p>{author}</p>
                                        <p>{text}</p>
                                    
                                        <button onClick={()=> this.closePopup(id)}>    
                                            <span>Close Popup</span>
                                        </button>
                                    </div>
                                </div>,

                            action: () => this.swipeLeftAction(text, id)
                            }}
                            
                            swipeRight={{
                            content: <div>Hiding article...</div>,
                            action: () => this.swipeRightAction(id),
                            }}>
                                
                                <div className={'news-square' + ' ' + this.state.size} key={articleKey}  
                                style={this.state.startingCardSize || this.state.changedCardSize  } 
                                                           >                    
                                    <Caption 
                                        pageid={articleKey} 
                                        style={style} 
                                        title={title}
                                        author={author}
                                        likes={likes}
                                        dislikes={dislikes}    
                                        />
                                </div>
                            
                        
                        </SwipeableListItem>
                        </SwipeableList>
                        <CustomCardSize 
                            getCardSizeToParent={() => this.getCardSize} 
                            toParent={this.makeCardBigger}/>
            </div>
        )
    }
}

export default CardView

  