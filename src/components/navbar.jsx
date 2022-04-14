import styled from "@emotion/styled"

const StyledNavbarContainer = styled('div')({
    marginLeft: 240, 
    position: 'fixed', 
    top: 0,
    minHeight: 60,
    borderBottom: '1px solid #dddddd',
    backgroundColor: 'transparent',
    width: `calc(100% - 240px)`,
    color: 'gray', 
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    transition: 'all 0.2s ease-out',
    '& > div': {
        marginRight: 30, cursor: 'pointer'
    }
})

export default function Navbar({open}){
    return(
        <StyledNavbarContainer 
            style={{...(open && {marginLeft: 60, width: 'calc(100% - 60px)'})}}>
            <div>log in</div>
            <div>sign in</div>
        </StyledNavbarContainer>
    )
}