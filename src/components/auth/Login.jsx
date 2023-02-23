import { useState } from "react";
import { useLoginMutation } from "../../app/features/apiSlice";
import Toast from "../toast/Toast";
import QR from "../QR/QR";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../app/features/userSlice";

const Login = () => {

    const [login, {isLoading, isError, error, isSuccess, data}] = useLoginMutation()
    const dispatch = useDispatch()
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    })
  
    const handleChange = (key, text) => {
        setLoginFormData({
            ...loginFormData,
            [key]: text
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        login(loginFormData).unwrap()
            .then(res => dispatch(setUser(loginFormData.email)))
            .catch(err => console.log(err))
    }

    return ( 
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <fieldset disabled={isLoading}>
                    <h3 className="small-title">LOGIN</h3>
                    <input type="email" value={loginFormData.email} onChange={(e) => handleChange(`email`, e.target.value)} placeholder="email"  />
                    {error?.data?.errors && <p className="field-error">{error.data.errors.email}</p>}
                    <input type="password" value={loginFormData.password} onChange={(e) => handleChange(`password`, e.target.value)} placeholder="password" />
                    {error?.data?.errors  && <p className="field-error">{error.data.errors.password}</p>}
                    <button type="submit" disabled={isLoading}>Login</button>
                </fieldset>
            </form>
            {isSuccess && <QR data={data}/>}
            {isLoading && <Toast type="loading" text="Verifying User..."/>}
            {isError && <Toast type="error" text={(error.data.message)}/>}
        </div>
     );
}
 
export default Login;