import { useState } from "react";
import { useVerifyCodeMutation } from "../../app/features/apiSlice";
import Toast from "../toast/Toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const QR = ({data}) => {
    const [code, setCode] = useState("")
    const [verify, {isLoading, isError, isSuccess, error}] = useVerifyCodeMutation()
    const navigate = useNavigate()
    const email = useSelector(state => state.userSlice.email)
 
    const handleClick = () => {
        verify({code: code, token: data.access_token}).unwrap()
        .then(res => {
            localStorage.user = JSON.stringify({email: email, ...res})
            navigate("/reports")
        })
        .catch(err => console.log(err))
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter') handleClick()
    }  

    return ( 
    <div className="login-container">
        <p className="center">{data.message}</p>
        {data.two_fa_qr_url && 
        <div className="img-container"> 
            <img className="qr" src={data.two_fa_qr_url} alt="qrcode" />
        </div>
        
        }
        <input type="text" value={code} onKeyUp={handleEnter} placeholder="Enter your code here." onChange={e => setCode(e.target.value)} />
        <button onClick={handleClick}>Verify</button>
        {isError && <Toast type="error" text={(error?.data?.message)}/>}
        {isLoading && <Toast type="loading" text="Verifying Code..."/>}
        {isSuccess && <Toast type="success" text={"logged in successfully"}/>}
    </div>
     );
}
 
export default QR;