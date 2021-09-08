

import { Link } from 'react-router-dom'
import './aboutAuthor.css'

export const AuthorInfo = (props) =>{
    // console.log(props.database)
    const getCurrentArticle = props.database.filter(x => x.id == props.id)
    // console.log(getCurrentArticle)
    
    const authorInfoView = getCurrentArticle.map((value) => {

        var formatAuthor = value.author.toLowerCase().replace(/\w\s/g, '')
        return(
            <div className="articleInfo">

                <div id="articleInfo_icon_author">
                    <span><i class="bi bi-image"></i></span>
                    <Link 
                        className="newsItemLink"
                        // style={setRandomColour}
                        to={{
                            pathname: '/theKnews/home/search/author/' + props.author , 
                            
                            state:{
                                author: props.author, 
                                tag:props.tag,
                                searchDBFor: "author",
                                origin: "Article", 
                                orderByChild: "author",
                                thingFromArticle:props.tag,
                                arrayFromDatabase:props.arrayFromDatabase,
                                leftoverArticles:props.leftoverArticles,
                                fullDatabaseCall:props.fullDatabaseCall
                                }
                            }}>
                            <h3>{value.author}</h3>
                    </Link>
                </div>

                <div className="articleInfoSocial">

                    <div title={"@"+ formatAuthor}>
                        <i class="bi bi-twitter"></i>
                        <span>{"@"+ formatAuthor}</span>
                    </div>

                    <div title={"@"+ formatAuthor}>
                        <i class="bi bi-instagram"></i>
                        <span>{"@"+ formatAuthor}</span>
                    </div>

                    <div title={formatAuthor + "@yahoo.com"}>
                        <i class="bi bi-envelope-fill"></i> 
                        <span> {formatAuthor + "@yahoo.com"}</span>
                    </div>
                
                    <div title={formatAuthor + ".com"}>
                        <i class="bi bi-globe"></i>
                        <span>{formatAuthor + ".com"} </span>
                    </div>

                </div>

                <div className="articleInfoAbout">
                    <h3>About</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor quam tortor, eu dapibus ex accumsan eget. Curabitur ut felis commodo, dignissim leo id, aliquam velit. Sed vitae aliquam nibh, eget eleifend quam. Integer volutpat ligula nec massa pellentesque, at commodo diam viverra. Quisque dolor erat, accumsan id turpis tristique, posuere auctor nunc. Fusce in auctor ligula. Donec vestibulum tincidunt eleifend.</p>
                    {/* <p>Main Category: {value.tag}</p> */}
                </div>

            </div>
        )
    })
    return authorInfoView;
}

export default AuthorInfo;