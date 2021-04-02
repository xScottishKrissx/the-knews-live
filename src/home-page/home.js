import React from 'react';
import ClearCache from '../utility_components/ClearCache';
import './home.css';


import NewsItemLoop from './news-item-loop/news-item-loop.js'
export class Home extends React.Component{
    render(){
        return(
            <div className='home-wrapper' >                
                
                <div className="news-item-wrapper">
                    <ClearCache />
                    <NewsItemLoop 
                        databaseProp={this.props.databaseProp}
                        leftoverArticles={this.props.leftoverArticles} />  
                </div>
            </div>
        )
    }
}




export default Home;
