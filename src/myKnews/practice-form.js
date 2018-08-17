import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import fire, {auth, provider} from '../fire.js'

import './form.css';


export class PracticeForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            author: '',
            // articleID: '',
            title: '',
            // id: '',
            text: '',
            articlesArray: [],
            redirectToReferrer: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }   


    componentDidMount(){
      const dbRef = fire.database().ref("items");
      console.log(dbRef);

      dbRef.on('value', (snapshot) => {
        let dbObjects = snapshot.val();
        let tempState = [];
        for (let dbObject in dbObjects){
          tempState.push({
            author: dbObjects[dbObject].author
          })
        }
        this.setState({
          articlesArray: tempState
        })
        console.log(((this.state.articlesArray).length) + 1)
      })


    }

    componentWillUnmount(){
      console.log("Unmount on practice-form.js")
      fire.database().ref("items").off();
    }

    handleChange(e){
      console.log("Change!!!")
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit(e){
      console.log("SUBMIT!!!");      
      e.preventDefault();

      console.log("Author is :" + this.state.author)
      const currentAuthor = this.state.author;
      const currentText = this.state.text;
      const currentTitle = this.state.title;

      if(currentAuthor.length === 0 || currentText.length === 0 ||currentText.length  === 0){
        // console.log("Can't submit")
        alert("Please enter something in each of the marked fields.")
      }else{
        console.log("Can submit")
        const dbRef = fire.database().ref('items');
        const article = {
          // User Input here...
          author: this.state.author,
          text:this.state.text,
          title: this.state.title,
  
          // Auto Generated Stuff here...
          id: (((this.state.articlesArray).length) * 3 ),
          postdate: "12/12/2017"
        }
  
  
        const ObjectsInDbCount = (((this.state.articlesArray).length) + 1);
        dbRef.child(ObjectsInDbCount).set(article);
  
  
        this.setState({
          author: '',
          text: '',
          title: '',
          redirectToReferrer: true
          // id: ''
        })


      }
      

    
      

    }



    render(){
      // console.log(this.state.redirectToReferrer)
      const redirectToReferrer = this.state.redirectToReferrer;
      if (redirectToReferrer === true) {
          return (
            <Switch>
              <Redirect 
                  to={"/articles/news-page/" + ((this.state.articlesArray).length) }
                />          
            </Switch>)
      }
        // const firebaseDB = this.state.articlesArray;
        return(
          <div className='form'>
           <h1>Upload</h1>

           <div className='uploadArticle'>
            
            <form name="myForm" onSubmit={this.handleSubmit}>
             {/* <p> 
                Author: 
                <input
                  id="author-input"
                  type="text"
                  name="author"
                  onChange={this.handleChange}
                  required
                  value={this.state.author}>
                </input>
             </p> */}
            <p>Author:</p>
            <input                 
                form="myForm"
                type="text"
                name="author"
                onChange={this.handleChange}                   
                required
                value={this.state.author}>
            </input>

            <p>Dislikes - Auto</p>
            <p>Id - auto</p>
            <p>Likes - Auto</p>
            <p>Postdate - auto</p>

            <p>Text</p>
              <textarea
                  form="myForm"
                  type="text"
                  name="text"
                  onChange={this.handleChange}
                  required
                  rows="10"
                  value={this.state.article}
                >
              </textarea>
            
            <p>Title</p>
                <input                    
                    form="myForm"
                    type="text"
                    name="title"
                    onChange={this.handleChange}                   
                    required
                    value={this.state.title}>
                </input>


            

             {/* <p>
                Id:
                <input
                  type="text"
                  name="id"
                  onChange={this.handleChange}
                  required
                  value={this.state.id}>
                </input>
             </p> */}


            



              <button>Upload</button>
            
            </form>
           
           </div>
          
          </div>
        )
    }
}

export default PracticeForm;