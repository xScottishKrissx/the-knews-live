import React from 'react';
import {Link} from 'react-router-dom';
import './navControls.css';

export class NavControls extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentArticle:this.props.currentarticleid
            
        }
        
    }

    
    render(){
        const convertArticleIdFromString = Number(this.state.currentArticle)
        const nextArticle = convertArticleIdFromString + 1;
        const previousArticle = convertArticleIdFromString - 1;
        
        return (
            <div className="nav-controls">
            <span className="icons-wrapper">

                {this.props.props === 'only-home-button' ? 
                <div className="nav-icons home-button">
                    <Link to='/theKnews' >
                        <p className="large material-icons">home</p>
                        <span>Home</span>
                    </Link>
                </div>
                :
                <div className="full-nav-bar">
                    <div className="nav-icons home-button">
                        <Link to='/theKnews' >
                            <p className="large material-icons">home</p>
                            <span>Home</span>
                        </Link>
                    </div>
                    
                    <div className="nav-icons back-button">
                        <Link to={'/articles/news-page/' + previousArticle } onClick={this.forceUpdate} >
                            <p className="large material-icons">arrow_back</p>
                            <span>Prev Article</span>
                        </Link>
                    </div>

                    <div className="nav-icons next-button">
                        <Link to={'/articles/news-page/' + nextArticle } onClick={this.forceUpdate}>
                            <p className="large material-icons">arrow_forward</p>
                            <span>Next Article</span>
                        </Link>
                    </div>
                </div>
            }
                

                    
            </span>
            </div>
        )
    }
}



export default NavControls;