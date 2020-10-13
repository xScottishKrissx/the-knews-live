import React from 'react';
import {Link} from 'react-router-dom';

import './news-item-caption.css';

export class Caption extends React.Component{

    constructor(props){
        super(props);
        this.showExcerpt = this.showExcerpt.bind(this);
    }

    showExcerpt(e){
        e.preventDefault();
        // console.log("ShowExcerpt");
        // const thing = document.getElementsByClassName("news-item-link");
        // console.log(this.props.pageid);
        // console.log(thing);
        // console.log(thing[e.currentTarget])
        
    }
    
    render(){
        const pageid = this.props.pageid;
        //console.log(pageid);
        const style = this.props.style;
        const title = this.props.title;
        const author = this.props.author;
        // const uplikes = this.props.likes;
        // const dislikes = this.props.dislikes;
       // console.log(title);

        return (            

            <Link 
                className="news-item-link" 
                to={{pathname: '/articles/news-page/' + pageid}}
                              
                >
            {/* // <Link className="news-item-link" to={{pathname: pageid}}>         */}
            

                <div style={style}>
                    
                    <div className="news-item-link-text" onClick={this.showExcerpt}>
                        <span>{title}</span>
                        <p>by {author}</p>
                    </div>
                    {/* <div className="hover-caption">
                        <p>{uplikes} | {dislikes}</p>
                    </div> */}
                    
                </div> 

            </Link>
        );
    }
} 

export default Caption;