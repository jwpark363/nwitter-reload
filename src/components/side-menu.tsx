import styled from "styled-components"
import { Menu as MenuIcon, X, Home as HomeIcon, User, LogOut, UserSearch, FileImage, IdCard } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Wrapper = styled.div`
    position: relative;
`;
const MenuWrapper = styled.div<{$open?:boolean}>`
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    @media (max-width: 640px) {
        display: ${props => (props.$open && props.$open) ? "flex" : "none"};
        position: absolute;
        left: 10px;
        top: 10px;
        width: 100px;
        z-index: 100;
        background-color: black;
        opacity: 0.8;
    }
`;
const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
const Home = styled.div`
    cursor: pointer;
`;
const Name = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
const Menu = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
const MenuItem = styled.li`
    display: flex;
    gap: 4px;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
`;
const MobileMenu = styled.div`
    margin-top: 32px;
    /* margin-left: 8px; */
    display: none;
    cursor: pointer;
    @media (max-width: 640px) {
        display: block;
    }
`;
export default function SideMenu(){
    const navigate = useNavigate();
    const [is_open, setOpen] = useState(false);
    const [display_name, setName] = useState("Unknow");
    const handleNavigate = (menu:string) => {
        navigate(`/${menu}`);
    }
    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    }
    useEffect(()=>{
        setName(auth.currentUser?.displayName ?? "Unknow");
    },[auth.currentUser])
    return(<Wrapper>
        <MobileMenu>
            {is_open ? <X size={20} onClick={() => setOpen(false)}/> :
                        <MenuIcon size={20} onClick={() => setOpen(true)}/>}
        </MobileMenu>
        <MenuWrapper $open={is_open}>
            <Header>
                <Home onClick={() => handleNavigate('')}>
                    <HomeIcon size={20} /> Home
                </Home>
                <Name>
                    <IdCard size={22} /> {display_name}
                </Name>
            </Header>
            <Menu>
                <MenuItem onClick={() => handleNavigate('profile')}>
                    <UserSearch size={16} />Profile
                </MenuItem>
                <MenuItem>
                    <FileImage size={16} />Album
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <LogOut size={16} />Logout
                </MenuItem>
            </Menu>
        </MenuWrapper>
    </Wrapper>)
}