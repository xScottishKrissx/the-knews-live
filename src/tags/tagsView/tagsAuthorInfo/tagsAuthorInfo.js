import AuthorInfo from "../../../utility_components/aboutAuthor/aboutAuthor";

export const TagsAuthorInfo = (props) =>{
    // console.log(props.database)
    return (
        
        <>
            {props.paramA.includes("author") ? 
                <div className="aboutAuthorTagsPage">
                <AuthorInfo 
                    database={props.database} 
                    id={props.database[0].id}                        
                    author={props.database[0].author}
                    tag={props.database[0].tag}

                    arrayFromDatabase={props.arrayFromDatabase}
                    fullDatabaseCall={props.fullDatabaseCall}
                />
                </div>
            :
                null
            }
        </>

    )
    }
    
    export default TagsAuthorInfo;