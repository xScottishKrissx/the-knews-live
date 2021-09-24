import React from 'react';
import NavBar from '../../navBar/navBar';
import RenderCard from '../../utility_components/renderCard/renderCardState';
import AuthorInfo from '../../utility_components/aboutAuthor/aboutAuthor'
import TagsAuthorInfo from './tagsAuthorInfo/tagsAuthorInfo';
import LoadingGif from '../../utility_components/loadingGif/loadingGif';
import FilterOptions from '../../utility_components/filterOptions/filterOptions';

export class TagsView extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            fullDatabaseCall:this.props.fullDatabaseCall,
            renderArray:[],
            // Card Size
            startingCardSize:"",
            changedCardSize:{
                width: this.props.cardSize[0] ,
                height: this.props.cardSize[1]
            }, 

            //hiding articles for filter views
            getArticleBy:localStorage.getItem("filterOption") || "All",
            renderArray:[],

            showAuthorBio:false
        }
        this.getCardSize = this.getCardSize.bind(this);
       
    }
    getCardSize(width,height){
        this.setState({
            startingCardSize:{
                width:width,
                height:height}
            })
    }

    // filterViews
    getFilteredArticles = (filteredByTag,getArticleBy) => {
        // console.log(filteredByTag,getArticleBy)
        this.setState({
            fullDatabaseCall: filteredByTag,
            getArticleBy:getArticleBy,
        })
    }


    componentDidUpdate(){
        this.updateReadStyles(); 
        // console.log(this.props.paramA)
       
    }
    showAuthorBio(){
        if(this.props.paramA && this.props.paramA === "author"){
            this.setState({showAuthorBio:true})
        }else{
            this.setState({showAuthorBio:false})
        }

    }
    componentDidMount(){
        this.showAuthorBio()
        this.reload()
    }

    updateBookmarkStatus = (articles) => { 
       
        const filterChoice = localStorage.getItem("filterOption")
        const filteredArticles = articles.filter(x=> x.tag === this.props.paramB )
        
        if(filterChoice === "All"){
             this.setState({ fullDatabaseCall:articles })
        }else{
            this.setState({ fullDatabaseCall:filteredArticles }) 
        }
     }

    updateHideStatus = (articles) =>{ 
        this.setState({
            fullDatabaseCall:articles
        }) 
    }

    updateReadStyles = () => {
        const renderToPage = this.state.fullDatabaseCall || this.props.fullDatabaseCall ;
        let markArticleRead = renderToPage.map(el => {
            if(el.read === true && el != null )if( document.getElementById(el.id)){
                document.getElementById(el.id).classList.add('markAsRead')
            }
            if(el.read === false && el != null )if( document.getElementById(el.id)){
                document.getElementById(el.id).classList.remove('markAsRead')
            }
        });
    }

    reload(){
        // console.log("Reload")
        const localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        
        if(localStorageCards){

            // Check For Hidden Articles
            let hideArticle = localStorageCards.map(el => {
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
            this.setState({fullDatabaseCall:checkFilter})
            document.getElementById("reloadBtn").classList.remove('testClass1')
            // console.log(this.state.renderArray)
        }


    }


    test(unhideArticlesArray){
        console.log(unhideArticlesArray)
    }
    render(){
        // console.log(JSON.parse(localStorage.getItem("changedFullDatabaseCall")))
        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) ||  this.state.fullDatabaseCall;
        // console.log(fullDatabaseCallFromStorage) 

        const filterTags = fullDatabaseCallFromStorage.filter(obj => 
            obj.hidden !== true &&
            (obj.author === this.props.paramB || 
            obj.tag === this.props.paramB ||
            obj.postdate === this.props.paramB )
        ) || this.props.fullDatabaseCall;

        
        const renderToPage = filterTags.filter(obj => obj.hidden != true ) || this.state.fullDatabaseCall

        // Hides read articles
        // const renderToPage = filterTags.filter(obj => obj.hidden != true  && obj.read === false) || this.state.fullDatabaseCall
        // console.log(renderToPage)

        // console.log(this.state.searchDBFor)
        // console.log(this.props.match.params.a)        
        // console.log(this.props.match.params.b)
        // console.log(this.props.cleanDB)
        const getAuthorInfo = this.props.cleanDB.filter(x => x.author === this.props.paramB)
        // console.log(getAuthorInfo)
        // console.log(getAuthorInfo)
        // console.log(this.props.paramA)
        // console.log(renderToPage[0].id)
        const getFilters = renderToPage.filter(obj => obj.tag === this.state.getArticleBy)
                // bookmark counter
        const bookmarkCounter = fullDatabaseCallFromStorage.filter(obj => obj.bookmarked === true)
        // console.log(bookmarkCounter)
            
        // Show / Hide Read articles
        const getShowReadArticlesChoice = localStorage.getItem("showReadCards") || "Show"
        let filterRead;
        if(getShowReadArticlesChoice === "Show")filterRead = renderToPage
        if(getShowReadArticlesChoice === "Hide")filterRead = renderToPage.filter(x => x.read === false)
        // console.log(filterRead)

        return(
            <div className="tags-wrapper">
            <div className="tags-item-wrapper">

                    <NavBar 
                        bookmarks={true}
                        cardStyle={true}    
                        options={true}  
                        reload={true}                   
                        filter={this.props.showFilterButton}
                        homeButtonOn={true}

                        // filter
                        getArticleBy={this.state.getArticleBy}
                        getFilteredArticles={this.getFilteredArticles}
                        getFilters={getFilters.length}
                        currentCardCount={filterRead.length}
                        filterPage="tags"

                        // Card Style to work...
                        getCardSize={this.getCardSize}

                        // filter to work...
                        fullDatabaseCall={this.state.fullDatabaseCall}
                        tagsArray={filterRead}

                        // bookmarks
                        bookmarkCounter={bookmarkCounter.length}

                        // tag specific
                        showArticleCounter={true}
                        showTagPageTitle={true}
                        tagPageTitle={this.props.paramA}
                        tagPageTitle2={this.props.paramB}
                        articleNumber={filterRead.length}
                        paramA={this.props.paramA}    
                        paramB={this.props.paramB}

                        //forceReload
                        forceReload={()=>this.reload()}

                        // options
                        currentCardArray = {filterRead}
                        updateBookmarkStatus={this.updateBookmarkStatus}
                    />
                    
                    {getAuthorInfo.length > 0 ?
                        <TagsAuthorInfo
                            database={getAuthorInfo}
                            paramA={this.props.paramA}
                            arrayFromDatabase={this.state.fullDatabaseCall}
                            fullDatabaseCall={this.state.fullDatabaseCall}
                        /> 
                    :null
                    }
                    {/* <button onClick={()=>this.test(fullDatabaseCallFromStorage)}>Buttonss</button> */}
                    <FilterOptions fullDatabaseCall={this.props.fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles} bookmarked={false}/> 
                    {fullDatabaseCallFromStorage.length === 0 ?
                        <LoadingGif />
                    :
                        <div className="cardsWrapper">                            
                            {filterRead.length === 0 ?
                                // <span> <img alt="now loading"  src={loading}/> Loading   </span>
                            <div className="blankLoopMessage">
                                <h2>You've hidden everything this page has to offer<br/></h2>
                                <span class="material-icons">auto_stories</span>
                                <p>Tip: You can toggle between having articles you've read being visible - <span  className="material-icons">settings</span> &#62; Read Cards &#62; Show &#47; Hide Read Articles</p>
                            </div>
                            :
                                <RenderCard 
                                database={filterRead}
                                startingCardSize={this.state.startingCardSize}
                                changedCardSize={this.state.changedCardSize}

                                // Updating Bookmark
                                updateBookmarkStatus={this.updateBookmarkStatus}
                                updateHideStatus={this.updateHideStatus}

                                // This needs to be clean database call
                                arrayFromDatabase={this.state.fullDatabaseCall || this.props.location.state.arrayFromDatabase}
                                
                                fullDatabaseCall={this.state.fullDatabaseCall}
                            />
                            }

                            
                        </div>                     
                        
                    }
                       
            </div>
        </div>
        )
    }
}

export default TagsView;