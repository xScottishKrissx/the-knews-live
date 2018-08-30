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
        
        const articleRef = fire.database().ref('items').orderByKey().startAt("3").endAt("6");
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
            // console.log(this.state.articlesArray);
        })
    }

    render(){
        const items = this.state.articlesArray;
        const showItems = items.map((item, key) => {
            return(
                
                <div className="recReadingItem" key={key}>              
                     <a href={"/articles/news-page/" + item.id}>
                        <h3>{item.title}</h3>
                        <p>Posted: {item.postdate}</p>
                    </a>                    
                </div>
               
            )
        })
        return (
            <div className="recReadingWrapper">
                {showItems}
            </div>
        );
    }
}

export default RecommendedReading;

