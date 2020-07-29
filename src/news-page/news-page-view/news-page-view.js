import React from 'react';
import {Link} from 'react-router-dom';

import HeaderImage from './header-image/header-image.js';
import ArticleArea from './article-area/article-area.js';

import RecommendedReading from './social/recommended-reading/recommended-reading.js';

import './news-page-view.css';
import fire from '../../fire.js'

export class NewsPageVIEW extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            author:'',
            email:'',
            title:'',
            text:'',
            ownsArticle: '',
            postdate:'',
            user:'',
        }
    }
    componentDidMount(){
        this.setState({ownsArticle: false})

        const dbRef = fire.database().ref("items");   
       // console.log("db-ref: " + dbRef);

           
        dbRef.on('value', (snapshot) => {
          let dbObjects = snapshot.val();
          let tempState = [];
          for (let dbObject in dbObjects){
            tempState.push({
              author: dbObjects[dbObject].author,
              email:dbObjects[dbObject].email,
              text:dbObjects[dbObject].text,
              title:dbObjects[dbObject].title,
  
              postdate:dbObjects[dbObject].postdate,
              likes:dbObjects[dbObject].likes,
              dislikes:dbObjects[dbObject].dislikes,
              id:dbObjects[dbObject].id,
              key:dbObject
             
            })
          }
          this.setState({
            articlesArray: tempState
          })
          //console.log(((this.state.articlesArray).length) + 1)
  
          
          // Check if User is Logged In...
          const checkUser = fire.auth().currentUser;
  
          // If they Exist Check to see if they have already created article
          if(checkUser){
            console.log(checkUser.email);
            if(checkUser.email === "chrisdunne66@gmail.com"){
                this.setState({ownsArticle: true})
            }
          //... if they haven't then don't do anything.
          }else{
            console.log("Not Logged In")
          }
        })
    }

    componentWillUnmount(){
        console.log("Unmount on practice-form.js")
        fire.database().ref("items").off();      
      }
    render(){
        const database = this.props.database;
      // console.log({GeneratePostDate})


 


        // console.log(Number(database))

    
        const NewsPageView = database.map((value) => {
            console.log(value)
            //console.log("current author email:: " + value.email)
            return(
                <div className='news-page-wrapper' key={value.id}> 

                    <div className="back-button">
                        <Link to='/theKnews'><p>Home</p></Link>
                    </div>

    
                    {/* Header Image */}
                    <div className='article-banner-image-wrapper'>
                        <HeaderImage props={value.id} />
                        <HeaderImage props={value.id + 60} />
                    </div>

                    <ArticleArea 
                        title={value.title}
                        postdate={value.postdate}
                        author={value.author}
                        text={value.text}
                        likes={value.likes}
                        dislikes={value.dislikes}
                        id={value.key}
                        email={value.email}
                        owns={this.state.ownsArticle}
                    />



                    <RecommendedReading />

    
    
                </div>
            )
        })

        return (
            
            <div>
--              
                {NewsPageView}
                
                
            </div>
        )

        // return NewsPageView;
    }
    
}
export default NewsPageVIEW;





    



