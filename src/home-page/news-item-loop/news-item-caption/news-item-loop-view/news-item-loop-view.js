import React from 'react';
import {Link} from 'react-router-dom';

import '../news-item-loop-view/news-item-loop-view.css';

import CustomCardSize from '../../../../utility_components/custom-tile-size/custom-card-sizeV2.js';
import FilterOptions from '../../../../utility_components/filterOptions/filterOptions';
import LiteKnews from '../../../../utility_components/liteKnews/liteKnews';
import RenderCard from '../../../../utility_components/renderCard/renderCard';
import ScrollCheckV2 from '../../../../utility_components/ScrollCheckV2';
import updateBookmarkStyles from '../../../../utility_components/bookmarks/updateBookmarkStyle';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import SplitButton from 'react-bootstrap/SplitButton'
import OptionsMenu from '../../../../utility_components/optionsMenu/optionsMenu';
import NavBar from '../../../../navBar/navBar';
import PageTitle from '../../../../utility_components/pageTitle/pageTitle.js';


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
    // console.log(this.state.changedCardSize)
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
        
    }
    swipeThing(x){
        console.log(x)
        this.setState({
            loadingProgress:x
        })
    }
    handleMenu(x){
        console.log("Show Menu")
        document.getElementById(x).classList.add("showMenu")
    }


    render(){  
        const renderToPage = this.state.renderArray.slice(0,30) || this.props.databaseProp ;
        const thing = renderToPage[this.state.articleNumber] || renderToPage[0];
        // console.log(JSON.parse(localStorage.getItem("changedFullDatabaseCall")))
        // console.log(this.state.renderArray)
        
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
                // The Cards themselves...
                 <RenderCard
                    database={renderToPage}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp} 
                    leftoverArticles={this.props.leftoverArticles}  
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    showArticle={() => this.showArticle(renderToPage[this.state.articleNumber].id)}
                 />
                :
                <p>Something has gone wrong. Contact your nearest guardian of the light</p> 
                }
                
               
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