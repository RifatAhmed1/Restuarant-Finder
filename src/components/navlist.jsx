import { useState } from "react";
import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";

const data = [
    {title: 'home',path: '/home'},
    {title: 'restaurants',path: '/restaurants'},
    {title: 'search', path: '/search'}
]



function NavItem({item, active}){
    const isActiveRoot = active(item.path);
    const {title, path} = item;
    
    const activeRootStyle = {
        color: 'yellowgreen',
        fontWeight: 900
    }
    return (
        <li style={{paddingLeft: '0px',width: 'max-content'}}><RouterLink style={{color: 'gray',textDecoration: 'none',transition: 'all 0.1s linear', ...(isActiveRoot && activeRootStyle)}} to={path}>{title}</RouterLink></li>
    )
}

export default function Navlist(){
    const {pathname} = useLocation();
    const match = path => path? !!matchPath({path, end: false},pathname) : false;
    return(<ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', padding: '0px', justifyContent: 'center', alignItems: 'flex-start'}}>
        {data.map((item)=> (
            <NavItem key={item.title} item={item} active={match}/>
        ))}
    </ul>)
}