import React from 'react';
import fire, {auth, provider} from '../fire.js'



export class PracticeForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            author: '',
            // articleID: '',
            // articleTitle: '',
            articlesArray: [],
        }
    }   


    componentDidMount(){
        // When it comes to It I can use the key instead of Id but for this stage ID is just easier for me to lay around with.
        console.log(this.props);
        console.log(this.props.match.params.id);

        
        const dave = Number(this.props.match.params.id);
        const newDave = 123;
        const articleRef = fire.database().ref('articles').orderByChild("id").equalTo(dave);


        console.log(newDave);


        articleRef.on('value', (snapshot) => {
          let articles = snapshot.val();
          let newState = [];
          for (let item in articles){
            newState.push({
              // id: item,
              // articleID: articles[item].id,
              author: articles[item].author,
              // articleTitle: articles[item].articleTitle
            });
          }
          this.setState({
            articlesArray: newState
          })
          console.log(this.state.articlesArray);
        })
  
      }

    render(){
        const firebaseDB = this.state.articlesArray;
        return(
            <div className=''>

                {firebaseDB.map((test) => {
                  return(
                    <div className=''>
                      {/* <p>{test.id}</p> */}
                      {/* <p>{test.articleTitle}</p> */}
                      {/* <p>{test.articleID}</p> */}
                      <p>{test.author}</p>
                    </div>
                  )
                })}

            </div>
        )
    }
}

export default PracticeForm;