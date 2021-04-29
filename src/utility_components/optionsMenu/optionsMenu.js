import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import "../optionsMenu/optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            optionsMenuOpen:false
        }
    }
    componentDidMount(){
        console.log( localStorage.getItem("filterOption"))
    }
    toggleMenu(){
        console.log("Toggle Menu")

        if(this.state.optionsMenuOpen === false){
            document.getElementById("optionsMenuPopup" ).style.visibility = "visible"; 
            document.getElementById("optionsMenuIcon" ).classList.add('animateIcon')

            document.getElementById("optionsMenuPopup" ).classList.add('animateMenuPopup')
            this.setState({optionsMenuOpen:true})
        }else{
            document.getElementById("optionsMenuPopup" ).style.visibility = "hidden"; 
            document.getElementById("optionsMenuIcon" ).classList.remove('animateIcon')
            this.setState({optionsMenuOpen:false})            
        }
    }

    clearCache(removeFromCache){
        console.log("Clear Cache" + " " + removeFromCache)
        if(removeFromCache.includes("clearCache"))localStorage.clear();
        if(removeFromCache.includes("unhideArticles")){
            localStorage.removeItem("changedFullDatabaseCall")
            localStorage.removeItem("cleanDatabaseCall")
            localStorage.removeItem("editedArticleArray")
            localStorage.removeItem("editedLeftoverArticlesArray")
            window.location.reload();
        }

        if(removeFromCache.includes("resetCardSize")){
            console.log("Reset Card Size")
            console.log( localStorage.getItem("filterOption"))
            localStorage.removeItem("myData")
            var arrayThing = ["260px","400px"]
            localStorage.setItem("myData", JSON.stringify(arrayThing));
            
            // window.location.reload();
        }
    }
    render(){
        console.log( localStorage.getItem("filterOption"))
        // console.log(JSON.parse(localStorage.getItem("cleanDatabaseCall")))

        return (
            <div id="optionsMenuWrapper">
                
                 <span onClick={()=> this.toggleMenu()} id="optionsMenuIcon" className="material-icons">settings</span>
                <div id="optionsMenuPopup">
                    <div>
                        
                        <span>
                            <p>Full Website Reset</p>
                            <Link to='/' onClick={()=> this.clearCache("clearCache")}>
                                <button>Confirm</button>
                            </Link>
                        </span>


                        <span>
                            <p>Unhide Articles </p>
                            <button onClick={()=>this.clearCache("unhideArticles")}>Confirm</button>
                        </span>

                        <span >
                            <p>Reset Card Size </p> 
                            <Link to='/' onClick={()=> this.clearCache("resetCardSize")}>
                                    <button>Confirm</button>
                            </Link>
                            
                           
                        </span>
                        

                      </div>
                </div>
            </div>
        )
    }
}

export default OptionsMenu;