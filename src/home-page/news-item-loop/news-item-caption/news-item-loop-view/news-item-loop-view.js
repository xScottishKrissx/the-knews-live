import React from 'react';
import {Link} from 'react-router-dom';

import '../news-item-loop-view/news-item-loop-view.css';

import CustomCardSize from '../../../../utility_components/custom-tile-size/custom-card-sizeV2.js';
import FilterOptions from '../../../../utility_components/filterOptions/filterOptions';
import LiteKnews from '../../../../utility_components/liteKnews/liteKnews';
import RenderCard from '../../../../utility_components/renderCard/renderCard';
import ScrollCheckV2 from '../../../../utility_components/ScrollCheckV2';
import updateBookmarkStyles from '../../../../utility_components/bookmarks/updateBookmarkStyle';

class NewsItemLoopView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        // Card Size
        startingCardSize:"",
        changedCardSize:{
            width: JSON.parse(localStorage.getItem("myData"))[0] ,
            height: JSON.parse(localStorage.getItem("myData"))[1]
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
    closeLiteKnewsView(){this.setState({ showArticle:false})}

// filterViews
    getFilteredArticles = (filteredByTag,getArticleBy) => {
        this.setState({
            renderArray: filteredByTag,
            getArticleBy:getArticleBy,
        })
}

    render(){  
        const renderToPage = this.state.renderArray.slice(0,30) || this.props.databaseProp ;
        const thing = renderToPage[this.state.articleNumber] || renderToPage[0];

        return(
            
            <div className="newsItemLoopViewWrapper">
            
            {this.state.showArticle === true ?
                <LiteKnews renderToPage={this.state.renderLiteKnews} closeLiteKnews={()=>this.closeLiteKnewsView()} />
            :
            <div id="cardArea">
                <div id="topPageButtonWrapper">
                    {/* Speed Knews */}
                    <div id="speedKnewsButtonWrapper"><button onClick={() => this.showArticle()}>start liteKnews </button></div>
                    {/* Filter Options */}
                    <FilterOptions fullDatabaseCall={this.props.fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles}/>
                </div>
                
                {/* Bookmark Page Link */}
                <div>
                    <Link to={'home/bookmarks'}><h3>Bookmarks</h3></Link>
                </div>
        
                
                {/* Displaying ALL / News / Sports etc articles at top of page. */}
                <div id="filterOptionDisplay">
                    {this.state.getArticleBy === "All" ? 
                        <p>Displaying <span>{this.state.getArticleBy}</span> Articles</p>
                        :
                        <p>Displaying {renderToPage.length}<span>{this.state.getArticleBy}</span> Articles</p>
                    }
                </div>
                {/* Card Size Controls */}
                <CustomCardSize getCardSizeToParent={this.getCardSize} />
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

                        
                    />   
                    
                    
                :
                // <img alt="now loading" src={loading} />
                <p>No more articles to show. Refresh the page or check again later for more Knews.</p>
                }       
            </div>
            }
            </div>
        )        
    }
}

export default NewsItemLoopView;