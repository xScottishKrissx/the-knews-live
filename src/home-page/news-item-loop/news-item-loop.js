import React from 'react';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';


import CustomCardSize from '../news-item-loop/custom-tile-size/custom-card-size.js';

import ScrollToTopButton from '../../utility_components/scrollToTop.js';






import NewsItemLoopView from './news-item-caption/news-item-loop-view/news-item-loop-view.js';

export const NewsItemLoop = () => {
    return <MapDatabaseItems />;    
}

class MapDatabaseItems extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // Article Information
                title: "",
                author: "",
                id: "",
                imgPath: "",
                key: "",
            // The Actual Article Array
                articlesArray : [],
                articlesArray2 : [],
                arrayStartState: 21,
                arrayEndState: 26,
            // Card Size
                // startingCardSize:"",
                // changedCardSize:{width: localStorage.getItem("myData")},
            width:document.body.clientWidth,
            postsArray:[],
            hiddenPosts:localStorage.getItem("hiddenPostList")
            
        }
 
        this.onresize = this.onresize.bind(this);
        this.getCardSize = this.getCardSize.bind(this);

    }
    getCardSize(value){
        this.setState({
            startingCardSize:{
                width:value
            }
        })
    }

    
    componentDidMount(){
        // This is retrieving a list of id's relating to posts hidden which is stored in local cache.
        if(localStorage.getItem("hiddenPostList") === null){
            this.setState({
                postsArray:[]
            }) 

        }else{
            this.setState({
                postsArray:[localStorage.getItem("hiddenPostList").split(',').map(Number)]
            })
        }

     const dbRef = fire.database().ref('items').orderByKey().limitToFirst(100);    
        
        dbRef.on('value', (snapshot) => {
            let newsItems = snapshot.val();
            // console.log(newsItems);
            let newState = [];
            for(let newsItem in newsItems){
                newState.push({
                    key: newsItem,
                    author: newsItems[newsItem].author,
                    title: newsItems[newsItem].title,
                    text: newsItems[newsItem].text,
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes,
                    id:newsItems[newsItem].id
                });
            }

            this.setState({
                articlesArray: newState.slice(0,50)
            })

            
        })
        
        window.addEventListener('scroll', this.scroll);
        window.addEventListener("resize", this.onresize);        
    }


    // I feel like this has to be here. It relies heavily on changing the array state and interacting with the view.

    scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
      
        if(windowBottom >= docHeight){

            const dbRef = fire.database().ref('items').orderByKey().limitToFirst(100);
            
           
           dbRef.on('value', (snapshot) => {
               let newsItems = snapshot.val();
               // console.log(newsItems);
               let newState = [];
               for(let newsItem in newsItems){
                   newState.push({
                       key: newsItem,
                       author: newsItems[newsItem].author,
                       title: newsItems[newsItem].title,
                       text: newsItems[newsItem].text,
                       id:newsItems[newsItem].id
                   });
               }

               const arrayStart = this.state.arrayStartState;
               const arrayEnd = this.state.arrayEndState;
               
               this.setState({               
                articlesArray2: newState.slice(arrayStart,arrayEnd),
                arrayStartState: this.state.arrayStartState + 5,
                arrayEndState: this.state.arrayEndState + 5
               })
                             
            const renderNewArticlesOnScroll = this.state.articlesArray.concat(this.state.articlesArray2);
               this.setState({
                   articlesArray:renderNewArticlesOnScroll
               })            
           })

            // console.log("Bottom Reached")
        }else{
            // console.log("Not At Bottom Yet")
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
        localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
      }

  


    onresize(){
        const width = document.body.clientWidth;
        // console.log(width);
        this.setState({
            width:width
        })
    }

    
    render(){
        const firebaseDB = this.state.articlesArray;  
     
         return (
            
            <div className="news-item-loop-wrapper"> 


                <NewsItemLoopView databaseProp={firebaseDB} />

                {/* <CustomCardSize getCardSizeToParent={this.getCardSize}/> */}

                
                 {/* {HomePageView}       */}
             
              
                <ScrollToTopButton   />
                
            </div>

        );  
        
    }
                   
}

export default NewsItemLoop;
