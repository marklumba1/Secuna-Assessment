import { useState } from "react"
import { useSignUpMutation } from "../../app/features/apiSlice"
import { useNavigate } from "react-router-dom"
import Toast from "../toast/Toast"

const Register = ({onSuccess}) => {
    const [signUp, {isLoading, isError, isSuccess, error}] = useSignUpMutation()
    const [registerFormData, setRegisterFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    })

    const handleChange = (key, text) => {
        setRegisterFormData({
            ...registerFormData,
            [key] : text
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(registerFormData).unwrap()
            .then(res => setTimeout(() => onSuccess(res), 3000))
            .catch(err => console.log(err))
        
    }
    return(
        <div className="register-container">
            <form onSubmit={handleSubmit} >
                <fieldset disabled={isSuccess || isLoading}>
                    <h3 className="small-title">REGISTRATION</h3>
                    <input type="text" placeholder="Username" value={registerFormData.username} onChange={(e) => handleChange(`username`, e.target.value)}/>
                    {error?.data?.errors && <p className="field-error">{error.data.errors.username}</p>}
                    <input type="email" placeholder="Email" value={registerFormData.email} onChange={(e) => handleChange(`email`, e.target.value)}/>
                    {error?.data?.errors && <p className="field-error">{error.data.errors.email}</p>}
                    <input type="password" placeholder="Password" value={registerFormData.password} onChange={(e) => handleChange(`password`, e.target.value)}/>
                    {error?.data?.errors && <p className="field-error">{error.data.errors.password}</p>}
                    <input type="password" placeholder="Confirm Password" value={registerFormData.password_confirmation} onChange={(e) => handleChange(`password_confirmation`, e.target.value)}/>
                    <button type="submit" disabled={isLoading}>Register</button>
                </fieldset>
            </form>
                {isLoading && <Toast type="loading" text="Loading"/>} 
                {isError && <Toast type="error" text={(error.data.message)}/>}
                {isSuccess && <Toast type="success" text={"Sucessfull registration. Redirecting to Login Page"} />}
                
        </div>
    )
}

export default Register