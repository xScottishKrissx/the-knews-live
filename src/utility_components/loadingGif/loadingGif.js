import loading from '../loadingGif/loading5.gif'
export const LoadingGif = (props) =>{
    const style = {
        position:"fixed",
        top:"50%",
        left:"50%",
        transform:"translate(-50%, -50%)"
    }
return(
    <>
     <span> <img style={style} alt="now loading"  src={loading}/></span>
    </>
)
}

export default LoadingGif;