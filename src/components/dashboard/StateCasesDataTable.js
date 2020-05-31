import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import { getDistrictDataByState } from '../../utils/api';
import Title from '../common/Title';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function StateCasesDataTable(props) {
  const classes = useStyles();
  const [stateCases, setStateCases] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, stateCases.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setStateCases(props.casesData);
  },[props]);

  return (
    <React.Fragment>
      <Title>State Wise Covid-19 Cases</Title>
      <Grid style={{background: '#f6fafb', marginTop: '0.5rem'}} container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="State cases data table">
            <TableHead>
              <TableRow>
                <StyledTableCell>State Name</StyledTableCell>
                <StyledTableCell align="center">Confirmed</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>
                <StyledTableCell align="center">Recovered</StyledTableCell>
                <StyledTableCell align="center">Deaths</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                stateCases &&
                (rowsPerPage > 0
                  ? stateCases.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : stateCases
                ).map((row) => (
                  <StyledTableRow key={row.state}>
                    <TableCell>
                      {row.state}
                    </TableCell>
                    <TableCell align="center"><span className="badge badge-warning text-small">{row.confirmed}</span></TableCell>
                    <TableCell align="center"><span className="badge badge-primary text-small">{row.active}</span></TableCell>
                    <TableCell align="center"><span className="badge badge-success text-small">{row.recovered}</span></TableCell>
                    <TableCell align="center"><span className="badge badge-danger text-small">{row.deaths}</span></TableCell>
                  </StyledTableRow>
                ))
              }
              {
                stateCases.length === 0 &&
                <TableRow>
                  <StyledTableCell colSpan={5}>
                    Click on any state to view its districts data
                  </StyledTableCell>
                </TableRow>
              }
            </TableBody>
            <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={stateCases.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
          </Table>
        </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
