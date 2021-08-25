import React from 'react';
import { Link } from 'react-router-dom';
import clearAllBookmarks from '../../../utility_components/bookmarks/clearAllBookmarks';
import './recReading.css';



export const RecReading = (props) =>{
    const setRandomColour = JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"};
    const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || props.database
    console.log(database)
    
    var articleSelection = []

    // Random Articles
    if(articleSelection.length === 4)console.log("Break Loop")
    for(var i = 0; i < 4; i++){
        var randomNumber = Math.floor(Math.random() * 9) + 1; 
        // console.log(randomNumber)
        
        var getArticles = database[randomNumber]      
        // console.log(getArticles)      
        
        articleSelection.push(getArticles)
        // console.log(articleSelection)
        console.log(i)
    }

    // Precise Controls
        // var compArray = [319,546,536,375,856]
        // for(var i = 0; i < 5; i++){
        //     var getArticles = database.filter(obj => obj.id === compArray[i] ) 
        //     articleSelection.push(getArticles[0])
        // }

    // Format the articles
    console.log(articleSelection)
    const recReadingItems = articleSelection.map((value) => {
        // console.log(value.id)
        const imgUrl = "https://unsplash.it/190/108?random=" + value.id;
        const style = {
            backgroundImage: 'url(' + imgUrl + ')',
            backgroundColor:"red",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // width:"100%",
        }   
        return(
            
            <div className="recReadingItem" key={value.key} style={style}>   
                <div className="recReadingCaption">
                    <Link to={{ pathname: value.id , state: {articleId: value.id} }}>
                        {/* <img src={imgUrl} style={style} alt="literally all random images, don't worry about it" /> */}
                        
                        <div className="recReadingCaptionHeadlineWrapper">
                            <span className="recReadingCaptionHeadline">{value.title}</span>
                        </div>
                            
                        {/* <p>{value.postdate}</p> */}
                        

                        <div className="recReadingCaptionArticleInfo">
                            <span className="recReadingCaptionTag">{value.author || "author"}</span>
                            <span className="recReadingCaptionPostDate">{value.postdate || "PostDate"}</span>
                            
                            <span className="recReadingCaptionPostDate">{value.tag || "No Tag"}</span>
                        </div>
                    </Link>
                </div>
            </div>
            
        )
    })
    const getCurrentArticle = database.filter(x => x.id == props.id)
    
    const articleInfo = getCurrentArticle.map((value) => {
        var formatAuthor = value.author.toLowerCase().replace(/\w\s/g, '')
        
        return(
            <div className="articleInfo">

                <div id="articleInfo_icon_author">
                    <span><i class="bi bi-image"></i></span>
                    <h3>{value.author}</h3>
                </div>

                <div className="articleInfoSocial">

                    <div title={"@"+ formatAuthor}>
                        <i class="bi bi-twitter"></i>
                        <span>{"@"+ formatAuthor}</span>
                    </div>

                    <div title={"@"+ formatAuthor}>
                        <i class="bi bi-instagram"></i>
                        <span>{"@"+ formatAuthor}</span>
                    </div>

                    <div title={formatAuthor + "@yahoo.com"}>
                        <i class="bi bi-envelope-fill"></i> 
                        <span> {formatAuthor + "@yahoo.com"}</span>
                    </div>
                
                    <div title={formatAuthor + ".com"}>
                        <i class="bi bi-globe"></i>
                        <span>{formatAuthor + ".com"} </span>
                    </div>

                </div>

                <div className="articleInfoAbout">
                    <h3>About</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor quam tortor, eu dapibus ex accumsan eget. Curabitur ut felis commodo, dignissim leo id, aliquam velit. Sed vitae aliquam nibh, eget eleifend quam. Integer volutpat ligula nec massa pellentesque, at commodo diam viverra. Quisque dolor erat, accumsan id turpis tristique, posuere auctor nunc. Fusce in auctor ligula. Donec vestibulum tincidunt eleifend.</p>
                    {/* <p>Main Category: {value.tag}</p> */}
                </div>

            </div>
        )
    })

    console.log(props.id)
        return(
               <div className="recReadingWrapper" style={setRandomColour}>
                    {articleInfo}
                <div className="recReadingContainer">
                    <h3>Recommended Reading</h3>
                   <div className="recReadingItemsWrapper">{recReadingItems}</div>
                </div>
                   
                </div>
        )
    }
    
    export default RecReading;