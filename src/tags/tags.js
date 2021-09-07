import React from 'react';
import fire from '../fire.js';

import '../tags/tags.css';


import ScrollCheckV2 from '../utility_components/ScrollCheckV2.js';
import RenderCard from '../utility_components/renderCard/renderCardState.js';

import loading from '../img/loading5.gif';
import NavBar from '../navBar/navBar.js';
import FilterOptions from '../utility_components/filterOptions/filterOptions.js';
import TagsView from './tagsView/tagsView.js';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            searchDBFor: this.props.match.params.a || this.props.location.state.searchDBFor,
            fullDatabaseCall:[],
            numberOfItemsInArray:[],

            // Hiding Posts
            postsArray:[],

        // Card Size
        startingCardSize:"",
        changedCardSize:{
            width: JSON.parse(localStorage.getItem("myData"))[0] ,
            height: JSON.parse(localStorage.getItem("myData"))[1]
        },          
        }
        this.getCardSize = this.getCardSize.bind(this);
    }
    // There must be a way to only have one of these across the entire project.
    getCardSize(width,height){this.setState({startingCardSize:{width:width,height:height}})}

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

    componentDidMount(){
        // console.log(this.props.match.params.a)
        // console.log(this.props.match.params.b)
        
        const orderQueryByChild = this.props.match.params.a || this.props.location.state.orderByChild
        const searchDBFor = this.props.match.params.b || this.props.location.state.author
        // console.log(searchDBFor)
        // console.log(orderQueryByChild)
        // console.log(orderQueryByChild + " " + searchDBFor)

        const dbRef = fire.database().ref('items').orderByChild(orderQueryByChild).equalTo(searchDBFor)
                
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
                // fullDatabaseCall: newState,
                leftoverArticles:newState.slice(30,97)
            })            
        }) 
        
          // Main Database Call
        const cleanDB = fire.database().ref('items').orderByKey().limitToFirst(97);  
        cleanDB.on('value', (snapshot) => {
            let dbObjects = snapshot.val();
            let newState = [];
            for (let dbObject in dbObjects){
              newState.push({
                author: dbObjects[dbObject].author,
                bookmarked: dbObjects[dbObject].bookmarked,
                dislikes:dbObjects[dbObject].dislikes,
                disliked:dbObjects[dbObject].disliked,
                email:dbObjects[dbObject].email,
                hidden:dbObjects[dbObject].hidden,
                markedforhide:dbObjects[dbObject].markedforhide,
                id:dbObjects[dbObject].id,
                key:dbObject,
                likes:dbObjects[dbObject].likes,
                liked:dbObjects[dbObject].liked,
                postdate:dbObjects[dbObject].postdate,
                read: dbObjects[dbObject].read,
                tag:dbObjects[dbObject].tag,
                text:dbObjects[dbObject].text,
                title:dbObjects[dbObject].title,
               
              })
            }
            this.setState({fullDatabaseCall: newState})    
            localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))         
        })        
    }
    
    render(){

        // const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) ||  this.state.fullDatabaseCall;

        // // console.log(fullDatabaseCallFromStorage) 
        // const filterTags = fullDatabaseCallFromStorage.filter(obj => 
        //     obj.hidden !== true &&
        //     (obj.author === this.props.match.params.b || 
        //     obj.tag === this.props.match.params.b ||
        //     obj.postdate === this.props.match.params.b )
        // ) || this.props.location.state.arrayFromDatabase;

        // const renderTags = filterTags.filter(obj => obj.hidden !== true) || this.state.articlesArray
        // // console.log(this.state.searchDBFor)
        // // console.log(this.props.match.params.a)        
        // // console.log(this.props.match.params.b)
        // console.log(renderTags.length)
        return(
            <div><h1>Tags View</h1></div>
            // <TagsView 
            
            // />
            
            
        )
    }
}
export default Tags;