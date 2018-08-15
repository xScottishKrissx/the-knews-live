import React from 'react';
import fire, {auth, provider} from '../fire.js'

import './form.css';


export class PracticeForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            author: '',
            // articleID: '',
            title: '',
            id: '',
            articlesArray: [],
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

    handleChange(e){
      console.log("Change!!!")
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleSubmit(e){
      console.log("SUBMIT!!!");      
      e.preventDefault();

      const dbRef = fire.database().ref('items');
      const article = {
        author: this.state.author,
        articleTitle: this.state.title,
        id: (((this.state.articlesArray).length) * 3 )
      }


      const ObjectsInDbCount = (((this.state.articlesArray).length) + 1);
      dbRef.child(ObjectsInDbCount).set(article);


      this.setState({
        author: '',
        title: '',
        id: ''
      })
    }

    render(){
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

             <p>Title</p>
                <input
                    type="text"
                    name="articleTitle"
                    onChange={this.handleChange}                   
                    required
                    value={this.state.articleTitle}>
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

              <p>Article</p>
                <textarea
                  form="myForm"
                  type="text"
                  name="textarea"
                  onChange={this.handleChange}
                  required
                  rows="10"
                  >
                </textarea>
            



              <button>Upload</button>
            
            </form>
           
           </div>
          
          </div>
        )
    }
}

export default PracticeForm;