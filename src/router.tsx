import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./components/login";
import NewAccount from "./components/new_account";
import ProtectedRoute from "./components/protected-route";


export const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children:[
      {
        path:"",
        element:<ProtectedRoute><Home /></ProtectedRoute>
      },
      {
        path:"/profile",
        element:<ProtectedRoute page="profile"><Profile /></ProtectedRoute>
      }
    ]
  },
  {
    path:"login",
    element:<Login />
  },
  {
    path:"new-account",
    element:<NewAccount />
  }
])