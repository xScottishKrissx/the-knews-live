import React from 'react';
import '../news-item-loop-view/news-item-loop-view.css';
// import CustomCardSize from '../../../../utility_components/custom-tile-size/custom-card-size.js';
import CustomCardSize from '../../../../utility_components/custom-tile-size/custom-card-sizeV2.js';
import ScrollCheckV2 from '../../../../utility_components/ScrollCheckV2';
import RenderCard from '../../../../utility_components/renderCard/renderCard';
import ParseHTML from '../../../../utility_components/parse-database-html/parse-html';
import HeaderImage from '../../../../utility_components/header-image/header-image';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import loading from '../../../../img/loading5.gif';
import {Link} from 'react-router-dom';
import LiteKnews from '../../../../utility_components/liteKnews/liteKnews';
import FilterOptions from '../../../../utility_components/filterOptions/filterOptions';

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

        pressed:false,
        toggle:"on",

        thing2:""
        }
        this.getCardSize = this.getCardSize.bind(this);
        this.getArticlesBy = this.getArticlesBy.bind(this);
        // liteKnews
        this.closeLiteKnewsView = this.closeLiteKnewsView.bind(this);

        
        
    }

    getCardSize(width,height){
        // console.log(width +" "+ height)
        this.setState({
            startingCardSize:{
                width:width,
                height:height
            }
        })
    }

    componentDidMount(){

        // If no filter option exists in storage, set as All to display a default view.
        if(localStorage.getItem("filterOption") === null || undefined)localStorage.setItem("filterOption","All");

        // Detect url params and set the view as appropriate. This functions as the tag page.
        // console.log(this.props.urlTagProp)
        const urlTagProp = this.props.urlTagProp;  
        if(urlTagProp && urlTagProp.includes("news" || "News"))localStorage.setItem("filterOption","News");
        if(urlTagProp && urlTagProp.includes("sports"||"Sports"))localStorage.setItem("filterOption","Sports");
        if(urlTagProp && urlTagProp.includes("weather"||"Weather"))localStorage.setItem("filterOption","Weather");
        if(urlTagProp && urlTagProp.includes(""||undefined))localStorage.setItem("filterOption","All");

        // Set filter option.
        // this.getArticlesBy(localStorage.getItem("filterOption"))
        
    }

    getArticlesBy(getArticleBy,id){

        
        console.log(getArticleBy)
        // console.log(id)
        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        // console.log(fullDatabaseCallFromStorage)
        const fullDatabaseCallFromProp = this.props.fullDatabaseCall
        // console.log(fullDatabaseCallFromProp)

        const fullDatabaseCall = fullDatabaseCallFromStorage || fullDatabaseCallFromProp;
        // Filter array for null objects and remove anything marked as hidden.
        const filteredForHiddenArticlesDB = fullDatabaseCall.filter(obj => 
            obj !== null && 
            obj.hidden !== true
        );
        
        // Filter Article By Tag --> Has to be separate from above to allow for unfiltered view.
        const filteredByTag = filteredForHiddenArticlesDB.filter(obj => obj.tag === getArticleBy);
        
        // Change Colour of button to show focus
        this.setState({
            // getArticleBy:getArticleBy,
            // renderArray:filteredByTag,
            
            
            // leftoverArticles:leftoverArticles.slice(20)
        })

        // console.log(this.props.databaseProp)
        // if(getArticleBy === "All")
        // {
        //         console.log("No Filter")
        //        this.setState({renderArray:filteredForHiddenArticlesDB || this.props.databaseProp})
        // }

        // Set Filter Option into local storage
        localStorage.setItem("filterOption",getArticleBy)   
        
    }


    componentDidUpdate(){
        const bookmarks = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || JSON.parse(localStorage.getItem("bookmarkArray")) 
        if(bookmarks){
            const markAsBookmark = bookmarks.filter(obj => obj.bookmarked === true || obj.read === true)
            
            var thing = markAsBookmark.map(el => {
                if(el.read === true && el != null )
                    if(document.getElementById(el.id)){document.getElementById(el.id).classList.add('markAsRead')}
                    if(el.bookmarked === true && el != null){
                        if(document.getElementById(el.id)){
                            document.getElementById(el.id + "bookmarkIcon").classList.add('bookmarkStyle')
                        }
                    }
                }); 
        }
    }

    showArticle(){
        this.setState({
            showArticle:true,
            renderLiteKnews: JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.renderArray
        })
    }
    closeLiteKnewsView(){
        this.setState({ showArticle:false})
        console.log("Close LiteKnews")       
    }

    getFilteredArticles = (filteredByTag,getArticleBy) => {
        this.setState({
            renderArray: filteredByTag,
            getArticleBy:getArticleBy,
        })
}

    render(){  
        console.log(this.state.renderArray)
        const renderToPage = this.state.renderArray.slice(0,30) || this.props.databaseProp ;
        // console.log(renderToPage)
        const thing = renderToPage[this.state.articleNumber] || renderToPage[0];
        const changedFullDatabaseCall = this.state.renderArray;

        return(
            
            <div className="newsItemLoopViewWrapper">
            
            {this.state.showArticle === true ?
                <LiteKnews renderToPage={this.state.renderLiteKnews} closeLiteKnews={()=>this.closeLiteKnewsView()} />
            :
            <div id="cardArea">
                <div id="topPageButtonWrapper">
                    {/* Speed Knews */}
                    <div id="speedKnewsButtonWrapper">
                        <button onClick={() => this.showArticle()}>start liteKnews </button>
                    </div>
                    
                    {/* Filter Options */}
                    <FilterOptions 
                        // getArticleBy={() => this.getArticlesBy()} 
                        fullDatabaseCall={this.props.fullDatabaseCall}
                        getFilteredArticles = {this.getFilteredArticles}
                         
                        


                    />
                    {/* <div id="filterButtonWrapper">
                        <button className="filterButton" id="newsFilterBtn" onClick={() => this.getArticlesBy("News","newsFilterBtn")} >News</button>
                        <button className="filterButton" id="sportsFilterBtn" onClick={() => this.getArticlesBy("Sports","sportsFilterBtn")} >Sports</button>
                        <button className="filterButton" id="weatherFilterBtn" onClick={() => this.getArticlesBy("Weather","weatherFilterBtn")} >Weather</button>
                        <button className="filterButton" id="noFilterBtn" onClick={() => this.getArticlesBy("All","noFilterBtn")} >No Filter</button>
                    </div> */}

                </div>
                
                {/* Bookmark Page Link */}
                <div>
                    <Link to={'home/bookmarks'}><h3>Bookmarks</h3></Link>
                    <p>{this.state.thing2}</p>
                </div>
        
                
                {/* Card Loop Display */}
                <div id="filterOptionDisplay">
                    {this.state.getArticleBy === "All" ? 
                        <p>Displaying <span>{this.state.getArticleBy}</span> Articles</p>
                        :
                        <p>Displaying {renderToPage.length}<span>{this.state.getArticleBy}</span> Articles</p>
                    }
                </div>
                <CustomCardSize getCardSizeToParent={this.getCardSize} />
                {this.props.databaseProp.length >= 30 && thing ? 
                
                 <RenderCard
                 database={renderToPage}
                 startingCardSize={this.state.startingCardSize}
                 changedCardSize={this.state.changedCardSize}
                 postsArray={this.state.postsArray}
                 arrayFromDatabase={this.props.databaseProp} 
                 leftoverArticles={this.props.leftoverArticles}  
                 fullDatabaseCall={this.props.fullDatabaseCall}
                 showArticle={() => this.showArticle(renderToPage[this.state.articleNumber].id)}

                //  testing
                changedFullDatabaseCall={changedFullDatabaseCall}                 

                 />
                :
                <p>Something has gone wrong. Contact your nearest guardian of the light</p> 
                }
               
                {this.state.getArticleBy === "All" ?
                 
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