import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

function styles() {
  return {
    root: {
      minWidth: 300,
    },
  };
}

class DialogConfirm extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent className={this.props.classes.root}>
          <DialogContentText id="alert-dialog-description">{this.props.contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.handleCancel}
            color="primary"
          >Cancel</Button>
          <Button
            onClick={this.props.handleConfirm}
            color="primary"
            autoFocus
          >Confirm</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(DialogConfirm);
