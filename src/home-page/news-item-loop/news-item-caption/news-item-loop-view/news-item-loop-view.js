import React from 'react';

import '../news-item-loop-view/news-item-loop-view.css';

import FilterOptions from '../../../../utility_components/filterOptions/filterOptions';
import LiteKnews from '../../../../utility_components/liteKnews/liteKnews';
import RenderCard from '../../../../utility_components/renderCard/renderCard';
import ScrollCheckV2 from '../../../../utility_components/ScrollCheckV2';
import updateBookmarkStyles from '../../../../utility_components/bookmarks/updateBookmarkStyle';

import NavBar from '../../../../navBar/navBar';

import RenderCardState from '../../../../utility_components/renderCard/renderCardState';
class NewsItemLoopView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        // Card Size
        startingCardSize:"",
        changedCardSize:{
            // width: JSON.parse(localStorage.getItem("myData"))[0] ,
            width: this.props.cardSize[0],
            height: this.props.cardSize[1]
        },
        postsArray:[],

        //hiding articles for filter views
        getArticleBy:"All",
        renderArray:[],
        
        // liteKnews
        showArticle:false,
        renderLiteKnews: JSON.parse(localStorage.getItem("changedFullDatabaseCall")),
        }
        // Card Size Controls
        this.getCardSize = this.getCardSize.bind(this);
        // liteKnews
        this.closeLiteKnewsView = this.closeLiteKnewsView.bind(this);        
    }

componentDidMount(){
    const localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
    if(localStorageCards){
        const filterMarkedAsHiddenForReload = localStorageCards.filter(x=> x.markedforhide === false)
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(filterMarkedAsHiddenForReload))
        this.setState({renderArray:filterMarkedAsHiddenForReload})
    }
}

componentDidUpdate(){
    updateBookmarkStyles();
}

// Card Size Controls
getCardSize(width,height){this.setState({startingCardSize:{width:width,height:height}})}

// LiteKnews
    showArticle(){
        this.setState({
            showArticle:true,
            renderLiteKnews: JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.renderArray
        })
    }
    closeLiteKnewsView(){
        this.setState({ 
            showArticle:false,
            renderArray: JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.renderArray })
        // window.location.reload()
    }

// filterViews
    getFilteredArticles = (filteredByTag,getArticleBy) => {
        this.setState({
            renderArray: filteredByTag,
            getArticleBy:getArticleBy,
        })        
        // console.log( localStorage.getItem("storedFilterOptionTest"))
    }

    swipeThing(x){ this.setState({ loadingProgress:x }) }
    handleMenu(x){ document.getElementById(x).classList.add("showMenu") }

    // Updates the main render array when bookmarking articles. 
    // This let's me change the bookmark icon when using any of the bookmark options 
    updateBookmarkStatus = (articles) => { 
    //    const removeMarkedForHide = articles.filter(x=> x.markedforhide === false)
       const filterChoice = localStorage.getItem("filterOption")

       const filteredArticles = articles.filter(x=> x.tag === filterChoice )

       if(filterChoice === "All"){
            this.setState({ renderArray:articles })
       }else{
           this.setState({ renderArray:filteredArticles }) 
       }
    }
    updateHideStatus = (articles) =>{
        this.setState({renderArray:articles})
    }

    render(){  
        const renderToPage = this.state.renderArray.slice(0,30) || this.props.databaseProp ;
        const thing = renderToPage[this.state.articleNumber] || renderToPage[0];

        // renderToPage.filter(x=>x.markedforhide === false)
        console.log(renderToPage)
        
        return(
            
            <div className="newsItemLoopViewWrapper">
            
            {this.state.showArticle === true ?
                <LiteKnews 
                    renderToPage={this.state.renderLiteKnews}
                    closeLiteKnews={()=>this.closeLiteKnewsView()}                     
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp} 
                    leftoverArticles={this.props.leftoverArticles}  
                    fullDatabaseCall={this.props.fullDatabaseCall}
                />
            :
            
            <div id="cardArea"> 

                    <NavBar                         
                        // selecting buttons for menu
                        filter={true} 
                        bookmarks={true} 
                        cardStyle={true} 
                        liteKnews={true} 
                        bookmarks={true} 
                        options={true}
                        pageTitle="The current knews"
                        
                        // filter
                        getArticleBy={this.state.getArticleBy}
                        getFilteredArticles={this.getFilteredArticles}

                        // card size
                        getCardSize={this.getCardSize} 

                        // liteKnews
                        showArticle={() => this.showArticle()}

                        // filter, bookmarks
                        fullDatabaseCall={this.props.fullDatabaseCall}  
                        
                        bookmarkNumber={this.state.renderArray.length}
                        
                    />

                
                <FilterOptions fullDatabaseCall={this.props.fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles} bookmarked={false}/>                
                
                
                {/* <PageTitle pageTitle="YOUR KNEWS"/> */}

                <div className="cardsWrapper">
                {this.props.databaseProp.length >= 30 && thing ? 
                <RenderCardState 
                    database={renderToPage}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp} 
                    leftoverArticles={this.props.leftoverArticles}  
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    updateBookmarkStatus={this.updateBookmarkStatus}
                    updateHideStatus={this.updateHideStatus}
                    />
                :
                <p>Something has gone wrong. Contact your nearest guardian of the light</p> 
                }
                    
                {/* {this.props.databaseProp.length >= 30 && thing ? 
                 <RenderCard
                    database={renderToPage}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp} 
                    leftoverArticles={this.props.leftoverArticles}  
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    showArticle={() => this.showArticle(renderToPage[this.state.articleNumber].id)}
                    updateBookmarkStatus={this.updateBookmarkStatus}
                 />
                :
                <p>Something has gone wrong. Contact your nearest guardian of the light</p> 
                } */}
                
               
                {this.state.getArticleBy === "All" ?
                //  Infinite Scroll
                    <ScrollCheckV2 
                        articlesArray={this.props.databaseProp}
                        startingCardSize={this.state.startingCardSize}
                        changedCardSize={this.state.changedCardSize}
                        leftoverArticles={this.props.leftoverArticles}
                        getArticleBy={this.state.getArticleBy}
                        fullDatabaseCall={this.props.fullDatabaseCall}
                        showMoreArticlesBtn={true}

                        
                    />   
                    
                
                :
                // <img alt="now loading" src={loading} />
                <p>No more articles to show. Refresh the page or check again later for more Knews.</p>
                }      
                </div> 
            </div>
            }
            </div>
        )        
    }
}

export default NewsItemLoopView;