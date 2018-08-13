import React from 'react';

import Parser from 'html-react-parser';
import {Link} from 'react-router-dom';


export class NewsPageVIEW extends React.Component{
    render(){
        const database = this.props.database;
        const NewsPageView = database.map((value, key) => {
                    
            return(
                <div className='news-page-wrapper' key={value.id}> 
    
                    <div className="back-button">
                        <Link to='/theKnews'><p>go back</p></Link>
                    </div>
    
                    {/* Header Image */}
                    <div className='article-banner-image-wrapper'>
                        <HeaderImage props={value.id} />
                        <HeaderImage props={value.id + 65} />
                    </div>
    
                     {/* Article Title */}
                    <header className="news-article-header">
                            <h1 className="article-title">{value.title}</h1>
                            <h2 className="article-subtitle">{value.postdate}</h2>
                            <h3 className="article-author">{value.author}</h3>
                    </header>
    
                    {/* Article Body */}
                    <div className='news-article-body'>
                        <article>
                            <div className="article-text">
                                <ParseHTML props={value.text}/>
                            </div>
                            

                            <div className='social'>
                                <p className="article-likes">
                                    Likes: {value.likes}
                                </p>

                                <p className="article-dislikes">
                                    Dislikes: {value.dislikes}
                                </p>
                            </div>

                        </article>
    
                        <div className="extra-images">
                            <ExtraImageLoop />             
                        </div>
    
                    </div> 
    
    
                </div>
            )
        })
        return NewsPageView;
    }
    
}
export default NewsPageVIEW;


const HeaderImage = (props) =>{
    const imgUrl = "https://unsplash.it/500/200?random=" + props.props;
    
    const style = {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "400px",
        width:"100%"
    }
    return(
        <div className="article-banner-image extra-banner-image" style={style}></div>
    )
}

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



