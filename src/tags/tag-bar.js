import React from 'react';
import {Link} from 'react-router-dom';


class TagBar extends React.Component{
    render(){
        
        return(
            <div>
                <ul>
                <Link className="news-item-link" testprops="Sports" to={{pathname: '/theKnews/tags/sports' , state: {tag: 'Sports'} }}>
                    <li>Sports</li>
                </Link>
                <Link className="news-item-link" testprops="News" to={{pathname: '/theKnews/tags/news' , state: {tag: 'News'}}}>
                    <li>News</li>
                </Link>
                <Link className="news-item-link" testprops="Weather" to={{pathname: '/theKnews/tags/weather' , state: {tag: 'Weather'}}}>
                    <li>Weather</li>
                </Link>
                </ul>
            </div>
        )
    }
}


    export default TagBar;