import styled from "@emotion/styled";
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";
import {AiOutlineHome,AiOutlineSearch,AiOutlineFolder} from 'react-icons/ai'

const iconStyle = { width: 24, height: 24};
const data = [
    {
        title: 'Overview',
        path: '/home',
        icon: <AiOutlineHome style={iconStyle}/> },
    {
        title: 'Browse',
        path: '/restaurants',
        icon: <AiOutlineFolder style={iconStyle}/>
    },
    {
        title: 'Search',
        path: '/search', 
        icon: <AiOutlineSearch style={iconStyle}/>
    }
]

const StyledListItem = styled((props)=>(<ListItemButton disableGutters {...props}/>))({
    color: 'black', 
    backgroundColor: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in',
    width: '100%',
    paddingLeft: '1vw',
    paddingRight: '1vw',
    
})

const StyledListItemIcon = styled(ListItemIcon)({
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
})

function NavItem({item, active}){
    const isActiveRoot = active(item.path);
    const {title, path, icon} = item;

    const activeRootStyle = {fontWeight: 500, backgroundColor: 'wheat'}

    return (
        <StyledListItem
            key={title}
            style={{...(isActiveRoot && activeRootStyle)}}
            component={RouterLink}
            to={path}
        >   
            <StyledListItemIcon>{icon && icon}</StyledListItemIcon>
            <ListItemText disableTypography primary={title} />
        </StyledListItem>
    )
}

export default function Navlist({...other}){
    const {pathname} = useLocation();
    const match = path => path? !!matchPath({path, end: false},pathname) : false;
    return(
        <Box {...other} sx={{width: '100%'}}>
            <List disablePadding>
                {data.map((item)=> (
                    <NavItem key={item.title} item={item} active={match}/>
                ))}
            </List>
        </Box>
    )
}