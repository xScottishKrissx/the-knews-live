import React from 'react';

export class Like extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <button>
                <span className="large material-icons">thumb_up</span>
            </button>        
        )
    }
}

export default Like;