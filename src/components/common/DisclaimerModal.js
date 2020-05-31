import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DisclaimerModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Disclaimer
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Disclaimer - IndiaVersusCovid19.com
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            INFORMATION DISPLAYED ON THIS WEBSITE IS BASED ON THE DATA FETCHED USING API.COVID19INDIA.ORG. WHILE WE TAKE GREAT EFFORTS TO ENSURE THE VALIDITY OF THE DATA, CERTAIN ERRORS MAY OCCUR. THIS INFORMATION IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS, COPYRIGHT HOLDERS OR VOLUNTEERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE INFORMATION OR THE USE OR OTHER DEALINGS IN THE WEBSITE.
          </Typography>
          <Typography gutterBottom>
            IndiaVersusCovid19.com takes no responsibility for the website’s availability, accessibility, uptime or any reliance on the website. IndiaVersusCovid19.com is not directly or indirectly owned or managed by, and is not associated with, any organizations under the guise of the Government of India, or any other government or official body. Information on the website may be inaccurate and these inaccuracies, along with any other aspect of the website, may be updated without notice. Relying on the information provided is therefore strictly at your own risk. While we try to restrict links to sources volunteers deemed reliable, we do not accept any liability for, nor do we directly endorse any of the websites that are linked to on the website.
          </Typography>
          <Typography gutterBottom>
            The boundaries and names shown and the designations used on this map do not imply the expression of any opinion whatsoever on the part of IndiaVersusCovid19.com concerning the legal status of any state, district, territory, city or area or of its authorities, or concerning the delimitation of its frontiers or boundaries. Lines on maps represent the approximate border lines for which there may not yet be full agreement.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" autoFocus onClick={handleClose} >
            I Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
