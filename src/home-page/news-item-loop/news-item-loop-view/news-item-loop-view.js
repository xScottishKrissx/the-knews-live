import React from 'react';

import '../news-item-loop-view/news-item-loop-view.css';

import FilterOptions from '../../../utility_components/filterOptions/filterOptions';
import LiteKnews from '../../../utility_components/liteKnews/liteKnews';
import NavBar from '../../../navBar/navBar';
import RenderCardState from '../../../utility_components/renderCard/renderCardState';
import SortAll from '../../../utility_components/optionsMenu/optionsCode/sortAll';

class NewsItemLoopView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        // Card Size
        startingCardSize:"",
        changedCardSize:{
            width: this.props.cardSize[0],
            height: this.props.cardSize[1]
        },

        //hiding articles for filter views
        getArticleBy:localStorage.getItem("filterOption") || "All",
        renderArray:[],
        
        // liteKnews
        showArticle:false,
        renderLiteKnews: JSON.parse(localStorage.getItem("changedFullDatabaseCall")),
        // Set New End Point for Slicing Array for Infinite Load
        endSlice:10
        }
        // Card Size Controls
        this.getCardSize = this.getCardSize.bind(this);
        // liteKnews
        this.closeLiteKnewsView = this.closeLiteKnewsView.bind(this);        
        window.addEventListener('scroll', this.scroll);        
        window.addEventListener('touchstart',this.scroll, {passive:true});
    }

componentDidMount(){ 
    this.reload()
 }

componentDidUpdate(){
    this.updateReadStyles();    
}


