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

import {Route, Redirect, Switch, Link} from 'react-router-dom';
class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            searchDBFor: this.props.match.params.x || this.props.location.state.searchDBFor,
            
            // Hiding Posts
            postsArray:[],

            // Custom Card Size
            startingCardSize:"",
            changedCardSize:{width: localStorage.getItem("myData")},    
            
            //Testing
            fullDatabaseCall:[],
            queryDBForAuthor:[],
            queryDBForTag:[],
            orderByChild: this.props.match.params.x || this.props.location.state.orderByChild
            
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
        console.log(this.state.searchDBFor)
        console.log(this.props.match.params.x)
        // console.log(this.props.location.state.orderByChild)
        // console.log(this.props.location.state.author)
        
        const orderQueryByChild = this.props.match.params.x || this.props.location.state.orderByChild
        const searchDBFor = this.props.match.params.x || this.props.location.state.author
        
        console.log(orderQueryByChild)
        // if(urlTagProp && urlTagProp.includes("news" || "News"))localStorage.setItem("filterOption","News");
        if(orderQueryByChild.includes("news")){
            console.log("Set as Tag")
            this.setState({articleTag:"tag"})
        }
        // if(orderQueryByChild.includes("News"))console.log("Search Tags for Article Tag")
        // if(orderQueryByChild.includes("Sports"))console.log("Search Tags for Article Tag")
        // if(orderQueryByChild.includes("sports"))console.log("Search Tags for Article Tag")
        // if(orderQueryByChild.includes("Weather"))console.log("Search Tags for Article Tag")
        // if(orderQueryByChild.includes("weather"))console.log("Search Tags for Article Tag")

        console.log(this.state.articleTag)
        const orderByChild =  this.state.articleTag || "author";
        console.log(orderByChild)

        // const thingFromArticle = this.props.location.state.thingFromArticle;
        console.log(orderQueryByChild + " " + searchDBFor)
        // console.log(this.props.location.state.orderByChild)
        
        // const dbRef = fire.database().ref('items').orderByChild("author").equalTo(searchDBFor) ||fire.database().ref('items').orderByKey().limitToFirst(97); 

        const dbRef = fire.database().ref('items').orderByChild("author").equalTo(searchDBFor)
        
        // If I can find a way of alternating between these 2 references, then I might have a solution to having both search and directly accessible pages from 1 component
            // const dbRef = fire.database().ref('items').orderByChild("author").equalTo("PA Media")
            // const dbRef = fire.database().ref('items').orderByChild("tag").equalTo("News")

        // console.log(fire.database().ref('items').orderByChild("author").equalTo("PA Media"))
        // console.log(fire.database().ref('items').orderByChild("tag").equalTo("news"))
        
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
                articlesArray: newState,
                fullDatabaseCall: newState,
                leftoverArticles:newState.slice(30,97)
            })            
        })

        
    }


    render(){
        console.log(this.state.articleTag)
        console.log(fetch('/home/search/' + this.props.match.params.x))
        if(this.props.location.state === undefined){
            console.log("error")    
        }

        console.log("Render Tags.v3")
        console.log(this.state.articlesArray)
        console.log(this.props.match.params.x)
        
        console.log(this.props.match.params.x || this.props.location.state.author)
        console.log(this.state.fullDatabaseCall || this.props.location.state.arrayFromDatabase)
        console.log(this.state.leftoverArticles || this.props.location.state.leftoverArticles)
        // console.log(this.props.location.state.fullDatabaseCall)
        

        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.fullDatabaseCall || this.props.location.state.fullDatabaseCall;

        console.log(fullDatabaseCallFromStorage) 
        const filterTags = fullDatabaseCallFromStorage.filter(obj => 
            obj.hidden !== true &&
            obj.author === this.props.match.params.x ||
            obj.postdate === this.props.match.params.x 
        ) || this.props.location.state.arrayFromDatabase;
        const renderTags = filterTags.filter(obj => obj.hidden !== true) || this.state.articlesArray
        console.log(renderTags)
        return(
            
            <div className="tags-wrapper">
                <div className="tags-item-wrapper">
                        <ClearCache />

                        <NavControls props="only-home-button"/>
                        {this.props.match.params.x || this.props.location.state.author === undefined ?
                        <h1>Showing articles from {this.props.match.params.x || this.props.location.state.searchDBFor}</h1>
                        : 
                        <h1>Showing articles from {this.props.match.params.x || this.props.location.state.author}</h1>
                        }              
                        {renderTags.length === 0 ?
                        <div>Nothing here</div>    
                        :
                            <RenderCard 
                            database={renderTags}
                            startingCardSize={this.state.startingCardSize}
                            changedCardSize={this.state.changedCardSize}
                            postsArray={this.state.postsArray}

                            // This needs to be clean database call
                            arrayFromDatabase={this.state.fullDatabaseCall || this.props.location.state.arrayFromDatabase}
                            leftoverArticles={this.state.leftoverArticles||this.props.location.state.leftoverArticles}
                            fullDatabaseCall={this.state.fullDatabaseCall || this.props.location.state.fullDatabaseCall}
                        />
                        }


                        <ScrollCheckV2 leftoverArticles={this.state.leftoverArticles} />
                </div>
                <CustomCardSize getCardSizeToParent={this.getCardSize}/>
            </div>
            
            
        )
    }
}
export default Tags;