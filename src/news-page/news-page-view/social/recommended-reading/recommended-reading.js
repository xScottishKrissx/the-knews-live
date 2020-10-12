import React from 'react';
import fire from '../../../../fire.js';

import './recommended-reading.css'

class RecommendedReading extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: []
        }
    }

    componentDidMount(){
        
        const articleRef = fire.database().ref('items').limitToFirst(4);
        articleRef.on('value', (snapshot) => {
            let articles  = snapshot.val();
            let tempState = [];
            for(let eachItem in articles){
                tempState.push({
                    id:eachItem,
                    title: articles[eachItem].title,
                    postdate: articles[eachItem].postdate
                });
            }
            this.setState({
                articlesArray: tempState
            })
            console.log(this.state.articlesArray);
        })
    }

    render(){
        const items = this.state.articlesArray;
        const showItems = items.map((item, key) => {
            const imgUrl = "https://unsplash.it/500/200?random=" + item.id;
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
                
                <div className="recReadingItem" key={key}>   
                
                    <div >           
                        <a href={"/articles/news-page/" + item.id}>
                            <img src={imgUrl} style={style}/>
                            <h3>{item.title}</h3>
                            <p>{item.postdate}</p>
                        </a> 
                    </div>                   
                </div>
               
            )
        })
        return (
            <div className="recReadingWrapper">
                <h2>Recommended Reading...</h2>
                    <div className="recReadingItemWrapper">            
                        {showItems}
                    </div>
            </div>

        );
    }
}

export default RecommendedReading;

