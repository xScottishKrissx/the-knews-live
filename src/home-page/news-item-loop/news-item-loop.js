import React from 'react';
import {Link} from 'react-router-dom';
import GalleryData from '../dummy-data';
import fire, {auth, provider} from '../../fire.js'
// import UniqueNewsItem from '../unique-news-item/unique-news-item';

// import FetchRandomImage from '../../news-page/news-page'

import '../news-item-loop/news-item-loop.css';

const testData = GalleryData;

console.log(testData);
export const NewsItemLoop = () => {
    return <MapDatabaseItems />;    
}


class MapDatabaseItems extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articleTitle: "",
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
                    articleTitle: newsItems[newsItem].articleTitle,
                    id:newsItems[newsItem].id
                });
            }
            this.setState({
                articlesArray: newState
            })
            // console.log(this.state.articlesArray);
            
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
                width:"100%"
            }
    
    
            // console.log(value.author + " Key is: " + value.key)
            return (
                    <div className='news-square' key={key}>                    
                            <Caption 
                                pageid={value.key} 
                                style={style} 
                                title={value.articleTitle}
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

class Caption extends React.Component{

    constructor(props){
        super(props);
        this.showExcerpt = this.showExcerpt.bind(this);
    }

    showExcerpt(e){
        e.preventDefault();
        // console.log("ShowExcerpt");
        const thing = document.getElementsByClassName("news-item-link");
        // console.log(this.props.pageid);
        // console.log(thing);
        // console.log(thing[e.currentTarget])
        
    }
    
    render(){
        const pageid = this.props.pageid;
        //console.log(pageid);
        const style = this.props.style;
        const title = this.props.title;
        const author = this.props.author;
       // console.log(title);

        return (
            // <Link className="news-item-link" to={{pathname: '/articles/news-page/' + pageid}}>

            <Link 
                className="news-item-link" 
                to={{pathname: '/articles/news-page/' + pageid}}
                              
                >
            {/* // <Link className="news-item-link" to={{pathname: pageid}}>         */}
            

            <div style={style}>
                
                <div className="news-item-link-text" onClick={this.showExcerpt}>
                    <span>{title}</span>
                    <p>by {author}</p>
                </div>
                
            </div> 

        </Link>
        );
    }
} 

export default NewsItemLoop;