import React from 'react';

import './custom-card-sizeV2.css';

class CustomCardSize extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // Card Size Logic
            currentStyle:"",
            size: "",

            // Card Size Option Menu
            style:{bottom:""},
            cardSizeOptionMenu: "",
        }
        this.changeCardSize = this.changeCardSize.bind(this);
    }
    componentDidMount(){

        // this.setState({style:{bottom: localStorage.getItem("cardStyleSetting") } })
        // if(this.state.cardSizeOptionMenu === ""){
        //     this.setState({cardSizeOptionMenu: localStorage.getItem("savedCardOptionsPosition")  })
        // }
    }

    changeCardSize(width,height){
        var arrayThing = [width,height]
        localStorage.removeItem("myData");

        localStorage.setItem("myData", JSON.stringify(arrayThing));
        localStorage.getItem("myData")
        this.props.getCardSizeToParent(width,height);

    }



    render(){

        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                <button  onClick={() => this.changeCardSize("470px","135px")}>Compact</button>
                <button  onClick={() => this.changeCardSize("225px","225px")}>Different Compact</button>
                <button  onClick={() => this.changeCardSize("260px","400px")}>Standard</button>
                <button  onClick={() => this.changeCardSize("260px","73vh")}>Long</button>
                <button  onClick={() => this.changeCardSize("470px","800px")}>Thick</button>
                <button  onClick={() => this.changeCardSize("520px","520px")}>Big Squares</button>
            </div>
        )
    }
}

export default CustomCardSize;