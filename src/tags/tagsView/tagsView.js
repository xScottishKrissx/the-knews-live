import React from 'react';
import NavBar from '../../navBar/navBar';
import updateBookmarkStyles from '../../utility_components/bookmarks/updateBookmarkStyle';
import FilterOptions from '../../utility_components/filterOptions/filterOptions';
import RenderCard from '../../utility_components/renderCard/renderCardState';


export class TagsView extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            fullDatabaseCall:this.props.fullDatabaseCall,
            renderArray:[],
            // Card Size
            startingCardSize:"",
            changedCardSize:{
                width: JSON.parse(localStorage.getItem("myData"))[0] ,
                height: JSON.parse(localStorage.getItem("myData"))[1]
            }, 
        }
       
    }

    
    getFilteredArticles = (filteredByTag,getArticleBy,length) => {
        // console.log(filteredByTag)
        // console.log(getArticleBy)
        // console.log(length)
        this.setState({
            bookmarks: filteredByTag,
            getArticleBy:getArticleBy,
            bookmarksCount:length
        })
        
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

    updateHideStatus = (articles) =>{ this.setState({fullDatabaseCall:articles}) }

    render(){

        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) ||  this.state.fullDatabaseCall;
        // console.log(fullDatabaseCallFromStorage) 
        const filterTags = fullDatabaseCallFromStorage.filter(obj => 
            obj.hidden !== true &&
            (obj.author === this.props.paramB || 
            obj.tag === this.props.paramB ||
            obj.postdate === this.props.paramB )
        ) || this.props.fullDatabaseCall;

        const renderToPage = filterTags.filter(obj => obj.hidden !== true) || this.state.fullDatabaseCall

        // console.log(this.state.searchDBFor)
        // console.log(this.props.match.params.a)        
        // console.log(this.props.match.params.b)
        console.log(renderToPage)
        



        return(
            <div className="tags-wrapper">
            <div className="tags-item-wrapper">

                    <NavBar 
                        bookmarks={true}
                        cardStyle={true}    
                        options={true}                     
                        // filter={true}
                        homeButtonOn={true}

                        // Card Style to work...
                        getCardSize={this.getCardSize}

                        // filter to work...
                        fullDatabaseCall={this.state.fullDatabaseCall}
                        tagsArray={renderToPage}


                        // tag specific
                        showArticleCounter={true}
                        showTagPageTitle={true}
                        tagPageTitle={this.props.paramA}
                        tagPageTitle2={this.props.paramB}
                        articleNumber={renderToPage.length}

                        // options
                        currentCardArray = {renderToPage}
                        updateBookmarkStatus={this.updateBookmarkStatus}
                    />




                    <div className="cardsWrapper">
                        
                        {renderToPage.length === 0 ?
                            <span> <img alt="now loading"  /> Loading   </span>
                        :
                            <RenderCard 
                            database={renderToPage}
                            startingCardSize={this.state.startingCardSize}
                            changedCardSize={this.state.changedCardSize}

                            // Updating Bookmark
                            updateBookmarkStatus={this.updateBookmarkStatus}
                            updateHideStatus={this.updateHideStatus}

                            // This needs to be clean database call
                            arrayFromDatabase={this.state.fullDatabaseCall || this.props.location.state.arrayFromDatabase}
                            // leftoverArticles={this.state.leftoverArticles||this.props.location.state.leftoverArticles}
                            fullDatabaseCall={this.state.fullDatabaseCall}
                        />
                        }

                        {/* <ScrollCheckV2 leftoverArticles={this.state.leftoverArticles} fullDatabaseCall={this.state.fullDatabaseCall}/> */}
                    </div>
            </div>
        </div>
        )
    }
}

export default TagsView;