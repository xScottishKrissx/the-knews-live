import React from 'react';
import './home.css';

import NewsItemLoop from './news-item-loop/news-item-loop.js'

export class Home extends React.Component{

    render(){
        return(
            <div className='home-wrapper' >                
                {/* <h1>Home</h1> */}
                <div className="news-item-wrapper">
                    <NewsItemLoop />                    
                </div>
            </div>
        )
    }
}




export default Home;