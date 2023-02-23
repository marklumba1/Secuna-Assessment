import { useState } from "react"
import { useAddReportMutation } from "../../app/features/apiSlice"
import Toast from "../toast/Toast"
import "../../assets/style/reports.css"
const AddReport = () => {
    const [formData, setFormData] = useState({
        vulnerability_type: "",
        severity_level: "Low",
        title: "",
        description: ""
    })

    const [addReport, {error, isLoading, isError, isSuccess, data}] = useAddReportMutation()
    const handleSubmit = (e) => {
        e.preventDefault();
        addReport({...formData, ...JSON.parse(localStorage.user)})
        setFormData({ vulnerability_type: "",
        severity_level: "Low",
        title: "",
        description: ""})
        
    }

    const handleChange = (key,text) => {
        setFormData({
            ...formData,
            [key]: text
        })
    }
    return (
        <div className="add-report-container">
            <form onSubmit={handleSubmit}>
            <p>Add Report</p>
                <fieldset disabled={isLoading}>
                    <input type="text" value={formData.vulnerability_type} onChange={e => handleChange("vulnerability_type", e.target.value)} placeholder="Vulnerability Type" />
                    {error?.data?.errors && <p className="field-error">{error.data.errors.vulnerability_type}</p>}
                    <select value={formData.severity_level} onChange={e => handleChange("severity_level", e.target.value)}>
                        <option value="" disabled>Please select</option>
                        <option value="High">High</option>
                        <option value="Mid">Mid</option>
                        <option value="Low">Low</option>
                    </select>
                    <input type="text" value={formData.title} onChange={e => handleChange("title", e.target.value)} placeholder="Title" />
                    {error?.data?.errors && <p className="field-error">{error.data.errors.title}</p>}
                    <textarea rows="1" value={formData.description} onChange={e => handleChange("description", e.target.value)} placeholder="Description"></textarea>
                    {error?.data?.errors && <p className="field-error">{error.data.errors.description}</p>}
                    <button>Submit</button>
                    {isLoading && <Toast type="loading" text={"Loading..."}/>}
                    {isError && <Toast type="error" text={error.data.message}/>}
        
                    
                </fieldset>
             
            </form>
           
        </div>
    )
}

export default AddReport