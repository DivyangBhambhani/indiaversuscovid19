import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from '../common/Header';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FiveDaysMovingAverageChart from '../charts/FiveDaysMovingAverageChart';
import Typography from '@material-ui/core/Typography';
import Title from '../common/Title';
import { getDailyCasesSummary, getLockdownSummary } from '../../utils/api';
import LockdownFiveDaysMovingAverageChart from '../charts/LockdownFiveDaysMovingAverageChart';

const useStyles = makeStyles((theme) => ({
  	paper: {
	    padding: theme.spacing(2),
	    display: 'flex',
	    overflow: 'auto',
	    flexDirection: 'column',
  	},
}));

function getDailyDataByType (type) {
	return getDailyCasesSummary(type).then(res => {
		var result = [];
		var movingAvg = [];
		if(res.status == 'success') {
			var resSortedAsc = res.data.data;
			resSortedAsc.sort(function(a, b) {
				a = new Date(a.x);
				b = new Date(b.x);
				return a<b ? -1 : a>b ? 1 : 0;
			});
			resSortedAsc.map((item,index) => {
				result.push({
					x: new Date(item.x),
					y: parseInt(item.y)
				});
			})
			if (result.length > 0) {
				for (var i = 4; i < result.length; i++)
				{
					var mean = (result[i]['y'] + result[i-1]['y'] + result[i-2]['y'] + result[i-3]['y'] + result[i-4]['y'])/5.0;
					movingAvg.push({
						x: new Date(result[i]['x']),
						y: mean
					});
				}
			}
			return {
				result,	
				movingAvg
			}	
			
		}
	})
}

function getLockdownSummaryByDate (startdate, enddate) {
	return getLockdownSummary(startdate, enddate)
	.then(res => {
		var result = [];
		var confirmed = [];
		var deceased = [];
		var recovered = [];
		var movingAvg = [];
		var movingAvgConfirm = [];
		var movingAvgDecease = [];
		var movingAvgRecover = [];
		
		if(res.status == 'success') {
			res.data[0].data.map((item,index) => {
				confirmed.push({
					x: new Date(item.x),
					y: parseInt(item.y)
				});
			})
			res.data[1].data.map((item,index) => {
				deceased.push({
					x: new Date(item.x),
					y: parseInt(item.y)
				});
			})
			res.data[2].data.map((item,index) => {
				recovered.push({
					x: new Date(item.x),
					y: parseInt(item.y)
				});
			});

			result.push.apply(result, [confirmed, deceased, recovered]);

			if (result[0].length > 0) {
				for (var i = 4; i < result[0].length; i++)
				{
					var meanConfirm = (result[0][i]['y'] + result[0][i-1]['y'] + result[0][i-2]['y'] + result[0][i-3]['y'] + result[0][i-4]['y'])/5.0;
					movingAvgConfirm.push({
						x: new Date(result[0][i]['x']),
						y: parseInt(meanConfirm)
					});
				}
			}
			if (result[1].length > 0) {
				for (var i = 4; i < result[1].length; i++)
				{
					var meanDecease = (result[1][i]['y'] + result[1][i-1]['y'] + result[1][i-2]['y'] + result[1][i-3]['y'] + result[1][i-4]['y'])/5.0;
					movingAvgDecease.push({
						x: new Date(result[0][i]['x']),
						y: parseInt(meanDecease)
					});
				}
			}
			if (result[2].length > 0) {
				for (var i = 4; i < result[2].length; i++)
				{
					var meanRecover = (result[2][i]['y'] + result[2][i-1]['y'] + result[2][i-2]['y'] + result[2][i-3]['y'] + result[2][i-4]['y'])/5.0;
					movingAvgRecover.push({
						x: new Date(result[2][i]['x']),
						y: parseInt(meanRecover)
					});
				}
			}

			movingAvg.push.apply(movingAvg, [movingAvgConfirm, movingAvgDecease, movingAvgRecover]);

			return {
				result,	
				movingAvg
			}
			
		}
	})
}

