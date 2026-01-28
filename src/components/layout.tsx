import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../firebase";
import Loading from "./loading";
import styled from "styled-components";
import SideMenu from "./side-menu";
import { ConfirmProvider } from "./use-confirm";

const Wrapper = styled.div`
    display: flex;
    gap: 24px;
`;
const Content = styled.div`
    /* width: 640px; */
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 640px;
    @media (max-width:680px) {
        min-width: 340px;
    }
`;
const Title = styled.div`
    margin-top: 32px;
    margin-left: 64px;
    font-size: 24px;
    font-weight: bold;
`;

export default function Layout(){
    const [is_loading, setLoading] = useState(true);
    const init = async () => {
        await auth.authStateReady();
        setLoading(false);
    }
    useEffect(() => {
        init();
    },[])

    return (
    <ConfirmProvider>
    <Wrapper>
        <SideMenu />
        <Content>
            <Title>HAHA ❌</Title>
            {is_loading ? <Loading /> : <Outlet /> }
        </Content>
    </Wrapper>
    </ConfirmProvider>
    )
}