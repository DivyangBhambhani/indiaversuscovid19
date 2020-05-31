import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MapIcon from '@material-ui/icons/Map';
import CategoryIcon from '@material-ui/icons/Category';
import BarChartIcon from '@material-ui/icons/BarChart';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  blue: {
    backgroundColor: '#2196f3',
  },
  red: {
    backgroundColor: '#ef193c',
  },
  green: {
    backgroundColor: '#22b66e',
  },
  purple: {
    backgroundColor: deepPurple[500],
  },
  orange: {
    backgroundColor: deepOrange[500],
  },
}));

export default function MainListItems () {
  const classes = useStyles();
  return (
    <div>
      <Link href="/">
        <ListItem button>
          <ListItemIcon>
            <Avatar className={classes.red}>
              <DashboardIcon />
            </Avatar>
          </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      </Link>
      <Link href="/analytics">
        <ListItem button>
          <ListItemIcon>
            <Avatar className={classes.purple}>
              <BarChartIcon />
            </Avatar>
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
      </Link>
      <Link href="/zones">
      <ListItem button>
        <ListItemIcon>
          <Avatar className={classes.green}>
            <MapIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Zones" />
      </ListItem>
      </Link>
      {/*<Link href="/statistics">
            <ListItem button>
              <ListItemIcon>
                <Avatar className={classes.orange}>
                  <CategoryIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Statistics" />
            </ListItem>
            </Link>*/}
      <Link href="/updates">
      <ListItem button>
        <ListItemIcon>
          <Avatar className={classes.blue}>
            <DynamicFeedIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Timeline" />
      </ListItem>
      </Link>
    </div>
  )
}
