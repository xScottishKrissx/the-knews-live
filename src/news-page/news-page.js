import React from 'react';

import fire from '../fire.js'
import {Link} from 'react-router-dom';
import NewsPageVIEW from './news-page-view/news-page-view.js';


import loading from '../img/loading5.gif';


export class NewsPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            author: "",
            title: "",
            text:"",
            likes:"",
            dislikes:"",
            postdate:"",
            tag: "",
            articlesArray: [],

            //testing
            showErrorMessage:false
        }
    }

    componentDidMount(){        

        // console.log("Mounted")
        const dave = this.props.match.params.id;
        console.log(dave)

        // Current Method
        // const dbRef = fire.database().ref("items").orderByKey().equalTo(dave);

        // New Method
        const dbRef = fire.database().ref("items").orderByKey();
        
         // Main Database Call
        dbRef.on('value', (snapshot) => {
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

            this.setState({
                fullDatabaseCall: newState,
                articlesArray: newState.slice(0,30),
                leftoverArticles: newState.slice(30,97)
                
            })
            if(this.state.articlesArray.length === 0 ){
                this.setState({showErrorMessage:true})
            }

            if(this.state.articlesArray === 0){
                setTimeout(function() {
                    this.setState({showErrorMessage:true})
                }, 5000);
            }
        })
    }
    
    componentWillUnmount(){
        fire.database().ref("items").off();
        this.setState({showErrorMessage:false})
    }

    

    render(){    

        // const somethingDifferent = this.state.fullDatabaseCall;
        // console.log(somethingDifferent)

        // const getArticle = somethingDifferent.filter(obj => obj.id === 319 ) 
        // console.log(getArticle)









    const arrayLength = this.state.articlesArray.length;
    // console.log(this.props.match.params.id || this.props.location.state.articleId)
    // console.log(this.props.location.state.articleId)
    // const testArticleId = this.props.location.state.articleId;

    return (
        
                <span>
        <h1>Article Page</h1>
        <h1>{this.props.match.params.id}</h1>
        {/* <h1>{this.props.location.state.articleId}</h1> */}


        {/* {arrayLength >= 1 ?         
            <NewsPageVIEW 
                database={this.state.articlesArray} 
                params={this.props.match.params.id} 
                fullDatabaseCall={this.state.fullDatabaseCall} 
                leftoverArticles={this.state.leftoverArticles}
                // articleId={this.props.location.state.articleId}
            /> 
            : 
          
            <div>
            {this.state.showErrorMessage === false ?
             <img src={loading} alt="loading, please wait for results"/>
             :
             <div className="error-message">
             <p>Nothing here mate. A team of monkeys have been dispatched from HQ where they have promptly started doing whatever they want because they're monkeys at the end of the day.</p>
             <Link to='/theKnews/home'><p>Home</p></Link>
             </div>
            }
           

            </div>
        } */}
        </span>
        );
            
            
        
    }
}

export default NewsPage;