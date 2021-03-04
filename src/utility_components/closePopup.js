export const closePopup = (id) => {
    document.getElementById("popup" + id).style.display = "none";
    document.getElementById("articlePopupBackground" + id).style.display = "none";            
    document.body.style.overflow = "auto";
    console.log(id)
}

export default closePopup;