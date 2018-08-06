import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import fire from './fire.js'


class App extends Component {

    constructor(props){
      super(props);
      this.state = {
        author: '',
        articleTitle:'',
        articlesArray:[]
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
        author: this.state.author,
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
      })
    }

    render() {
        return (
            <div className="App">

                <h1>the Knews - Live</h1>
                
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="author" placeholder="Author" onChange={this.handleChange} value={this.state.author}/>
                  <input type="text" name="articleTitle" placeholder="Article Title" onChange={this.handleChange} value={this.state.articleTitle}/>
                  <button>Upload</button>
                  
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
                </div>

            </div>
        );
    }
}

export default App;
