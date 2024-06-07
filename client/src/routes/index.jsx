import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayout from "../layout/AuthLayout";
import ForgotPassword from "../pages/ForgotPassword";

const router=createBrowserRouter([
{
    path:"/",
    element:<App></App>,
    children:[
        {
            path:"register",
            element:<AuthLayout><RegisterPage/></AuthLayout>
        },{
            path:"email",
            element:<AuthLayout><CheckEmailPage/></AuthLayout>
        },
        {
            path:"password",
            element:<AuthLayout><CheckPasswordPage/></AuthLayout>
        },
        {
            path:"forgot-password",
            element:<AuthLayout><ForgotPassword></ForgotPassword></AuthLayout>
        },
        {
            path:"",
            element:<Home/>,
            children:[
                 {
                    path:":userId",
                    element:<MessagePage/>
                 }
            ]
        }
    ]
}
])

export default router