import React from 'react';
// import {Link} from 'react-router-dom';
// import GalleryData from '../dummy-data';
import fire from '../../fire.js'
// import UniqueNewsItem from '../unique-news-item/unique-news-item';

// import FetchRandomImage from '../../news-page/news-page'

import '../news-item-loop/news-item-loop.css';

import Caption from './news-item-caption/news-item-caption.js';

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
            title: "",
            author: "",
            id: "",
            imgPath: "",
            key: "",
            articlesArray : [],
            currentStyle:"",
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
    
    componentWillMount(){
        if(this.state.currentStyle === ""){
            console.log("Style Not Set")
        }else{
            console.log("State set")
        }
        // this.setState({
        //     currentStyle:{
        //         width:"260px"
        //     }
        // })
         //console.log(this.state.currentStyle)
        
        // const data = "Hello World!";
        // localStorage.setItem("myData", data);
        // localStorage.getItem("myData")
        // console.log(localStorage.getItem("myData"));
    }
    componentDidMount(){
    //const dbRef = fire.database().ref('articles').orderByChild("id");
       // window.addEventListener('scroll', this.scroll);
       const checkUser = fire.auth().currentUser;
       console.log("User Status: "+ checkUser)


        
       const dbRef = fire.database().ref('items').limitToLast(20); 

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
            this.setState({
                articlesArray: newState
            })
             console.log(this.state.articlesArray);
            
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
    
    componentWillUnmount(){
        // console.log("Unmount on news-item-loop.js")
        window.addEventListener('scroll', this.scroll);
        fire.database().ref("items").off();
      }

    //       scroll(){
    //       const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    //       const body = document.body;
    //       const html = document.documentElement;
    //       const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    //       const windowBottom = windowHeight + window.pageYOffset;
    //       console.log(docHeight);
    //       console.log(windowBottom)
          
    //         if(windowBottom >= docHeight){
    //             console.log("Bottom Reached")
    //         }else{
    //             console.log("Not At Bottom Yet")
    //         }
    //   }

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
                <p>Why are the images only loading when a user is logged in?</p>
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