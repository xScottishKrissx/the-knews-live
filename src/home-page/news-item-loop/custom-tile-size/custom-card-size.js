import React from 'react';

class CustomCardSize extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentStyle:"",
        }
        this.setting1 = this.setting1.bind(this);
        this.setting2 = this.setting2.bind(this);
        this.setting3 = this.setting3.bind(this); 
    
    }


    setting1(e){
        e.preventDefault();
        // console.log("Setting 1 Clicked");
        this.setState({currentStyle:{width:"10rem" }})
        const temp = "10rem"
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));
        this.props.sendData("hello")

        

    }
    setting2(e){
        e.preventDefault();
        // console.log("Setting 2 Clicked");
        this.setState({currentStyle:{width:"400px" }})
        const temp = "260px"
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));

    }
    setting3(e){
        e.preventDefault();
        // console.log("Setting 3 Clicked");
        this.setState({currentStyle:{width:"50rem" }})
        const temp = "50rem"
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));
    }

    handleTileSize(){
        const style = this.state.currentStyle;
        this.props.onSelectStyle(style)
    }
    demoMethod(){
        this.props.sendData("hello")
    }

    render(){
        return(
            <div>
                {/* <div> 
                   
                    <button onClick={()=> this.flipSwitch()}>Flip</button>
                    this.state.switch === 1 ? 
                        <p>On</p>
                        :    
                        <p>Off</p>
                    
                </div> */}


                <div className="tileSizeControls" >
                    <h2>Amazing Final Production Version Custom Controls V1337</h2> 
                    <span className="controlBtns">
                        <button onClick={() => this.setting1()}>S</button>
                        <button onClick={this.setting2}>M</button>
                        <button onClick={this.setting3}>L</button>
                    </span>   
                </div>
            </div>
        )
    }
}



export default CustomCardSize;