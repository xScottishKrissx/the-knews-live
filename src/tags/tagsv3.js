import React from 'react';
import fire from '../fire.js';

import NavControls from '../utility_components/navControls.js';
import '../tags/tags.css';
import CustomCardSize from '../home-page/news-item-loop/custom-tile-size/custom-card-size.js';
import ScrollCheck from '../utility_components/ScrollCheck.js';

// Working with Cache 
import ClearCache from '../utility_components/ClearCache.js';
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
                            database={this.state.articlesArray}
                            startingCardSize={this.state.startingCardSize}
                            changedCardSize={this.state.changedCardSize}
                            postsArray={this.state.postsArray}
                        />

                        <ScrollCheckV2 leftoverArticles={this.state.leftoverArticles} />
                </div>
                <CustomCardSize getCardSizeToParent={this.getCardSize}/>
            </div>
            
            
        )
    }
}
export default Tags;