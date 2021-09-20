export const hideAllArticles = () =>{
        
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        if(database){

                // Removing Style
                const articlesAsRead = database.filter(obj => obj.bookmarked === true)
                console.log(articlesAsRead)
                const removeStyles = articlesAsRead.map(el => {
                        if(el.bookmarked === true && el != null )
                                if(document.getElementById(el.id)){
                                        document.getElementById(el.id + "bookmarkIcon").classList.remove('bookmarkStyle')
                                }
                        })
                const hideAllArticles = database.map(el => {
                if(el.bookmarked === true && el != null )
                        return Object.assign({}, el, {hidden:true,bookmarked:false})
                        return el
                });
                console.log(hideAllArticles)
                localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideAllArticles))
                console.log("All Articles Hidden")
        }
        else{console.log("No Articles to Hide")}
}

export default hideAllArticles;
