import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../common/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import UpdateCard from './UpdateCard';
import Timeline from './Timeline';
import { newsData } from './newsData';
import Title from '../common/Title';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function LatestUpdates() {
	const classes = useStyles();
	return (
		<Header>
			<div className={classes.root}>
				<Grid container spacing={3}>
					{/*<Grid item xs={12} md={6} lg={6}>
											<Grid container spacing={3}>
								    			{newsData.map((item, index) => (
								    				<Grid key={index} item xs={12} md={12} lg={6}>
								    					<UpdateCard data={item} />
								    				</Grid>
								    			))}
						    				</Grid>
						    			</Grid>*/}
	    			<Grid item xs={12} md={12} lg={12}>
	    				<Paper className={classes.paper}>
	    					<Title>Covid-19 Timeline</Title>
	    					<Typography variant="body2" color="textSecondary" component="p" className="mb-3">
							The order in which the significant events related to the pandemic took place in India. Click on <b>Next Event</b> and <b>Previous Event</b> to jump between events.
							</Typography>
							<Timeline />			
	    				</Paper>
	    			</Grid>
	        	</Grid>
        	</div>
		</Header>
	)
}