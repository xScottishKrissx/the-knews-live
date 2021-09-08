import React from 'react';
import fire from '../fire.js';

import '../tags/tags.css';
import TagsView from './tagsView/tagsView.js';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            searchDBFor: this.props.match.params.a || this.props.location.state.searchDBFor,
            fullDatabaseCall:[],


                 
        }

    }
     componentDidMount(){

        
        const orderQueryByChild = this.props.match.params.a || this.props.location.state.orderByChild
        const searchDBFor = this.props.match.params.b || this.props.location.state.author

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
                // articlesArray: newState,
                // fullDatabaseCall: newState,
                // leftoverArticles:newState.slice(30,97)
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

        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) ||  this.state.fullDatabaseCall.slice(0,10);

        var paramA = {}
        var paramB = {}
        if(this.props.match.params.a) paramA = this.props.match.params.a;
        if(this.props.match.params.b) paramB = this.props.match.params.b;
        var filterForTag = fullDatabaseCallFromStorage.filter(x=>x.tag === paramB)
        
        return(
            // <div><h1>Tags View</h1></div>
            <TagsView  
                fullDatabaseCall={filterForTag}
                paramA={paramA}    
                paramB={paramB}
            />
            
            
        )
    }
}
export default Tags;