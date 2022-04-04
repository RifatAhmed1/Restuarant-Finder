import styled from "@emotion/styled";
import Navlist from "./navlist";
import { IoIosArrowBack,IoIosArrowForward } from 'react-icons/io'

const SidebarContainer = styled('div')({
    height: '100vh', 
    backgroundColor: 'white', 
    borderRight: '1px solid #dddddd', 
    display: 'flex', flexDirection:'column', 
    alignItems: 'center', 
    justifyItems: 'flex-start', 
    width: '239px',
})

const LogoContainer = styled('div')({
    height: 40,
    width: 40,
    marginBottom: 10,
    marginTop: 10, 
    textAlign: 'start', 
    cursor: "pointer",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: "wheat"

})
export default function Sidebar({open, setOpen}){    
    return(
        <SidebarContainer style={{...open && {width:'59px'}}}>
            {/*<LogoContainer style={{...!open && {alignItems:'center',}}} onClick={setOpen}>
                {!open ?<IoIosArrowBack style={{height: 30, width: 30}}/> : <IoIosArrowForward style={{height: 30, width: 30}} />}
            </LogoContainer>*/}<div style={{height: 40,
    width: 40,
    marginBottom: 10,
    marginTop: 10, 
    textAlign: 'start', 
    cursor: "pointer",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',}}/>
    {!open ? <Navlist/> : <div></div>}
        </SidebarContainer>
    )
}