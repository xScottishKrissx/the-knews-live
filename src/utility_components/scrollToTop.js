import React from 'react';
import '../utility_components/scrollToTop.css';

export class ScrollToTopBtn extends React.Component{
    scrollToTop(){
        window.scrollTo(0,0);
    }
    render(){
        return (
            <button id="scrollToTop" onClick={() => this.scrollToTop()}>Back to Top</button>
        )
    }
}



export default ScrollToTopBtn;