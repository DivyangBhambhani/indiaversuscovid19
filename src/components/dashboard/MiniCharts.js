import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../common/Title';
import TimeSeriesMiniChart from '../charts/TimeSeriesMiniChart';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function MiniCharts(props) {
  const classes = useStyles();
  const [date, setDate] = React.useState('');
  const [count, setCount] = React.useState('');
  
  const handleDateAndCount = (obj) => {
    var date = new Date(obj.x).toDateString();
    setDate(date);
    setCount(obj.y);
  };
  
  return (
    <React.Fragment>
      <div><span className="badge badge-dark p-2">Frequency: Daily</span></div>
      <Title>{props.title} in Last 30 Days</Title>
      <Typography component="p" color="secondary" variant="h4">
        {`+${count}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        cases as on <i>{date}</i>
      </Typography>
      <div>
        <TimeSeriesMiniChart fnHandleDateCount={handleDateAndCount} index={props.index} />
      </div>
      <Typography variant="caption">
        Data for current date ({new Date().toDateString()}) keeps on increasing as new cases are identified. The exact count of cases for a date can be checked on next day.
      </Typography>
    </React.Fragment>
  );
}