import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase";
import Loading from "./loading";

export default function Layout(){
    const [is_loading, setLoading] = useState(true);
    const init = async () => {
    await auth.authStateReady();
    setLoading(false);
    }
    useEffect(() => {
    init();
    },[])

    return (<>
        <h2>Layout</h2>
        {is_loading ? <Loading /> : <Outlet /> }
    </>)
}