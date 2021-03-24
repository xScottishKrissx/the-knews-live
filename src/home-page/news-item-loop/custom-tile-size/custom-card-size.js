import React from 'react';

import '../custom-tile-size/custom-card-size.css';

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
        this.showCardSizeOptions = this.showCardSizeOptions.bind(this);  
    }
    componentDidMount(){
        this.setState({style:{bottom: localStorage.getItem("cardStyleSetting") } })
        if(this.state.cardSizeOptionMenu === ""){
            this.setState({cardSizeOptionMenu: localStorage.getItem("savedCardOptionsPosition")  })
        }
    }

    changeCardSize(size){
        localStorage.clear("myData");
        localStorage.setItem("myData", size);
        localStorage.getItem("myData")
        this.props.getCardSizeToParent(size);
        console.log(localStorage.getItem("myData"));
    }

    showCardSizeOptions(style){
        
        if(this.state.cardSizeOptionMenu === "hideOptions"){
            this.setState({cardSizeOptionMenu:"showOptions"})
            localStorage.setItem("cardStyleSetting", style);
            localStorage.setItem("savedCardOptionsPosition", "showOptions");
            this.setState({style:{bottom:style}})
        }else{
            this.setState({cardSizeOptionMenu:"hideOptions"})
            localStorage.setItem("cardStyleSetting", style);
            localStorage.setItem("savedCardOptionsPosition", "hideOptions");
            this.setState({style:{bottom:style}})
        }
    }

    render(){
        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                {/* <div className="tileSizeControls" >

                {this.state.cardSizeOptionMenu === "hideOptions" ? 
                     <div onClick={()=> this.showCardSizeOptions("0%")}>
                         <p className="large material-icons">arrow_drop_up</p>
                     </div>
                     :
                     <div onClick={()=> this.showCardSizeOptions("-10rem")}> 
                     <p className="large material-icons">arrow_drop_down</p>Card Size
                     </div>    
                }
                
                    <span className="controlBtns">
                        <button  onClick={() => this.changeCardSize("10rem")}>
                            <span className="small-btn">S</span>
                        </button>

                        <button  onClick={() => this.changeCardSize("260px")}>
                            <span className="medium-btn" >M</span>
                        </button>
                        
                        <button  onClick={() => this.changeCardSize("50rem")}>
                            <span className="large-btn" >L</span>
                        </button>                      
                    </span>   
                </div> */}
            </div>
        )
    }
}

export default CustomCardSize;