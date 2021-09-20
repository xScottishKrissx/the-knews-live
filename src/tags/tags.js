import React from 'react';
import fire from '../fire.js';
import loading from '../img/loading.gif'
import '../tags/tags.css';
import LoadingGif from '../utility_components/loadingGif/loadingGif.js';
import TagsView from './tagsView/tagsView.js';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
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
            this.setState({
                fullDatabaseCall: newState,
                articlesArray:newState.slice(0,10)
            })    
            localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))  
            // console.log(localStorage.getItem("changedFullDatabaseCall"))
            let checkChangedDB = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
            if(checkChangedDB === null){
                localStorage.setItem("changedFullDatabaseCall",JSON.stringify(this.state.articlesArray))
            }
            
  
        })        

    }

    
    render(){      
        
        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) ||  this.state.articlesArray;
        console.log(fullDatabaseCallFromStorage)

        const cleanDBCall = JSON.parse(localStorage.getItem("cleanDatabaseCall")) ||  this.state.fullDatabaseCall;
        

        let paramA = {}; let paramB = {}
        if(this.props.match.params.a) paramA = this.props.match.params.a;
        if(this.props.match.params.b) paramB = this.props.match.params.b;
        
        let getArticlesBasedOnParams; let showFilterButton;
        if(fullDatabaseCallFromStorage.length > 0 && paramA.includes("author")){
            getArticlesBasedOnParams = fullDatabaseCallFromStorage.filter(x=>x.author === paramB)
            showFilterButton = true
        }

        if(fullDatabaseCallFromStorage.length > 0 && paramA.includes("tag")){
            getArticlesBasedOnParams = fullDatabaseCallFromStorage.filter(x=>x.tag === paramB)
            showFilterButton = false
        }


        // Starting Card Size
        let cardSize = {}
        const cardSizeInStorage = JSON.parse(localStorage.getItem("savedCardStyle"))
        if(cardSizeInStorage === null){
            cardSize = ["260px","400px"]
        }else{
            cardSize = [cardSizeInStorage[0], cardSizeInStorage[1]]
        }
        
        return(
            // <div><h1>Tags View</h1></div>
            <>

            {fullDatabaseCallFromStorage.length > 0? 
                <TagsView  
                    fullDatabaseCall={getArticlesBasedOnParams}
                    cleanDB={cleanDBCall}
                    paramA={paramA}    
                    paramB={paramB}
                    showFilterButton={showFilterButton}
                    cardSize={cardSize}
                />
            :
            <LoadingGif />
            }
            </>
            
            
        )
    }
}
export default Tags;