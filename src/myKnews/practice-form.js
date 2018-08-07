import React from 'react';
import fire, {auth, provider} from '../fire.js'



// {/* Goal 1 === Connect to and retrieve list from database. */}
        // Success - This was fairly simple, even if I don't quite get some of the code I am getting to grips with a lot of it.I managed to get a single record from the database which is a good start.
export class PracticeForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            author: '',
            articleID: '',
            articleTitle: '',
            articlesArray: [],
        }
    }   


    componentDidMount(){
        // When it comes to It I can use the key instead of Id but for this stage ID is just easier for me to lay around with.
        const articleRef = fire.database().ref('items').orderByChild("id").equalTo(0);
        articleRef.on('value', (snapshot) => {
          let articles = snapshot.val();
          let newState = [];
          for (let item in articles){
            newState.push({
              id: item,
              articleID: articles[item].id,
              author: articles[item].author,
              articleTitle: articles[item].articleTitle
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
                      <p>{test.id}</p>
                      <p>{test.articleTitle}</p>
                      <p>{test.articleID}</p>
                      <p>{test.author}</p>
                    </div>
                  )
                })}

            </div>
        )
    }
}

export default PracticeForm;