import React from 'react';
import '../news-item-loop-view/news-item-loop-view.css';
import CustomCardSize from '../../custom-tile-size/custom-card-size.js';
import ScrollCheckV2 from '../../../../utility_components/ScrollCheckV2';
import RenderCard from '../../../../utility_components/renderCard/renderCard';

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
        
        }
        this.getCardSize = this.getCardSize.bind(this);
        this.getArticlesBy = this.getArticlesBy.bind(this);
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

    getArticlesBy(value){

        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        // console.log(fullDatabaseCallFromStorage)
        const fullDatabaseCallFromProp = this.props.fullDatabaseCall

        const fullDatabaseCall = fullDatabaseCallFromStorage || fullDatabaseCallFromProp;
        // Filter array for null objects and remove anything marked as hidden.
        const filteredForHiddenArticlesDB = fullDatabaseCall.filter(obj => 
            obj !== null && 
            obj.hidden !== true
        );
        
        // Filter Article By Tag --> Has to be separate from above to allow for unfiltered view.
        const filteredByTag = filteredForHiddenArticlesDB.filter(obj => obj.tag === value);

        // change leftover articles to include only relevant articles
        // const leftoverArticles = this.props.fullDatabaseCall.filter(obj => obj.tag === value);
        // console.log(leftoverArticles.slice(20))
        
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

    render(){  

        const renderToPage = this.state.renderArray || this.props.databaseProp ;
        // console.log(renderToPage)
        return(
            
            <div className="newsItemLoopViewWrapper">
                
                <button onClick={() => this.getArticlesBy("News")} >News</button>
                <button onClick={() => this.getArticlesBy("Sports")} >Sports</button>
                <button onClick={() => this.getArticlesBy("Weather")} >Weather</button>
                <button onClick={() => this.getArticlesBy("All")} >No Filter</button>
                <p>Showing {this.state.getArticleBy} Articles</p>

                {this.props.databaseProp.length >= 30 ? 
                 <RenderCard
                 database={renderToPage}
                 startingCardSize={this.state.startingCardSize}
                 changedCardSize={this.state.changedCardSize}
                 postsArray={this.state.postsArray}
                 arrayFromDatabase={this.props.databaseProp} 
                 leftoverArticles={this.props.leftoverArticles}  
                 fullDatabaseCall={this.props.fullDatabaseCall}
                 postsArray={this.state.postsArray}
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
        )
    }
}

export default NewsItemLoopView;