scroll = (e) =>{
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);

    const windowBottom = windowHeight + window.pageYOffset;
    if(windowBottom >= docHeight){
        this.setState({
            load:true, 
            endSlice:this.state.endSlice + 10
        })
    }
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
    }

    // filterViews
    getFilteredArticles = (filteredByTag,getArticleBy) => {
        // console.log(filteredByTag,getArticleBy)
        this.setState({
            renderArray: filteredByTag,
            getArticleBy:getArticleBy,
        })
    }

    // Updates the main render array when bookmarking articles. 
    // This let's me change the bookmark icon when using any of the bookmark options 
    updateBookmarkStatus = (articles) => { 
       
       const filterChoice = localStorage.getItem("filterOption")
       const filteredArticles = articles.filter(x=> x.tag === filterChoice )
       
       if(filterChoice === "All"){
            this.setState({ renderArray:articles })
       }else{
           this.setState({ renderArray:filteredArticles }) 
       }
    }

    updateHideStatus = (articles) =>{ this.setState({renderArray:articles}) }

    updateRender = (articles) => {
        this.setState({renderLiteKnews:articles})
        console.log("updateRender")
    }

   
    updateReadStyles = () => {
        const getArticles = this.state.renderArray || this.props.databaseProp ;
        const markArticleRead = getArticles.map(el => {
            if(el.read === true && el != null )if( document.getElementById(el.id)){
                document.getElementById(el.id).classList.add('markAsRead')
            }
            if(el.read === false && el != null )if( document.getElementById(el.id)){
                document.getElementById(el.id).classList.remove('markAsRead')
            }
        });
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.scroll);        
        window.removeEventListener('touchstart',this.scroll, {passive:true});
    }

    reload(){

        const localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        if(localStorageCards){

            // Check For Hidden Articles
            const hideArticle = localStorageCards.map(el => {
                if(el.bookmarked === false && el.markedforhide === true && el != null )
                    // return Object.assign({}, el, {hidden:false})
                    return Object.assign({}, el, {hidden:true})
                    return el
            });

            const filterMarkedAsHiddenForReload = hideArticle.filter(x=> x.hidden === false )
            
            // Check if a filter is active
            const getFilter = localStorage.getItem("filterOption")
            let checkFilter;
            if(getFilter === "All"){
                checkFilter = filterMarkedAsHiddenForReload;
            }else{
                checkFilter = filterMarkedAsHiddenForReload.filter(x=>x.tag === getFilter)
            }


            localStorage.setItem("changedFullDatabaseCall", JSON.stringify(filterMarkedAsHiddenForReload))
            this.setState({renderArray:checkFilter})
            document.getElementById("reloadBtn").classList.remove('testClass1')
        }
    }

    render(){  

        const getArticles = this.state.renderArray || this.props.databaseProp ;
        const checkArticlesExist = getArticles[this.state.articleNumber] || getArticles[0];
        
        // Show / Hide Read articles
        const getShowReadArticlesChoice = localStorage.getItem("showReadCards") || "Show"
        let filterRead;
        if(getShowReadArticlesChoice === "Show")filterRead = getArticles
        if(getShowReadArticlesChoice === "Hide")filterRead = getArticles.filter(x => x.read === false)

        // Set Default Sort if cache is empty
        if(localStorage.getItem("sortBy")===null){
            filterRead.sort((a, b) => {
                if (a["postdate"] > b["postdate"]) return 1;
                if (a["postdate"] < b["postdate"]) return -1;
                return 0;
            });   
        }
        
        // Add/Remove Mark as read styles on page render
        this.updateReadStyles()
        
        // This will achieve an infinite scroll...
        let renderToPage;
        if(this.state.load === true){
            renderToPage = filterRead.slice(0,this.state.endSlice)

        }else{
            renderToPage = filterRead.slice(0,this.state.endSlice)
        }
        console.log(renderToPage)

        // Presentational Stuff
        const setRandomColour = JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"};
        // bookmark counter
        const getBookmarks = this.state.renderArray.filter(obj => obj.bookmarked === true)
        // filter counter
        const getFilters = this.state.renderArray.filter(obj => obj.tag === this.state.getArticleBy)
        return(
            
            <div className="newsItemLoopViewWrapper">
            
            {this.state.showArticle === true ?
                <LiteKnews 
                    getArticles={this.state.renderLiteKnews}
                    closeLiteKnews={()=>this.closeLiteKnewsView()}
                    arrayFromDatabase={this.props.databaseProp} 
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    updateRender={this.updateRender}
                />
            :
            
            <div id="cardArea"> 

                    <NavBar
                        filter={true} 
                        bookmarks={true} 
                        cardStyle={true} 
                        liteKnews={true} 
                        bookmarks={true} 
                        options={true}
                        reload={true}
                        pageTitle="The current knews"
                        
                        // filter
                        getArticleBy={this.state.getArticleBy}
                        getFilteredArticles={this.getFilteredArticles}
                        getFilters={getFilters.length}
                        currentCardCount={renderToPage.length}

                        // card size
                        getCardSize={this.getCardSize} 
                        getPageLayout={this.getPageLayout}

                        // liteKnews
                        showArticle={() => this.showArticle()}

                        // filter, bookmarks
                        fullDatabaseCall={this.props.fullDatabaseCall}  
                        updateBookmarkStatus={this.updateBookmarkStatus}
                        
                        bookmarkNumber={this.state.renderArray.length}
                        bookmarkCounter={getBookmarks.length}

                        //forceReload
                        forceReload={()=>this.reload()}

                        // options
                        currentCardArray={renderToPage}            
                    />
                    
                <div style={setRandomColour} id="articleLine"></div>
                
                <FilterOptions fullDatabaseCall={this.props.fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles} bookmarked={false}/>                
               
                <div className="cardsWrapper" >
     
                    {this.props.databaseProp.length >= 1 && checkArticlesExist && renderToPage.length > 0 ? 
                        <RenderCardState 
                            database={renderToPage}                           
                            // Card Size
                            startingCardSize={this.state.startingCardSize}
                            changedCardSize={this.state.changedCardSize}
                            arrayFromDatabase={this.props.databaseProp} 
                            fullDatabaseCall={this.props.fullDatabaseCall}
                            // Controls
                            updateBookmarkStatus={this.updateBookmarkStatus}
                            updateHideStatus={this.updateHideStatus}
                            hideBookmarkedArticle={false}
                        />
                    :
                        <div className="blankLoopMessage">
                            <h2>Nothing to read,<br/> Check back later...</h2>
                            <span class="material-icons">auto_stories</span>
                            <p>Tips: Use the refresh button to check for new articles</p>
                        </div>
                    }

                </div> 
            </div>
            }
            </div>
        )        
    }
}

export default NewsItemLoopView;