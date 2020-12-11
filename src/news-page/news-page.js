import React from 'react';
// import MediaQuery from 'react-responsive';

import fire from '../fire.js'
import {Link} from 'react-router-dom';
import NewsPageVIEW from './news-page-view/news-page-view.js';
// import DummyData from '../home-page/dummy-data.js';
// import PracticeForm from '../myKnews/practice-form.js';

// const dummyNews = DummyData;


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
        }
    }

    componentDidMount(){        
        // console.log(this.props.match.params.id);
        const dave = this.props.match.params.id;
        
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
                articlesArray: newState
            })
            // console.log(this.state.articlesArray[0].id);
            // console.log("DB: " + this.state.articlesArray)
        })
    }
    
    componentWillUnmount(){
        fire.database().ref("items").off();
    }

    

    render(){    

    const arrayLength = this.state.articlesArray.length;
    const test = arrayLength;
    return (
        
        <span>

        {/* I have no idea what is going on here... */}

        {/* <NewsPageVIEW database={this.state.articlesArray} params={this.props.match.params.id}  />  */}

        {/* If i comment out below(106>113) and leave above(97), the recommended reading bar will not display with 4 articles, only 1.
            However, if i comment out above and leave below it works as intended.

            I have no idea what the difference is here and why they would be behaving differently.
        */}


        {test >= 1 ?         
            <NewsPageVIEW database={this.state.articlesArray} params={this.props.match.params.id}  /> 

        
            : 
            <div className="error-message">
            <p>Nothing here mate. A team of monkeys have been dispatched from HQ where they have promptly started doing whatever they want because they're monkeys at the end of the day.</p>
            <Link to='/theKnews'><p>Home</p></Link>
            </div>

        }
    

        {/* <NewsPageVIEW database={this.state.articlesArray} params={this.props.match.params.id}  />  */}
        {/* {checkIdMap} */}

        </span>
        );
            
            
        
    }
}

export default NewsPage;