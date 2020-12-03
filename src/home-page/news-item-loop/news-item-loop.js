import React from 'react';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';
import Caption from './news-item-caption/news-item-caption.js';

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
            title: "",
            author: "",
            id: "",
            imgPath: "",
            key: "",
            articlesArray : [],
            articlesArray2 : [],
            arrayStartState: 21,
            arrayEndState: 26,
            currentStyle:"",
            testStyle:{
                width: localStorage.getItem("myData")
            },
            scrollsaveScrollPosition:0,
            switch:0,
            width:document.body.clientWidth,
            postsArray:[],
            hiddenPosts:localStorage.getItem("hiddenPostList")
            
        }
        this.setting1 = this.setting1.bind(this);
        this.setting2 = this.setting2.bind(this);
        this.setting3 = this.setting3.bind(this);     
        this.saveScrollPosition = this.saveScrollPosition.bind(this);
        this.onresize = this.onresize.bind(this);
    }
    
    componentDidMount(){
        if(localStorage.getItem("hiddenPostList") === null){
            this.setState({
                postsArray:[]
            }) 

        }else{
            this.setState({
                postsArray:[localStorage.getItem("hiddenPostList").split(',').map(Number)]
            })
        }
        // console.log(localStorage.getItem("hiddenPostList").split(',').map(Number))
        // console.log(localStorage.getItem("hiddenPostList"));
        // console.log(localStorage.getItem("hiddenPosts"));
        // console.log("Posts Hidden: " + this.state.postsArray)
        
    //const dbRef = fire.database().ref('articles').orderByChild("id");
    //const checkUser = fire.auth().currentUser;        

      //The actual code...
      const dbRef = fire.database().ref('items').orderByKey().limitToFirst(100); 

    

    //const dbRef = fire.database().ref('items').orderByChild("postdate").startAt("1/01/2018").endAt("6/01/2018").limitToFirst(10); 
      
        
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
                // articlesArray: newState.reverse(),
                articlesArray: newState.slice(0,50)
            })

            
            // console.log(this.state.articlesArray);
            
        })
        
        window.addEventListener('scroll', this.scroll);
        window.addEventListener("resize", this.onresize);        
    }

    setting1(e){
        e.preventDefault();
        // console.log("Setting 1 Clicked");
        this.setState({currentStyle:{width:"10rem" }})
        const temp = "10rem"
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));

    }
    setting2(e){
        e.preventDefault();
        // console.log("Setting 2 Clicked");
        this.setState({currentStyle:{width:"400px" }})
        const temp = "260px"
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));

    }
    setting3(e){
        e.preventDefault();
        // console.log("Setting 3 Clicked");
        this.setState({currentStyle:{width:"50rem" }})
        const temp = "50rem"
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));
    }

    scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
    //    console.log(docHeight);
    //    console.log(windowBottom)


        
        this.setState({
            scrollsaveScrollPosition: windowBottom
        })

        if(windowBottom >= docHeight){
            //console.log(this.state.newCount)
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

            //    console.log(this.state.arrayStartState)
            //    console.log(this.state.articlesArray2)
               
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
        // console.log("Unmount on news-item-loop.js")
        // window.addEventListener('scroll', this.scroll);
        window.removeEventListener('scroll',this.scroll);
     fire.database().ref("items").off();

     localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
    //  console.log(localStorage.getItem("hiddenPostList"));
    //  console.log(localStorage.getItem("hiddenPosts"));
    //  console.log(this.state.postsArray)
      }

    saveScrollPosition(){
        // console.log("Scroll is:: " + window.scrollY)

        const saveScrollPosition = window.scrollY;
        const saveArticlesLoaded = this.state.arrayStartState;

        localStorage.setItem("myScrollPos", saveScrollPosition);
        localStorage.setItem("articlesLoaded", saveArticlesLoaded)

        // console.log("Saved Scroll Position is:: " + localStorage.getItem("myScrollPos"));
        // console.log(localStorage.getItem("articlesLoaded") + " articles currently loaded");
    }

    scrollTo(){
        if(localStorage.getItem("myScrollPos") > 0){
            window.scrollTo(0,localStorage.getItem("myScrollPos"));
            console.log("Scroooooooooooooooooooooooooooooooooooooooooooooollling to " + localStorage.getItem("myScrollPos"))
        }
        else{
            console.log("Don't scroll anywhere")
        }
    }

   
    swipeLeftAction(text,id){

        document.getElementById("popup" + id).style.display = "block";
        // document.getElementsByClassName("hideArticleBtn").style.display = "none";
        document.getElementById("articlePopupBackground"  + id).style.display = "block";
        // document.body.classList.add("no-scroll")
        document.body.style.overflow = "hidden";
        // console.log(localStorage.getItem("hiddenPostList"));
        

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
        // console.log(localStorage.getItem("myScrollPos"));
        
        const firebaseDB = this.state.articlesArray;     
        // console.log(this.state.postsArray)
        // console.log(firebaseDB)          
        // console.log("Posts Hidden: " + localStorage.getItem("hiddenPostList"));

       



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

            // const checkForID = this.state.articlesArray.find(value => value.id === localStorage.getItem("hiddenPostList"));
            
            // if(checkForID === false){
            //     console.log(checkForID)
            // }else{
            //     // console.log("true" + checkForID)               
            // }
            
            const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
            // console.log(localStorageHiddenPosts)            
            // console.log(localStorageHiddenPosts.split(',').map(Number))
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
            


            // console.log(value.author + " Key is: " + value.key)
            return (

                // Enabling the Swipe Gesture for Mobile Only
                // Could probably bring it back if I implement custom card sizes for the user.
                
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
    
                            // onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
                        >
                                
                                <div className='news-square'  key={key}  style={this.state.currentStyle || this.state.testStyle} onClick={() => this.saveScrollPosition()} >                    
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

                        
                    
                    {/* <div className='news-square'  key={key} id={value.id} style={this.state.currentStyle || this.state.testStyle} onClick={() => this.saveScrollPosition()} >                    
                        <Caption 
                            pageid={value.key} 
                            style={style} 
                            title={value.title}
                            author={value.author}
                            likes={value.likes}
                            dislikes={value.dislikes}    
                         />
                         
                    </div> */}
                    

                </div>
                        
            );
            
      })  

        return (
            
            <div className="news-item-loop-wrapper"> 

                {/* Playing with state and rendering */}
                {/* <div> */}
                   
                    {/* <button onClick={()=> this.flipSwitch()}>Flip</button>
                    {this.state.switch === 1 ? 
                        <p>On</p>
                        :    
                        <p>Off</p>
                    } */}
                {/* </div> */}


                {/* <div className="tileSizeControls" >
                    <h2>Amazing Final Production Version Custom Controls V1337</h2> 
                    <span className="controlBtns">
                        <button onClick={this.setting1}>S</button>
                        <button onClick={this.setting2}>M</button>
                        <button onClick={this.setting3}>L</button>
                    </span>   
                </div> */}
               
               {/* <button id="saveScroll" onClick={() => this.saveScrollPosition()}>Save Scroll</button>  */}
               {/* {localStorage.getItem("myStorage") !== 0 ? 
                <button id="scrollTo" onClick={() => this.scrollTo()}>Continue to previous position</button> 
                :
                null
                } */}
                 

                 
                 {HomePageView}      
             
              
                <ScrollToTopButton  />
                
            </div>

        );  
        
    }
                   
}

export default NewsItemLoop;
