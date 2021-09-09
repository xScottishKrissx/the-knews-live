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
            // console.log(checkChangedDB)
            if(checkChangedDB === null){
                // console.log("Do Something")
                localStorage.setItem("changedFullDatabaseCall",JSON.stringify(this.state.articlesArray))
            }
            
            // localStorage.setItem("changedFullDatabaseCall", JSON.stringify(this.state.fullDatabaseCall)) 
  
        })        
        // console.log("Mount")
    }

    
    render(){
        // console.log(this.state.fullDatabaseCall)

        // console.log(this.state.articlesArray)
        // if(this.state.articlesArray.length){
        //     console.log("Do Something")
        //     let checkCleanDB = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        //     let checkChangedDB = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        //     console.log(checkCleanDB)
        //     console.log(checkChangedDB)
        //     if(checkChangedDB === null || checkChangedDB.length === 0){
        //         console.log("Set Changed DB")
        //         localStorage.setItem("changedFullDatabaseCall", JSON.stringify(this.state.articlesArray)) 
        //         localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))
        //     }else{
        //         console.log("Dont set New Changed DB" )
        //     }
        // }else{
        //     console.log("Do Nothing")
        // }




        
 
        // if(checkChangedDB && checkCleanDB === [] || checkChangedDB && checkCleanDB === null){
        //     console.log("Database Exists")
        // }else{
        //     console.log("Datbase Does not Exist")
        //     localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))  
        //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(this.state.fullDatabaseCall)) 
        // }

       

        
        
            // if(checkStorage === null){
            //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(this.state.fullDatabaseCall)) 
            //     localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))  
            //     console.log("1")
            // }else if(checkStorage.length === 0){
            //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))  
            //     localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall)) 
            //     console.log("2")
            // }else{
            //     console.log(checkStorage)
            // }
        
        
        const fullDatabaseCallFromStorage = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) ||  this.state.articlesArray;
        console.log(fullDatabaseCallFromStorage)
        console.log(fullDatabaseCallFromStorage.filter(x=>x.author === "PA Media"))


        const cleanDBCall = JSON.parse(localStorage.getItem("cleanDatabaseCall")) ||  this.state.fullDatabaseCall;
        

        let paramA = {}; let paramB = {}
        if(this.props.match.params.a) paramA = this.props.match.params.a;
        if(this.props.match.params.b) paramB = this.props.match.params.b;
        let filterForTag;
        if(fullDatabaseCallFromStorage.length > 0) 
        {
            filterForTag = fullDatabaseCallFromStorage.filter(x=>x.author === paramB)
            // console.log(filterForTag)
            // console.log(fullDatabaseCallFromStorage)

        }else{
            // console.log("No")
        }

        // console.log(filterForTag)
        // console.log(paramA + " " + paramB)

        // console.log(cleanDBCall)
        // console.log(fullDatabaseCallFromStorage)
        return(
            // <div><h1>Tags View</h1></div>
            <>

            {fullDatabaseCallFromStorage.length > 0 ? 
                <TagsView  
                    fullDatabaseCall={filterForTag}
                    cleanDB={cleanDBCall}
                    paramA={paramA}    
                    paramB={paramB}
                />
            :
                <h1>Nay</h1>
            }
            </>
            
            
        )
    }
}
export default Tags;