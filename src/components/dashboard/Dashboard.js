import React from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MiniCharts from './MiniCharts';
import DistrictCasesDataTable from './DistrictCasesDataTable';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import TotalCountCard from './TotalCountCard';
import IndiaMapChoropleth from '../charts/IndiaMapChart';
import TimeSeriesChart from '../charts/TimeSeriesChart';
import IndiaHeatmapChoroplethChart from '../charts/IndiaHeatmapChoroplethChart';
import IndiaZoneMap from '../charts/IndiaZoneMap';
import { getCasesTimeSeries, getTotalSummaryData, getStateWiseData } from '../../utils/api';
import Title from '../common/Title';
import Header from '../common/Header';
import StateCasesDataTable from './StateCasesDataTable';

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

export default function Dashboard() {
  const classes = useStyles();
  const [stateCases, setStateCases] = React.useState([]);
  const [clickedState, setClickedState] = React.useState([]);
  const [totalSummary, setTotalSummary] = React.useState([]);
  const [stateWise, setStateWise] = React.useState([]);
  React.useEffect(() => {
    getCasesTimeSeries().then((res) => {
      setStateCases(res.data);
    });
    getTotalSummaryData().then((res) => {
      setTotalSummary(res.data)
    });
    getStateWiseData().then((res) => {
      setStateWise(res.data)
    })
  },[]);
  const handleClickState = (geo) => {
    setClickedState(geo)
  }

  return (
    <Header>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <TotalCountCard 
            date={totalSummary.lastupdatedtime}
            count={totalSummary.confirmed}
            delta={totalSummary.deltaconfirmed}
            text="Confirmed" 
            color={classes.textOrange} 
            paper={classes.paper}/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TotalCountCard 
            date={totalSummary.lastupdatedtime}
            count={totalSummary.active}
            text="Active" 
            color={classes.textBlue} 
            paper={classes.paper}/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TotalCountCard 
            date={totalSummary.lastupdatedtime}
            count={totalSummary.recovered}
            delta={totalSummary.deltarecovered}
            text="Recovered" 
            color={classes.textGreen} 
            paper={classes.paper}/>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TotalCountCard 
            date={totalSummary.lastupdatedtime}
            count={totalSummary.deaths}
            delta={totalSummary.deltadeaths}
            text="Deaths"
            color={classes.textRed}
            paper={classes.paper}/>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <TimeSeriesChart />
          </Paper>
        </Grid>
        {/* State Cases */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={classes.paper}>
            <StateCasesDataTable casesData={stateWise} />
          </Paper>
        </Grid>
        {/* Mini Charts */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <MiniCharts
              title={"Confirmed Cases"}
              index={"dailyconfirmed"}
            />
          </Paper>
        </Grid>
        {/* Mini Charts */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <MiniCharts
              title={"Recovered Cases"}
              index={"dailyrecovered"}
            />
          </Paper>
        </Grid>
        {/* Mini Charts */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <MiniCharts
              title={"Deaths"}
              index={"dailydeceased"}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <Paper className={classes.paper}>
            <Title>Heatmap: Covid-19 Cases in India</Title>
            <Typography color="textSecondary" variant="body2" className={classes.depositContext}>
              Hover over any state to know its count. Higher number of cases is depicted by darker shade and vice versa.
            </Typography>
            <IndiaHeatmapChoroplethChart stateCasesData={stateCases} fnStateClicked={handleClickState} />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12} md={12} lg={6}>
          <Paper className={classes.paper}>
            <DistrictCasesDataTable clickedState={clickedState} />
          </Paper>
        </Grid>
      </Grid>
    </Header>
  );
}