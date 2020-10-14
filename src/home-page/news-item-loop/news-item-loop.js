import React from 'react';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';
import Caption from './news-item-caption/news-item-caption.js';

import ScrollToTopButton from '../../utility_components/scrollToTop.js';

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
            // articlesArray3:[],
            arrayStartState: 21,
            arrayEndState: 71,
            currentStyle:"",
            testStyle:{
                width: localStorage.getItem("myData")
            },
            addNewArticle:"",
            loadedArticles: "",
             scrollsaveScrollPosition:0,
            
        }
        this.setting1 = this.setting1.bind(this);
        this.setting2 = this.setting2.bind(this);
        this.setting3 = this.setting3.bind(this);     
        this.saveScrollPosition = this.saveScrollPosition.bind(this);
    }
    
    componentDidMount(){
        
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
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes,
                    id:newsItems[newsItem].id
                });
            }

            this.setState({
                // articlesArray: newState.reverse(),
                articlesArray: newState.slice(0,50)
            })
            console.log(this.state.articlesArray);
            
        })
        window.addEventListener('scroll', this.scroll);
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
                       id:newsItems[newsItem].id
                   });
               }

               const arrayStart = this.state.arrayStartState;
               const arrayEnd = this.state.arrayEndState;
               
               this.setState({               
                articlesArray2: newState.slice(arrayStart,arrayEnd),
                arrayStartState: this.state.arrayStartState + 50,
                arrayEndState: this.state.arrayEndState + 50
               })

               console.log(this.state.arrayStartState)
               console.log(this.state.articlesArray2)
               
            const renderNewArticlesOnScroll = this.state.articlesArray.concat(this.state.articlesArray2);
               this.setState({
                   articlesArray:renderNewArticlesOnScroll
               })            
           })

            console.log("Bottom Reached")
        }else{
            console.log("Not At Bottom Yet")
        }
    }

    componentWillUnmount(){
        // console.log("Unmount on news-item-loop.js")
        // window.addEventListener('scroll', this.scroll);
        window.removeEventListener('scroll',this.scroll);
     fire.database().ref("items").off();
      }

    saveScrollPosition(){
        console.log("Scroll is:: " + window.scrollY)

        const saveScrollPosition = window.scrollY;
        const saveArticlesLoaded = this.state.arrayStartState;

        localStorage.setItem("myScrollPos", saveScrollPosition);
        localStorage.setItem("articlesLoaded", saveArticlesLoaded)

        console.log("Saved Scroll Position is:: " + localStorage.getItem("myScrollPos"));
        console.log(localStorage.getItem("articlesLoaded") + " articles currently loaded");
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

    render(){
        // console.log(localStorage.getItem("myScrollPos"));
        
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
            // console.log(value.author + " Key is: " + value.key)
            return (
                
                    <div className='news-square'  key={key} style={this.state.currentStyle || this.state.testStyle} onClick={() => this.saveScrollPosition()} >                    
                            <Caption 
                                pageid={value.key} 
                                style={style} 
                                title={value.title}
                                author={value.author}
                                likes={value.likes}
                                dislikes={value.dislikes}
                                
                                />
                    </div>
            );
      })   


        return (
            <div>               


                {/* <div className="tileSizeControls" >
                    <h2>Amazing Final Production Version Custom Controls V1337</h2> 
                    <span className="controlBtns">
                        <button onClick={this.setting1}>S</button>
                        <button onClick={this.setting2}>M</button>
                        <button onClick={this.setting3}>L</button>
                    </span>   
                </div> */}
               
               {/* <button id="saveScroll" onClick={() => this.saveScrollPosition()}>Save Scroll</button>  */}
               {localStorage.getItem("myStorage") !== 0 ? 
                <button id="scrollTo" onClick={() => this.scrollTo()}>Continue to previous position</button> 
                :
                console.log("Nothing") 
            }
                 

               
               {HomePageView}      
               <ScrollToTopButton />
            </div>
        );   
    }
}

export default NewsItemLoop;