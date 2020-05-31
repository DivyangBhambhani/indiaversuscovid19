import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getDistrictDataByState } from '../../utils/api';
import Title from '../common/Title';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
  container: {
    maxHeight: 610,
    marginTop: 10
  },
  bgDtWarning: {
    background:'#fdffb6 !important'
  },
  bgDtPrimary: {
    background:'#a0c4ff !important'
  },
  bgDtSuccess: {
    background:'#caffbf !important'
  },
  bgDtDanger: {
    background:'#ffadad !important'
  }
});

export default function DistrictCasesDataTable(props) {
  const classes = useStyles();
  const [districtCases, setDistrictCases] = React.useState([]);
  const [stateName, setStateName] = React.useState('Maharashtra');
  const districtTable = React.useRef(null)

  React.useEffect(() => {
    if(props.clickedState.properties) {
      getDistrictDataByState(props.clickedState.properties.name)
        .then(res => {
          setDistrictCases(res.data);
          setStateName(props.clickedState.properties.name);
          window.scrollTo(0, districtTable.current.offsetTop);
        })
    } else {
      getDistrictDataByState('Maharashtra')
        .then(res => {
          setDistrictCases(res.data);
          setStateName('Maharashtra');
          window.scrollTo(0, districtTable.current.offsetTop);
        })
    }
  },[props]);
  return (
    <React.Fragment>
      <Title>District Wise Covid-19 Cases in {stateName}</Title>
      <Typography color="textSecondary" variant="body2" className={classes.depositContext}>
        Hover over any state to know its count. Higher number of cases is depicted by darker shade and vice versa.
      </Typography>
      <TableContainer className={classes.container} component={Paper} ref={districtTable}>
        <Table className={classes.table} size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right">District Name</TableCell>
              <TableCell align="center">Confirmed</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Recovered</TableCell>
              <TableCell align="center">Deaths</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              districtCases &&
              districtCases.map((row) => (
                <TableRow hover key={row.name}>
                  <TableCell align="right">
                    {row.name}
                  </TableCell>
                  <TableCell className={classes.bgDtWarning} align="center">{row.confirmed}</TableCell>
                  <TableCell className={classes.bgDtPrimary} align="center">{row.active}</TableCell>
                  <TableCell className={classes.bgDtSuccess} align="center">{row.recovered}</TableCell>
                  <TableCell className={classes.bgDtDanger} align="center">{row.deceased}</TableCell>
                </TableRow>
              ))
            }
            {
              districtCases.length === 0 &&
              <TableRow>
                <TableCell colSpan={5}>
                  Click on any state to view its districts data
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}