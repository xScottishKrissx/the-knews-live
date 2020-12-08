import React from 'react';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';

import Caption from './news-item-caption/news-item-caption.js';
import CustomCardSize from '../news-item-loop/custom-tile-size/custom-card-size.js';

import ScrollToTopButton from '../../utility_components/scrollToTop.js';
import HeaderImage from '../../news-page/news-page-view/header-image/header-image.js';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

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
                startingCardSize:"",
                changedCardSize:{width: localStorage.getItem("myData")},
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

    onresize(){
        const width = document.body.clientWidth;
        // console.log(width);
        this.setState({
            width:width
        })
    }

    
    render(){
        const firebaseDB = this.state.articlesArray;     
        
        const HomePageView = firebaseDB.map((value,key) => {           
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

        return (
            
            <div className="news-item-loop-wrapper"> 




                <CustomCardSize getCardSizeToParent={this.getCardSize}/>

                 
                 {HomePageView}      
             
              
                <ScrollToTopButton   />
                
            </div>

        );  
        
    }
                   
}

export default NewsItemLoop;
