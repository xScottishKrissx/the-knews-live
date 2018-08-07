import React from 'react';
import fire, {auth, provider} from '../fire.js'

export class Form extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        author: '',
        articleTitle:'',
        articlesArray:[],
        user: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
    logout(){
      auth.signOut()
      .then(() =>{
        this.setState({
          user: null
        });
      });
  }

    login(){
        auth.signInWithPopup(provider)
          .then((result) => {
            const user = result.user;
            this.setState({
              user
            });
          });
    }
    
    handleChange(e){
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleDelete(itemId){
      const itemRef = fire.database().ref(`/items/${itemId}`);
      itemRef.remove();
    }

    handleSubmit(e){
      e.preventDefault();
      const itemRef = fire.database().ref('items');
      const item = {
        author: this.state.user.displayName || this.state.user.email,
        articleTitle: this.state.articleTitle
      }
      itemRef.push(item);
      this.setState({
        author:'',
        articleTitle: ''
      });
    }

    componentDidMount(){
      const articleRef = fire.database().ref('items');
      articleRef.on('value', (snapshot) => {
        let articles = snapshot.val();
        let newState = [];
        for (let item in articles){
          newState.push({
            id: item,
            author: articles[item].author,
            articleTitle: articles[item].articleTitle
          });
        }
        this.setState({
          articlesArray: newState
        })
        console.log(this.state.articlesArray);
      })

      auth.onAuthStateChanged((user) => {
        if(user){
          this.setState({user});
        }
      })
    }

    render() {
      console.log(this.props.articleid)
      console.log(this.state.articlesArray);

      const firebaseDB = this.state.articlesArray;
        return (
            <div className="App">

                <h1>the Knews - Live</h1>

                {firebaseDB.map((test) => {
                  return(
                    <div className=''>
                      <p>{test.id}</p>
                      <p>{test.articleTitle}</p>
                      <p>{test.author}</p>
                    </div>
                  )
                })}

                {this.state.user ?

                
                  <button onClick={this.logout}>Log Out</button>
                  :
                  <button onClick={this.login}>Login</button>
                }
                {/* Logged In View */}
                {this.state.user ?
                  <div>
                    <div className='user-profile'>
                      <h4>Hello, {this.state.user.displayName || this.state.user.email}</h4>
                      <img src={this.state.user.photoURL} alt="form images"/>
                    </div>

                    <div className=''>
                      <form onSubmit={this.handleSubmit}>
                        Author:
                          <input type="text" name="author" placeholder="Author" onChange={this.handleChange} value={this.state.user.displayName || this.state.user.email}/>
                        Article Title:
                        <input type="text" name="articleTitle" placeholder="Article Title" onChange={this.handleChange} value={this.state.articleTitle}/>
                        <button>Uploads</button>                 
                      </form>
                    </div>


                    <div className=''>
                      Display Articles
                      
                      <ul>
                      {
                        this.state.articlesArray.map((item) => {
                            return(
                              <li key={item.id}>
                                <h3>{item.articleTitle}</h3>
                                <p>
                                  by {item.author}
                                  {item.author === this.state.user.displayName || item.author === this.state.user.email ?
                                  <button onClick={() => this.handleDelete(item.id)}>Delete</button> 
                                  :
                                  null
                                }
                                </p>
                                <button onClick={() => this.handleDelete(item.id)}>Delete</button>
                              </li>
                            )
                        })
                      }
                      </ul>
                    </div>
                  </div>

                  :
                  // Logged Out View
                    <div className=''>
                      <p>You must be logged in to see this content.</p>
                    </div>
                }
                
                {/* <form onSubmit={this.handleSubmit}>
                  <input type="text" name="author" placeholder="Author" onChange={this.handleChange} value={this.state.author}/>
                  <input type="text" name="articleTitle" placeholder="Article Title" onChange={this.handleChange} value={this.state.articleTitle}/>
                  <button>Uploads</button>
                  
                </form>

                <div className=''>
                  <ul>
                    {
                      this.state.articlesArray.map((item) => {
                          return(
                            <li key={item.id}>
                              <h3>{item.articleTitle}</h3>
                              <p>by {item.author}</p>
                              <button onClick={() => this.handleDelete(item.id)}>Delete</button>
                            </li>
                          )
                      })
                    }
                  </ul>
                </div> */}

            </div>
        );
    }
}




export default Form;