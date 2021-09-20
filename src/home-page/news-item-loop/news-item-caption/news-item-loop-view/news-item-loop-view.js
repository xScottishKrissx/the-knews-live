import React from 'react';

import '../news-item-loop-view/news-item-loop-view.css';

import FilterOptions from '../../../../utility_components/filterOptions/filterOptions';
import LiteKnews from '../../../../utility_components/liteKnews/liteKnews';
import updateBookmarkStyles from '../../../../utility_components/bookmarks/updateBookmarkStyle';
import NavBar from '../../../../navBar/navBar';
import RenderCardState from '../../../../utility_components/renderCard/renderCardState';
import SortAll from '../../../../utility_components/optionsMenu/optionsCode/sortAll';



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
        // pageLayout:{
        //     flexDirection:this.props.pageLayout[0],
        //     margin:this.props.pageLayout[1],
        //     maxWidth:this.props.pageLayout[2]
        // },

        //hiding articles for filter views
        getArticleBy:localStorage.getItem("filterOption") || "All",
        renderArray:[],
        
        // liteKnews
        showArticle:false,
        renderLiteKnews: JSON.parse(localStorage.getItem("changedFullDatabaseCall")),

        endSlice:10
        }
        // Card Size Controls
        this.getCardSize = this.getCardSize.bind(this);
        // liteKnews
        this.closeLiteKnewsView = this.closeLiteKnewsView.bind(this);        
        window.addEventListener('scroll', this.scroll);        
        window.addEventListener('touchstart',this.scroll, {passive:true});
    }

componentDidMount(){ this.reload() }

componentDidUpdate(){
    updateBookmarkStyles();
    this.updateReadStyles();    
}

scroll = (e) =>{
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    // ...this is what is actually used.
    const windowBottom = windowHeight + window.pageYOffset;
    if(windowBottom >= docHeight){
        // console.log("Load New Articles")
        this.setState({
            load:true, 
            endSlice:this.state.endSlice + 10
        })
    }
    // console.log("scroll")
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

    swipeThing(x){ this.setState({ loadingProgress:x }) }
    handleMenu(x){ document.getElementById(x).classList.add("showMenu") }

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
        const renderToPage = this.state.renderArray || this.props.databaseProp ;
        const markArticleRead = renderToPage.map(el => {
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
            // console.log(hideArticle)           
    
            // console.log("news-item-loop-view.js mounted")
            const filterMarkedAsHiddenForReload = hideArticle.filter(x=> x.hidden === false )
            
            // Check if a filter is active
            const getFilter = localStorage.getItem("filterOption")
            let checkFilter = {}
            if(getFilter === "All"){
                checkFilter = filterMarkedAsHiddenForReload;
            }else{
                checkFilter = filterMarkedAsHiddenForReload.filter(x=>x.tag === getFilter)
            }


            localStorage.setItem("changedFullDatabaseCall", JSON.stringify(filterMarkedAsHiddenForReload))
            this.setState({renderArray:checkFilter})
            document.getElementById("reloadBtn").classList.remove('testClass1')
            // console.log(this.state.renderArray)
        }



    }
    render(){  
        // console.log(this.state.renderArray)
        const renderToPage = this.state.renderArray || this.props.databaseProp ;
        const thing = renderToPage[this.state.articleNumber] || renderToPage[0];
        // document.getElementById("reloadBtn2").classList.remove('testClass1')
        
        
        const setRandomColour = JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"};

        // bookmark counter
        const getBookmarks = this.state.renderArray.filter(obj => obj.bookmarked === true)
        // filter counter
        const getFilters = this.state.renderArray.filter(obj => obj.tag === this.state.getArticleBy)

        // const customPageLayout = this.state.pageLayout

        // console.log(renderToPage.length)
        // console.log(renderToPage)

        // Show / Hide Read articles
        const getShowReadArticlesChoice = localStorage.getItem("showReadCards") || "Show"
        let filterRead;
        if(getShowReadArticlesChoice === "Show")filterRead = renderToPage
        if(getShowReadArticlesChoice === "Hide")filterRead = renderToPage.filter(x => x.read === false)
        // console.log("Filter Read> " + filterRead)
        // console.log(filterRead)

        // Set Default Sort if cache is empty
        if(localStorage.getItem("sortBy")===null){
            filterRead.sort((a, b) => {
                if (a["postdate"] > b["postdate"]) return 1;
                if (a["postdate"] < b["postdate"]) return -1;
                return 0;
            });   
        }
        // Orders the main array by postdate and then reverse it to get the newest articles.
        
        console.log(filterRead)
        
        // Add/Remove Mark as read styles on page render
        this.updateReadStyles()
        

        // This will achieve an infinite scroll...
        let renderAgain;
        if(this.state.load === true){
            console.log("Load New")
            renderAgain = filterRead.slice(0,this.state.endSlice)

        }else{
            renderAgain = filterRead.slice(0,this.state.endSlice)
        }
        console.log(renderAgain)
        return(
            
            <div className="newsItemLoopViewWrapper">
            
            {this.state.showArticle === true ?
                <LiteKnews 
                    renderToPage={this.state.renderLiteKnews}
                    closeLiteKnews={()=>this.closeLiteKnewsView()}                     
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp} 
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    updateRender={this.updateRender}
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
                        reload={true}
                        pageTitle="The current knews"
                        
                        // filter
                        getArticleBy={this.state.getArticleBy}
                        getFilteredArticles={this.getFilteredArticles}
                        getFilters={getFilters.length}
                        currentCardCount={renderAgain.length}

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
                        currentCardArray={renderAgain}
                        
                    />
                    
                <div style={setRandomColour} id="articleLine"></div>
                
                <FilterOptions fullDatabaseCall={this.props.fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles} bookmarked={false}/>                

                
                {/* <PageTitle pageTitle="YOUR KNEWS"/> */}
               
                <div className="cardsWrapper" >

     
                {this.props.databaseProp.length >= 1 && thing && renderAgain.length > 0 ? 
                    <RenderCardState 
                        database={renderAgain}
                        
                        
                        // Card Size
                        startingCardSize={this.state.startingCardSize}
                        changedCardSize={this.state.changedCardSize}
                        postsArray={this.state.postsArray}
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

                
       
               
                {/* {this.props.databaseProp.length >= 30 && thing ? 
                 <RenderCard
                    database={renderToPage}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp}  
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    showArticle={() => this.showArticle(renderToPage[this.state.articleNumber].id)}
                    updateBookmarkStatus={this.updateBookmarkStatus}
                 />
                :
                <p>Something has gone wrong. Contact your nearest guardian of the light</p> 
                } */}
                

                
                </div> 
            </div>
            }
            </div>
        )        
    }
}

export default NewsItemLoopView;