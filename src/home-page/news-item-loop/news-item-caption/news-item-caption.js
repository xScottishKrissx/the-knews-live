import React from 'react';
import {Link} from 'react-router-dom';

import './news-item-caption.css';

export class Caption extends React.Component{

    constructor(props){
        super(props);
        this.dragFriendlyCaption = this.dragFriendlyCaption.bind(this);
    }

    dragFriendlyCaption(e){
        e.preventDefault();
    }
    
    render(){
        const pageid = this.props.pageid;
        const style = this.props.style;
        const title = this.props.title;
        const author = this.props.author;
        const tag = this.props.tag;

        return (            

            <Link 
                className="news-item-link" 
                to={{pathname: '/articles/news-page/' + pageid}}
            >
                <div style={style}>
                    <div className="news-item-link-text" onClick={this.dragFriendlyCaption}>
                        <span id="news-item-link-text-title">{title}</span>
                        <span id="news-item-link-text-tag-author-wrapper">
                            <span id="news-item-link-text-tag">{tag}</span>
                            <span id="news-item-link-text-author">by {author}</span>
                        </span>
                    </div>                    
                </div> 
            </Link>
        );
    }
} 

export default Caption;