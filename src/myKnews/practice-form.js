import React from 'react';
import {
  // Route
  Redirect, Switch} from 'react-router-dom';

import fire, {auth, provider} from '../fire.js'


import FormView from './form-view.js';

// import GetTodaysDate from '../utility_components/todaysDate.js';
// import HandleKeyPress from '../utility_components/keybindings.js';

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
            key:'',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
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
      //console.log("db-ref: " + dbRef);

           
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
        //console.log("Number of Records in DB:: " + ((this.state.articlesArray).length))
        //console.log("WIll Overwrite Record:: " + ((this.state.articlesArray).length) + 1)


        // Check if User is Logged In...
        const checkUser = fire.auth().currentUser;

        // If they Exist Check to see if they have already created article
        if(checkUser){
          
          const checkDBRef = this.state.articlesArray;
          const currentUserEmail =  this.state.user.email;
          console.log("Logged In as::" + currentUserEmail);
          

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
      //e.preventDefault();


      // console.log("Author is :" + this.state.author)
      // const currentAuthor = this.state.author;


      const currentText = this.state.text;
      const currentTitle = this.state.title;
      
      // console.log("Test Thing:: " + this.state.title)
      // console.log("New Article Text: " + currentText)
      
      //alert ("Can User Submit New Articles? : " + this.state.viewForm)
      if(currentTitle.length === 0 ||currentText.length  === 0){
        // console.log("Can't submit")
        alert("Error!! Title or Text boxes cannot be empty")
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


        //I think this is causing the issue of database overwriting, I can hardcode a record and it solves the problem.
        //Yeah, this is it, im looking for the total number of records and then adding 1
        //This would be fine if you couldnt delete records, but when you can then you end up breaking down.
        // const ObjectsInDbCount = (((this.state.articlesArray).length) + 1);
        //alert("Objectsindbcount::" + ObjectsInDbCount)
        //const ObjectsInDbCount = 99;



        //dbRef.child(ObjectsInDbCount).set(article);
        
        //This might be a solution but I'm not sure what the implication of this is for the rest of the project.
        // It adds a new record to the database with a firebase generated key.
        // I need to see how I can use this key for my needs.
        dbRef.push(article)  
  
        this.setState({
          author: '',
          email: '',
          text: '',
          title: '',
          articlesArray: [],
          redirectToReferrer: true
          // id: ''
        })
      } 


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

    handleChange(e){
      const target = e.target;
      if(target.name === "title"){
          this.setState({title: e.target.value}); 
      }else{
          this.setState({text: e.target.value}); 
      }
      //console.log(this.state.title);
    }

    handleKeyPress(e){
      if(e.ctrlKey && e.key === 'Enter'){
        console.log("Control and Enter")
        this.handleSubmit();
      }
    }
   


    render(){
      // <RedirectOnSubmit 
      //   redirectToReferrer={this.state.redirectToReferrer} 
      //   articlesArray={this.state.articlesArray} />

      // console.log(this.state.redirectToReferrer)
      const redirectToReferrer = this.state.redirectToReferrer;
      //console.log("Redirect to:: " + fire.database().ref('items').limitToLast(1))
      if (redirectToReferrer === true) {
          return (
            <Switch>
              <Redirect 
                 //to={"/articles/news-page/" + ((this.state.articlesArray).length) }
                 //A stop gap solution to the issue of working with firebase generated keys.
                 to={"/" }
                />          
            </Switch>)
      }
    
    
      const existingArticle = this.state.articlesArray;
      const currentArticleView = existingArticle.map((value,key) => {
        if(this.state.user && value.email === this.state.user.email){
          return (
            
            <div key={key}>
              <ul key={key} id={key}>
                <li>Article Title: {value.title}</li>
                <li>Post Date: {value.postdate}</li>
                <li>Likes: {value.likes}</li>
                <li>Email: {value.email}</li>
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
                  
           <FormView 
            user={this.state.user}
            // displayName={this.state.user.displayName}
            // email={this.state.user.email}
            title={this.state.title}
            article={this.state.article}
            handleChange={this.handleChange}
            onSubmit={this.handleSubmit}
            login={this.login}
            logout={this.logout}
            test1={currentArticleView}
            viewForm={this.state.viewForm}           
            newText={this.state.text}   
            onKeyPress={this.handleKeyPress}  
           
   
          />
          
          

        
          
          
          

        
         
          
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