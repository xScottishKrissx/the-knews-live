import Parser from 'html-react-parser';

export const ParseHTML = (props) =>{
    const parseHTML = Parser(props.props);
    // console.log(props.props);
    return parseHTML;
} 

export default ParseHTML;