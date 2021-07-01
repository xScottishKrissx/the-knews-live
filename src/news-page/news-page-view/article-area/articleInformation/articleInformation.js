import { Link } from "react-router-dom";

import '../articleInformation/articleInformation.css';
export const ArticleInformation = (props) =>{
    const setRandomColour = JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"};
return(
    
    <div className="articleInformation">

                <div className="articleTag">
                    <span>posted in </span>
                        <Link className="newsItemLink" style={setRandomColour} to={{pathname: '/theKnews/home/search/tag/' + props.tag , state: {author: props.tag, searchDBFor: "tag",origin: "Article", orderByChild: "tag"}}}>
                            {props.tag}
                        </Link>
                </div>
                
                <div className="articleAuthor" >
                    <span>by</span>
                    <Link 
                        className="newsItemLink"
                        style={setRandomColour}
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
                </div>
                

                {/* <div className="articleEmail"><span>{props.email}</span></div> */}


                <div className="articlePostdate">
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
                        <span>on {props.postdate}</span>
                    {/* </Link> */}
                </div>
    </div>
    
    )
}

export default ArticleInformation;