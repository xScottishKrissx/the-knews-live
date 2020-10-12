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
                    email:articles[item].email,
                    text: articles[item].text,
                    likes: articles[item].likes,
                    dislikes: articles[item].dislikes,
                    postdate: articles[item].postdate,
                });
            }
            this.setState({
                articlesArray: newState
            })
            // console.log(this.state.articlesArray[0].id);
        })
    }
    
    componentWillUnmount(){
        console.log("Unmounting news-page.js");
        fire.database().ref("items").off();
    }

    

    render(){    
        //console.log(firebasedb)
        // const ref = this.state.articlesArray;
        // const checkIdMap = ref.map((value) => {
        //     console.log("Something" + value.key)
        //     if(value.key === this.props.match.params.id){
        //          console.log("ID")
        //          console.log("Match" + this.props.match.params.id)
        //     }
        //     else{
        //         console.log("Error")
        //         console.log(this.props.match.params.id)
        //     }
        //     return null;
        // })

    // console.log(this.props.match.params.id)
    const arrayLength = this.state.articlesArray.length;
    // console.log("Array Length is : " + Number(arrayLength))

    const test = arrayLength;
    return (
        
        <span>
        {test >= 1 ?         
            <NewsPageVIEW database={this.state.articlesArray} params={this.props.match.params.id}  /> 
            : 
            <div className="error-message">
                <p>Nothing here mate. A team of monkeys have been dispatched from HQ where they have promptly started doing whatever they want because they're monkeys at the end of the day.</p>
                {/* <Link to='/theKnews'><p>Home</p></Link> */}
            </div>
 
        }


        {/* {checkIdMap} */}

        </span>
        );
            
            
        
    }
}

export default NewsPage;