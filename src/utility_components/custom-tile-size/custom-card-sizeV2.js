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
        // console.log(JSON.parse(localStorage.getItem("cleanDatabaseCall")))
    }

    changeCardSize(size){
        // localStorage.clear("myData");
        // localStorage.setItem("myData", size);
        // localStorage.getItem("myData")
        // this.props.getCardSizeToParent(size);
        // console.log(localStorage.getItem("myData"));

        // console.log(JSON.parse(localStorage.getItem("cleanDatabaseCall")))
       console.log("Change Card Size")
       
    }



    render(){

        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                <div className="tileSizeControls" >
               
                    <span className="controlBtns">
                        <button  onClick={() => this.changeCardSize("compact")}>
                            <span className="small-btn">compact</span>
                        </button>

                        <button  onClick={() => this.changeCardSize("comfy")}>
                            <span className="medium-btn" >comfy</span>
                        </button>
                        
                        {/* <button id="cardControlsLargeBtn" onClick={() => this.changeCardSize("50rem")}>
                            <span className="large-btn" >L</span>
                        </button>   */}
                        
                   
                    
                    </span>   
                </div>
            </div>
        )
    }
}

export default CustomCardSize;