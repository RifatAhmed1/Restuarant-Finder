import styled from "@emotion/styled";
import Navlist from "./navlist";

const SidebarContainer = styled('div')({
    height: '100vh', 
    backgroundColor: 'white', 
    borderRight: '1px solid #dddddd', 
    display: 'flex', flexDirection:'column', 
    alignItems: 'center', 
    justifyItems: 'flex-start', 
    width: 239, 
    transition: '0.5s ease-out',
})

const LogoContainer = styled('div')({
    height: 60, 
    textAlign: 'start', 
    cursor: "pointer"
})
export default function Sidebar({open, setOpen}){    
    const minimizedStyle = {
        width: 59,
    }
    return(
        <SidebarContainer style={{...(open && minimizedStyle)}}>
            <LogoContainer onClick={setOpen}><div>logo</div></LogoContainer>
            {!open ? <Navlist/> : <div style={{height: 40, width: 40, borderRadius: 999, backgroundColor: '#dddddd',cursor: 'pointer', textAlign: 'center'}} onClick={setOpen}>...</div>}
        </SidebarContainer>
    )
}