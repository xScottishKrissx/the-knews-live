// import './pageTitle.css';
import '../pageTitle/pageTitle.css';

export const PageTitle = (props) =>{
    return(
        <div className="pageTitleWrapper">
            <h2 className="pageTitle">{props.pageTitle}</h2>
        </div>
        )
}

export default PageTitle;

