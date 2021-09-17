import React from 'react';
import fire from '../fire.js';
import RenderCardState from './renderCard/renderCardState.js';

// Render Card
import RenderCard from './renderCard/renderCardState.js';


class ScrollCheckV2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            thing:[],
            arrayStartState: 0,
            arrayEndState: 5,
            origin: props.origin,
            // dbRef: props.databaseReference,
            mainArray:[]
        }
    }

    componentDidMount(){
        // const thing = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.fullDatabaseCall;
const thing = this.props.articlesArray

        this.setState({thing:thing})
        window.addEventListener('scroll', this.scroll);    
        window.addEventListener('touchstart', this.scroll);       

        const editedArticlesArray = JSON.parse(localStorage.getItem("editedArticleArray"));



        if(editedArticlesArray != null)this.setState({articlesArray:editedArticlesArray})

        // console.log(JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")) )
    }

    scroll = (e) => {
        // e.preventDefault()
        // A bunch of stuff used to detect the current scroll position...
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        // ...this is what is actually used.
        const windowBottom = windowHeight + window.pageYOffset + 100;
    
        // Grabbing the articles used for the on scroll event. If the event has been triggered and an article has been hidden then I used the array in local storage, if not then I use the default leftover article array from props.
        const editedArticlesArray = JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")) || this.props.leftoverArticles;
        // const editedArticlesArray = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.leftoverArticles;


        if(windowBottom >= docHeight){


            // Get the articles that should be rendered on scroll...
            // console.log(editedArticlesArray.splice(0,5))

            // Then join with the main array
            const renderNewArticlesOnScroll = this.state.mainArray.concat(editedArticlesArray.slice(this.state.arrayStartState,this.state.arrayEndState));

            // const filterArticlesBy = renderNewArticlesOnScroll.filter(obj => obj.tag === localStorage.getItem("filterOption"));



            // Setting state will then update the page with the new articles attached to the end of the array.
            this.setState({
                mainArray:renderNewArticlesOnScroll,
                arrayStartState: this.state.arrayStartState + 5,
                arrayEndState: this.state.arrayEndState + 5
            })    

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
        // console.log(this.state.mainArray)
        return(
            <React.Fragment>
              
                {/* <RenderCard 
                    database={this.state.mainArray}
                    startingCardSize={this.props.startingCardSize}
                    changedCardSize={this.props.changedCardSize}
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.articlesArray} 
                    leftoverArticles={this.props.leftoverArticles}  
                    fullDatabaseCall={this.props.fullDatabaseCall}

                    updateBookmarkStatus={this.props.updateBookmarkStatus}
                    updateHideStatus={this.props.updateHideStatus}
                    hideBookmarkedArticle={false}
                /> */}

                <RenderCardState
                        database={this.props.articlesArray}
                        
                        
                        // Card Size
                        startingCardSize={this.props.startingCardSize}
                        changedCardSize={this.props.changedCardSize}
                        // postsArray={this.state.postsArray}
                        arrayFromDatabase={this.props.databaseProp} 
                        leftoverArticles={this.props.leftoverArticles}  
                        fullDatabaseCall={this.props.fullDatabaseCall}
                        
                        // Controls
                        updateBookmarkStatus={this.props.updateBookmarkStatus}
                        updateHideStatus={this.props.updateHideStatus}
                        hideBookmarkedArticle={false}
                />

               {this.props.showMoreArticlesBtn ?
                    <span id="loadMoreArticlesButton">
                        <button onClick={()=>this.scroll()}>Load More Articles</button>
                    </span>
               :
               <span id="loadMoreArticlesButton">
                    <button>No articles to load. Check back later.</button>
                </span>
                }

            </React.Fragment>   
        )
    }
}

export default ScrollCheckV2;