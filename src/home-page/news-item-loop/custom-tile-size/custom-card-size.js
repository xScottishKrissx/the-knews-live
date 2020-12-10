import React from 'react';

import '../custom-tile-size/custom-card-size.css';

class CustomCardSize extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentStyle:"",
            switch:0,
            size: ""
        }
        this.changeCardSize = this.changeCardSize.bind(this); 
    }

    changeCardSize(size){
        // console.log(size)
        localStorage.clear("myData");
        localStorage.setItem("myData", size);
        localStorage.getItem("myData")
        // console.log(localStorage.getItem("myData"));
        this.props.getCardSizeToParent(size);
    }

    render(){
        return(            
            <div className="cardControlSizeWrapper">
                <div className="tileSizeControls" >
                <h3>Card Size</h3>
                    <span className="controlBtns">
                        <button onClick={() => this.changeCardSize("10rem")}>S</button>
                        <button onClick={() => this.changeCardSize("260px")}>M</button>
                        <button onClick={() => this.changeCardSize("50rem")}>L</button>                      
                    </span>   
                </div>
            </div>
        )
    }
}

export default CustomCardSize;