import { Link } from "react-router-dom"

export default function Navbar({open}){

    const marginLeftStyle = {
        marginLeft: 60,
        width: `calc(100% - 60px)`
    }
    return(
        <div style={{marginLeft: 240, 
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
        transition: '0.5s ease-out',...(open && marginLeftStyle)}}>
            <div style={{marginRight: 60, cursor: 'pointer'}}>log in</div>
            <div style={{marginRight: 30, cursor: 'pointer'}}>sign in</div>
            <div style={{marginRight: 30, cursor: 'pointer'}}><Link to='/search' style={{textDecoration: 'none', color: 'gray'}}>search</Link></div>
        </div>
    )
}