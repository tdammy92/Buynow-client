import React, { useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import {Link} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {CardActions} from '@material-ui/core';
// import {Avatar, CardActions} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Store from './../store/Store'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {},

    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative'
    }
}));


function Nav() {
    
    
    const {Cart,User,SignOut} = Store()
    
    
    const isAdmin = User?.user?.role?.name === "Admin";

    const [anchorEl,
        setAnchorEl] = useState(null);

    const classes = useStyles();

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);

    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
            id={menuId}
            keepMounted
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
        }}
            open={isMenuOpen}
            onClose={handleMenuClose}>

            {User && <MenuItem onClick={handleMenuClose}
            component={Link}
            to='/purchaseHistory'
            >
                <IconButton aria-label="show 4 new mails" color="primary">

                    <ShoppingBasketIcon/>

                </IconButton>
                <p color='primary'>Purchased</p>
            </MenuItem>}

            {User ? <MenuItem onClick={handleMenuClose}
            component={Link}
            to='/profile'
            >
                <IconButton aria-label="show 4 new mails" color="primary">

                    <AccountCircleIcon/>

                </IconButton>
                <p color='primary'>My Profile</p>
            </MenuItem> :
            <MenuItem onClick={handleMenuClose}>
                <IconButton aria-label="show 4 new mails" color="primary">

                    <PermIdentityIcon/>

                </IconButton>
                <p color='primary'>Hi Guest</p>
            </MenuItem> 
            
            }

            {isAdmin && <MenuItem onClick={handleMenuClose}
             component={Link}
                    to='/admin'>
                <IconButton
                    aria-label="show 4 new mails"
                    color="primary"
                   >

                    <SupervisorAccountIcon/>

                </IconButton>
                <p color='primary'>Managment</p>
            </MenuItem>}
          
            {!User && <MenuItem onClick={handleMenuClose}
             component={Link}
                    to='/login'>
                <IconButton
                    aria-label="show 4 new mails"
                    color="primary"
                   >

                    <LockOpenIcon/>

                </IconButton>
                <p color='primary'>Sign In</p>
            </MenuItem>}

           {User && <MenuItem onClick={SignOut}>
                <IconButton aria-label="sign out user" color="primary">

                    <ExitToAppIcon/>

                </IconButton>
                <p color='primary'>Sign out</p>
            </MenuItem>}

        </Menu>
    )

    return ( <> <AppBar position="fixed">
            <Toolbar className={classes.nav}>

                <IconButton
                    edge="start"
                    component={Link}
                    to='/'
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu">
                    <Typography variant="h5" className={classes.title}>
                        BuyNow
                    </Typography>
                </IconButton>

                <CardActions>

                    <IconButton
                        component={Link}
                        to='/cart'
                        edge="end"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="cart">

                        <Badge badgeContent={Cart?.length} color="secondary">
                            <ShoppingCartIcon/>
                        </Badge>

                    </IconButton>

                    <IconButton className={classes.menuButton} onClick={handleProfileMenuOpen}>
                        <MenuIcon className='icon'/>
                    </IconButton>

                </CardActions>

            </Toolbar>

        </AppBar>

        {renderMenu} </>
    )
} 

export default Nav;