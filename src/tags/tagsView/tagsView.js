import React from 'react';
import NavBar from '../../navBar/navBar';
import FilterOptions from '../../utility_components/filterOptions/filterOptions';
import RenderCard from '../../utility_components/renderCard/renderCardState';

export class TagsView extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            fullDatabaseCall:this.props.fullDatabaseCall,
            // Card Size
            startingCardSize:"",
            changedCardSize:{
                width: JSON.parse(localStorage.getItem("myData"))[0] ,
                height: JSON.parse(localStorage.getItem("myData"))[1]
            }, 
        }
        this.getCardSize = this.getCardSize.bind(this);
    }
    getCardSize(width,height){this.setState({startingCardSize:{width:width,height:height}})}

    updateBookmarkStatus(){
        console.log("Update")
    }

    render(){
        console.log(this.props.fullDatabaseCall)
        console.log(this.props.paramA)
        console.log(this.props.paramB)
        // console.log(fullDatabaseCallFromStorage) 
        // const filterTags = this.state.fullDatabaseCall.filter(obj => 
        //     obj.hidden !== true &&
        //     (obj.author === this.props.paramB || obj.tag === this.props.paramB || obj.postdate === this.props.paramB )
        // ) || this.props.location.state.arrayFromDatabase;
        // console.log(filterTags)

        // const renderTags = filterTags.filter(obj => obj.hidden !== true) || this.state.articlesArray

        const renderTags = this.state.fullDatabaseCall.filter(obj => obj.tag === this.props.paramB)
        console.log(renderTags)



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
                        getFilteredArticles = {this.getFilteredArticles}
                        tagsArray={renderTags}

                        // tag specific
                        showArticleCounter={true}
                        showTagPageTitle={true}
                        tagPageTitle={this.props.paramA}
                        tagPageTitle2={this.props.paramB}
                        articleNumber={renderTags.length}
                    />




                    <div className="cardsWrapper">
                        
                        {renderTags.length === 0 ?
                            <span> <img alt="now loading"  /> Loading   </span>
                        :
                            <RenderCard 
                            database={renderTags}
                            startingCardSize={this.state.startingCardSize}
                            changedCardSize={this.state.changedCardSize}

                            // Updating Bookmark
                            updateBookmarkStatus={this.updateBookmarkStatus}

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