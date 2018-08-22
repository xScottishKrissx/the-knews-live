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
            viewForm: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        
    }   


    componentDidMount(){
      const dbRef = fire.database().ref("items");   
            
      dbRef.on('value', (snapshot) => {
        let dbObjects = snapshot.val();
        let tempState = [];
        for (let dbObject in dbObjects){
          tempState.push({
            author: dbObjects[dbObject].author,
            email:dbObjects[dbObject].email,
           
          })
        }
        this.setState({
          articlesArray: tempState
        })
        // console.log(((this.state.articlesArray).length) + 1)


        // Check if User is Logged In...
        const checkUser = fire.auth().currentUser;

        // If they Exist Check to see if they have already created article
        if(checkUser){
          console.log("Logged In")

        const checkDBRef = this.state.articlesArray;

        const currentUserEmail =  this.state.user.email;
        console.log(currentUserEmail);

        checkDBRef.map((test) => {

          if(test.email === this.state.user.email){
            
            // alert("You can only have one article at a time!!")
            console.log("You can't submit until you delete one of the articles you already have")
            this.setState({
              viewForm:false
            })
            console.log("Can User Submit an Article? : " + this.state.viewForm)



          }else{
             this.setState({
               viewForm:true
             })
          }
        return null;
        }        
      )

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

    handleChange(e){
      console.log("Change!!!")
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit(e){

      console.log("SUBMIT!!!");      
      e.preventDefault();

      // console.log("Author is :" + this.state.author)
      // const currentAuthor = this.state.author;
      const currentText = this.state.text;
      const currentTitle = this.state.title;
      // const currentUser = this.state.user.email;

      alert ("Can User Submit New Articles? : " + this.state.viewForm)
      if(currentTitle.length === 0 ||currentText.length  === 0){
        // console.log("Can't submit")
        alert("Error!! Title or Text boxes cannot be empty")
      }else if(this.state.viewForm === false){
        console.log("Cannot submit. Please remove or edit your existing post.")
        alert("User cannot have more than 1 article at a time. Please remove or edit your existing post.")
      }else{
        console.log("Can submit")
        const dbRef = fire.database().ref('items');
        const article = {
          // User Input here...
          text:this.state.text,
          title: this.state.title,
          
          // Auto Generated Stuff here...
          author: this.state.user.displayName,
          dislikes: 0,
          email: this.state.user.email,
          id: (((this.state.articlesArray).length) * 3 ),
          likes: 0,
          postdate: "12/12/2012"   

        }
  
  
        const ObjectsInDbCount = (((this.state.articlesArray).length) + 1);
        dbRef.child(ObjectsInDbCount).set(article);
  
  
        this.setState({
          author: '',
          email: '',
          text: '',
          title: '',
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
      auth.signOut().then(() => {
        this.setState({
          user:null
        });
      })
    }

    testMethod(e){
      e.preventDefault()
      console.log("Test Method")
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
          
          />
        )
    }
}

export default PracticeForm;

// const RedirectOnSubmit = (props) => {
//   const redirectToReferrer = props.redirectToReferrer;
//   if (redirectToReferrer === true) {
//       return (
//         <Switch>
//           <Redirect 
//               to={"/articles/news-page/" + ((props.articlesArray).length) }
//             />          
//         </Switch>)
//   }
// };