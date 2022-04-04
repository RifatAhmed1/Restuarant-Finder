import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import styled from "@emotion/styled";


export default function Layout(){

    const StyledContainer = styled('div')({
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        overflow: 'hidden'
    })

    const StyledOutletContainer = styled('div')({
        flexGrow: 1,
        backgroundColor: 'white',
        overflow: "auto",
        marginTop: 60
    })

    
    const [open, setOpen] = useState(false);

    const OpenHandler = () => (
        setOpen((prev) => !prev)
    )

    return (
        <StyledContainer>
            <Navbar open={open}/>
            <Sidebar open={open} setOpen={OpenHandler}/>
            <StyledOutletContainer>
                <Outlet/>
            </StyledOutletContainer>
        </StyledContainer>
    )
}