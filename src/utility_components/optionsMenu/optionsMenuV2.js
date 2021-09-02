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
            bookmarks:[],
            test:[]
        }
    }

    clearCache(removeFromCache){
            // console.log("Clear Cache" + " " + removeFromCache)
            if(removeFromCache.includes("clearCache")){
                console.log("Full Website Reset")
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

    markAllBookmarks(x){






        // console.log(this.props.currentCardArray)
        var currentCards = this.props.currentCardArray;        
        var localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))

        console.log(currentCards)
        console.log(localStorageCards)

        // Christ this actually worked.
        for (var i = 0; i < localStorageCards.length; i++) {

            for (var k = 0; k < currentCards.length; k++) {
              if (localStorageCards[i].id === currentCards[k].id) {
                localStorageCards[i].bookmarked = true;
                break;
              }

            }

          }
        console.log(localStorageCards)
        localStorage.setItem("bookmarkArray", JSON.stringify(localStorageCards))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(localStorageCards))























// Experiments

        // localStorageCards.map(x => {
        //     var result = currentCards.filter(a1 => a1.id === x.id)
        //     console.log(result)
        //     if(result){
        //         x.bookmarked === true
                
        //         // console.log(x)
        //     }
        //     return x;
        // })
        // console.log(localStorageCards)








        // var setBookmark = currentCards.map(el => {
        //     if(el != null && el.bookmarked === false )
        //             return Object.assign({}, el, {bookmarked:true})
        //             return el
        // });
        // console.log(setBookmark)
        // const setFullArray = localStorageCards.filter(obj => obj.read === false && obj.bookmarked === true)





        // var setBookmark = []
        // for(var i = 0; i<currentCards.length; i++){

        //     console.log(currentCards)
        // }

        // var result = localStorageCards.filter(o1 => {
        //     // filter out (!) items in result2
        //     return currentCards.some(function(o2){
        //         return o1.id === o2.id;          // assumes unique id
        //     });
        // })

        // console.log(result)

        // get Current Id
        // var currentCardIds = []
        // currentCards.forEach(e => currentCardIds.push(e.id))
        // console.log(currentCardIds)



        // var newArray = []
        // var setBookmark = []
        // console.log(localStorageCards)
        // for (let i = 0; i < currentCardIds.length; i++) {
        //     // console.log(i)
        //     // console.log(localStorageCards)
        //     console.log(currentCardIds[i])


            
        //     const found = localStorageCards.find(element => element.id === currentCardIds[i]);
        //     console.log(found);

        //     // var setBookmark = []
        //     setBookmark = localStorageCards.map(el => {
        //     if(el.id === currentCards[i].id && el != null )
        //         return Object.assign({}, el, {bookmarked:true})
        //         return el
        //     });   
        //     console.log(setBookmark)
        //     newArray.push(setBookmark)
        //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(newArray))
            

        //     const element = currentCardIds[i];

        // }
        // console.log(newArray)
        // console.log(setBookmark)























        



       var testArray = []
        // const testMap2 = currentCardIds.map ((x) => {
            // console.log(x)
            // console.log(localStorageCards)
            // for(var i = 0; i < localStorageCards.length; i++){
            //     if(localStorageCards[i].id === x){
            //         // console.log("Assign " + localStorageCards[i].id)                    
            //         // Good lord this might actually be it!!
            //         testArray.push(localStorageCards[0])
            //     }
            // }
        // })


        
        // console.log(testArray)







        // var setBookmark = []
        // setBookmark = currentCards.map(el => {
        // if(el != null )
        //     return Object.assign({}, el, {bookmarked:true,})
        //     return el
        // });   
        // console.log(setBookmark)
            









        // var setArray = []
        // for(var i = 0; i<currentCards.length; i++){
        //     console.log(currentCards[i].id)

        //     var setBookmark = []
        //     setBookmark = localStorageCards.map(el => {
        //     if(el.id === currentCards[i].id && el != null )
        //         return Object.assign({}, el, {bookmarked:true, hidden:false, markedforhide:false})
        //         return el
        //     });   

        //     console.log(setBookmark)
        //     console.log(i++)
        //     localStorage.setItem("bookmarkArray", JSON.stringify(setBookmark))
            
        // }
        // console.log(setArray)
















        // var removeUndefined = currentCards.filter(x=> x.id)
        // // console.log(removeUndefined)

        // let n = 0;
        // var setBookmarkTrue = []
        // var newArray = []
        // while (n < removeUndefined.length - 1 ){
        //     n++
        //     // console.log(removeUndefined[n].id)

        //     var filterCards = this.state.test || currentCards.filter(x=> x.hidden === false)

        //     setBookmarkTrue = filterCards.map(el => {
        //         if(el.id === removeUndefined[n].id && el != null )
        //             return Object.assign({}, el, {bookmarked:true, hidden:false, markedforhide:false})
        //             return el
        //     });   
           
        //     newArray.push(setBookmarkTrue)

        // }
        // console.log(newArray)
        // console.log(n)
        // console.log(this.state.test)
        // var filterCards = currentCards.filter(x=> x.hidden === false)

        // var setBookmark = filterCards.map(el => {
        //     if(el != null )
        //         return Object.assign({}, el, {bookmarked:x, hidden:false, markedforhide:false})
        //         return el
        // });   

        // const localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        // console.log(localStorageCards)
        // console.log(setBookmarkTrue)
        // localStorage.setItem("bookmarkArray", JSON.stringify(setBookmark))
        // localStorage.setItem("changedFullDatabaseCall", JSON.stringify(setBookmark))
    }
    render(){
        // console.log(this.props.urlInfo)

        return (
            <div id="optionsMenuWrapper">
                
                        <span className="menuBorder"></span>                        
                        {/* <span>
                            <p>Full Website Reset</p>
                            <Link to='/' onClick={()=> this.clearCache("clearCache")}><span>Confirm</span></Link>
                        </span>
                        
                        <span>
                            <p>Unhide Articles </p>
                            <Link to={this.props.urlInfo} onClick={()=> this.clearCache("unhideArticles")}><span>Confirm</span></Link>
                        </span>
                        
                        <span>
                            <p>Reset Card Size </p>
                            <Link to={this.props.urlInfo} onClick={()=> this.clearCache("resetCardSize")}><span>Confirm</span></Link>
                        </span>   

                        <span>
                            <p>Clear Bookmarks</p>
                            <Link to='/' onClick={()=> this.clearCache("removeBookmarks")}><span>Confirm</span></Link>
                        </span>  */}
             
<React.Fragment >

<Accordion defaultActiveKey="0">
  
  {/******************* Full Website Reset */}
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" block>
                <i class="bi bi-caret-down"></i>Full Website Reset
            </Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey="1" className="accordionItems">
            <span>
                <Link to='/' onClick={()=> this.clearCache("clearCache")}>
                <i class="bi bi-caret-right-fill"></i>Full Website Reset
                </Link>
            </span>
            {/* <Link to='/' onClick={()=> this.clearCache("clearCache")}><span>Confirm</span></Link> */}
        </Accordion.Collapse>
    </Card>


{/******************* Bookmarks */}
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2"><i class="bi bi-caret-down"></i>Bookmarks</Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey="2" className="accordionItems" >
                <span onClick={()=> this.markAllBookmarks(true)}>
                    
                        <i class="bi bi-caret-right-fill"></i>Mark All As Bookmarked
                    
                </span>    
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="2" className="accordionItems">
                <span onClick={()=> this.markAllBookmarks(false)}>
                    <i class="bi bi-caret-right-fill"></i>Remove All Bookmarks
                </span>    
        </Accordion.Collapse>
    </Card>



{/******************* Hiding Cards */}
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3"><i class="bi bi-caret-down"></i>Hide Cards</Accordion.Toggle>
        </Card.Header>
        
        <Accordion.Collapse eventKey="3" className="accordionItems">
                <span><i class="bi bi-caret-right-fill"></i>Mark All As Bookmarked</span> 
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="3" className="accordionItems">
                <span ><i class="bi bi-caret-right-fill"></i>Remove All Bookmarks</span>
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="3" className="accordionItems"> 
                <span ><i class="bi bi-caret-right-fill"></i>Remove All Bookmarks</span>
        </Accordion.Collapse>
    </Card>


{/******************* Read Cards */}
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="4"><i class="bi bi-caret-down"></i>Read Cards</Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey="4" className="accordionItems">
            <span ><i class="bi bi-caret-right-fill"></i>Mark All As Read</span>
        </Accordion.Collapse>       
        <Accordion.Collapse eventKey="4" className="accordionItems">
                <span ><i class="bi bi-caret-right-fill"></i>Mark All Unread</span>
        </Accordion.Collapse>
    </Card> 

{/******************* Sorting */}
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="5"><i class="bi bi-caret-down"></i>Sort Cards</Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey="5" className="accordionItems">
                <span ><i class="bi bi-caret-right-fill"></i>Sort By Tag</span>
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="5" className="accordionItems">
                <span ><i class="bi bi-caret-right-fill"></i>Sort By Author</span>
        </Accordion.Collapse>
    </Card>



</Accordion>





        {/* <span ><span class="material-icons">done_all</span>Full Website Reset</span>
        -
        <span ><span class="material-icons">done_all</span>Mark All As Bookmarked</span>
        <span ><span class="material-icons">done_all</span>Remove All Bookmarks</span>
        -
        <span ><span class="material-icons">done_all</span>Hide All Cards</span>
        <span ><span class="material-icons">done_all</span>Unhide All Cards</span>
        <span ><span class="material-icons">done_all</span>Hide Mark as Read only</span>
        -
        <span ><span class="material-icons">done_all</span>Mark All Read</span>
        <span ><span class="material-icons">done_all</span>Mark All Unread</span>        
        -
        <span ><span class="material-icons">done_all</span>Sort By Author</span>
        <span ><span class="material-icons">done_all</span>Sort By Date</span>
        <span ><span class="material-icons">done_all</span>Sort By Tag</span> */}

                            </React.Fragment>

                        
            </div>
        )
    }
}

export default OptionsMenu;