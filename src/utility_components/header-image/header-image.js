import React from 'react';
// import ArticleInformation from '../../news-page/news-page-view/article-area/articleInformation/articleInformation';
import './header-image.css';

const HeaderImage = (props) =>{
    const imgUrl = "https://unsplash.it/192/108?random=" + props.props;
    
    const style = {
        backgroundImage: 'url(' + imgUrl + ')',        
    }
    return   (    
        <div className="article-banner-image extra-banner-image" loading="lazy" style={style}>
            <div class="bannerImageTextWrapper">
                <h1>{props.headline}</h1>
                {/* <h2>Subtitle</h2> */}

                {/* <ArticleInformation
                // Tag 
                    tag={props.tag}
                    // Author
                    author={props.author}
                    arrayFromDatabase={props.arrayFromDatabase}
                    leftoverArticles={props.leftoverArticles}
                    fullDatabaseCall={props.fullDatabaseCall}
                    // PostDate
                    postdate={props.postdate}
                /> */}

            </div>
        </div>
    )
}

export default HeaderImage;