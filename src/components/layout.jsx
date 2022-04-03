import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";


export default function Layout(){

    const [open, setOpen] = useState(false);

    const OpenHandler = () => (
        setOpen((prev) => !prev)
    )

    return (
        <div style={{display: 'flex', flexDirection: 'row', height: '100vh',overflow: 'hidden'}}>
            <Navbar open={open}/>
            <Sidebar open={open} setOpen={OpenHandler}/>
            <div style={{flexGrow: 1, backgroundColor: 'white', overflow: "auto", marginTop: 60}}>
            <Outlet/></div>
        </div>
    )
}