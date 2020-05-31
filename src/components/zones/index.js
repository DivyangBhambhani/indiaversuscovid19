import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Title from '../common/Title';
import Header from '../common/Header';
import IndiaZoneMap from '../charts/IndiaZoneMap';
import IndiaHotspotsMap from '../charts/IndiaHotspotsMap';
import ZonesDataTable from './ZonesDataTable';
import ZonesByStateDataTable from './ZonesByStateDataTable';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  textWhite: {
    background: '#ffffff'
  },
  textRed: {
    color: '#e53935',
    fontWeight: '900'
  },
  textGreen: {
    color: '#22b66e',
    fontWeight: '900'
  },
  textOrange: {
    color: deepOrange[500],
    fontWeight: '900'
  },
  textBlue: {
    color: '#2196f3',
    fontWeight: '900'
  }
}));

export default function Zones() {
	const classes = useStyles();
	return (
		<Header>
			<Grid container spacing={3}>
        		<Grid item xs={12} md={6} lg={6}>
        			<Paper className={classes.paper}>
						<Title>Zone Map: Covid-19 Cases in India</Title>
						<Typography color="textSecondary" variant="body2" className={classes.depositContext}>
							Pinch out or scroll down to <b>zoom in</b> the zone map to have a closer look at particular zones. Drag/pan the map to move across various zones/areas. Pinch in or scroll upwards to move out of zoom view.
						</Typography>
						<IndiaZoneMap />
			        </Paper>
        		</Grid>
        		<Grid item xs={12} md={6} lg={6}>
        			<Paper className={classes.paper}>
    						<Title>Covid-19 Hotspots in India</Title>
    						<Typography color="textSecondary" variant="body2" className={classes.depositContext}>
    							Pinch out or scroll down to <b>zoom in</b> the zone map to have a closer look at particular zones. Drag/pan the map to move across various zones/areas. Pinch in or scroll upwards to move out of zoom view.
    						</Typography>
    						<IndiaHotspotsMap />
			        </Paper>
        		</Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <ZonesDataTable />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={classes.paper}>
                <ZonesByStateDataTable />
              </Paper>
            </Grid>
        	</Grid>
		</Header>
	)
}