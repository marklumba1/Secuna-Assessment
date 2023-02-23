import { useDeleteReportMutation } from "../../app/features/apiSlice"
import "../../assets/style/reports.css"
import Toast from "../toast/Toast"
const Report = ({report}) => {
    const [deletePost, {isLoading}] = useDeleteReportMutation()
    const handleClick = () => {
        deletePost({...report, ...JSON.parse(localStorage.user)})
    }
    return ( 
        <div className="report">
            <h5>Title: {report.title}</h5>
            <p>Description: {report.description}</p>
            <p>Vulnerability Type: {report.vulnerability_type}</p>
            <div className="btn-container">
                <button disabled={isLoading} onClick={handleClick}>Delete</button>
            </div>
            {isLoading && <Toast type="loading" text={"Deleting Report..."}/>}
        </div>
     );
}
 
export default Report;