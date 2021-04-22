import React from 'react';
// import MediaQuery from 'react-responsive';

import fire from '../fire.js'
import {Link} from 'react-router-dom';
import NewsPageVIEW from './news-page-view/news-page-view.js';
// import DummyData from '../home-page/dummy-data.js';
// import PracticeForm from '../myKnews/practice-form.js';

// const dummyNews = DummyData;

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
        // console.log(this.props.match.params.id);
        const dave = this.props.match.params.id;

        // console.log(this.props.location.state.articleObject)
        // console.log(this.props.location.search)
        // console.log(this.props.match.params.id)
        // console.log(dave)
        const dbRef = fire.database().ref("items").orderByKey().equalTo(dave);
        // console.log(dbRef)
        // console.log(this.props.match.params.id);
        dbRef.on('value', (snapshot) => {
            let articles = snapshot.val();
            let newState = [];
            for(let item in articles){
                newState.push({
                    key: item,
                    author: articles[item].author,
                    title: articles[item].title,
                    id:articles[item].id,
                    tag:articles[item].tag,
                    email:articles[item].email,
                    text: articles[item].text,
                    likes: articles[item].likes,
                    dislikes: articles[item].dislikes,
                    postdate: articles[item].postdate,
                });
                // console.log("New State is:: " + newState)
            }

            this.setState({
                articlesArray: newState.slice(0,30),
                leftoverArticles: newState.slice(30,97),
                fullDatabaseCall: newState
            })
            if(this.state.articlesArray.length === 0 ){
                this.setState({showErrorMessage:true})
            }
            // console.log(this.state.articlesArray[0].id);
            // console.log("DB: " + this.state.articlesArray)

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
        // console.log(this.props.match.params.id)
    const arrayLength = this.state.articlesArray.length;
    // console.log(this.state.showErrorMessage)
    return (
        
        <span>

        {/* I have no idea what is going on here... */}

        {/* <NewsPageVIEW database={this.state.articlesArray} params={this.props.match.params.id}  />  */}

        {/* If i comment out below(106>113) and leave above(97), the recommended reading bar will not display with 4 articles, only 1.
            However, if i comment out above and leave below it works as intended.

            I have no idea what the difference is here and why they would be behaving differently.
        */}


        {arrayLength >= 1 ?         
            <NewsPageVIEW database={this.state.articlesArray} params={this.props.match.params.id} fullDatabaseCall={this.state.fullDatabaseCall} leftoverArticles={this.state.leftoverArticles}  /> 

        
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
        }
    

        {/* <NewsPageVIEW database={this.state.articlesArray} params={this.props.match.params.id}  />  */}
        {/* {checkIdMap} */}

        </span>
        );
            
            
        
    }
}

export default NewsPage;