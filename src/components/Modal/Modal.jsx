import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    props.setModalStatus(false);
  };


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.status}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={'div'}>
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.buttons}
        </DialogActions>
      </Dialog>
    </div>
  );
}