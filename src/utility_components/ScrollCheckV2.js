import React from 'react';
import fire from '../fire.js';

// Render Card
import RenderCard from './renderCard/renderCard.js';

class ScrollCheckV2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            arrayStartState: 0,
            arrayEndState: 5,
            origin: props.origin,
            // dbRef: props.databaseReference,
            mainArray:[]
        }
    }

    componentDidMount(){
        window.addEventListener('scroll', this.scroll);      

        const editedArticlesArray = JSON.parse(localStorage.getItem("editedArticleArray"));
        // console.log(editedArticlesArray)
        if(editedArticlesArray != null)this.setState({articlesArray:editedArticlesArray})

        if(this.state.origin === undefined){
            this.setState({
                articlesArray: this.props.articlesArray
            })
        }else{
            console.log("On Tags Page")
        }

        // console.log(JSON.parse(localStorage.getItem("editedArticleArray")))
        // console.log(JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")))
        // console.log(JSON.parse(localStorage.getItem("testNewArticlesOnRender")))
    }

    scroll = () => {

        // A bunch of stuff used to detect the current scroll position...
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        // ...this is what is actually used.
        const windowBottom = windowHeight + window.pageYOffset;
    
        // Grabbing the articles used for the on scroll event. If the event has been triggered and an article has been hidden then I used the array in local storage, if not then I use the default leftover article array from props.
        const editedArticlesArray = JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")) || this.props.leftoverArticles;


        if(windowBottom >= docHeight){
            console.log("Load New Articles")
            
            // console.log(editedArticlesArray)

            // Get the articles that should be rendered on scroll...
            // console.log(editedArticlesArray.splice(0,5))

            // Then join with the main array
            const renderNewArticlesOnScroll = this.state.mainArray.concat(editedArticlesArray.slice(this.state.arrayStartState,this.state.arrayEndState));

            const filterArticlesBy = renderNewArticlesOnScroll.filter(obj => obj.tag === localStorage.getItem("filterOption"));

            console.log(renderNewArticlesOnScroll)
            console.log(filterArticlesBy)

            // Setting state will then update the page with the new articles attached to the end of the array.
            this.setState({
                mainArray:renderNewArticlesOnScroll,
                arrayStartState: this.state.arrayStartState + 5,
                arrayEndState: this.state.arrayEndState + 5
            })    

        }else{
            // console.log("Not At Bottom Yet")
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
      }

    render(){
        console.log(this.state.mainArray)
        return(
            <React.Fragment>
                {/* {pageView} */}
                <RenderCard 
                    database={this.state.mainArray}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp} 
                    leftoverArticles={this.props.leftoverArticles}  
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    
                
                />
                {/* <NewsItemLoopView databaseProp={new1} /> */}
            </React.Fragment>   
        )
    }
}

export default ScrollCheckV2;