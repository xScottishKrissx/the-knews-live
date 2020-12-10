import React from 'react';

import '../custom-tile-size/custom-card-size.css';

class CustomCardSize extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentStyle:"",
            switch:0,
            size: "",
            style:{
                bottom:""
            },
            showCardSizeOptionsPosition: false,
        }
        this.changeCardSize = this.changeCardSize.bind(this);
        this.showCardSizeOptions = this.showCardSizeOptions.bind(this);  
    }
    componentDidMount(){
        console.log(this.state.showCardSizeOptionsPosition)
        if(this.state.showCardSizeOptionsPosition === true || "true"){
            this.setState({ style:{bottom:"0%"},})
        }else{
            this.setState({ style:{bottom:"-13%"},})
        }
    }
    changeCardSize(size){
        // console.log(size)
        localStorage.clear("myData");
        localStorage.setItem("myData", size);
        localStorage.getItem("myData")
        // console.log(localStorage.getItem("myData"));
        this.props.getCardSizeToParent(size);
    }

    showCardSizeOptions(){
        console.log(this.state.showCardSizeOptionsPosition)

       if(this.state.showCardSizeOptionsPosition === true ){
            console.log("Hide Options")
            this.setState({
                style:{bottom:"-13%"},
                showCardSizeOptionsPosition: false
            })
            console.log("Should be False --> " + this.state.showCardSizeOptionsPosition)
            
       }else{
            console.log("Show Options")
            this.setState({ 
                style:{ bottom:"0%"},
                showCardSizeOptionsPosition: true
             })
             console.log("Should be True --> " + this.state.showCardSizeOptionsPosition)
            
       }
    //    localStorage.setItem("cardSizeOptionsVisible", this.state.showCardSizeOptionsPosition);
    }

    render(){
        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                <div className="tileSizeControls" >
                <h3 onClick={()=> this.showCardSizeOptions()}>Card Size</h3>
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