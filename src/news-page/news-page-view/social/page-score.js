import React from 'react';

import './page-score.css';


class PageScore extends React.Component{
    render(){
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

        </div>
        )
    }
}

export default PageScore;