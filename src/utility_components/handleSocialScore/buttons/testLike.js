// import fire from "../../../fire"

// export const testLike = (props,id,databaseId) =>{

//     const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
//     const getLikes = database.filter(obj => obj.id === id)
//     console.log(getLikes[0].likes)

//     const currentValue = getLikes[0].likes;

//     if(props === "undo")console.log("remove like")

//     var changeDatabase = database.map(el => {
//         if(el.id === id)
//             return Object.assign({}, el, {likes:currentValue - 1, disliked:true, liked:false})
//             return el
//     });
//     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))

//     const updateDatabase = {} 
//     const newVal = currentValue - 1;
//     updateDatabase[databaseId + "/likes/"] = newVal;
//     fire.database().ref("items").update(updateDatabase);
// }

// export default testLike;