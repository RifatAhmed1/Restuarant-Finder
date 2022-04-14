import styled from "@emotion/styled";
import Navlist from "./navlist";
import { IoIosArrowBack,IoIosArrowForward } from 'react-icons/io'

const iconStyle = {height: 30, width: 30};

const SidebarContainer = styled('div')({
    height: '100vh', 
    backgroundColor: 'white', 
    borderRight: '1px solid #dddddd', 
    display: 'flex',
    flexDirection:'column', 
    alignItems: 'center', 
    justifyItems: 'flex-start',
    width: 239,
    transition: 'all 0.2s ease-out',
})

const LogoContainer = styled('div')({
    height: 40,
    width: 40,
    marginBottom: 10,
    marginTop: 10, 
    textAlign: 'start', 
    cursor: "pointer",
    display: 'flex',
    alignSelf: 'flex-end',
    marginRight: 10,
    justifySelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: "wheat",
})

export default function Sidebar({open, setOpen}){    
    return(
        <SidebarContainer style={{...open && {width: 59}}}>
            <LogoContainer style={{alignItems:'center'}} onClick={setOpen}>
                {!open ?<IoIosArrowBack style={iconStyle}/> : <IoIosArrowForward style={iconStyle} />}
            </LogoContainer>
            {!open ? <Navlist/> : null}
        </SidebarContainer>
    )
}