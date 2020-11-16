import React from 'react';
import '../utility_components/darkmodetoggle.css';

export class DarkModeToggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toggle:localStorage.getItem("DarkMode")
            // toggle: 1
        }
        // this.toggleDarkMode = this.toggleDarkMode.bind(this);
    }

    toggleDarkMode(){
        
        if(this.state.toggle === "Dark Mode Off"){
            this.setState({    toggle:"Dark Mode On"    })
            localStorage.setItem("DarkMode","Dark Mode On")
            document.getElementById("header").style.backgroundColor = "#252427";

        }   
        else{
            this.setState({   toggle:"Dark Mode Off"  })
            localStorage.setItem("DarkMode","Dark Mode Off")
            document.getElementById("header").style.backgroundColor = "white";
        }

        // console.log(this.state.toggle)
    }

    componentDidMount(){
        // localStorage.clear();
        console.log(this.state.toggle)
        if(localStorage.getItem("DarkMode") === "Dark Mode On" || null){
            document.getElementById("header").style.backgroundColor = "#252427";
        }
    }

    render(){

        
        return (
            <div onClick={() => this.toggleDarkMode()} className="dark-mode-toggle-wrapper">
                {this.state.toggle === "Dark Mode On" ?
                    // On
                    <p className="large material-icons light-on">wb_incandescent</p>
                    :
                    // Off
                    <p className="large material-icons light-off">wb_incandescent</p>
                } 
                
                
            </div>
        )
    }
}



export default DarkModeToggle;