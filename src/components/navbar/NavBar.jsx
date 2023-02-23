import { useNavigate } from "react-router-dom";
import "../../assets/style/navbar.css"
const NavBar = ({user}) => {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.clear()
        navigate("/")
    }
    return ( 
        <div className="navbar-container">
            <span>Hello {user}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
     );
}
 
export default NavBar;