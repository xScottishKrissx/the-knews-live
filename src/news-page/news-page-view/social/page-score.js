import React from 'react';

import './page-score.css';
import HandleLike from './handle-like.js';


class PageScore extends React.Component{
    render(){
        const id = this.props.id;
        const likes = this.props.likes;
        const dislikes = this.props.dislikes;
        return (
            <div className='social'>

                <div className="article-likes">
                    <span>Likes:</span>
                    <span className="social-score pos">{likes}</span>
                </div>

                <div className="article-dislikes">
                   <span> Not Likes: </span>
                   <span className="social-score neg">{dislikes}</span>
                </div>

                <HandleLike id={id} likes={likes} dislikes={dislikes}/>
        </div>
        )
    }
}

export default PageScore;