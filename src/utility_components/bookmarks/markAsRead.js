// import '../bookmarks/markAsRead.css';

export const MarkAsRead = (id,fullDatabaseCall) =>{
        console.log("Bookmark "+ id +" marked as read")
        // console.log("Mark " + id + " as read")
        console.log(fullDatabaseCall)
        const cleanDB = JSON.parse(localStorage.getItem("cleanDatabaseCall"))
        console.log(cleanDB)
        const currentBookmarks = JSON.parse(localStorage.getItem("bookmarkArray"));
        const mainArray = currentBookmarks || cleanDB;
       
        var markArticleRead = mainArray.map(el => {
            if(el.id === id && el != null )
                return Object.assign({}, el, {read:true})
                return el
        });
    
        localStorage.setItem("bookmarkArray", JSON.stringify(markArticleRead))
        
        document.getElementById(id).classList.add('markAsRead')
}

export default MarkAsRead;

