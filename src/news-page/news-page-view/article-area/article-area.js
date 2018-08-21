import React from 'react';

import ExtraImageLoop from './extra-image-loop/extra-image-loop.js';
import ParseHTML from './parse-database-html/parse-html.js';
import PageScore from '../social/page-score.js';
import Share from '../social/share.js';

import './article-area.css';


const ArticleArea = (value) => {
    return (
            
            <div className='article'>
            {/* Article Header */}
                <header className="news-article-header">
                        <h1 className="article-title">{value.title}</h1>
                        <h2 className="article-subtitle">{value.postdate}</h2>
                        <h3 className="article-author">{value.author}</h3>
                        
                </header>

                <Share />
                
                
                {/* Article Body */}
                <div className='news-article-body'>
                    <article>
                        <div className="article-text">
                            <ParseHTML props={value.text}/>
                        </div>                     

                        <PageScore likes={value.likes} dislikes={value.dislikes} />
                    </article>

                    <ExtraImageLoop />          
                </div> 
                
            </div>

    );
}

export default ArticleArea;