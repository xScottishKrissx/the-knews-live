import React from 'react';
import './news-item.css';
// import MediaQuery from 'react-responsive';
import Parser from 'html-react-parser';
import {Link} from 'react-router-dom';

import DummyData from '../home-page/dummy-data.js';
import Form from '../myKnews/form.js';

const dummyNews = DummyData;




// This is a bit of a copy and paste job but I understand what's going on what i've been doing wrong.
export const NewsPage = ({match}) =>{

    //This is being set in routes.js and news-item-loop.js
    // Its a bit spaghetti but very simple
    const articleID = match.params.id;  
    // console.log(articleID);


    function findId(id){
        // Will need to do some string to int conversion here
        return id.id === Number(articleID);
    }

    // console.log(dummyNews.find(findId));
    const articleObject = dummyNews.find(findId);

    // console.log(articleID);

    const imgUrl = "https://unsplash.it/500/200?random=" + articleObject.id;
    ///... and this.
    const style = {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "400px",
        width:"100%"
    }

    const imgUrl2 = "https://unsplash.it/500/200?random=" + (articleObject.id + 1);
    ///... and this.
    const extraImage = {
        backgroundImage: 'url(' + imgUrl2 + ')',
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "400px",
        width:"100%"
    }



// console.log(ExtraImageLoop)
 
 return(    
     
    <div className='news-page-wrapper'> 

        <Form articleid={articleID}/>
        
        <div className='article-banner-image-wrapper'>
            <div className="article-banner-image" style={style}></div>
            <div className="article-banner-image extra-banner-image" style={extraImage}></div>
        </div>

        <div className="back-button">
            <Link to='/theKnews'><p>go back</p></Link>
        </div>

        <header className="news-article-header">
                <h1 className="article-title">{articleObject.title}</h1>
                <h2 className="article-subtitle">Subtitle</h2>
                <h3 className="article-author">{articleObject.author}</h3>
        </header>

        <div className="news-article-body">
            <article>
                    {/* <p className="article-text">{articleObject.text}</p> */}
                    <div className="article-text">
                        <ParseHTML props={articleObject.text}/>
                    </div>
                    
                    <p className="article-likes">Likes: {articleObject.likes} </p>
                    <p className="article-dislikes">Dislikes: {articleObject.dislikes}</p>
            </article>

            <div className="extra-images">
                <ExtraImageLoop />             
            </div>  

        </div>
    </div>
)};




 const ExtraImageLoop = (title) => {
    let i;
    let imagesArray = [];
    for(i = 0; i < 3; i++){        
        imagesArray.push(<img key={i} src={"https://unsplash.it/500/200?random=" + (i * 12 ) } alt="the-knews-extra-images" />)
    }
    return imagesArray;
}

const ParseHTML = (props) =>{
    const parseHTML = Parser(props.props);
    // console.log(props.props);
    return parseHTML;
} 

export default NewsPage;