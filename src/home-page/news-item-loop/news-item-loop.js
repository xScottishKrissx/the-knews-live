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
            newStyle: {
                // height: "400px",
                width:"260px"
            }
        }
        // this.showExcerpt = this.showExcerpt.bind(this);
        this.setting1 = this.setting1.bind(this);
        this.setting2 = this.setting2.bind(this);
        this.setting3 = this.setting3.bind(this);
    }

    componentDidMount(){
        // const dbRef = fire.database().ref('articles').orderByChild("id");
        const dbRef = fire.database().ref('items').limitToLast(20);
        
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
            // console.log(this.state.articlesArray);
            
        })
    }

    setting1(e){
        e.preventDefault();
        console.log("Setting 1 Clicked");
        this.setState({newStyle:{width:"10rem" }})
    }
    setting2(e){
        e.preventDefault();
        console.log("Setting 2 Clicked");
        this.setState({newStyle:{width:"260px" }})
    }
    setting3(e){
        e.preventDefault();
        console.log("Setting 3 Clicked");
        this.setState({newStyle:{width:"50rem" }})
    }
    
    componentWillUnmount(){
        console.log("Unmount on news-item-loop.js")
        fire.database().ref("items").off();
      }
  

    render(){
        const firebaseDB = this.state.articlesArray;

        const HomePageView = firebaseDB.map((value,key) => {

            // console.log(value.id)

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
                    <div className='news-square' key={key} style={this.state.newStyle}>                    
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
                <div className="tileSizeControls">
                    <h2>Amazing Final Production Version Custom Controls V1337</h2>    
                    <button onClick={this.setting1}>Small</button>
                    <button onClick={this.setting2}>Standard</button>
                    <button onClick={this.setting3}>Large</button>
                </div>
                {HomePageView}
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