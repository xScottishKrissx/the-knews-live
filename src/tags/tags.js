import React from 'react';
import fire from '../fire.js';

import NavControls from '../utility_components/navControls/navControls.js';
import '../tags/tags.css';
import CustomCardSize from '../utility_components/custom-tile-size/custom-card-sizeV2.js';
// import ScrollCheck from '../utility_components/ScrollCheck.js';

// Working with Cache 
import ClearCache from '../utility_components/handleCache/ClearCache.js';
import ScrollCheckV2 from '../utility_components/ScrollCheckV2.js';
import RenderCard from '../utility_components/renderCard/renderCard.js';

import loading from '../img/loading5.gif';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            searchDBFor: this.props.match.params.a || this.props.location.state.searchDBFor,
            fullDatabaseCall:[],

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
    getCardSize(width,height){
        // console.log(width +" "+ height)
        this.setState({
            startingCardSize:{
                width:width,
                height:height
            }
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
        // const dbRef = fire.database().ref('items').orderByChild(orderQueryByChild).startAt(searchDBFor.toUppercase).endAt(searchDBFor.toLowerCase+ "\uf8ff")
                
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

        const fullDatabaseCallFromStorage = 
                JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || 
                this.state.fullDatabaseCall;

        // console.log(fullDatabaseCallFromStorage) 
        const filterTags = fullDatabaseCallFromStorage.filter(obj => 
            obj.hidden !== true &&
            (obj.author === this.props.match.params.b || 
            obj.tag === this.props.match.params.b ||
            obj.postdate === this.props.match.params.b )
        ) || this.props.location.state.arrayFromDatabase;

        const renderTags = filterTags.filter(obj => obj.hidden !== true) || this.state.articlesArray
        // console.log(renderTags)
        return(
            
            <div className="tags-wrapper">
                <div className="tags-item-wrapper">
                        {/* <ClearCache /> */}

                        <NavControls props="only-home-button"/>
                        {this.props.match.params.b || this.props.location.state.author === undefined ?
                        <h1>Showing articles from {this.props.match.params.b || this.props.location.state.searchDBFor}</h1>
                        : 
                        <h1>Showing articles from {this.props.match.params.b || this.props.location.state.author}</h1>
                        }        
                        <CustomCardSize getCardSizeToParent={this.getCardSize} />
                        {renderTags.length === 0 ?
                        // <div>Nothing here</div>
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


                        <ScrollCheckV2 leftoverArticles={this.state.leftoverArticles} />
                </div>
                {/* <CustomCardSize getCardSizeToParent={this.getCardSize}/> */}
            </div>
            
            
        )
    }
}
export default Tags;