import React from 'react';
// import {Link} from 'react-router-dom';
// import GalleryData from '../dummy-data';
import fire from '../../fire.js'
// import UniqueNewsItem from '../unique-news-item/unique-news-item';

// import FetchRandomImage from '../../news-page/news-page'

import '../news-item-loop/news-item-loop.css';

import Caption from './news-item-caption/news-item-caption.js';

export const NewsItemLoop = () => {
    return <MapDatabaseItems />;    
}

class MapDatabaseItems extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            count:0,
            title: "",
            author: "",
            id: "",
            imgPath: "",
            key: "",
            articlesArray : [],
            articlesArray2 : [],
            // articlesArray3:[],
            arrayStartState: 6,
            arrayEndState: 10,
            currentStyle:"",
            newCount:0,
            testStyle:{
                width: localStorage.getItem("myData")
            },
            addNewArticle:"",
            loadedArticles: "",
            
        }
        this.setting1 = this.setting1.bind(this);
        this.setting2 = this.setting2.bind(this);
        this.setting3 = this.setting3.bind(this);
       
 


    }
    
    componentDidMount(){
        
    //const dbRef = fire.database().ref('articles').orderByChild("id");
       //const checkUser = fire.auth().currentUser;        
      const dbRef = fire.database().ref('items').orderByKey().limitToFirst(10); 
    //   const dbRef = fire.database().ref('items').orderByChild("postdate").startAt("1/01/2018").endAt("6/01/2018").limitToFirst(10); 
      
        
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

            // A janky way of removing the duplicating records.
            // const indexesToBeRemoved = [6,7,8,9];
            // while(indexesToBeRemoved.length){
            //     newState.splice(indexesToBeRemoved.pop(),1);
            // };

            this.setState({
                // articlesArray: newState.reverse(),
                articlesArray: newState
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
       //console.log(docHeight);
       // console.log(windowBottom)

        if(windowBottom >= docHeight){
            this.setState({count: this.state.count + 1})     
            this.setState({newCount: this.state.newCount + 1})
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
               const testThing = newState.splice(10,100);
               console.log(newState)
               console.log(testThing)
               console.log(newState.splice(10,100));

            //    const array1 = newState;
            //    console.log(array1.slice(0,10))
               //console.log(array1.slice(11,21))
               //console.log(array1.slice(22,33))

               const arrayStart = this.state.arrayStartState;
               const arrayEnd = this.state.arrayEndState;
               
               this.setState({
               // articlesArray2: newState.reverse(),
                //    articlesArray2: newState.slice(arrayStart,arrayEnd).reverse(),
                   articlesArray2: newState.slice(arrayStart,arrayEnd),
                   arrayStartState: this.state.arrayStartState + 4,
                   arrayEndState: this.state.arrayEndState + 4
               })
               //console.log(this.state.arrayStartState)
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
        window.addEventListener('scroll', this.scroll);
        fire.database().ref("items").off();
      }

    render(){
        const firebaseDB = this.state.articlesArray;        
        // console.log(this.state.currentStyle)
        
        //Render new div without re-rerendering entire thing.


        
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
                width:"100%"
            }
    
    
            // console.log(value.author + " Key is: " + value.key)
            return (
                
                    <div className='news-square'  key={key} style={this.state.currentStyle || this.state.testStyle}>                    
                            <Caption 
                                pageid={value.key} 
                                style={style} 
                                title={value.title}
                                author={value.author} />
                    </div>
                

            );
      })   


        return (
            <div>               


                <div className="tileSizeControls" >
                    <h2>Amazing Final Production Version Custom Controls V1337</h2> 
                    <span className="controlBtns">
                        <button onClick={this.setting1}>S</button>
                        <button onClick={this.setting2}>M</button>
                        <button onClick={this.setting3}>L</button>
                    </span>   
                </div>
               

                {HomePageView}      
                                    
            </div>
        );   
    }
}

export default NewsItemLoop;