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
            redirectToReferrer: false,
            user: null,
            viewForm: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
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




        // console.log("User Email Is: " + this.state.user.email)

        // const checkDBRef = this.state.articlesArray;

        // // console.log("User Email Is: " + this.state.user.email)
        // console.log("Check Database: " + checkDBRef);
        // checkDBRef.map((test) => {
        //   console.log(test.author);
        //   if(test.author === "Avril Ducarne"){
            
        //     alert("You can only have one article at a time!!")
        //     console.log("You can't submit until you delete one of the articles you already have")
           
        //   }else{
            
        //   }
        // })
        // console.log(dbRef);



      })
      
      auth.onAuthStateChanged((user) => {
        if(user){
          this.setState({user});
        }
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
      const currentUser = this.state.user.email;


      // if(currentTitle.length === 0 ||currentText.length  === 0){
      //   // console.log("Can't submit")
      //   alert("Error!!")
      // }else{
      //   console.log("Can submit")
      //   const dbRef = fire.database().ref('items');
      //   const article = {
      //     // User Input here...
      //     author: this.state.user.displayName,
      //     text:this.state.text,
      //     title: this.state.title,
  
      //     // Auto Generated Stuff here...
      //     id: (((this.state.articlesArray).length) * 3 ),
      //     postdate: "12/12/2017"
      //   }
  
  
      //   const ObjectsInDbCount = (((this.state.articlesArray).length) + 1);
      //   dbRef.child(ObjectsInDbCount).set(article);
  
  
      //   this.setState({
      //     author: '',
      //     text: '',
      //     title: '',
      //     redirectToReferrer: true
      //     // id: ''
      //   })


      // } 
    }

    login(){
      auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      })
    }

    logout(){
      auth.signOut().then(() => {
        this.setState({
          user:null
        });
      })
    }



    render(){
      console.log("User is: " + this.state.user)


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

          {/* Login */}
          
          {this.state.user ?
              <button onClick={this.logout}>Log Out</button>
              :
              <button onClick={this.login}>Login</button>
          }


        {/* Logged In View */}

        {
          this.state.user ?


          <div className='uploadArticle'>
          <h1>Logged in View</h1>
          <p>{this.state.user.displayName}</p>
          <h1>Upload</h1>

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
            {/* <p>Author:</p>
            <input                 
                form="myForm"
                type="text"
                name="author"
                onChange={this.handleChange}                   
                required
                value={this.state.user.email}>
            </input> */}
            <p>Author - Auto</p>
            <p>Dislikes - Auto</p>
            <p>Id - auto</p>
            <p>Likes - Auto</p>
            <p>Postdate - auto</p>

            <p>Title</p>
              <input                    
                  form="myForm"
                  type="text"
                  name="title"
                  onChange={this.handleChange}                   
                  required
                  value={this.state.title}>
              </input>

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
          :
          <h1>Logged Out View</h1>
        }
          
          
          </div>
        )
    }
}

export default PracticeForm;