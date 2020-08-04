import React from 'react';
// import {Link} from 'react-router-dom';
// import GalleryData from '../dummy-data';
import fire from '../../fire.js'
// import UniqueNewsItem from '../unique-news-item/unique-news-item';

// import FetchRandomImage from '../../news-page/news-page'

import '../news-item-loop/news-item-loop.css';

import Caption from './news-item-caption/news-item-caption.js';
import { render } from 'react-dom';

// const testData = GalleryData;

// console.log(testData);
export const NewsItemLoop = () => {
    return <MapDatabaseItems />;    
}

const titleSettings = {
    small: {
        width:"100px"
    },
    medium: {
        width:"200px"
    },
    large: {
        width:"400px"
    }
}

// const ThemeContext = React.createContext(
//     themes.medium
// )

// function ThemedButton(props){
//     return (
//         <ThemeContext.Consumer>
//             {theme => (
//                 <button
//                     {...props}
//                     style={{width:themes.medium}}
//                 />
//             )}
//         </ThemeContext.Consumer>
//     );
// }

// function Toolbar(props){
//     return (
//         <ThemedButton onClick={props.changeTheme}>
//             Change Theme
//         </ThemedButton>
//     )
// }



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
            articlesArray3:[],
            arrayStartState: 0,
            arrayEndState: 5,
            currentStyle:"",
            newCount:0,
            testStyle:{
                width: localStorage.getItem("myData")
            },

            //Context Api
            theme: titleSettings.medium
            
        }
        // this.showExcerpt = this.showExcerpt.bind(this);
        this.setting1 = this.setting1.bind(this);
        this.setting2 = this.setting2.bind(this);
        this.setting3 = this.setting3.bind(this);
       
 
        // this.scroll = this.scroll.bind(this);


        //Context Api
        // this.toggleTheme = () => {
        //     this.setState(state => ({
        //         theme:
        //             // state.theme === themes.small ? themes.medium : themes.large
        //             state.theme === themes.small           
        //     }));
            
        // };
        // this.toggleTheme = () => {
        //     this.setState({theme: themes.small})
        //     console.log(this.state.theme)
        // }
    }
    
    componentDidMount(){
        
    //const dbRef = fire.database().ref('articles').orderByChild("id");
       
       //const checkUser = fire.auth().currentUser;
       //console.log("User Status: "+ checkUser)


        
       //const dbRef = fire.database().ref('items').orderByChild("postdate").limitToLast(6); 
       const dbRef = fire.database().ref('items').orderByChild("postdate").startAt("1/01/2018").endAt("6/01/2018").limitToFirst(6); 


        // console.log(dbRef);
        
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
            this.setState({
                articlesArray: newState.reverse(),
                
            })
            //  console.log(this.state.articlesArray);
            
        })
        window.addEventListener('scroll', this.scroll);

               //Get 50 articles from database

       const articles3 = fire.database().ref('items').orderByKey().limitToFirst(50);
       articles3.on('value', (snapshot) => {
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
        this.setState({
            articlesArray3: newState.reverse(),
            
        })
        //  console.log(this.state.articlesArray);
        
    })
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
        this.setState({currentStyle:{width:"260px" }})
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
            console.log(this.state.newCount)
            const dbRef = fire.database().ref('items').orderByKey().limitToFirst(50);
            console.log(dbRef);           
           
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
            //    console.log(newState)

               const array1 = newState;
               
               console.log(array1.slice(0,10))
               console.log(array1.slice(11,21))
               console.log(array1.slice(22,33))

               const arrayStart = this.state.arrayStartState;
               const arrayEnd = this.state.arrayEndState;
               
               //At this point, I want to take the above array and only get the first 10 or so records everytime the page scrolls
               // How I do that I don't know at this point
               // I can get new articles render after each other but this is just rerendering the entire page.
               // I can think of a hilariously janky way of creating an if statement to check which slice of the array has been rendered
               //   if(infiniteLoadPhase1 === false){
               //       render slice 1    
               //   }elseif(infiniteLoadPhase2 === false){
                //      render slice 2
               //   ...and so on.
               //   I do think that would work but it would be awful. Probably a last resort type of thing.

               this.setState({
                articlesArray2: newState.reverse(),
                //    articlesArray2: newState.slice(arrayStart,arrayEnd).reverse(),
                   arrayStartState: this.state.arrayStartState + 5,
                   arrayEndState: this.state.arrayEndState + 5

                // articlesArray2: newState[thing3]
               })
               console.log(this.state.articlesArray2)
               
               
               const thing3 = this.state.newCount;
               console.log("Count:: " + thing3)
               console.log("Re3cord:: " + this.state.articlesArray2[thing3].title);
               
           })

            console.log("Bottom Reached")
            
        }else{
            console.log("Not At Bottom Yet")
        }
    }




    renderDivs(){
        const firebaseDB = this.state.articlesArray2.slice(0,5);
        console.log(this.state.articlesArray2.slice(0,20));
        

        
        
        
        const addNewArticle = firebaseDB.map((value,key) => {           
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

                    

                    // <div>
                    //     <h1>Title:{this.state.articlesArray3[thing3].title}</h1>
                    //     <p>Author</p>
                    // </div>
                

            );
      })


        let count = this.state.count, newLoadedArticles = [];  
        while(count--)
        
           newLoadedArticles.push(
            //    <div>{firebaseDB.title}</div> 
            <div>{addNewArticle}</div>
               
            )
        return newLoadedArticles;
    }

    componentWillUnmount(){
        // console.log("Unmount on news-item-loop.js")
        window.addEventListener('scroll', this.scroll);
        fire.database().ref("items").off();
       
      }

    render(){
        const firebaseDB = this.state.articlesArray;        
        // console.log(this.state.currentStyle)

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
                                   
                {this.renderDivs()}      
                        
                
                
            </div>
        );   
    }
}



// const NewMap = () => {


  
//     const HomePageView = testData.map((value,key) => {

//         // There is probably a better way of doing this...
//         const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
//         ///... and this.
//         const style = {
//             backgroundImage: 'url(' + imgUrl + ')',
//             backgroundPosition: "bottom",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             height: "400px",
//             width:"100%"
//         }



//         return (
//                 <div className='news-square' key={key}>                    
//                         <Caption pageid={value.id} style={style} title={value.title} />
//                 </div>
//         );
//   })
//     return HomePageView;    
// }



export default NewsItemLoop;