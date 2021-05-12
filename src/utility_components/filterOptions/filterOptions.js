import React,{Component} from 'react';


class FilterOptions extends Component {

    constructor(props){
        super(props);
        this.state = {
                    //hiding articles for filter views
        getArticleBy:"All",
        renderArray:[],
        }
    }

    componentDidMount(){

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
        // console.log(filteredByTag)

        // Change Colour of button to show focus
        this.setState({
            getArticleBy:value,
            renderArray:filteredByTag,
            
            // leftoverArticles:leftoverArticles.slice(20)
        })
        // console.log(this.state.getArticleBy)

        // console.log(this.props.databaseProp)
        if(value === "All")this.setState({renderArray:filteredForHiddenArticlesDB || this.props.databaseProp})
        
        // Set Filter Option into local storage
        localStorage.setItem("filterOption",value) 
        var updateState = this.props.getFilteredArticles;
        updateState(filteredByTag,value)
     
    }

    render(){
        return (
            <div id="filterButtonWrapper">
                <button className="filterButton" id="newsFilterBtn" onClick={() => this.getArticlesBy("News","newsFilterBtn")}>News</button>

                <button className="filterButton" id="sportsFilterBtn" onClick={() => this.getArticlesBy("Sports","sportsFilterBtn")} >Sports</button>

  
                <button className="filterButton" id="weatherFilterBtn" onClick={() => this.getArticlesBy("Weather","weatherFilterBtn")} >Weather</button>
                <button className="filterButton" id="noFilterBtn" onClick={() => this.getArticlesBy("All","noFilterBtn")} >No Filter</button>
                
            </div>
        )
    }
}

export default FilterOptions;