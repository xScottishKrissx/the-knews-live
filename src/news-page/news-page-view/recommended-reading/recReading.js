import React from 'react';
import { Link } from 'react-router-dom';
import './recReading.css';



export const RecReading = (props) =>{
    
    const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || props.database
    // console.log(database)
    
    var articleSelection = []

    // Random Articles
    // for(var i = 0; i < 5; i++){
    //     var randomNumber = Math.floor(Math.random() * 80) + 1; 
    //     var getArticles = database[randomNumber]            
    //     articleSelection.push(getArticles)
    // }

    // Precise Controls
        var compArray = [319,546,536,375,856]
        for(var i = 0; i < 5; i++){
            var getArticles = database.filter(obj => obj.id === compArray[i] ) 
            articleSelection.push(getArticles[0])
        }

    // Format the articles
    const recReadingItems = articleSelection.map((value) => {
        const imgUrl = "https://unsplash.it/190/100?random=" + value.id;
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

    
        return(
               <div className="recReadingWrapper">
                   <h2>Recommended Reading</h2>
                   <div className="recReadingItemsWrapper">{recReadingItems}</div>
                   
                </div>
        )
    }
    
    export default RecReading;