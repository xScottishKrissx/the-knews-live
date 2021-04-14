// import update from 'immutability-helper';
export const CheckCache = (props) =>{
    // console.log(props.id)
        // This is checking to see if there are hidden posts in cache. If there are then they're set to be hidden
        
        // console.log("Home Page Hidden Post List -> " + localStorage.getItem("hiddenPostList"));
        // const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
        // const localStorageHiddenPosts2 = localStorage.getItem("articleArray7");

        const checkExist = setInterval(function() {
            // if (!!localStorageHiddenPosts && document.getElementById(props.id)) {
            if (document.getElementById(props.id)) {
            // console.log("Exists!");
            clearInterval(checkExist);
        
            const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
            // const formattedPostsArray2 = localStorageHiddenPosts2.split(',').map(Number)
            

            for(var i = 0; i < formattedPostsArray.length; i++){
                if(!!formattedPostsArray && formattedPostsArray[i].toString() === props.id.toString()){
                    // console.log("Hidden Post Identified")
                    document.getElementById(props.id).style.display = "none";
                    // console.log("Success: " + props.id + " hidden");
                    // console.log(formattedPostsArray[i]);

                    // const collection2 = formattedPostsArray2;
                    // console.log(formattedPostsArray2)
                    // const newCollection2 = update(collection2, {0:{"hidden": {$set: 5}}});
                    // console.log(newCollection2)
                }
            }        

            }
        }, 100); // check every 100ms
        return CheckCache;
    }


export default CheckCache;