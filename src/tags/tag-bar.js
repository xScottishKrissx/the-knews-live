import React from 'react';
import fire from '../fire.js'
import {Link} from 'react-router-dom';

import '../tags/tag-bar.css';

class TagBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            test: "Sports",
        }

    }
    getTagArticles(chosenTag){
        console.log("Get " + chosenTag)
        this.setState({
            test:chosenTag
    })
        
        const dbRef = fire.database().ref('items').orderByChild("tag").startAt(this.state.test).endAt(this.state.test)

        dbRef.on('value', (snapshot) => {
            let newsItems = snapshot.val();
            // console.log(newsItems);
            let newState = [];
            for(let newsItem in newsItems){
                newState.push({
                    key: newsItem,
                    author: newsItems[newsItem].author,
                    title: newsItems[newsItem].title,
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes,
                    id:newsItems[newsItem].id,
                    tag:newsItems[newsItem].tag
                });
            }

            this.setState({
                // articlesArray: newState.reverse(),
                articlesArray: newState.slice(0,50)
            })
            console.log("Articles Array is:: " + this.state.articlesArray);
        })
    }


    render(){
        
        return(
            <div className="tagbar-wrapper">
                <ul>
                <Link myprop="Sports" className="news-item-link" to={{pathname: '/theKnews/tags/sports' , state: {searchDBFor: "Sports", tag3:this.state.articlesArray, origin: "Tagbar", orderByChild: "tag" } }}>                    
                    <li onClick={() => this.getTagArticles("Sports")} >Sports</li>
                </Link>

                <Link className="news-item-link" to={{pathname: '/theKnews/tags/news' , state: {searchDBFor: "News", tag3:this.state.articlesArray,origin: "Tagbar",orderByChild: "tag" }}}>
                    <li onClick={() => this.getTagArticles("News")} >News</li>
                </Link>

                <Link className="news-item-link" to={{pathname: '/theKnews/tags/weather' , state: {searchDBFor: "Weather", tag3:this.state.articlesArray,origin: "Tagbar", orderByChild: "tag"}}}>
                    <li onClick={() => this.getTagArticles("Weather")} >Weather</li>
                </Link>
                
                </ul>
                
            </div> 
        )
    }
}

export default TagBar;