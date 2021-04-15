import React from 'react';
import {Link} from 'react-router-dom';
import './navControls.css';

import { Redirect } from 'react-router';



export class NavControls extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentArticle:this.props.currentarticleid,

            
        }
       
        
    }


      
    render(){
        const convertArticleIdFromString = Number(this.state.currentArticle)
        const nextArticle = convertArticleIdFromString + 1;
        const previousArticle = convertArticleIdFromString - 1;
        console.log(this.props)

      


        

        
        console.log(localStorage.getItem("changedFullDatabaseCall"))
        console.log(this.props.arrayFromDatabase)
        return (
            <div className="nav-controls">
            <span className="icons-wrapper">
                <div className="nav-icons home-button">
                        <Link to='/home' >
                            <p className="large material-icons">home</p>
                            <span>Home</span>
                        </Link>
                </div>
                {/* {this.props.props === 'only-home-button' ? 
                <div className="nav-icons home-button">
                    <Link to='/home' >
                        <p className="large material-icons">home</p>
                        <span>Home</span>
                    </Link>
                </div>
                :
                <div className="full-nav-bar">
                    <div className="nav-icons home-button">
                        <Link to='/home' >
                            <p className="large material-icons">home</p>
                            <span>Home</span>
                        </Link>
                    </div>
                    
                    <div className="nav-icons back-button">
                        <Link to={'/home/articles/news-page/' + previousArticle } onClick={() => this.forceUpdate()} >
                            <p className="large material-icons">arrow_back</p>
                            <span>Prev Article</span>
                        </Link>
                    </div>
{/* 
                    <div className="nav-icons next-button">
                        <Link to={'/home/articles/news-page/' + nextArticle } onClick={this.forceUpdate}>
                            <p className="large material-icons">arrow_forward</p>
                            <span>Next Article</span>
                        </Link>
                    </div> */}

                    {/* <div className="nav-icons next-button">
                        <Link to={'/home/articles/news-page/7'} >
                            <p className="large material-icons">arrow_forward</p>
                            <span>Next Article</span>
                        </Link>
                    </div>
                </div> */}
            
                

                    
            </span>
            </div>
        )
    }
}



export default NavControls;