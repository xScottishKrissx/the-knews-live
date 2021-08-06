import React from 'react';
import ParseHTML from '../../../utility_components/parse-database-html/parse-html.js';
// import {Helmet} from 'react-helmet';
import {Helmet} from 'react-helmet';

import fbIcon from '../../../img/fb_icon_512px_black_and_white.png';
import twitterIcon from '../../../img/twitter_icon_512px_black_and_white.png';
import instagramIcon from '../../../img/instagram_icon_512px_black_and_white.png';
import pinterestIcon from '../../../img/pinterest_icon_512px_black_and_white.png';
// import PageScore from '../social/page-score.js';
// import Share from '../social/share.js';

// import fire from '../../../fire.js';

// import EditArticle from './edit-article.js';

import './article-area.css';
import ArticleInformation from './articleInformation/articleInformation.js';
// import HideArticle from '../../../utility_components/hide-article/hide-articlev2.js';
// import hideArticleFeedback from '../../../utility_components/hide-article/hideArticleFeedback.js';
// import createBookmark from '../../../utility_components/bookmarks/createBookmark.js';
// import removeBookmark from '../../../utility_components/bookmarks/removeBookmark.js';




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

    // const htmlAttrs = helmet.htmlAttributes.toComponent();
    // const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (

            <div className='articleWrapper'>
                <div className="articleContent">
            {/* <img src="https://the-knews.s3.eu-west-2.amazonaws.com/027+-+0fVAsZf.jpg" /> */}
            {/* Article Header */}

            <div className='articleHeadline'>
                <header><h1>{props.title}</h1></header>
            </div>



            <ArticleInformation
                // Tag 
                tag={props.tag}
                // Author
                author={props.author}
                arrayFromDatabase={props.arrayFromDatabase}
                leftoverArticles={props.leftoverArticles}
                fullDatabaseCall={props.fullDatabaseCall}
                // PostDate
                postdate={props.postdate}
            />
           
            {/* <div className="authorSocial">
                <span><img title={props.author + "'s facebook"} src={fbIcon} /></span>
                <span><img title={props.author + "'s twitter"} src={twitterIcon} /></span>
                <span><img title={props.author + "'s instagram"} src={instagramIcon} /></span>
                <span><img title={props.author + "'s pinterest for some reason"} src={pinterestIcon} /></span>
            </div> */}


                {/* {loggedInEmail === articleEmail ?
                <EditArticle articleText={props.text} articleID={props.id} articleTitle={props.title}/>
                :
                <p>No Edit Button for you</p>
                } */}             
                   
                {/* Article Body */}
                <div className='articleBody'>
                    <article><ParseHTML props={props.text}/></article>
                </div> 


{/* 
                <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=Hello%20world">
                    Tweet
                </a>

                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}

                
                {/* <div class="postArticleBody"><br/>
                    <span>--Bookmarked 1230 times</span>
                </div> */}
            </div>
            </div>

    );
}

export default ArticleArea;