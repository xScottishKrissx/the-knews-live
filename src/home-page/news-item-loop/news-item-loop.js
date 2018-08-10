import React from 'react';
import {Link} from 'react-router-dom';
import GalleryData from '../dummy-data';
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
        super(props)
    }

    render(){
        return "Hello";
    }
}



// const NewMap = () => {


  
//     const myEffingMap = testData.map((value,key) => {

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
//     return myEffingMap;    
// }

// class Caption extends React.Component{

//     constructor(props){
//         super(props);
//         this.showExcerpt = this.showExcerpt.bind(this);
//     }

//     showExcerpt(e){
//         e.preventDefault();
//         console.log("ShowExcerpt");
//         const thing = document.getElementsByClassName("news-item-link");
//         console.log(this.props.pageid);
//         console.log(thing);
//         console.log(thing[e.currentTarget])
        
//     }
    
//     render(){
//         const pageid = this.props.pageid;
//         const style = this.props.style;
//         const title = this.props.title

//         return (
//             // <Link className="news-item-link" to={{pathname: '/articles/news-page/' + pageid}}>

//             <Link className="news-item-link" to={{pathname: '/filters/' + pageid}}>
//             {/* // <Link className="news-item-link" to={{pathname: pageid}}>         */}
            

//             <div style={style}>
                
//                 <div className="news-item-link-text" onClick={this.showExcerpt}>
//                     <span>{title}</span>
//                     <p>Excerpt from Article</p>
//                 </div>
                
//             </div> 

//         </Link>
//         );
//     }
// } 

export default NewsItemLoop;