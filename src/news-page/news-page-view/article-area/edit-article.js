import React from 'react';
import fire, {auth, provider} from '../../../fire.js';
import { Redirect } from 'react-router';

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

    //Following code stolen from various souces on the internet.
    e.target.style.height ='inherit';
    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + e.target.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${height}px`;
    

    }

    handleSubmit(e){
        console.log("New Text to be submitted:" + this.state.articleText);
        e.preventDefault();
        const dbRef = fire.database().ref('items');
        const itemRef = fire.database().ref(`/items/101`);
        itemRef.update({text: this.state.articleText})

        

    }
    render(){

        const currentArticle = this.state.articleText;
        const testStyle = {
            maxHeight: '50vh',
            minHeight:'10vh',
            color: 'red'
        }
        return(
            <div>  
            
            <form onSubmit={this.handleSubmit}>
               {/* <input type="text-area" value={currentArticle} onChange={this.handleChange}/> */}
               <textarea style={testStyle} type="text-area" value={currentArticle} onChange={this.handleChange}/>
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