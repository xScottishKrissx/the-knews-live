export const markAllUnread = () =>{

        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        if(database){
                // Removing Style
                const articlesAsRead = database.filter(obj => obj.read === true)
                const removeStyles = articlesAsRead.map(el => {
                        if(el.read === true && el != null )
                                if(document.getElementById(el.id)){
                                        document.getElementById(el.id).classList.remove('markAsRead')
                                }
                        })

                // Removing from memory
                const clearAllBookmarks = database.map(el => {
                        if(el.read === true && el != null )
                                return Object.assign({}, el, {read:false})
                                return el
                });
                console.log(clearAllBookmarks)
                localStorage.setItem("bookmarkArray", JSON.stringify(clearAllBookmarks))
                localStorage.setItem("changedFullDatabaseCall", JSON.stringify(clearAllBookmarks))
                // console.log("Articles Marked as Unread")
        }
        else{console.log("No Articles Read to Mark as Not Read.")}
}

export default markAllUnread;

