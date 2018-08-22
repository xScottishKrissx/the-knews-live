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
            articlesArray : []
        }
    }

    componentDidMount(){
        // const dbRef = fire.database().ref('articles').orderByChild("id");
        const dbRef = fire.database().ref('items').orderByChild("id");
        
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
                    <div className='news-square' key={key}>                    
                            <Caption 
                                pageid={value.key} 
                                style={style} 
                                title={value.title}
                                author={value.author} />
                    </div>
            );
      })
        return HomePageView;   
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