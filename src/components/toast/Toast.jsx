import "../../assets/style/toast.css"
const Toast = ({type, text}) => {
    return ( 
        <div className={type}>{text}</div>
     );
}
 
export default Toast;