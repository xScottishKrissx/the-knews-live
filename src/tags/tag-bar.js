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
        

        console.log(this.state.test)

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
                <Link className="news-item-link" to={{pathname: '/theKnews/tags/sports' , state: {tag: "Sports", tag3:this.state.articlesArray } }}>                    
                    <li onClick={() => this.getTagArticles("Sports")} >Sports</li>
                </Link>

                <Link className="news-item-link" to={{pathname: '/theKnews/tags/news' , state: {tag: 'News', tag3:this.state.articlesArray }}}>
                    <li onClick={() => this.getTagArticles("News")} >News</li>
                </Link>

                <Link className="news-item-link" to={{pathname: '/theKnews/tags/weather' , state: {tag: 'Weather', tag3:this.state.articlesArray}}}>
                    <li onClick={() => this.getTagArticles("Weather")} >Weather</li>
                </Link>
                
                </ul>
                
            </div>
            
        )
    }
}

class Tags1 extends React.Component{
    render(){
        return (
            <div>
                <p>Thing - {this.state.test1}</p>
            </div>
        )
    }
}


    export default TagBar;