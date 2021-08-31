import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// Bookmarks
import clearAllBookmarks from '../bookmarks/clearAllBookmarks.js';
import hideAllArticles from '../bookmarks/hideAllArticles.js';
import unhideAllArticles from '../bookmarks/unhideAllArticles';

import "../optionsMenu/optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            optionsMenuOpen:false,
            fullDatabaseCall:[],
            bookmarks:[]
        }
    }

    clearCache(removeFromCache){
            // console.log("Clear Cache" + " " + removeFromCache)
            if(removeFromCache.includes("clearCache")){
                localStorage.clear()
                var arrayThing = ["260px","400px"]
                localStorage.setItem("myData", JSON.stringify(arrayThing));
            }
                
            if(removeFromCache.includes("unhideArticles")){
                unhideAllArticles();
                window.location.reload();
            }

            if(removeFromCache.includes("resetCardSize")){
                localStorage.removeItem("myData")
                var arrayThing = ["260px","400px"]
                localStorage.setItem("myData", JSON.stringify(arrayThing));
                window.location.reload();
            }

            if(removeFromCache.includes("removeBookmarks")){
                clearAllBookmarks(); }

        // this.toggleMenu()
        
    }

    clearBookmarks(){
        clearAllBookmarks();
        this.setState({bookmarks:[]})
    }

    hideAllArticles(){
        hideAllArticles();
        this.setState({bookmarks:[]})
    }
    render(){
        // console.log(this.props.urlInfo)

        return (
            <div id="optionsMenuWrapper">
                
                        <span className="menuBorder"></span>                        
                        {/* <span>
                            <p>Full Website Reset</p>
                            <Link to='/' onClick={()=> this.clearCache("clearCache")}><button>Confirm</button></Link>
                        </span>
                        
                        <span>
                            <p>Unhide Articles </p>
                            <Link to={this.props.urlInfo} onClick={()=> this.clearCache("unhideArticles")}><button>Confirm</button></Link>
                        </span>
                        
                        <span>
                            <p>Reset Card Size </p>
                            <Link to={this.props.urlInfo} onClick={()=> this.clearCache("resetCardSize")}><button>Confirm</button></Link>
                        </span>   

                        <span>
                            <p>Clear Bookmarks</p>
                            <Link to='/' onClick={()=> this.clearCache("removeBookmarks")}><button>Confirm</button></Link>
                        </span>  */}
             
<React.Fragment >

<Accordion defaultActiveKey="0">
  
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
      Full Website Reset
      </Accordion.Toggle>
    </Card.Header>

    <Accordion.Collapse eventKey="1">
        <button ><span class="material-icons">done_all</span>Full Website Reset</button>
    </Accordion.Collapse>
  </Card>

  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="2">
      Bookmarks
      </Accordion.Toggle>
    </Card.Header>

    <Accordion.Collapse eventKey="2">
        <React.Fragment>
            <button ><span class="material-icons">done_all</span>Mark All As Bookmarked</button>
            <button ><span class="material-icons">done_all</span>Remove All Bookmarks</button>
        </React.Fragment>
    </Accordion.Collapse>
  </Card>

</Accordion>
        {/* <button ><span class="material-icons">done_all</span>Full Website Reset</button>
        -
        <button ><span class="material-icons">done_all</span>Mark All As Bookmarked</button>
        <button ><span class="material-icons">done_all</span>Remove All Bookmarks</button>
        -
        <button ><span class="material-icons">done_all</span>Hide All Cards</button>
        <button ><span class="material-icons">done_all</span>Unhide All Cards</button>
        <button ><span class="material-icons">done_all</span>Hide Mark as Read only</button>
        -
        <button ><span class="material-icons">done_all</span>Mark All Read</button>
        <button ><span class="material-icons">done_all</span>Mark All Unread</button>        
        -
        <button ><span class="material-icons">done_all</span>Sort By Author</button>
        <button ><span class="material-icons">done_all</span>Sort By Date</button>
        <button ><span class="material-icons">done_all</span>Sort By Tag</button> */}

                            </React.Fragment>

                        
            </div>
        )
    }
}

export default OptionsMenu;