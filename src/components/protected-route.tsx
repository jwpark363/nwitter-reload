import type React from "react"
import { auth } from "../firebase"
import { Navigate } from "react-router-dom";

interface RouteProps{
    page?: string
    children: React.ReactNode
}

export default function ProtectedRoute({page,children}:RouteProps){
    const current_user = auth.currentUser;
    if(current_user) return children
    return <Navigate to={page ? `/login#${page}` : `/login`} />
}