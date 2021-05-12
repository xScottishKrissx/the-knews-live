export const updateBookmarkStyles = () =>{
        
        const bookmarks = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || JSON.parse(localStorage.getItem("bookmarkArray")) 
        if(bookmarks){
            const updateStyles = bookmarks.filter(obj => obj.bookmarked === true || obj.read === true)
            
            var thing = updateStyles.map(el => {
                if(el.read === true && el != null )
                    if(document.getElementById(el.id)){document.getElementById(el.id).classList.add('markAsRead')}
                   
                    if(el.bookmarked === true && el != null){
                        if(document.getElementById(el.id)){
                            document.getElementById(el.id + "bookmarkIcon").classList.add('bookmarkStyle')
                        }
                    }
                }); 
        }
}

export default updateBookmarkStyles;

