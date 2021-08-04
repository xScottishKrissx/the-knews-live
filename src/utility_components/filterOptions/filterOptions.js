import React,{Component} from 'react';


class FilterOptions extends Component {

    constructor(props){
        super(props);
        this.state = {
        getArticleBy:"All",
        renderArray:[],
        bookmarkArray:[]
        }
    }

    componentDidMount(){
        // If no filter option exists in storage, set as All to display a default view.
        if(localStorage.getItem("filterOption") === null)localStorage.setItem("filterOption","All");
        if(localStorage.getItem("bookmarksFilterOption") === null)localStorage.setItem("bookmarksFilterOption","All");

        // Detect url params and set the view as appropriate. This functions as the tag page.
        const urlTagProp = this.props.urlTagProp;  
        if(urlTagProp && urlTagProp.includes("news" || "News"))localStorage.setItem("filterOption","News");
        if(urlTagProp && urlTagProp.includes("sports"||"Sports"))localStorage.setItem("filterOption","Sports");
        if(urlTagProp && urlTagProp.includes("weather"||"Weather"))localStorage.setItem("filterOption","Weather");
        if(urlTagProp && urlTagProp.includes(""||undefined))localStorage.setItem("filterOption","All");

        // Set filter option.
        console.log(this.props.bookmarked)
        if(this.props.bookmarked  === false || undefined){
            this.getArticlesBy(localStorage.getItem("filterOption"))
        }else{
            this.getArticlesBy(localStorage.getItem("bookmarksFilterOption"))
        }
        

    }
    getArticlesBy(value){
        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        const fullDatabaseCallFromProp = this.props.fullDatabaseCall

        const fullDatabaseCall = fullDatabaseCallFromStorage || fullDatabaseCallFromProp;

        // Filter array for null objects and remove anything marked as hidden.
        const filteredForHiddenArticlesDB = fullDatabaseCall.filter(obj => 
            obj !== null && 
            obj.hidden !== true
        );

        // Filter Article By Tag --> Has to be separate from above to allow for unfiltered view.
        const filteredByTag = filteredForHiddenArticlesDB.filter(obj => obj.tag === value);
        this.setState({
            getArticleBy:value,
            renderArray:filteredByTag,
        })

        // bookmark page
        const filterBookmarks = filteredForHiddenArticlesDB.filter(obj => obj.tag === value && obj.bookmarked === true);
        const filterBookmarksAll = filteredForHiddenArticlesDB.filter(obj => obj.bookmarked === true);
        this.setState({bookmarkArray:filterBookmarksAll})

        var updateState = this.props.getFilteredArticles;
        if(this.props.bookmarked != true){
            localStorage.setItem("filterOption",value)
            if(value === "All" ){
                updateState(filteredForHiddenArticlesDB,value)
            }else{
                updateState(filteredByTag,value)                
            }
        }else{
            localStorage.setItem("bookmarksFilterOption",value)
            if(value.includes("All") ){
                updateState(filterBookmarksAll,value,filterBookmarksAll.length)
            }else{
                updateState(filterBookmarks,value,filterBookmarks.length)
            }
        }
    }

    render(){        
  
        var allTags = {}
        if(this.props.bookmarked === true){
            // Bookmarks Page
            const bookmarks = JSON.parse((localStorage.getItem("bookmarkArray"))) || this.state.bookmarkArray
            allTags = bookmarks.filter(x => x.bookmarked === true)
        }else{
            // Home Page 
            const bookmarks = JSON.parse((localStorage.getItem("changedFullDatabaseCall"))) || this.props.fullDatabaseCall
            allTags = bookmarks
        }

        const newsCount = allTags.filter(x=> x.tag === "News")
        const sportsCount = allTags.filter(x=> x.tag === "Sports")
        const weatherCount = allTags.filter(x=> x.tag === "Weather")

        return (
            <div className="filterButtonWrapper">
                <button className="filterButton" id="newsFilterBtn" onClick={() => this.getArticlesBy("News")}>
                    <span class="material-icons">article</span>
                    News - {newsCount.length}
                </button>

                <button className="filterButton" id="sportsFilterBtn" onClick={() => this.getArticlesBy("Sports")} >
                    <span class="material-icons">emoji_events</span>
                    Sports - {sportsCount.length}
                </button>  

                <button className="filterButton" id="weatherFilterBtn" onClick={() => this.getArticlesBy("Weather")} >
                    <span class="material-icons">cloud_queue</span>
                    Weather - {weatherCount.length}
                </button>

                <button className="filterButton" id="noFilterBtn" onClick={() => this.getArticlesBy("All")} >
                    <span class="material-icons">filter_alt</span>
                    No Filter - {allTags.length}
                </button>
            </div>
        )
    }
}

export default FilterOptions;