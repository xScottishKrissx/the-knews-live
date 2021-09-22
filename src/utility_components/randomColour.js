export const randomColour = () =>{
    // console.log("Random Colour")
    // Generates a random colour for the:
        // Navbar
        // Author Info
    const random1 = Math.floor((Math.random() * 255) + 1)
    const random2 = Math.floor((Math.random() * 255) + 1)
    const random3 = Math.floor((Math.random() * 255) + 1)
    const randomColour = "rgb(" + random1 + "," + random2 + "," + random3 + ")";
    const randomBackgroundColour = {
        backgroundColor:randomColour
    }
    // console.log(randomBackgroundColour)

    if(localStorage.getItem("headerColour") === null){
        localStorage.setItem("headerColour",JSON.stringify(randomBackgroundColour))
    }
    if(localStorage.getItem("randomColour") === null){           
        localStorage.setItem("randomColour",JSON.stringify(randomColour))
    }

}

export default randomColour;