import React from 'react';
import { Link } from 'react-router-dom';

export class RecReading extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.database
        // console.log(database)
        
        var articleSelection = []

        // Random Articles
        for(var i = 0; i < 4; i++){
            var randomNumber = Math.floor(Math.random() * 80) + 1; 
            var getArticles = database[randomNumber]            
            articleSelection.push(getArticles)
        }

        // Precise Controls
        var compArray = [319,546,536,375]
        for(i = 0; i < 4; i++){
            var getArticles = database.filter(obj => obj.id === compArray[i] ) 
            // articleSelection.push(getArticles[0])
        }

        // Format the articles
        const recReadingItems = articleSelection.map((value) => {
            const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
            const style = {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width:"100%",
                // height: "400px",
                // width:"100%"
            }   
            return(
                <div key={value.key}>   
                    {/* articleId={value.id}     
                                         */}
                    <Link to={{
                        pathname: '/theKnews/home/articles/news-page/' + value.id , 
                        state: {articleId: value.id}
                    }}>
                        {/* <a href={"/theKnews/home/articles/news-page/" + value.id}> */}
                        {/* <img src={imgUrl} style={style} alt="literally all random images" /> */}
                        <h3>{value.title}</h3>
                        <p>{value.postdate}</p>
                    {/* </a>  */}
                    </Link>
                                   
            </div>
            )
        })

        
        return(

                         <div>{recReadingItems}</div>

        )
    }
}

export default RecReading;