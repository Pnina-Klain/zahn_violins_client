import React from "react";
import {Link} from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';


import "./adminNavBar.scss"

 const AdminNavBar=()=>{

    function appBarLabel(label) {
        return (
          <Toolbar>
            <IconButton edge="start" color="red" aria-label="menu" sx={{ mr: 2 }}>  
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                <div className="linkAdminNavBar">
                    <Link to="/productList/all" className="oneLinkNavBarAdmin">products<MenuIcon /></Link>
                    <Link to="/userList" className="oneLinkNavBarAdmin">users<MenuIcon /></Link>
                    <Link to="/addProduct" className="oneLinkNavBarAdmin" >new product<ShoppingCartOutlinedIcon/></Link>
                    <Link to="/" className="oneLinkNavBarAdmin">log in<LockPersonOutlinedIcon/></Link>
                </div>
            </Typography>
          </Toolbar>
        );
      }

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1976d2',
          },
        },
      });
      
    function EnableColorOnDarkAppBar() {
      return (
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <ThemeProvider theme={darkTheme}>
            <AppBar position="static" color="primary">
              {appBarLabel('default')}
            </AppBar>
          </ThemeProvider>
        </Stack>
      );
    }
    return(
        <>
        <div>{EnableColorOnDarkAppBar()}</div>
        </>
    )
}
export default AdminNavBar


