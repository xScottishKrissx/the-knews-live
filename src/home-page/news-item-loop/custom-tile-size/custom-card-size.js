import React from 'react';


import '../custom-tile-size/custom-card-size.css';

class CustomCardSize extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            currentStyle:"",
            switch:0
        }
        this.setting1 = this.setting1.bind(this);
        this.setting2 = this.setting2.bind(this);
        this.setting3 = this.setting3.bind(this); 
    
    }
    componentDidMount(){
        console.log(localStorage.getItem("myData"))
        
    }




    setting1(e){
        // console.log(localStorage.getItem("myData"))
        e.preventDefault();
        console.log("Setting 1 Clicked");
        this.setState({currentStyle:{width:"10rem" }})
        const temp = "10rem"
        localStorage.clear("myData");
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));

        this.props.getCardSizeToParent(temp);
        const temp2 = "small"
        this.props.toParent(temp2)

        console.log(localStorage.getItem("myData"))

        window.location.reload();
    }

    setting2(e){
        e.preventDefault();
        // console.log("Setting 2 Clicked");
        this.setState({currentStyle:{width:"400px" }})
        const temp = "260px"
        localStorage.clear("myData");
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));
        this.props.getCardSizeToParent(temp);

        this.props.toParent("medium")

        window.location.reload();
    }
    setting3(e){
        e.preventDefault();
        // console.log("Setting 3 Clicked");
        this.setState({currentStyle:{width:"50rem" }})
        const temp = "50rem"
        localStorage.clear("myData");
        localStorage.setItem("myData", temp);
        localStorage.getItem("myData")
        console.log(localStorage.getItem("myData"));
        this.props.getCardSizeToParent(temp);
        
        window.location.reload();
    }


    // flipSwitch(){
    //     if(this.state.switch === 0){
    //         this.setState({
    //             switch:1
    //         })
    //     }else{
    //         this.setState({
    //             switch:0
    //         })
    //     }
    //     console.log("Switch Flipped:: " + this.state.switch)
    // }

    render(){


        return(
            
            <div className="cardControlSizeWrapper">
                {/* <div> 
                   
                    <button onClick={()=> this.flipSwitch()}>Flip</button>
                    {
                    this.state.switch === 1 ? 
                        <p>On</p>
                        :    
                    <p>Off</p>
                    }                    
                </div> */}


                <div className="tileSizeControls" >
                    <h2>Amazing Final Production Version Custom Controls V1337</h2> 
                    <span className="controlBtns">
                        <button onClick={this.setting1}>S</button>
                        <button onClick={this.setting2}>M</button>
                        <button onClick={this.setting3}>L</button>
                    </span>   
                </div>
            </div>
        )
    }
}



export default CustomCardSize;