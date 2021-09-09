import React from 'react';
import fire from '../../../fire.js';
// import HandleKeyPress from '../../../utility_components/keybindings.js';

export class EditArticle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articleTitle: this.props.articleTitle,
            articleText: this.props.articleText, 
            articleID:this.props.articleID
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        console.log("handlEdit")

        const target = e.target;
        if(target.name === "title"){
            this.setState({articleTitle: e.target.value}); 
        }else{
            this.setState({articleText: e.target.value}); 
        }


       // this.setState({articleText: e.target.value}); 
        //this.setState({articleTitle: e.target.value});  
        console.log(this.state.articleText)
        console.log(this.state.articleTitle)

    //Following code stolen from the internet.
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
        const articleKey = this.state.articleID
        const itemRef = fire.database().ref(`/items/` + articleKey);
        itemRef.update({text: this.state.articleText, title: this.state.articleTitle})        

    }
    render(){

        const currentArticle = this.state.articleText;
        console.log(this.state.articleID)
        const testStyle = {
            maxHeight: '50vh',
            minHeight:'10vh',
            color: 'red'
        }
        return(
            <div>  
            <form onSubmit={this.handleSubmit} >
               {/* <input type="text-area" value={currentArticle} onChange={this.handleChange}/> */}
               <input name="title" type="text" defaultValue={this.state.articleTitle} onChange={this.handleChange}/>
               <textarea name="content" style={testStyle} type="text-area" defaultValue={currentArticle} onChange={this.handleChange} />
               <input type="submit" value="Submit" />
            </form>
        </div>   
        )
    }
}

/* {
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
}*/

/*{
export class EditArticle extends React.Component{
    render(){
        return(
            <form>
                <input type="text"></input>
            </form>
        )
        
    }
}
}*/

export default EditArticle;