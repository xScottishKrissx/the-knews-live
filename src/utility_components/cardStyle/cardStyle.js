import React from 'react';

import './cardStyle.css';

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


    changeCardSize(width,height,cardStyleChoice){
        const arrayThing = [width,height]
        localStorage.removeItem("savedCardStyle");

        localStorage.setItem("savedCardStyle", JSON.stringify(arrayThing));
        localStorage.getItem("savedCardStyle")

        localStorage.setItem("cardStyleChoice", cardStyleChoice);

        if(this.props.getCardSizeToParent)this.props.getCardSizeToParent(width,height);

    }

    render(){

        const size1 = "Slim"
        const size2 = "Compact"
        const size3 = "Standard"
        const size4 = "Long"
        const size5 = "Thick"
        const size6 = "Big Squares"

        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                <span className="menuBorder"></span>

                <button  onClick={() => this.changeCardSize("470px","135px",size1)}>                    <i class="bi bi-view-list"></i>
                    {size1}
                </button>

                <button  onClick={() => this.changeCardSize("225px","225px",size2)}>                    
                    <i class="bi bi-grid-3x2"></i>
                    {size2}
                </button>

                <button  onClick={() => this.changeCardSize("260px","400px",size3)}>                    
                    <i class="bi bi-grid-3x3"></i>
                    {size3}
                </button>

                
                <button  onClick={() => this.changeCardSize("260px","73vh",size4)}>                    
                    <i class="bi bi-grid-1x2"></i>
                    {size4}
                </button>
                
                <button  onClick={() => this.changeCardSize("470px","800px",size5)}>                    
                    <i class="bi bi-layout-split"></i>
                    {size5}
                </button>
                
                <button  onClick={() => this.changeCardSize("520px","520px",size6)}>                    
                    <i class="bi bi-grid"></i>
                    {size6}
                </button>
            </div>
        )
    }
}

export default CustomCardSize;