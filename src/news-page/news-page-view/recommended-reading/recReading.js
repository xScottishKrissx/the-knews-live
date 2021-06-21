import React from 'react';
import { Link } from 'react-router-dom';
import './recReading.css';

export const RecReading = (props) =>{
    
    const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || props.database
    // console.log(database)
    
    var articleSelection = []

    // Random Articles
    for(var i = 0; i < 4; i++){
        var randomNumber = Math.floor(Math.random() * 80) + 1; 
        var getArticles = database[randomNumber]            
        articleSelection.push(getArticles)
    }

    // Precise Controls
        // var compArray = [319,546,536,375]
        // for(i = 0; i < 4; i++){
        //     var getArticles = database.filter(obj => obj.id === compArray[i] ) 
        //     articleSelection.push(getArticles[0])
        // }

    // Format the articles
    const recReadingItems = articleSelection.map((value) => {
        // const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
        const style = {
            // backgroundImage: 'url(' + imgUrl + ')',
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width:"100%",
        }   
        return(
            
            <div className="recReadingItem" key={value.key}>   
                <Link to={{ pathname: value.id , state: {articleId: value.id} }}>
                    {/* <img src={imgUrl} style={style} alt="literally all random images, don't worry about it" /> */}
                    <h3>{value.title}</h3>
                    <p>{value.postdate}</p>
                </Link>
            </div>
        )
    })

    
        return(
               <div className="recReadingWrapper"><h2>RecReading</h2>{recReadingItems}</div>
        )
    }
    
    export default RecReading;