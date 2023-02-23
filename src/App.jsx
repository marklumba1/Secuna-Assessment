import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Reports from "./pages/Reports";
import { useDispatch } from "react-redux";
import { setUser } from "./app/features/userSlice";
import "./assets/style/global.css";

const ProtectedRoute = () => {
    if (localStorage.user) return <Outlet />
    else return <Navigate to="/" replace />
}

const App = () => {
    const dispatch = useDispatch()
    if (localStorage.user) dispatch(setUser(JSON.parse(localStorage.user).email))
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />}/>
                <Route element={<ProtectedRoute />}>
                    <Route path="/reports" element={<Reports />} />
                </Route>
                <Route path="*" element={<p>404 not found</p>} />
            </Routes>
        </BrowserRouter>
     );
}
 
export default App;