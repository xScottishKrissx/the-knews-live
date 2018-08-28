import React from 'react';
import {Link} from 'react-router-dom';

import HeaderImage from './header-image/header-image.js';
import ArticleArea from './article-area/article-area.js';

import RecommendedReading from './social/recommended-reading/recommended-reading.js';

import './news-page-view.css';

export class NewsPageVIEW extends React.Component{
    render(){
        const database = this.props.database;

        // console.log(Number(database))

 


        const NewsPageView = database.map((value, key) => {
                    
            return(
                <div className='news-page-wrapper' key={value.id}> 

                    <div className="back-button">
                        <Link to='/theKnews'><p>Home</p></Link>
                    </div>

    
                    {/* Header Image */}
                    <div className='article-banner-image-wrapper'>
                        <HeaderImage props={value.id} />
                        <HeaderImage props={value.id + 65} />
                    </div>

                    <ArticleArea 
                        title={value.title}
                        postdate={value.postdate}
                        author={value.author}
                        text={value.text}
                        likes={value.likes}
                        dislikes={value.dislikes}
                    />

                    <RecommendedReading />

    
    
                </div>
            )
        })

        const test = 1;
        return (
            <div>
                {/* {test === 1 ? NewsPageView : <p>Error</p>} */}
                {NewsPageView}
            </div>
        )

        // return NewsPageView;
    }
    
}
export default NewsPageVIEW;





    



