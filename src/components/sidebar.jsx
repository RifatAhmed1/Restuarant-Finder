import { useState } from "react";
import Navlist from "./navlist";

export default function Sidebar({open, setOpen}){
    
    
    const minimizedStyle = {
        width: 59,
    }
    return(
        <div style={{height: '100vh' ,backgroundColor: 'white',borderRight: '1px solid #dddddd' ,display: 'flex',flexDirection:'column', alignItems: 'center',justifyItems: 'flex-start',width: 239,transition: '0.5s ease-out',...(open && minimizedStyle)}}>
            <div style={{height: 60, textAlign: 'start', cursor: "pointer"}} onClick={setOpen}><div>logo </div></div>
            {!open ? <Navlist/> : <div style={{height: 40, width: 40, borderRadius: 999, backgroundColor: '#dddddd',cursor: 'pointer', textAlign: 'center'}} onClick={setOpen}>...</div>}
        </div>
    )
}