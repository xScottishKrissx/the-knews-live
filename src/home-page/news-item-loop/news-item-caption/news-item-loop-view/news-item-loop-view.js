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
        
        //testing
        articleNumber:0,
        showArticle:false
        }
        this.getCardSize = this.getCardSize.bind(this);
        this.getArticlesBy = this.getArticlesBy.bind(this);

        //Testing
        this.changeArticle = this.changeArticle.bind(this);
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
        console.log(localStorage.getItem("bookmarks"))
        // console.log(JSON.parse(localStorage.getItem("myData")));
        // console.log(this.props.fullDatabaseCall)
        // If no filter option exists in storage, set as All to display a default view.
        if(localStorage.getItem("filterOption") === null)localStorage.setItem("filterOption","All");

        // Detect url params and set the view as appropriate. This functions as the tag page.
        // console.log(this.props.urlTagProp)
        const urlTagProp = this.props.urlTagProp;  
        if(urlTagProp && urlTagProp.includes("news" || "News"))localStorage.setItem("filterOption","News");
        if(urlTagProp && urlTagProp.includes("sports"||"Sports"))localStorage.setItem("filterOption","Sports");
        if(urlTagProp && urlTagProp.includes("weather"||"Weather"))localStorage.setItem("filterOption","Weather");
        if(urlTagProp && urlTagProp.includes(""||undefined))localStorage.setItem("filterOption","All");

        // Set filter option.
        this.getArticlesBy(localStorage.getItem("filterOption"))
        // console.log( localStorage.getItem("filterOption"))
    }

    getArticlesBy(value,id){
        // console.log(value)
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
        const filteredByTag = filteredForHiddenArticlesDB.filter(obj => obj.tag === value);
        
        // Change Colour of button to show focus
        this.setState({
            getArticleBy:value,
            renderArray:filteredByTag,
            
            // leftoverArticles:leftoverArticles.slice(20)
        })

        // console.log(this.props.databaseProp)
        if(value === "All")this.setState({renderArray:filteredForHiddenArticlesDB || this.props.databaseProp})
        
        // Set Filter Option into local storage
        localStorage.setItem("filterOption",value)   
        
    }

    changeArticle(x,y){
        this.setState({
            articleNumber: this.state.articleNumber + x,
            showArticle:true
        })
    }
    closeLiteKnewsView(){
        if(this.state.showArticle === true){
            this.setState({
                showArticle:false,
                articleNumber: 0
            })
            
        }
    }

    showArticle(){this.setState({showArticle:true})}

    render(){  
 
        const renderToPage = this.state.renderArray.slice(0,30) || this.props.databaseProp ;
        const thing = renderToPage[this.state.articleNumber] || renderToPage[0];


        return(
            
            <div className="newsItemLoopViewWrapper">
            
            {this.state.showArticle === true ?
                <div id="speedKnews">                
                    <div id="speedKnewsWrapper" >
                    <h1>liteKnews - theKnews but lighter</h1>
                    
                        <div className="speedKnewsArticleContainer">

                            <header>
                                <HeaderImage props={renderToPage[this.state.articleNumber].id}/>
                                <h2>{renderToPage[this.state.articleNumber].title}</h2>
                                <h3>by: {renderToPage[this.state.articleNumber].author}</h3>
                                <Link 
                                
                                    to={'/home/articles/news-page/' + renderToPage[this.state.articleNumber].key}
                                
                                >
                                    <h3>View Article Page</h3></Link>
                                {/* <p>{renderToPage[this.state.articleNumber].text}</p> */}
                            </header>
                            <article><ParseHTML props={renderToPage[this.state.articleNumber].text}/></article>
                         

                        </div>
                        
                        <div id="speedKnewsControls">
                        {this.state.articleNumber === 0 ? 
                           <span>
                            <button onClick={this.closeLiteKnewsView}><span className="material-icons">close</span></button>

                            <button className="mutedBtn"><span className="material-icons">skip_previous</span></button>
                            <button onClick={() => this.changeArticle(+1)}><span className="material-icons">skip_next</span></button>
                           </span>
    
                            :
                            <span>
                                

                                <button onClick={this.closeLiteKnewsView}><span className="material-icons">close</span></button>
                                {this.state.articleNumber > -2 && this.state.articleNumber === renderToPage.length - 1 ? 
                                <span>
                                    
                                    <button onClick={() => this.changeArticle(-1,renderToPage[this.state.articleNumber].id)}><span className="material-icons">skip_previous</span></button>
                                    <button className="mutedBtn"><span className="material-icons">skip_next</span></button>
                                </span>
                                :
                                <span>
                                    
                                    <button onClick={() => this.changeArticle(-1,renderToPage[this.state.articleNumber].id)}><span className="material-icons">skip_previous</span></button>
                                    <button onClick={() => this.changeArticle(+1)}><span className="material-icons">skip_next</span></button>
                                </span>
                                }

                            </span>
                        }
                            {/* <button onClick={() => this.changeArticle(+1)}>Next Article</button>
                            <button onClick={this.closeLiteKnewsView}>Exit</button> */}
                        </div>
                        
                    </div>
                </div>
            :
            <div id="cardArea">
                <div id="topPageButtonWrapper">
                    <div id="speedKnewsButtonWrapper">
                        <button onClick={() => this.showArticle(renderToPage[this.state.articleNumber].id)}>start liteKnews </button>

                    </div>
                    
                    <div id="filterButtonWrapper">
                        <button className="filterButton" id="newsFilterBtn" onClick={() => this.getArticlesBy("News","newsFilterBtn")} >News</button>
                        <button className="filterButton" id="sportsFilterBtn" onClick={() => this.getArticlesBy("Sports","sportsFilterBtn")} >Sports</button>
                        <button className="filterButton" id="weatherFilterBtn" onClick={() => this.getArticlesBy("Weather","weatherFilterBtn")} >Weather</button>
                        <button className="filterButton" id="noFilterBtn" onClick={() => this.getArticlesBy("All","noFilterBtn")} >No Filter</button>
                    </div>

                    

                </div>
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