export default function Analytics() {
	const classes = useStyles();
	return (
		<Header>
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} lg={4}>
						<Paper className={classes.paper}>
							<div><span className="badge badge-warning p-2">5-Day Moving Average</span></div>
							<Title>Daily Confirmed Cases</Title>
				            <FiveDaysMovingAverageChart type="dailyconfirmed" data={getDailyDataByType('dailyconfirmed')}/>
				            <Typography variant="caption" color="textSecondary" component="p">
								Blue bars denote daily count of confirmed cases in last 30 days. Orange line shows the 5-Day Simple Moving Average.
							</Typography>
				        </Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Paper className={classes.paper}>
							<div><span className="badge badge-warning p-2">5-Day Moving Average</span></div>
							<Title>Daily Recovered Cases</Title>
				            <FiveDaysMovingAverageChart type="dailyrecovered" data={getDailyDataByType('dailyrecovered')}/>
				            <Typography variant="caption" color="textSecondary" component="p">
								Blue bars denote daily count of recovered cases in last 30 days. Orange line shows the 5-Day Simple Moving Average.
							</Typography>
				        </Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Paper className={classes.paper}>
							<div><span className="badge badge-warning p-2">5-Day Moving Average</span></div>
							<Title>Daily Deaths</Title>
				            <FiveDaysMovingAverageChart type="dailydeceased" data={getDailyDataByType('dailydeceased')}/>
				            <Typography variant="caption" color="textSecondary" component="p">
								Blue bars denote daily count of deaths in last 30 days. Orange line shows the 5-Day Simple Moving Average.
							</Typography>
				        </Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Paper className={classes.paper}>
							<div><span className="badge badge-warning p-2">5-Day Moving Average</span></div>
							<Title>Lockdown 1.0</Title>
				            <LockdownFiveDaysMovingAverageChart data={getLockdownSummaryByDate(new Date('03-25-2020'), new Date('04-14-2020'))}/>
				            <Typography variant="caption" color="textSecondary" component="p">
								Blue bars denote daily count of confirmed cases in Lockdown 1.0. Orange line shows the 5-Day Simple Moving Average of Confirmed Cases. Green line shows the 5-Day Simple Moving Average of Recovered Cases. Red line shows the 5-Day Simple Moving Average of Deceased Cases.
							</Typography>
				        </Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Paper className={classes.paper}>
							<div><span className="badge badge-warning p-2">5-Day Moving Average</span></div>
							<Title>Lockdown 2.0</Title>
				            <LockdownFiveDaysMovingAverageChart data={getLockdownSummaryByDate(new Date('04-15-2020'), new Date('05-03-2020'))}/>
				            <Typography variant="caption" color="textSecondary" component="p">
								Blue bars denote daily count of confirmed cases in Lockdown 2.0. Orange line shows the 5-Day Simple Moving Average of Confirmed Cases. Green line shows the 5-Day Simple Moving Average of Recovered Cases. Red line shows the 5-Day Simple Moving Average of Deceased Cases.
							</Typography>
				        </Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Paper className={classes.paper}>
							<div><span className="badge badge-warning p-2">5-Day Moving Average</span></div>
							<Title>Lockdown 3.0</Title>
				            <LockdownFiveDaysMovingAverageChart data={getLockdownSummaryByDate(new Date('05-04-2020'), new Date('05-17-2020'))}/>
				            <Typography variant="caption" color="textSecondary" component="p">
								Blue bars denote daily count of confirmed cases in Lockdown 3.0. Orange line shows the 5-Day Simple Moving Average of Confirmed Cases. Green line shows the 5-Day Simple Moving Average of Recovered Cases. Red line shows the 5-Day Simple Moving Average of Deceased Cases.
							</Typography>
				        </Paper>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Paper className={classes.paper}>
							<div><span className="badge badge-warning p-2">5-Day Moving Average</span></div>
							<Title>Lockdown 4.0</Title>
				            <LockdownFiveDaysMovingAverageChart data={getLockdownSummaryByDate(new Date('05-18-2020'), new Date('05-30-2020'))}/>
				            <Typography variant="caption" color="textSecondary" component="p">
								Blue bars denote daily count of confirmed cases in Lockdown 4.0. Orange line shows the 5-Day Simple Moving Average of Confirmed Cases. Green line shows the 5-Day Simple Moving Average of Recovered Cases. Red line shows the 5-Day Simple Moving Average of Deceased Cases.
							</Typography>
				        </Paper>
					</Grid>
	        	</Grid>
        	</div>
		</Header>
	)
}