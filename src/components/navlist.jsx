import styled from "@emotion/styled";
import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";

const data = [
    {title: 'Overview',path: '/home'},
    {title: 'Browse',path: '/restaurants/page/1'},
    {title: 'search', path: '/search'}
]

const StyledRouterLink = styled((props)=>(<RouterLink {...props}/>))({
    color: 'black', backgroundColor: 'inherit',textDecoration: 'none',transition: 'all 0.1s linear',
})

const StyledUL = styled('ul')({
    listStyle: 'none', 
    display: 'flex', 
    flexDirection: 'column', 
    padding: '0px', 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    width: '100%',
    margin: 0,
    rowGap: 2
})

function NavItem({item, active}){
    const isActiveRoot = active(item.path);
    const {title, path} = item;

    return (
        <li style={{padding:'10px 10px 10px 60px',width: '100%', height: 25, backgroundColor: 'wheat'}}>
            <StyledRouterLink 
                style={{ ...isActiveRoot && {
                    color: 'black',
                    fontWeight: 900}}} 
                to={path}>
                    {title}
            </StyledRouterLink>
        </li>
    )
}

export default function Navlist(){
    const {pathname} = useLocation();
    const match = path => path? !!matchPath({path, end: false},pathname) : false;
    return(<StyledUL>
        {console.log(pathname)}
        {data.map((item)=> (
            <NavItem key={item.title} item={item} active={match}/>
        ))}
    </StyledUL>)
}