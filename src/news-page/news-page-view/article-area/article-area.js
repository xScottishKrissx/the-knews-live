import React from 'react';

import {Link} from 'react-router-dom';
import ParseHTML from '../../../utility_components/parse-database-html/parse-html.js';
import PageScore from '../social/page-score.js';
// import Share from '../social/share.js';

// import fire from '../../../fire.js';

// import EditArticle from './edit-article.js';

import './article-area.css';
import HideArticle from '../../../utility_components/hide-article/hide-articlev2.js';
import hideArticleFeedback from '../../../utility_components/hide-article/hideArticleFeedback.js';
import createBookmark from '../../../utility_components/bookmarks/createBookmark.js';
import removeBookmark from '../../../utility_components/bookmarks/removeBookmark.js';



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
    // console.log(props.articleId)
    // console.log(props.leftoverArticles)
    // console.log(props.fullDatabaseCall)
    // console.log(props.bookmarked)
    function handleClick(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall){
        HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);
        hideArticleFeedback()
        // console.log(arrayFromDatabase.length)
    }
    // bookmarkArticle = () => {
    //     createBookmark();
    // }
    
    return (
            
            <div className='article'>
            {/* <img src="https://the-knews.s3.eu-west-2.amazonaws.com/027+-+0fVAsZf.jpg" /> */}
            {/* Article Header */}

                
            <span className="__header-container">
                <div className='__article-header __1600_style'>
                    <header><h1>{props.title}</h1></header>

                    {/* {props.bookmarked === false ? 
                       
                        <button onClick={()=>createBookmark(props.articleId,props.fullDatabaseCall)}>
                            <span>Not Bookmarked</span>
                            <span  class="material-icons" id={props.articleId + "bookmarkIcon"}></span>
                        </button>
                        
                        :
                        <button onClick={()=>removeBookmark(props.articleId)}>
                            <span>Bookmarked</span>
                            <span  class="material-icons" id={props.articleId + "bookmarkIcon"}></span> 
                        </button>
                    }

                    {props.read === false ? 
                        <p>Not Read</p>
                        :
                        <p>Read</p>
                    } */}
                </div>
                
                

                <div className='__article-sub-header __1600_style'>
                   
                    <h3 className="__article-postdate">
                        <span>Posted</span>
                        {/* Removed Until I can work out the date format issue */}
                        {/* <Link 
                            className="__news-item-link" 
                            to={{
                                pathname: '/theKnews/home/search/postdate/' + props.postdate, 
                                state: {
                                    author: props.postdate, 
                                    searchDBFor: "postdate",
                                    origin: "Article", 
                                    orderByChild: "postdate",
                                    arrayFromDatabase:props.arrayFromDatabase,
                                    leftoverArticles:props.leftoverArticles,
                                    fullDatabaseCall:props.fullDatabaseCall
                                }
                            }}> */}
                            {props.postdate}
                        {/* </Link> */}
                    </h3>

                    
                    <h3 className="__article-author">
                        <span>Author</span>
                        <Link 
                            className="__news-item-link" 
                            to={{
                                pathname: '/theKnews/home/search/author/' + props.author , 
                                state:{
                                    author: props.author, 
                                    tag:props.tag,
                                    searchDBFor: "author",
                                    origin: "Article", 
                                    orderByChild: "author",
                                    thingFromArticle:props.tag,
                                    arrayFromDatabase:props.arrayFromDatabase,
                                    leftoverArticles:props.leftoverArticles,
                                    fullDatabaseCall:props.fullDatabaseCall
                                    }
                                }}>
                                {props.author}
                        </Link>
                    </h3>
                    

                    <h3>
                        <span>Email </span>
                        {props.email}
                    </h3>



                    <h3 className="__article-tag">
                        <span>Topic</span>
                        <Link className="__news-item-link" to={{pathname: '/theKnews/home/search/tag/' + props.tag , state: {author: props.tag, searchDBFor: "tag",origin: "Article", orderByChild: "tag"}}}>
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
                       

                        {/* <PageScore likes={props.likes} dislikes={props.dislikes} id={props.id}/> */}
                        
                        </article>                  
                        


                        <div className="hideArticleButtonWrapper" id="articleHideButton">
                            <button id={props.id} onClick={() => handleClick(
                                                                    props.articleId, 
                                                                    props.postsArray,
                                                                    props.arrayFromDatabase,
                                                                    props.leftoverArticles,
                                                                    props.fullDatabaseCall)}>
                                                                    Hide Article</button>
                        </div>

                    {/* <ExtraImageLoop />       */}
                       
                </div> 
                
            </div>

    );
}

export default ArticleArea;