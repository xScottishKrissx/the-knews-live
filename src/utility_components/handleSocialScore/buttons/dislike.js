import React from 'react';

export class Dislike extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <button >
                <span className="large material-icons">thumb_down</span>
            </button>       
        )
    }
}

export default Dislike;