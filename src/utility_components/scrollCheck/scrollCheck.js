import React from 'react';
import fire from '../../fire.js';
import RenderCardState from '../renderCard/renderCardState.js';

// Render Card
// import RenderCard from './renderCard/renderCardState.js';


class ScrollCheck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            renderToPage:this.props.database,
            arrayStartState:10,
            arrayEndState:15
        }
    }

    componentDidMount(){
        const thing = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.fullDatabaseCall;
        this.setState({articles:thing})
        window.addEventListener('scroll', this.scroll);    
        window.addEventListener('touchstart', this.scroll);       

        // const editedArticlesArray = JSON.parse(localStorage.getItem("editedArticleArray"));



        // if(editedArticlesArray != null)this.setState({articlesArray:editedArticlesArray})


    }

    scroll = (e) => {
        // e.preventDefault()
        // A bunch of stuff used to detect the current scroll position...
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        // ...this is what is actually used.
        const windowBottom = windowHeight + window.pageYOffset;
        // console.log(windowBottom)
    
        // Grabbing the articles used for the on scroll event. If the event has been triggered and an article has been hidden then I used the array in local storage, if not then I use the default leftover article array from props.
        // const editedArticlesArray = JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")) || this.props.leftoverArticles;
        // const editedArticlesArray = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.leftoverArticles;
        const getArticlesToLoad = this.props.database



        if(windowBottom >= docHeight){


            // this.setState({thing: "Hello"})
            // Get the articles that should be rendered on scroll...
            // console.log(editedArticlesArray.splice(0,5))
            // console.log(getArticlesToLoad.splice(10,15))
            const renderNewArticles = this.state.renderToPage.concat(getArticlesToLoad.splice(this.state.arrayStartState,this.state.arrayEndState))
            this.setState({
                renderToPage:renderNewArticles,
                arrayStartState: this.state.arrayStartState + 5,
                arrayEndState: this.state.arrayEndState + 5
            })
            // Then join with the main array
            // const renderNewArticlesOnScroll = this.state.mainArray.concat(editedArticlesArray.slice(this.state.arrayStartState,this.state.arrayEndState));
            
            

            // const filterArticlesBy = renderNewArticlesOnScroll.filter(obj => obj.tag === localStorage.getItem("filterOption"));



            // Setting state will then update the page with the new articles attached to the end of the array.
            // this.setState({
            //     mainArray:renderNewArticlesOnScroll,
            //     arrayStartState: this.state.arrayStartState + 5,
            //     arrayEndState: this.state.arrayEndState + 5
            // })    

            // console.log(this.state.mainArray)
        }else{
            // console.log("Not At Bottom Yet")
        }
        // const markArticleRead = this.state.thing.map(el => {
        //     if(el.read === true && el != null )if( document.getElementById(el.id))
        //         document.getElementById(el.id).classList.add('markAsRead')
        // });
    }


    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll, {passive:true});
        window.removeEventListener('touchstart',this.scroll, {passive:true});
        fire.database().ref("items").off();
      }

    render(){
        const render = this.state.renderToPage;

        // let renderToPage;
        // if(render && render.length > 0){
        //     console.log(render)
        //     renderToPage = render.map(el => {
        //         <li>Name:</li>
        // });
        // }

        // console.log(this.props.database.slice(10))
        console.log(render)



        return(
            // <div>New Card</div>
            <RenderCardState
                database={render}

                // Card Size
                startingCardSize={this.props.startingCardSize}
                changedCardSize={this.props.changedCardSize}
            />
        )
    }
}

export default ScrollCheck;