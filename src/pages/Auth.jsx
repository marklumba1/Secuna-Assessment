import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Toast from "../components/toast/Toast";
const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
  
    const handleSuccessReg = () => {
        setIsLogin(true)
    }

    return ( 
        <div className="container">
            <div className="inner">
                {isLogin ? <Login /> : <Register onSuccess={handleSuccessReg}/> }
                <p className="link" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Click here to register' : 'Back to login'}</p>
            </div>
        </div>
     );
}
 
export default Auth;