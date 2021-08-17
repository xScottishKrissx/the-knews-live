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

    changePageLayout(flexFlow,margin,pageLayout,maxWidth){
        var array = [flexFlow,margin,maxWidth]
        console.log(pageLayout)
        localStorage.setItem("pageLayout",JSON.stringify(array))
        if(this.props.updatePageLayout)this.props.updatePageLayout(flexFlow,margin,maxWidth)
    }



    render(){

        const pageLayout1 = "Freeform"
        const pageLayout2 = "Single Column"
        const pageLayout3 = "Dual Column"
        const pageLayout4 = "Triple Column"
        const pageLayout5 = "Quad Column"

        const size1 = "Compact"
        const size2 = "Different Compact"
        const size3 = "Standard"
        const size4 = "Long"
        const size5 = "Thick"
        const size6 = "Big Squares"

        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                <span>----- Page Layout</span>
                <button  onClick={() => this.changePageLayout("row","0 auto",pageLayout1)}>
                    <span class="material-icons">view_list</span>
                    {pageLayout1}
                </button>

                <button  onClick={() => this.changePageLayout("column","0 auto",pageLayout2)}>
                    <span class="material-icons">view_list</span>
                    {pageLayout2}
                </button>

                <button  onClick={() => this.changePageLayout("row","0 auto",pageLayout3,"600px")}>
                    <span class="material-icons">view_list</span>
                    {pageLayout3}
                </button>

                <button  onClick={() => this.changePageLayout("row","0 auto",pageLayout4,"800px")}>
                    <span class="material-icons">view_list</span>
                    {pageLayout4}
                </button>               
                
                 <button  onClick={() => this.changePageLayout("row","0 auto",pageLayout5,"1100px")}>
                    <span class="material-icons">view_list</span>
                    {pageLayout5}
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