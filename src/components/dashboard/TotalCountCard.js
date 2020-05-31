import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  
});

export default function TotalCountCard(props) {
  const classes = useStyles();
  const [date, setDate] = React.useState('');
  const [text, setText] = React.useState('');
  const [count, setCount] = React.useState('');
  
  const handleDateAndCount = (obj) => {
    var date = new Date(obj.x).toDateString();
    setDate(date);
    setCount(obj.y);
  };
  return (
    <React.Fragment>
      <Paper className={props.paper}>
        <Typography component="p" className="text-black-50" variant="subtitle1">
          {props.delta ? `+${props.delta}` : 'NA'}
        </Typography>
        <Typography component="p" className={props.color} variant="h4">
          {props.count}
        </Typography>
        <Typography component="p" className={props.color} variant="body1">
          {props.text}
        </Typography>
        <Typography color="textSecondary" variant="body2" className={classes.depositContext}>
          Last Updated: {props.date}
        </Typography>
      </Paper>
    </React.Fragment>
  );
}