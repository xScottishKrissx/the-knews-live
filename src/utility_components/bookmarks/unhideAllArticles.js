export const unhideAllArticles = () =>{
        
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        if(database){
                var unhideAllArticles = database.map(el => {
                if(el.markedforhide === true && el != null )
                        return Object.assign({}, el, {markedforhide:false,hidden:false,bookmarked:false})
                        return el
                });
                console.log(unhideAllArticles)
                localStorage.setItem("bookmarkArray", JSON.stringify(unhideAllArticles))
                localStorage.setItem("changedFullDatabaseCall", JSON.stringify(unhideAllArticles))
                console.log("Hidden Articles Now Unhidden")
        }
        else{console.log("No Articles Hidden so...")}
}

export default unhideAllArticles;

