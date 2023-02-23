import { useSelector } from "react-redux";
import NavBar from "../components/navbar/NavBar";
import ReportsList from "../components/reports/ReportsList";
import AddReport from "../components/reports/AddReport";
import "../assets/style/reports.css"
const Reports = () => {
    const user = useSelector(state => state.userSlice.email)
    return ( 
        <div>
           <NavBar user={user} />
           <div className="report-layout">
               <AddReport />
               <ReportsList />
           </div>
          
        </div>
     );
}
 
export default Reports;