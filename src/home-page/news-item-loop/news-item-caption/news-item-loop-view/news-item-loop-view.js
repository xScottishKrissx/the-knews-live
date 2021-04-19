import React from 'react';
import '../news-item-loop-view/news-item-loop-view.css';
import CustomCardSize from '../../../../utility_components/custom-tile-size/custom-card-size.js';
import ScrollCheckV2 from '../../../../utility_components/ScrollCheckV2';
import RenderCard from '../../../../utility_components/renderCard/renderCard';
import ParseHTML from '../../../../utility_components/parse-database-html/parse-html';
import HeaderImage from '../../../../utility_components/header-image/header-image';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

class NewsItemLoopView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        // Card Size
        startingCardSize:"",
        changedCardSize:{width: localStorage.getItem("myData")},
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
        this.hideArticle = this.hideArticle.bind(this);
    }

    getCardSize(value){
        this.setState({
            startingCardSize:{
                width:value,
            }
        })
    }

    componentDidMount(){
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
    }

    getArticlesBy(value,id){
        console.log(value)
        console.log(id)
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
        // console.log(filteredByTag)
        // change leftover articles to include only relevant articles
        // const leftoverArticles = this.props.fullDatabaseCall.filter(obj => obj.tag === value);
        // console.log(leftoverArticles.slice(20))
        
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
    hideArticle(){
        if(this.state.showArticle === true){
            this.setState({
                showArticle:false,
                articleNumber: 0
            })
            
        }
        // document.getElementById("test__articleWrapper").style.display = "none";
    }

    showArticle(){this.setState({showArticle:true})}

    render(){  
 
        const renderToPage = this.state.renderArray.slice(0,30) || this.props.databaseProp ;
        // const renderToPage = this.props.databaseProp
        // console.log(this.state.renderArray.slice(0,30))
        // console.log(this.props.databaseProp)
        // console.log(this.props.databaseProp)
        // console.log(renderToPage[this.state.articleNumber] || renderToPage[0])
        // console.log(renderToPage[this.state.articleNumber])
        const thing = renderToPage[this.state.articleNumber] || renderToPage[0];
        // console.log(thing)

        // console.log(this.state.showArticle)
        // console.log( renderToPage.length)
        // const testStyle = {
        //     backgroundColor: 'black',  
        //     color:'white'      
        // }

        return(
            
            <div className="newsItemLoopViewWrapper">
            {this.state.showArticle === true ?
                <div id="speedKnews">                
                    <div id="speedKnewsWrapper" >
                    <h1>speedKnews</h1>
                    
                        <div className="speedKnewsArticleContainer">

                            <header>
                            <HeaderImage props={renderToPage[this.state.articleNumber].id}/>
                            <h2>{renderToPage[this.state.articleNumber].title}</h2>
                            <h3>by: {renderToPage[this.state.articleNumber].author}</h3>
                            <span>Full Article Page</span>
                            {/* <p>{renderToPage[this.state.articleNumber].text}</p> */}
                            </header>
                            <article><ParseHTML props={renderToPage[this.state.articleNumber].text}/></article>
                         

                        </div>
                        
                        <div id="speedKnewsControls">
                        {renderToPage[this.state.articleNumber].id === 319 ? 
                           <span>
                            <button onClick={() => this.changeArticle(+1)}>Next Article</button>
                            <button onClick={this.hideArticle}>Exit</button>
                           </span>
                            :
                            <span>
                                <button onClick={() => this.changeArticle(-1,renderToPage[this.state.articleNumber].id)
                                    
                                    }>
                                        
                                        
                                        
                                        Prev Article</button>
                                <button onClick={() => this.changeArticle(+1)}>Next Article</button>
                                <button onClick={this.hideArticle}>Exit</button>
                            </span>
                        }
                            {/* <button onClick={() => this.changeArticle(+1)}>Next Article</button>
                            <button onClick={this.hideArticle}>Exit</button> */}
                        </div>
                        
                    </div>
                </div>
            :
            <div>
                <div id="topPageButtonWrapper">
                    <div id="speedKnewsButtonWrapper">
                        <button onClick={() => this.showArticle(renderToPage[this.state.articleNumber].id)}>speedKnews</button>
                    </div>
                    
                    <div id="filterButtonWrapper">
                        <button className="filterButton" id="newsFilterBtn" 
                        onClick={() => this.getArticlesBy("News","newsFilterBtn")} >News</button>
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
                {this.props.databaseProp.length >= 30 && thing ? 
                
                 <RenderCard
                 database={renderToPage}
                 startingCardSize={this.state.startingCardSize}
                 changedCardSize={this.state.changedCardSize}
                 postsArray={this.state.postsArray}
                 arrayFromDatabase={this.props.databaseProp} 
                 leftoverArticles={this.props.leftoverArticles}  
                 fullDatabaseCall={this.props.fullDatabaseCall}
                 

                 // Test
                //  changeId={renderToPage[this.state.articleNumber].id}
                //  changeTitle={renderToPage[this.state.articleNumber].title}
                //  changeAuthor={renderToPage[this.state.articleNumber].author}
                //  changeText={renderToPage[this.state.articleNumber].text}
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
                <p>No More Articles. Come Back Later</p>
                }
                <CustomCardSize getCardSizeToParent={this.getCardSize} />
            </div>
            }
                {/* <div id="test__articleWrapper" >
                    {this.state.showArticle === false ?
                    <p>Show All Cards</p>
                    :
                    <div className="test__articleContainer">
                        <h2>Display an article here</h2>
                        <h3>Title: {renderToPage[this.state.articleNumber].title}</h3>
                        <h3>Title: {renderToPage[this.state.articleNumber].author}</h3>
                    </div>
                    }

                    <button onClick={() => this.changeArticle(+1)}>Next Article</button>
                    <button onClick={() => this.changeArticle(-1)}>Prev Article</button>
                    <button onClick={this.hideArticle}>Hide Article</button>
                </div> */}


                {/* <button onClick={() => this.getArticlesBy("News")} >News</button>
                <button onClick={() => this.getArticlesBy("Sports")} >Sports</button>
                <button onClick={() => this.getArticlesBy("Weather")} >Weather</button>
                <button onClick={() => this.getArticlesBy("All")} >No Filter</button>
                <p>Showing {this.state.getArticleBy} Articles</p> */}



                {/* {this.props.databaseProp.length >= 30 && thing ? 
                 <RenderCard
                 database={renderToPage}
                 startingCardSize={this.state.startingCardSize}
                 changedCardSize={this.state.changedCardSize}
                 postsArray={this.state.postsArray}
                 arrayFromDatabase={this.props.databaseProp} 
                 leftoverArticles={this.props.leftoverArticles}  
                 fullDatabaseCall={this.props.fullDatabaseCall}
                 postsArray={this.state.postsArray}

                 // Test
                 changeId={renderToPage[this.state.articleNumber].id}
                 changeTitle={renderToPage[this.state.articleNumber].title}
                 changeAuthor={renderToPage[this.state.articleNumber].author}
                 changeText={renderToPage[this.state.articleNumber].text}
                 showArticle={() => this.showArticle(renderToPage[this.state.articleNumber].id)}
                 />
                :
                <p>Something has gone wrong. Contact your nearest guardian of the light</p> 
                } */}
                
               
                {/* {this.state.getArticleBy === "All" ?
                    <ScrollCheckV2 
                        articlesArray={this.props.databaseProp}
                        startingCardSize={this.state.startingCardSize}
                        changedCardSize={this.state.changedCardSize}
                        leftoverArticles={this.props.leftoverArticles}
                        getArticleBy={this.state.getArticleBy}
                    />   
                :
                <p>No More Articles. Come Back Later</p>
                } */}
 
                {/* <CustomCardSize getCardSizeToParent={this.getCardSize} /> */}
            </div>
        )
    }
}

export default NewsItemLoopView;