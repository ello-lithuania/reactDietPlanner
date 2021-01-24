import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Cookbook from './Cookbook'
import Planner from './Planner'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeIcon from '@material-ui/icons/Home';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  listItem: {
    textAlign: 'center',
    marginTop: '3rem'
  },  
  listItemBottom: {
    position: 'absolute',
    bottom: 0
  },  
  drawer: {
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    background: '#212121',
    '& svg': {
      color: 'white'
    }
  },
  content: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();

  const [cookbooks,setCookbook] = useState([
    { id:'1', name: 'First Cookbook', author: 'author', cover: '' },
  ]); 
  const [recipes, setRecipes] = useState([]);
  const [sections,setAddSection] = useState([]);

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={classes.drawerClose}
        classes={{
          paper: classes.drawerClose,
        }}
      >
        <List className={classes.listItem}>
            <Link to="/">
              <ListItem button>
                <Tooltip title="Home">
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                </Tooltip>
              </ListItem>
            </Link>
            <Link to="/cookbook">
              <ListItem button>
                <Tooltip title="my Cookbooks">
                  <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
                </Tooltip>
              </ListItem>
            </Link>
            <Link to="/planner">
              <ListItem button classes={classes.listItemBottom}>
                <Tooltip title="meal planner">
                  <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                </Tooltip>
              </ListItem>
            </Link>
        </List>

        <List className={classes.listItemBottom}>
            <ListItem button>
              <Tooltip title="Logout">
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              </Tooltip>
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route path="/cookbook">
            <Cookbook cookbooks={cookbooks} setCookbook={setCookbook} recipes={recipes} setRecipes={setRecipes} sections={sections} setAddSection={setAddSection}/>
          </Route>
          <Route path="/planner">
            <Planner cookbooks={cookbooks} setCookbook={setCookbook} recipes={recipes} setRecipes={setRecipes} sections={sections} setAddSection={setAddSection}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
