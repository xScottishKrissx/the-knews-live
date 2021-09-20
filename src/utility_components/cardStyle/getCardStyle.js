export const getCardStyle = (props) =>{
    
    const cardSizeInStorage = JSON.parse(localStorage.getItem("savedCardStyle"))
    let thing;

    // if(cardSizeInStorage === null){
    //     this.setState({changedCardSize:{
    //         width:"260px",
    //         height:"400px"
    //     }})
    // }else{
    //     this.setState({changedCardSize:{
    //         width:cardSizeInStorage[0],
    //         height:cardSizeInStorage[1]
    //     }})
    // }
    if(cardSizeInStorage === null){
        thing = ["260px","400px"]
    }else{
        thing = [cardSizeInStorage[0],cardSizeInStorage[1]]
    }

    return thing;

}

export default getCardStyle;