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
        this.setState({style:{bottom: localStorage.getItem("cardStyleSetting") } })
        if(this.state.cardSizeOptionMenu === ""){
            this.setState({cardSizeOptionMenu: localStorage.getItem("savedCardOptionsPosition")  })
        }
        console.log(JSON.parse(localStorage.getItem("cleanDatabaseCall")))
    }

    changeCardSize(size){
        localStorage.clear("myData");
        localStorage.setItem("myData", size);
        localStorage.getItem("myData")
        this.props.getCardSizeToParent(size);
        console.log(localStorage.getItem("myData"));

        console.log(JSON.parse(localStorage.getItem("cleanDatabaseCall")))
    }



    render(){
        console.log(JSON.parse(localStorage.getItem("cleanDatabaseCall")))
        // var width = window.innerWidth || document.documentElement.clientWidth|| document.body.clientWidth;
        // var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        // console.log(width,height)
        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                <div className="tileSizeControls" >

                
                    <span className="controlBtns">
                        <button  onClick={() => this.changeCardSize("10rem")}>
                            <span className="small-btn">S</span>
                        </button>

                        <button  onClick={() => this.changeCardSize("260px")}>
                            <span className="medium-btn" >M</span>
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