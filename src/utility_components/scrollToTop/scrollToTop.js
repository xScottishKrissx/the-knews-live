import React from 'react';
import './scrollToTop.css';

export class ScrollToTopBtn extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showScrollToTopButton: false
        }
    }
    componentDidMount(){
        window.addEventListener('scroll', this.scroll);
    }

    scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const windowBottom = windowHeight + window.pageYOffset;
        // console.log(windowBottom)

        if(windowBottom > 1300){
            this.setState({showScrollToTopButton: true })
        }else{
         this.setState({showScrollToTopButton: false })
        }
    }
    scrollToTop(){
        window.scrollTo(0,0);
        // console.log("Click")
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
    }
    
    render(){
        return (
            // <button id="scrollToTop" onClick={() => this.scrollToTop()}>Back to Top</button>
            <div className="scrollToTopBtnWrapper">
                {this.state.showScrollToTopButton === true ? 
                <span id="scrollToTop" onClick={() => this.scrollToTop()}>
                    <i class="bi bi-caret-up-square-fill"></i>
                    {/* <p>Return To Top</p> */}
                </span>
                :
                null
                }
            </div>
        )
    }
}



export default ScrollToTopBtn;