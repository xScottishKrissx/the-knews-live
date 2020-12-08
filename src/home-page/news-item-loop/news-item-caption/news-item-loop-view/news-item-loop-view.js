import React from 'react';
import fire from '../../../../fire.js'
// import '../news-item-loop/news-item-loop.css';
import '../../../news-item-loop/news-item-loop.css';

import Caption from '../../news-item-caption/news-item-caption.js';

import HeaderImage from '../../../../news-page/news-page-view/header-image/header-image.js';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

class NewsItemLoopView extends React.Component{


    constructor(props){
        super(props);
        this.state = {
        // Card Size
        startingCardSize:"",
        changedCardSize:{width: localStorage.getItem("myData")},

        postsArray:[],
        }
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
        
        console.log("Post Disappearing is Post:: " + id)
        console.log(this.state.postsArray)
        document.getElementById(id).style.display = "none";
        
        this.state.postsArray.push(id)
        localStorage.setItem("hiddenPostList", this.state.postsArray);

        console.log(localStorage.getItem("hiddenPostList"));

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
                
                <div id={value.id} key={value.id} className="myClass">
                
                    
                    <span className="hideArticleBtn" onClick={() => this.swipeRightAction(value.id)}>Hide</span>
                    
                    
                    <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                        <SwipeableListItem 
                            
                            swipeLeft={{
                                
                            content: 
                            <div>
                                <div className="articlePopupBackground" id={"articlePopupBackground" + value.id} onClick={()=> this.closePopup(value.id)} ></div>
                                    <div className="article-popup" id={"popup" + value.id}>
                                    
                                        {/* <img src="https://the-knews.s3.eu-west-2.amazonaws.com/027+-+0fVAsZf.jpg" /> */}
                                        <HeaderImage props={value.id} />
                                        <p>{value.title}</p>
                                        <p>{value.author}</p>
                                        <p>{value.text}</p>
                                    
                                        <button onClick={()=> this.closePopup(value.id)}>    
                                            <span>Close Popup</span>
                                        </button>
                                    </div>
                                </div>
                                
,

                            action: () => this.swipeLeftAction(value.text, value.id)
                            }}
                            
                            swipeRight={{
                            content: <div>Hiding article...</div>,
                            action: () => this.swipeRightAction(value.id),
                            }}
    
                        >
                                
                                <div className='news-square'  key={key}  
                                style={this.state.startingCardSize || this.state.changedCardSize
                                } >                    
                                    <Caption 
                                        pageid={value.key} 
                                        style={style} 
                                        title={value.title}
                                        author={value.author}
                                        likes={value.likes}
                                        dislikes={value.dislikes}    
                                        />
                                </div>
                            
                        
                        </SwipeableListItem>
                        </SwipeableList>
                </div>
                        
            );
            
      }) 
        return(
            <div className="test1">{HomePageView}</div>
        )
    }
}

export default NewsItemLoopView;