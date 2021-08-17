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

    changeCardSize(width,height,cardStyleChoice){
        var arrayThing = [width,height]
        localStorage.removeItem("myData");

        localStorage.setItem("myData", JSON.stringify(arrayThing));
        localStorage.getItem("myData")

        localStorage.setItem("cardStyleChoice", cardStyleChoice);

        if(this.props.getCardSizeToParent)this.props.getCardSizeToParent(width,height);

    }

    changePageLayout(param1,param2){
        var array = [param1,param2]
        localStorage.setItem("pageLayout",JSON.stringify(array))
        if(this.props.updatePageLayout)this.props.updatePageLayout(param1,param2)
    }



    render(){

        const pageLayout1 = "Single Column"
        const pageLayout2 = "Freeform"

        const size1 = "Compact"
        const size2 = "Different Compact"
        const size3 = "Standard"
        const size4 = "Long"
        const size5 = "Thick"
        const size6 = "Big Squares"

        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                <span>----- Page Layout</span>
                <button  onClick={() => this.changePageLayout("column","0 auto",pageLayout1)}>
                    <span class="material-icons">view_list</span>
                    {pageLayout1}
                </button>

                <button  onClick={() => this.changePageLayout("row","0 auto",pageLayout2)}>
                    <span class="material-icons">view_list</span>
                    {pageLayout2}
                </button>

                <span>----- Card Style</span>
                <button  onClick={() => this.changeCardSize("470px","135px",size1)}>
                    <span class="material-icons">view_list</span>
                    {size1}
                </button>

                <button  onClick={() => this.changeCardSize("225px","225px",size2)}>
                    <span class="material-icons">view_list</span>
                    {size2}
                </button>
                
                <button  onClick={() => this.changeCardSize("260px","400px",size3)}>
                    <span class="material-icons">view_list</span>
                    {size3}
                </button>
                
                <button  onClick={() => this.changeCardSize("260px","73vh",size4)}>
                    <span class="material-icons">view_list</span>
                    {size4}
                </button>
                
                <button  onClick={() => this.changeCardSize("470px","800px",size5)}>
                    <span class="material-icons">view_list</span>
                    {size5}
                </button>
                
                <button  onClick={() => this.changeCardSize("520px","520px",size6)}>
                    <span class="material-icons">view_list</span>
                    {size6}
                </button>
            </div>
        )
    }
}

export default CustomCardSize;