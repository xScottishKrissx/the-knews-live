import { Link } from "react-router-dom";
import './recommendedReading.css';

export const RecommendedReading = (props) =>{
    
        // Random Articles
    var articleSelection = []
    for(var i = 0; i < 4; i++){
        var randomNumber = Math.floor(Math.random() * 9) + 1; 
        // console.log(randomNumber)
        
        var getArticles = props.database[randomNumber]      
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
    
        const recReadingView = articleSelection.map((value) => {
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

    return (
        
        <div className="recReadingContainer">
            <h3>Recommended Reading</h3>    
            <div className="recReadingItemsWrapper">                            
                {recReadingView}
            </div>
        </div>

    );
}

export default RecommendedReading;