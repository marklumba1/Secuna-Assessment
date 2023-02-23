import { useGetReportsQuery } from "../../app/features/apiSlice";
import Report from "./Report";

const ReportsList = () => {
    const {data, isSuccess, isLoading} = useGetReportsQuery(JSON.parse(localStorage.user))
    return ( 
        <div className="report-list">
            {isSuccess && 
            data.reports.length>0 ? 
            data.reports.map(report => <Report key={report.uuid} report={report}/>) : <p>No reports submitted</p>
        
        }
            {isLoading && <p>Loading...</p>}
        </div>
     );
}
 
export default ReportsList;