import React from 'react';
import './home.css';



import TagBar from '../tags/tag-bar.js';
import NewsItemLoop from './news-item-loop/news-item-loop.js'

export class Home extends React.Component{

    // componentDidMount(){
    //     window.addEventListener('scroll', this.scroll);
    // }
    // componentWillUnmount(){
    //     window.addEventListener('scroll', this.scroll);
    // }
    // scroll(){
    //       const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    //       const body = document.body;
    //       const html = document.documentElement;
    //       const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    //       const windowBottom = windowHeight + window.pageYOffset;
    //       console.log(docHeight);
    //       console.log(windowBottom)
    //       if(windowBottom >= docHeight){
    //           console.log("Bottom Reached")
    //       }else{
    //           console.log("Not At Bottom Yet")
    //       }
    //   }

    render(){
        return(
            <div className='home-wrapper' >                
                {/* <h1>Home</h1> */}
                <div className="news-item-wrapper">
                    <TagBar testprops="testprops" />
                    <NewsItemLoop />                   
                </div>
            </div>
        )
    }
}




export default Home;