export const swipeLeftAction = (text, id) =>{
    document.getElementById("popup" + id).style.display = "block";
    document.getElementById("articlePopupBackground"  + id).style.display = "block";
    document.body.style.overflow = "hidden";      
    console.log("Swipe Left Action!!")
}

export default swipeLeftAction;

