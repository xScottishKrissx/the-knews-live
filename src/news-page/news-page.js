import React from 'react';

import fire from '../fire.js'
import {Link} from 'react-router-dom';
import NewsPageVIEW from './news-page-view/news-page-view.js';


import loading from '../img/loading5.gif';
import NavBar from '../navBar/navBar.js';



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

            fullDatabaseCall:[],
            //testing
            showErrorMessage:false
        }
    }

    componentDidMount(){        

        // console.log("Mounted")
        // const dave = this.props.match.params.id;
        // console.log(dave)

        // Old Method
        // const dbRef = fire.database().ref("items").orderByKey().equalTo(dave);

        // New Method
        const dave = parseInt(this.props.match.params.id);
        const dbRef = fire.database().ref("items").orderByChild("id").equalTo(dave);
       
        
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

    const arrayLength = this.state.articlesArray.length;

    return (
        
        <div>

            {arrayLength >= 1 ?         
                <NewsPageVIEW 
                    database={this.state.articlesArray} 
                    params={this.props.match.params.id} 
                    fullDatabaseCall={this.state.fullDatabaseCall} 
                    leftoverArticles={this.state.leftoverArticles}
                    id={this.props.match.params.id}
                    // articleId={this.props.location.state.articleId}
                /> 
                : 
                <div>
                    
                    {this.state.showErrorMessage === false ?
                        <img src={loading} alt="loading, please wait for results"/>
                    :
                        <span>
                        <NavBar />
                            <div className="error-message">
                                <p>Nothing here mate. A team of monkeys have been dispatched from HQ where they have promptly started doing whatever they want because, at the end of the day, they're monkeys.</p>
                            </div>
                        </span>
                    }
                    
                </div>
            }
        </div>
        );
            
            
        
    }
}

export default NewsPage;