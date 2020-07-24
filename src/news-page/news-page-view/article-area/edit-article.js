import React from 'react';
import fire, {auth, provider} from '../../../fire.js';

export class EditArticle extends React.Component{
    constructor(props){
        super(props);
        this.state = {articleText: this.props.articleText}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        console.log("handlEdit")
        this.setState({articleText: e.target.value});   
        console.log(this.state.articleText)
    }

    handleSubmit(e){
        console.log("New Text to be submitted:" + this.state.articleText);
        e.preventDefault();
        const dbRef = fire.database().ref('items');
        const itemRef = fire.database().ref(`/items/101`);
        itemRef.update({text: this.state.articleText})
    }
    render(){

        const value = this.state.value;
        const currentArticle = this.state.articleText;
        return(
            <div>  
            
            <form onSubmit={this.handleSubmit}>
               <input type="text" value={currentArticle} onChange={this.handleChange}/>
               <input type="submit" value="Submit" />
            </form>
        </div>   
        )
    }
}

{/*
const EditArticle = (value) => {


    return(
        
{
     <div>
         <p>{value.thing}</p>

         <form>
            <input value={value.thing} onChange={this.handleChange}/>
         </form>
     </div>   
    )
}
*/}

{/*
export class EditArticle extends React.Component{
    render(){
        return(
            <form>
                <input type="text"></input>
            </form>
        )
        
    }
}
*/}

export default EditArticle;