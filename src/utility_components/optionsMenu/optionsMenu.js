import React,{Component} from 'react';

import "../optionsMenu/optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            optionsMenuOpen:false
        }
    }

    toggleMenu(){
        console.log("Toggle Menu")

        if(this.state.optionsMenuOpen === false){
            document.getElementById("optionsMenuPopup" ).style.visibility = "visible"; 
            document.getElementById("optionsMenuIcon" ).classList.add('animateIcon')
            this.setState({optionsMenuOpen:true})
        }else{
            document.getElementById("optionsMenuPopup" ).style.visibility = "hidden"; 
            document.getElementById("optionsMenuIcon" ).classList.remove('animateIcon')
            this.setState({optionsMenuOpen:false})            
        }
    }
    render(){
        return (
            <div id="optionsMenuWrapper">
                
                 <span onClick={()=> this.toggleMenu()} id="optionsMenuIcon" className="material-icons">settings</span>
                <div id="optionsMenuPopup">
                    <div>
                        <ul>
                            <li>Option 1</li>
                            <li>Option 2</li>
                            <li>Option 3</li>
                        </ul>
                      </div>
                </div>
            </div>
        )
    }
}

export default OptionsMenu;