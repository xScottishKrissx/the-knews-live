import React from 'react';
import {Redirect} from 'react-router-dom';

import HeaderImage from './header-image/header-image.js';
import ArticleArea from './article-area/article-area.js';


import ScrollToTopButton from '../../utility_components/scrollToTop/scrollToTop.js';
import NavControls from '../../utility_components/navControls/navControls.js';
import RecommendedReading from './social/recommended-reading/recommended-reading.js';

import './news-page-view.css';
import fire from '../../fire.js'

export class NewsPageVIEW extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            fullDatabaseCall:[],
            author:'',
            email:'',
            title:'',
            text:'',
            ownsArticle: '',
            postdate:'',
            user:'',
            tag:''
            
        }
    }
    componentDidMount(){
        this.setState({ownsArticle: false})
        console.log("News-Page-View.js")

        const dbRef = fire.database().ref("items");   
       // console.log("db-ref: " + dbRef);

           
        dbRef.on('value', (snapshot) => {
          let dbObjects = snapshot.val();
          let newState = [];
          for (let dbObject in dbObjects){
            newState.push({
              author: dbObjects[dbObject].author,
              email:dbObjects[dbObject].email,
              text:dbObjects[dbObject].text,
              title:dbObjects[dbObject].title,
              tag:dbObjects[dbObject].tag,
  
              postdate:dbObjects[dbObject].postdate,
              likes:dbObjects[dbObject].likes,
              dislikes:dbObjects[dbObject].dislikes,
              id:dbObjects[dbObject].id,
              key:dbObject
             
            })
          }
          this.setState({
            articlesArray: newState.slice(0,30),
            leftoverArticles: newState.slice(30,97),
            fullDatabaseCall: newState
          })
          console.log(this.state.articlesArray)
          console.log(this.props.params)
          // console.log(this.props.testProp)
         
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
        // console.log(this.state.articlesArray)
        // console.log(database)
        
        //console.log(this.props.scrollpos)
        //console.log({GeneratePostDate})
        //console.log(Number(database))
        console.log(this.state.leftoverArticles)
        const NewsPageView = database.map((value) => {
            // console.log(value)
            //console.log("current author email:: " + value.email)
            
            return(
              
                <div className='news-page-wrapper' key={value.id}> 
                    {/* Header Image */}
                    <div className='article-banner-image-wrapper'>
                        <HeaderImage props={value.id} />
                        {/* <HeaderImage props={value.id + 60} /> */}
                    </div>

                    <ArticleArea 
                        title={value.title}
                        tag={value.tag}
                        postdate={value.postdate}
                        author={value.author}
                        text={value.text}
                        likes={value.likes}
                        dislikes={value.dislikes}
                        id={value.key}
                        articleId={value.id}
                        email={value.email}
                        owns={this.state.ownsArticle}

                        //Hiding
                        arrayFromDatabase={this.state.articlesArray}
                        leftoverArticles={this.state.leftoverArticles}
                        fullDatabaseCall={this.state.fullDatabaseCall}
                       
                    />

                    <RecommendedReading />
                    <ScrollToTopButton />   
                </div>
            )
        })
        // console.log("Props are:: " + this.props.params);
        return (
            
            <div>

                
                <NavControls currentarticleid={this.props.params}/>
                
                {this.props.params === "5" ?
                
                <Redirect to='/theKnews' />
                :  
                NewsPageView
                }
                             
            </div>
        )

        // return NewsPageView;
    }
    
}
export default NewsPageVIEW;





    



