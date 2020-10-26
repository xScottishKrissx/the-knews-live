import React from 'react';

import {Link} from 'react-router-dom';
import ExtraImageLoop from './extra-image-loop/extra-image-loop.js';
import ParseHTML from './parse-database-html/parse-html.js';
import PageScore from '../social/page-score.js';
import Share from '../social/share.js';

// import fire from '../../../fire.js';

// import EditArticle from './edit-article.js';

import './article-area.css';
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
    return (
            
            <div className='article'>
            {/* Article Header */}

                

                <div className='__article-header'>
                    <header><h1>{props.title}</h1></header>
                </div>

                <div className='__article-sub-header'>
                   
                    <h2 className="__article-subtitle">
                        <span>Posted </span>
                        {props.postdate}
                    </h2>

                    <h3 className="__article-author">
                        <span>Author </span>
                        {props.author}
                    </h3>

                    <h3>
                        <span>Email </span>
                        {props.email}
                    </h3>


                    <Link className="__news-item-link" testprops="Weather" to={{pathname: '/theKnews/tags/weather' , state: {tag: props.tag}}}>
                            <h3 className="__article-tag">
                                <span>Tagged </span>
                                {props.tag}
                            </h3>
                    </Link>

                    
                </div>











                {/* <header className="news-article-header">
                    <h1 className="article-title">{props.title}</h1>
                    <h2 className="article-subtitle">{props.postdate}</h2>
                    <h3 className="article-author">{props.author}</h3>
                        
                    <Link className="news-item-link" testprops="Weather" to={{pathname: '/theKnews/tags/weather' , state: {tag: props.tag}}}>
                            <h3 className="article-tag">{props.tag}</h3>
                    </Link>
                    
                    <h3>{props.email}</h3>
                        
                </header>
                <Share />
                */}


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

                    <ExtraImageLoop />      
                       
                </div> 
                
            </div>

    );
}

export default ArticleArea;