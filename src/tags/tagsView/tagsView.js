import React from 'react';
import NavBar from '../../navBar/navBar';
import FilterOptions from '../../utility_components/filterOptions/filterOptions';
import RenderCardState from '../../utility_components/renderCard/renderCardState';

export class TagsView extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){









        
        return(
            <div className="tags-wrapper">
            <div className="tags-item-wrapper">

                    <NavBar 
                        bookmarks={true}
                        cardStyle={true}                         
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
                        tagPageTitle={this.props.match.params.a}
                        tagPageTitle2={this.props.match.params.b}
                        articleNumber={renderTags.length}
                    />


                    <FilterOptions fullDatabaseCall={this.state.fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles} tagsArray={renderTags}/>

                    <div className="cardsWrapper">
                        
                        {renderTags.length === 0 ?
                            <span> <img alt="now loading" src={loading} /> Loading   </span>
                        :
                            <RenderCard 
                            database={renderTags}
                            startingCardSize={this.state.startingCardSize}
                            changedCardSize={this.state.changedCardSize}
                            postsArray={this.state.postsArray}

                            // This needs to be clean database call
                            arrayFromDatabase={this.state.fullDatabaseCall || this.props.location.state.arrayFromDatabase}
                            leftoverArticles={this.state.leftoverArticles||this.props.location.state.leftoverArticles}
                            fullDatabaseCall={this.state.fullDatabaseCall}
                        />
                        }

                        <ScrollCheckV2 leftoverArticles={this.state.leftoverArticles} fullDatabaseCall={this.state.fullDatabaseCall}/>
                    </div>
            </div>
        </div>
        )
    }
}

export default TagsView;