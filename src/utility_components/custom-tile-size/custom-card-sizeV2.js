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
        var arrayThing = [width,height]
        console.log(arrayThing)
        localStorage.clear("myData");

        // localStorage.setItem("myData", width,height);
        localStorage.setItem("myData", JSON.stringify(arrayThing));
        console.log(JSON.parse(localStorage.getItem("myData")));
        
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
                        <button  onClick={() => this.changeCardSize("470px","120px")}>
                            <span className="small-btn">Compact <br />
                                <span class="material-icons">stop</span>
                            </span>
                           
                        </button>

                        <button  onClick={() => this.changeCardSize("225px","225px")}>
                            <span className="medium-btn" >Different Compact <br />
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                            </span>
                        </button>
                        <button  onClick={() => this.changeCardSize("260px","400px")}>
                            <span className="medium-btn" >Standard <br />
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                            </span>
                        </button>
                        <button  onClick={() => this.changeCardSize("260px","73vh")}>
                            <span className="medium-btn" >Long <br />
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                            </span>
                        </button>
                        <button  onClick={() => this.changeCardSize("470px","800px")}>
                            <span className="medium-btn" >Thick <br />
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                            </span>
                        </button>
                        <button  onClick={() => this.changeCardSize("520px","520px")}>
                            <span className="medium-btn" >Big Squares <br />
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                                <span class="material-icons">stop</span>
                            </span>
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