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

    changeCardSize(width,height){
        localStorage.clear("myData");
        localStorage.setItem("myData", width,height);
        localStorage.getItem("myData")
        this.props.getCardSizeToParent(width,height);
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
                        <button  onClick={() => this.changeCardSize("330px","150px")}>
                            <span className="small-btn">1</span>
                        </button>

                        <button  onClick={() => this.changeCardSize("auto","260px")}>
                            <span className="medium-btn" >2</span>
                        </button>
                        <button  onClick={() => this.changeCardSize("260px")}>
                            <span className="medium-btn" >3</span>
                        </button>
                        <button  onClick={() => this.changeCardSize("260px")}>
                            <span className="medium-btn" >4</span>
                        </button>
                        <button  onClick={() => this.changeCardSize("260px")}>
                            <span className="medium-btn" >5</span>
                        </button>
                        <button  onClick={() => this.changeCardSize("260px")}>
                            <span className="medium-btn" >6</span>
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