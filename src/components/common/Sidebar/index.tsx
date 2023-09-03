import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AppsIcon from '@mui/icons-material/Apps';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import {dispatchTab} from 'redux/actions/tab/dispatchTab';

import LogoImg from 'assets/images/logo.png'

import FormControlLabel from '@mui/material/FormControlLabel';

import IOSSwitch from 'components/common/Switch'
import { IState } from 'types'

const drawerWidth = 250;

interface Props {
  children: React.ReactNode | React.ReactElement;
  window?: () => Window;
  tabdataState: IState;
  isChecked: boolean;
  handleSwhitchChange: () => void;
  pluginsState: IState;
  tabName?: string
}

export default function ResponsiveDrawer(props: Props) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { window, children, tabdataState, isChecked, handleSwhitchChange, pluginsState, tabName } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDispatchTab = (title: string) => {
    const tabData: any = [];
    const tab = title === 'Marketing' ? 'tab1' : title === 'Finance' ? 'tab2' : 'tab3'
    
    Object.entries(tabdataState.data[tab]).map(([key, value]) => {
      return Array.isArray(value) && value.map((v) => {
        tabData.push({ ...pluginsState.data[v], isActive: true ? key === 'active' : false, disabled: true ? key === 'disabled' : false }) 
      })
    })
     dispatchTab(dispatch, tabData)

     navigate(`/${title.toLocaleLowerCase()}`)
  }

  const drawer = (
    <div>
      <div style={{ display: 'flex', marginLeft: 10, marginTop: 15 }}>
        <img src={LogoImg} alt="logo" height={55} />
      </div>
      <List>
        {Object.values(tabdataState.data).map((value: any, index: number) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                "&:hover": {
                  backgroundColor: "#fff",
                  borderLeft: 'solid 4px red'
                }
              }}
              onClick={() => {
                handleDispatchTab(value.title)
              
              }}
            >
              <ListItemIcon>
                {value.icon === 'icon-marketing' ? <AppsIcon /> : value.icon === 'icon-finance' ? <BrowseGalleryIcon /> : <EventAvailableIcon />}
              </ListItemIcon>
              <ListItemText primary={value.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#fff',
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon /> 
          </IconButton>
          <Typography color="#0c344b" variant="h6" noWrap component="div">
           {tabName} Plugin
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, backgroundColor: '#f2f1f1 !important' }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              background: `linear-gradient(#f2f1f1 90%, ${isChecked ? '#a0cbaf ' : '#d6847b'})`,
              border: 'none'
            }
          }}
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

          }}
          open
        >
          {drawer}
          <div style={{ display: 'flex', height: '100%', flexDirection: 'column-reverse', marginBottom: 35 }}>
            <div style={{ fontSize: 13 }}>
              All plugins {isChecked ? 'enabled' : 'disabled'}
              <FormControlLabel
                control={<IOSSwitch checked={isChecked} onChange={handleSwhitchChange} icon={<PowerSettingsNewIcon />} checkedIcon={<PowerSettingsNewIcon />} sx={{ m: 1, marginLeft: 3, width: 44, height: 28 }} />}
                label=""
              />
            </div>

          </div>

        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
