import React from 'react';
import '../news-item-loop-view/news-item-loop-view.css';

import CustomCardSize from '../../custom-tile-size/custom-card-size.js';
import CardView from './card-view/card-view';

class NewsItemLoopView extends React.Component{


    constructor(props){
        super(props);
        this.state = {
        // Card Size
        // startingCardSize:"",
        // changedCardSize:{width: localStorage.getItem("myData")},        
        }

        // this.getCardSize = this.getCardSize.bind(this);

    }

    // getCardSize(value){
    //     this.setState({
    //         startingCardSize:{
    //             width:value
    //         }
    //     })
    // }

    render(){
        const HomePageView = this.props.databaseProp.map((value,key) => {           
  

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
                    
                    <CardView 
                        id={value.id}
                        title={value.title}
                        author={value.author}
                        text={value.text}
                        articleKey={value.key}
                        likes={value.likes}
                        dislikes={value.dislikes}
                    />
                    
                </div>
                        
            );
            
      }) 
        return(
            
            <div className="newsItemLoopViewWrapper">
                {HomePageView}
                {/* <CustomCardSize getCardSizeToParent={this.getCardSize}/> */}
            </div>
        )
    }
}

export default NewsItemLoopView;