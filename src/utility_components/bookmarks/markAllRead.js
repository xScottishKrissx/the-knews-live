export const markAllRead = () =>{

        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        if(database){
                // Removing Style
                const articlesAsRead = database.filter(obj => obj.read === false && obj.bookmarked === true)
                console.log(articlesAsRead)
                const removeStyles = articlesAsRead.map(el => {
                        if(el.read === false && el != null )
                                if(document.getElementById(el.id)){
                                        document.getElementById(el.id).classList.add('markAsRead')
                                }
                        })

                // Removing from memory
                const markAsRead = database.map(el => {
                        if(el.read === false && el != null && el.bookmarked === true )
                                return Object.assign({}, el, {read:true})
                                return el
                });
                console.log(markAsRead)
                localStorage.setItem("bookmarkArray", JSON.stringify(markAsRead))
                localStorage.setItem("changedFullDatabaseCall", JSON.stringify(markAsRead))
                console.log("Articles Marked as Read")
        }
        else{console.log("No Articles Read to Mark as Read.")}
}

export default markAllRead;

