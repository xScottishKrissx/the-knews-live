import React from 'react';
import {Link} from 'react-router-dom';

import '../tags/tag-bar.css';


class TagBar extends React.Component{
    render(){
        
        return(
            <div className="tagbar-wrapper">
                <ul>
                <Link className="news-item-link" to={{pathname: '/theKnews/tags/sports' , state: {tag: 'Sports'} }}>
                    <li>Sports</li>
                </Link>
                <Link className="news-item-link" to={{pathname: '/theKnews/tags/news' , state: {tag: 'News'}}}>
                    <li>News</li>
                </Link>
                <Link className="news-item-link" to={{pathname: '/theKnews/tags/weather' , state: {tag: 'Weather'}}}>
                    <li>Weather</li>
                </Link>
                </ul>
            </div>
        )
    }
}


    export default TagBar;