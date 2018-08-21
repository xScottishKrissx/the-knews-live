import React from 'react';
// import MediaQuery from 'react-responsive';

import fire, {auth, provider} from '../fire.js'

import NewsPageVIEW from './news-page-view/news-page-view.js';
import DummyData from '../home-page/dummy-data.js';
import Form from '../myKnews/form.js';

const dummyNews = DummyData;


export class NewsPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            author: "",
            title: "",
            text:"",
            likes:"",
            dislikes:"",
            postdate:"",
            articlesArray: []
        }
    }

    componentDidMount(){        
        // console.log(this.props.match.params.id);
        const dave = this.props.match.params.id;
        // console.log(dave)
        const dbRef = fire.database().ref("items").orderByKey().equalTo(dave);
        dbRef.on('value', (snapshot) => {
            let articles = snapshot.val();
            let newState = [];
            for(let item in articles){
                newState.push({
                    key: item,
                    author: articles[item].author,
                    title: articles[item].title,
                    id:articles[item].id,
                    text: articles[item].text,
                    likes: articles[item].likes,
                    dislikes: articles[item].dislikes,
                    postdate: articles[item].postdate,
                });
            }
            this.setState({
                articlesArray: newState
            })
            // console.log(this.state.articlesArray);
        })
    }

    

    render(){    
        //console.log(firebasedb)
        return <NewsPageVIEW database={this.state.articlesArray} params={this.props.match.params.id} />;
    }
}



// This is a bit of a copy and paste job but I understand what's going on what i've been doing wrong.
// export const NewsPage = ({match}) =>{

//     //This is being set in routes.js and news-item-loop.js
//     // Its a bit spaghetti but very simple
//     const articleID = match.params.id;  
//     // console.log(articleID);


//     function findId(id){
//         // Will need to do some string to int conversion here
//         return id.id === Number(articleID);
//     }

//     // console.log(dummyNews.find(findId));
//     const articleMap = dummyNews.find(findId);

//     // console.log(articleID);

//     const imgUrl = "https://unsplash.it/500/200?random=" + articleMap.id;
//     ///... and this.
//     const style = {
//         backgroundImage: 'url(' + imgUrl + ')',
//         backgroundPosition: "bottom",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         height: "400px",
//         width:"100%"
//     }

//     const imgUrl2 = "https://unsplash.it/500/200?random=" + (articleMap.id + 1);
//     ///... and this.
//     const extraImage = {
//         backgroundImage: 'url(' + imgUrl2 + ')',
//         backgroundPosition: "bottom",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         height: "400px",
//         width:"100%"
//     }



// // console.log(ExtraImageLoop)
 
//  return(    
     
//     <div className='news-page-wrapper'> 

//         <Form articleid={articleID}/>
        
//         <div className='articleMap-banner-image-wrapper'>
//             <div className="articleMap-banner-image" style={style}></div>
//             <div className="articleMap-banner-image extra-banner-image" style={extraImage}></div>
//         </div>

//         <div className="back-button">
//             <Link to='/theKnews'><p>go back</p></Link>
//         </div>

//         <header className="news-articleMap-header">
//                 <h1 className="articleMap-title">{articleMap.title}</h1>
//                 <h2 className="articleMap-subtitle">Subtitle</h2>
//                 <h3 className="articleMap-author">{articleMap.author}</h3>
//         </header>

//         <div className="news-articleMap-body">
//             <articleMap>
//                     {/* <p className="articleMap-text">{articleMap.text}</p> */}
//                     <div className="articleMap-text">
//                         <ParseHTML props={articleMap.text}/>
//                     </div>
                    
//                     <p className="articleMap-likes">Likes: {articleMap.likes} </p>
//                     <p className="articleMap-dislikes">Dislikes: {articleMap.dislikes}</p>
//             </articleMap>

//             <div className="extra-images">
//                 <ExtraImageLoop />             
//             </div>  

//         </div>
//     </div>
// )};






export default NewsPage;