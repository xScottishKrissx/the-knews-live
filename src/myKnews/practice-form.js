import React from 'react';
import fire, {auth, provider} from '../fire.js'



export class PracticeForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            author: '',
            // articleID: '',
            articleTitle: '',
            id: '',
            articlesArray: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }   


    // componentDidMount(){
    //     // When it comes to It I can use the key instead of Id but for this stage ID is just easier for me to lay around with.
    //     // console.log(this.props);
    //     // console.log(this.props.match.params.id);

        
    //     const dave = Number(this.props.match.params.id);
    //     const newDave = 123;
    //     const articleRef = fire.database().ref('articles');

    //     console.log(newDave);


    //     articleRef.on('value', (snapshot) => {
    //       let articles = snapshot.val();
    //       let newState = [];
    //       for (let item in articles){
    //         newState.push({
    //           // id: item,
    //           // articleID: articles[item].id,
    //           author: articles[item].author,
    //           // articleTitle: articles[item].articleTitle
    //         });
    //       }
    //       this.setState({
    //         articlesArray: newState
    //       })
    //       console.log(this.state.articlesArray);
    //     })
  
    //   }


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
        articleTitle: this.state.articleTitle,
        id: this.state.id
      }
      // dbRef.push(article);
      dbRef.child(article.key).set("Custom2");
      this.setState({
        author: '',
        articleTitle: '',
        id: ''
      })
    }

    render(){
        // const firebaseDB = this.state.articlesArray;
        return(
          <div className=''>
           <h1>Upload</h1>

           <div className='uploadArticle'>
            
            <form onSubmit={this.handleSubmit}>
             <p> 
                Author: 
                <input
                  type="text"
                  name="author"
                  onChange={this.handleChange}
                  value={this.state.author}>
                </input>
             </p>

             <p>
                Title:
                <input
                  type="text"
                  name="articleTitle"
                  onChange={this.handleChange}
                  value={this.state.articleTitle}></input>
             </p>

             <p>
                Id:
                <input
                type="text"
                name="id"
                onChange={this.handleChange}
                value={this.state.id}></input>
             </p>


              <button>Upload</button>
            
            </form>
           
           </div>
          
          </div>
        )
    }
}

export default PracticeForm;