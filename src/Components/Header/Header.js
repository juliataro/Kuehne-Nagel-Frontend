import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { theme } from '../../Assets/Theme'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'

const styles = {
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down('md')]: {
      height: '7em'
    },
    [theme.breakpoints.down('xs')]: {
      height: '5.5em'
    }
  },
  logoContainer: {
    padding: 0,
    '&': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.light
    }
  },
  tabs: {
    marginLeft: 'auto',
    '& .MuiButtonBase-root.MuiTab-root': {
      fontSize: 20
    },
    '& .Mui-selected': {
      backgroundColor: '#fce0a2',
      color: '#000',
      opacity: 0.7,
      borderRadius: 1
    }
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    color: '#fff'
  },

  hamburgerMenuIcon: {
    height: '50px',
    width: '50px'
  },
  menuIconContainer: {
    marginLeft: 'auto',
    color: '#fff',
    '&:hover': {
      opacity: 1
    }
  },
  appbar: {
    zIndex: theme.zIndex.modal,
    backgroundColor: theme.palette.primary.main
  }
}

// TODO - Desktop view

const DesktopNavigation = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label='nav tabs example'
      sx={styles.tabs}
    >
      <Tab sx={styles.tab} label='Home' component={Link} to='/' />
      <Tab sx={styles.tab} label='Shipments' component={Link} to='/shipments' />
    </Tabs>
  )
}

const MobileNavigation = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false)

  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)

  // TODO - Mobile Navigation ----------------------------------
  return (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <Box sx={styles.toolbarMargin} />
        <Paper>
          <List disablePadding>
            <ListItem
              divider
              component={Link}
              to='/'
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>Home</ListItemText>
            </ListItem>
            <ListItem
              divider
              component={Link}
              to='/shipments'
              onClick={() => setOpenDrawer(false)}
            >
              <ListItemText disableTypography>Shipments</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </SwipeableDrawer>
      <IconButton
        sx={styles.menuIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon sx={styles.hamburgerMenuIcon} />
      </IconButton>
    </React.Fragment>
  )
}

//TODO: Mobile view
const Header = () => {
  const isMobileMode = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Fragment>
      <AppBar position='fixed' sx={styles.appbar} color='primary' elevation={2}>
        <Toolbar disableGutters={true}>
          <Button
            disableRipple
            component={Link}
            to='/'
            sx={styles.logoContainer}
          >
            <Box alt='company logo' />
            LOGO
          </Button>
          {isMobileMode ? <MobileNavigation /> : <DesktopNavigation />}
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Header
