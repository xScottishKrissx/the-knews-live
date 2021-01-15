export const RenderCardStyle = (props) =>{


            // There is probably a better way of doing this...
            const imgUrl = "https://unsplash.it/500/200?random=" + props.id;
            ///... and this.
            const style = {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "400px",
                // width:"100%"
            }    
            return style;
} 

export default RenderCardStyle;