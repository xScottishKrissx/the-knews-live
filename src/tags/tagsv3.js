import React from 'react';
import fire from '../fire.js';

import NavControls from '../utility_components/navControls/navControls.js';
import '../tags/tags.css';
import CustomCardSize from '../home-page/news-item-loop/custom-tile-size/custom-card-size.js';
import ScrollCheck from '../utility_components/ScrollCheck.js';

// Working with Cache 
import ClearCache from '../utility_components/handleCache/ClearCache.js';
import ScrollCheckV2 from '../utility_components/ScrollCheckV2.js';
import RenderCard from '../utility_components/renderCard/renderCard.js';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            searchDBFor: this.props.location.state.searchDBFor,
            
            // Hiding Posts
            postsArray:[],

            // Custom Card Size
            startingCardSize:"",
            changedCardSize:{width: localStorage.getItem("myData")},       
            
        }
        this.getCardSize = this.getCardSize.bind(this);
    }

    // There must be a way to only have one of these across the entire project.
    getCardSize(value){
        this.setState({
            startingCardSize:{
                width:value
            }
        })
    }

    componentDidMount(){
        const orderQueryByChild = this.props.location.state.orderByChild
        const searchDBFor = this.props.location.state.author
        const thingFromArticle = this.props.location.state.thingFromArticle;
        console.log(orderQueryByChild + " " + searchDBFor)
        console.log(this.props.location.state.orderByChild)
        const dbRef = fire.database().ref('items').orderByChild(orderQueryByChild).equalTo(searchDBFor);

        dbRef.on('value', (snapshot) => {
            let newsItems = snapshot.val();
            // console.log(newsItems);
            let newState = [];
            for(let newsItem in newsItems){
                newState.push({
                    key: newsItem,
                    hidden:newsItems[newsItem].hidden,
                    author: newsItems[newsItem].author,
                    title: newsItems[newsItem].title,
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes,
                    id:newsItems[newsItem].id,
                    tag:newsItems[newsItem].tag,
                    text:newsItems[newsItem].text
                });
                // console.log(newState)
            }

            this.setState({
                articlesArray: newState
            })            
        })
    }


    render(){
        console.log("Render Tags.v3")
        console.log(this.props.location.state)
        console.log(this.props.location.state.author)
        console.log(this.props.location.state.arrayFromDatabase)
        console.log(this.props.location.state.leftoverArticles)
        console.log(this.props.location.state.fullDatabaseCall)
        
        

        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.location.state.fullDatabaseCall;

        // console.log(fullDatabaseCallFromStorage) 
        const filterTags = fullDatabaseCallFromStorage.filter(obj => 
            obj.hidden !== true &&
            obj.author === this.props.location.state.author ||
            obj.postdate === this.props.location.state.author
        ) || this.props.location.state.arrayFromDatabase;
        const renderTags = filterTags.filter(obj => obj.hidden !== true) || this.state.articlesArray
        console.log(renderTags)
        return(
            
            <div className="tags-wrapper">
                <div className="tags-item-wrapper">
                        <ClearCache />

                        <NavControls props="only-home-button"/>
                        {this.props.location.state.author === undefined ?
                        <h1>Showing articles from {this.props.location.state.searchDBFor}</h1>
                        : 
                        <h1>Showing articles from {this.props.location.state.author}</h1>
                        }              
                        
                        <RenderCard 
                            database={renderTags}
                            startingCardSize={this.state.startingCardSize}
                            changedCardSize={this.state.changedCardSize}
                            postsArray={this.state.postsArray}

                            // This needs to be clean database call
                            arrayFromDatabase={this.props.location.state.arrayFromDatabase}
                            leftoverArticles={this.props.location.state.leftoverArticles}
                            fullDatabaseCall={this.props.location.state.fullDatabaseCall}
                        />

                        <ScrollCheckV2 leftoverArticles={this.state.leftoverArticles} />
                </div>
                <CustomCardSize getCardSizeToParent={this.getCardSize}/>
            </div>
            
            
        )
    }
}
export default Tags;