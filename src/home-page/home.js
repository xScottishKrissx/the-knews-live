import React from 'react';
import './home.css';

import NewsItemLoop from './news-item-loop/news-item-loop.js'
export class Home extends React.Component{

    render(){
        // console.log(this.props.location.search)
        // console.log(this.props.match.params.tagname)
        // console.log(this.props.match.params.searchterm)


        return(
            <div className='home-wrapper' >                
                <div className="news-item-wrapper">                   
                    <NewsItemLoop urlTagProp={this.props.match.params.tagname }/>        
                </div>
            </div>
        )
    }
}




export default Home;
