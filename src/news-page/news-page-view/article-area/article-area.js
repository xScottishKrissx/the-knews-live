import React from 'react';

import {Link} from 'react-router-dom';
import ExtraImageLoop from './extra-image-loop/extra-image-loop.js';
import ParseHTML from '../../../utility_components/parse-database-html/parse-html.js';
import PageScore from '../social/page-score.js';
// import Share from '../social/share.js';

// import fire from '../../../fire.js';

// import EditArticle from './edit-article.js';

import './article-area.css';
import HideArticle from '../../../utility_components/hide-article/hide-article.js';
// import ScrollToTopBtn from '../../../utility_components/scrollToTop.js';


const ArticleArea = (props) => {
    //console.log(props.id)   
    //console.log("Logged in email:  " + fire.auth().currentUser.email)
    //console.log("Grab Email: " + props.email)
    //console.log(fire.auth().currentUser)
    //console.log("Date :: " + props.postdate.toString())
    
    // Optional Chaining -- The ? is a javascript operator that helps account for null.
    // In this example, loggedInEmail will work even if nobody is logged in, setting the value to null which was breaking the page previously.
    // Isn't fully supported yet so might cause issues on non supported platforms.
    // const loggedInEmail = fire.auth().currentUser?.email;
    //const loggedInEmail = "chrisdunne66@gmail.com"
    // const articleEmail = props.email;
    console.log(props.articleId)
    return (
            
            <div className='article'>
            {/* <img src="https://the-knews.s3.eu-west-2.amazonaws.com/027+-+0fVAsZf.jpg" /> */}
            {/* Article Header */}

                
            <span className="__header-container">
                <div className='__article-header __1600_style'>
                    <header><h1>{props.title}</h1></header>
                    
                </div>
                
                

                <div className='__article-sub-header __1600_style'>
                   
                    <h2 className="__article-subtitle">
                        <span>Posted</span>
                        <Link className="__news-item-link" to={{pathname: '/theKnews/tags/postdate' , state: {author: props.postdate, searchDBFor: "postdate",origin: "Article"}}}>
                            {props.postdate}
                        </Link>
                    </h2>

                    
                    <h3 className="__article-author">
                        <span>Author</span>
                        <Link className="__news-item-link" to={{pathname: '/theKnews/tags/author' , state: {author: props.author, searchDBFor: "author",origin: "Article"}}}>
                                {props.author}
                        </Link>
                    </h3>
                    

                    <h3>
                        <span>Email </span>
                        {props.email}
                    </h3>



                    <h3 className="__article-tag">
                        <span>Topic</span>
                        <Link className="__news-item-link" testprops="Weather" to={{pathname: '/theKnews/tags/weather' , state: {author: props.tag, searchDBFor: "tag",origin: "Article"}}}>
                            {props.tag}
                        </Link>
                    </h3>
                    

                    
                </div>
            </span>


                {/* {loggedInEmail === articleEmail ?
                <EditArticle articleText={props.text} articleID={props.id} articleTitle={props.title}/>
                :
                <p>No Edit Button for you</p>
                } */}             
                   
                {/* Article Body */}
                <div className='news-article-body'>
                    <article>
                        <div className="article-text">
                            <ParseHTML props={props.text}/>
                        </div>                     
                       

                        <PageScore likes={props.likes} dislikes={props.dislikes} id={props.id}/>
                        
                        </article>                  
                        <HideArticle articleId={props.articleId} />

                    {/* <ExtraImageLoop />       */}
                       
                </div> 
                
            </div>

    );
}

export default ArticleArea;