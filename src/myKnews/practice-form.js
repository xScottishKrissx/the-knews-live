import React from 'react';
import {
  // Route
  Redirect, Switch} from 'react-router-dom';

import fire, {auth, provider} from '../fire.js'


import FormView from './form-view.js';

// import GetTodaysDate from '../utility_components/todaysDate.js';

import './form.css';

export class PracticeForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            author: '',
            email:'',
            // articleID: '',
            title: '',
            // id: '',
            text: '',
            articlesArray: [],
            postdate: '',
            redirectToReferrer: false,
            user: null,
            viewForm: true,
            currentArticles: [],
            key:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        
    }   


    componentDidMount(){
      
      //Getting the Current Date and assigning it state.
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const postDate = day + "/" + month + "/" + year;
      this.setState({
        postdate: postDate
      })



      // console.log({GeneratePostDate})
      const dbRef = fire.database().ref("items");   
      console.log("db-ref: " + dbRef);
           
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
        console.log(((this.state.articlesArray).length) + 1)


        // Check if User is Logged In...
        const checkUser = fire.auth().currentUser;

        // If they Exist Check to see if they have already created article
        if(checkUser){
          console.log("Logged In");
          const checkDBRef = this.state.articlesArray;
          const currentUserEmail =  this.state.user.email;
          console.log(currentUserEmail);

          checkDBRef.map((test) => {         
            if(test.email === this.state.user.email){            
              // alert("You can only have one article at a time!!")
              //console.log("You can't submit until you delete one of the articles you already have")
              this.setState({
                viewForm:true
                //Allowing multiple articles for testing
              })
              //console.log("Can User Submit an Article? : " + this.state.viewForm)
            }else{
              this.setState({
                viewForm:true
              })
            }
          return null;
          }); 
        //... if they haven't then don't do anything.
        }else{
          console.log("Not Logged In")
        }
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





    handleSubmit(e){

     
      console.log("SUBMIT!!!");      
      e.preventDefault();


      // console.log("Author is :" + this.state.author)
      // const currentAuthor = this.state.author;


      const currentText = this.state.text;
      const currentTitle = this.state.title;
      
      console.log("Test Thing:: " + this.state.title)
      console.log("New Article Text: " + currentText)
      
      //alert ("Can User Submit New Articles? : " + this.state.viewForm)
      if(currentTitle.length === 0 ||currentText.length  === 0){
        // console.log("Can't submit")
        //alert("Error!! Title or Text boxes cannot be empty")
      }else if(this.state.viewForm === false){
        //console.log("Cannot submit. Please remove or edit your existing post.")
        //alert("User cannot have more than 1 article at a time. Please remove or edit your existing post.")
      }else{
        console.log("Can submit")    
        
        
        const article = {
          // User Input here...
          text: this.state.text,
          title: this.state.title,
          
          // Auto Generated Stuff here...
          author: this.state.user.displayName,
          dislikes: 0,
          email: this.state.user.email,
          id: (((this.state.articlesArray).length) * 3 ),
          likes: 0,
          postdate: this.state.postdate
         
        }
  
        const dbRef = fire.database().ref('items');
        const ObjectsInDbCount = (((this.state.articlesArray).length) + 1);
        dbRef.child(ObjectsInDbCount).set(article);
        // dbRef.push(article)  
  
        this.setState({
          author: '',
          email: '',
          text: '',
          title: '',
          redirectToReferrer: true
          // id: ''
        })
      } 

      /// THis was inside the loop as seen above but is no longer working unless removed from the if statement
      // This is the priority.

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
      auth.signOut().then(() => {this.setState({user:null});
     })
    }


    handleDelete(key){
      const itemRef = fire.database().ref(`/items/${key}`);
      itemRef.remove()
    }

    handleChange(){

      //const itemRef = fire.database().ref(`/items/${key}`);

      console.log("Change")
     



    }
   


    render(){
      // <RedirectOnSubmit 
      //   redirectToReferrer={this.state.redirectToReferrer} 
      //   articlesArray={this.state.articlesArray} />

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


    

      const existingArticle = this.state.articlesArray;
      const testthing = existingArticle.map((value,key) => {
        if(this.state.user && value.email === this.state.user.email){
          return (
            <div key={key}>
              <ul key={key} id={key}>
                <li>Article Title: {value.title}</li>
                <li>Post Date: {value.postdate}</li>
                <li>Likes: {value.likes}</li>
                <li>dislikes: {value.dislikes}</li>
                <li>Key: {value.key}</li>
                <li>Id: {value.id}</li>
                <li>Content: {value.text}</li>

              </ul>
              
              <button onClick={() => this.handleDelete(value.key)}>Delete</button>
              
              
            </div>

          );
        }else{
          return null;
        }
        

      })
        return(
         
          
        /* 
           <FormView 
            user={this.state.user}
            // displayName={this.state.user.displayName}
            // email={this.state.user.email}
            title={this.state.title}
            article={this.state.article}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            login={this.login}
            logout={this.logout}
            test1={testthing}
            viewForm={this.state.viewForm}
            

            newText={this.state.text}
            
          
          />
          */
<div className='form' onChange={this.state.handleChange}>

{/* Login */}

{this.state.user ?
    <button onClick={this.logout}>Log Out</button>
    :
    <button onClick={this.login}>Login</button>
}


{/* Logged In View */}

{this.state.user ?


<div className='uploadArticle' onChange={this.handleChange}>

    <h1>Logged in View</h1>
    <p>Hello, {this.state.user.displayName}</p>
    {this.state.test2}
    
    
    

    {
        this.state.viewForm ?
        <div>
            <h1>New Article</h1>
            
                <form name="myForm" onSubmit={this.state.onSubmit}  >
                    <p>Title</p>
                    <input                    
                        form="myForm"
                        type="text"
                        name="title"
                        onChange={this.state.handleChange}                   
                        required
                        defaultValue={this.state.title}>
                    </input>

                    <p>Text</p>
                    <textarea
                        form="myForm"
                        type="text"
                        name="text"
                        onChange={this.state.handleChange}
                        required
                        rows="10"
                        value={this.state.article}
                    ></textarea>    

                        
                    <button>Upload</button>                
                </form>
        </div>
       
       
        :
        <div>
            <h1>Upload</h1>
            <p>You have the maximum number (1) of articles on the website. Please delete or edit your existing article.</p>
        </div>
        
       
    }
    <h1>Current Articles</h1>
    {testthing}



        




    


</div>
:
// Logged Out View
<div>
    <h1>Logged Out View</h1>
</div>
}


</div>
          

        
         
          
        )
        
    }
}

export default PracticeForm;

// const RedirectOnSubmit = (this.state) => {
//   const redirectToReferrer = this.state.redirectToReferrer;
//   if (redirectToReferrer === true) {
//       return (
//         <Switch>
//           <Redirect 
//               to={"/articles/news-page/" + ((this.state.articlesArray).length) }
//             />          
//         </Switch>)
//   }
// };

// const GeneratePostDate = () => {
//   const today = new Date();
//   const day = today.getDate();
//   const month = today.getMonth() + 1;
//   const year = today.getFullYear();

//   // if(day < 10){
//   //   day = '0' + day
//   // }
//   // if(month < 10){
//   //   month = '0' + month
//   // }
//   const postDate = day + "/" + month + "/" + year;
//   return postDate;
// }