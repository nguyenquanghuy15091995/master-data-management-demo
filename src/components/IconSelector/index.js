import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import { ICON_LIST } from 'utils/icons';

function styles() {
  return {
    selectContainer: {
      height: '100%',
      width: '100%',
    },
    button: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      display: 'none',
    },
    dialogContentCustom: {

    },
    actionButton: {
      color: '#1e88e5',
    },
    gridColumn: {
      justifyContent: 'center',
      display: 'flex',
    },
    iconShow: {
      fontSize: 25,
      color: '#595959',
    },
    iconItem: {
      fontSize: 30,
      color: '#737373',
    },
    iconSelected: {
      fontSize: 30,
      color: '#1e88e5',
    },
  };
}

class IconSelector extends Component {
  state = {
    open: false,
    currentIcon: '',
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
      currentIcon: this.props.input.value,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
      currentIcon: '',
    });
  }

  selectIcon = (iconName) => {
    this.setState({
      currentIcon: iconName,
    });
  }

  selectToForm = () => {
    this.setState({
      open: false,
      currentIcon: '',
    });
    this.props.input.onChange(this.state.currentIcon);
  }

  render() {
    const {
      classes,
      input,
      label,
    } = this.props;
    return (
      <div className={classes.selectContainer}>
        <Button variant="outlined" className={classes.button} onClick={this.handleClickOpen}>
          {label}
          {input.value ? <span style={{ marginRight: 10 }}>:</span> : null}
          {input.value ? <Icon className={classes.iconShow}>{input.value}</Icon> : null}
        </Button>
        <input {...input} className={classes.input} />
        <Dialog
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          open={this.state.open}
        >
          <DialogTitle id="alert-dialog-title">Icon List</DialogTitle>
          <DialogContent className={classes.dialogContentCustom}>
            <Grid container spacing={24}>
              {
                ICON_LIST.map((iconName) => (
                  <Grid item md={3} className={classes.gridColumn} key={iconName}>
                    <Button onClick={() => this.selectIcon(iconName)}>
                      <Icon className={this.state.currentIcon === iconName ? classes.iconSelected : classes.iconItem}>{iconName}</Icon>
                    </Button>
                  </Grid>
                ))
              }
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} className={classes.actionButton}>
              Disagree
            </Button>
            <Button onClick={this.selectToForm} className={classes.actionButton} autoFocus>
              Select
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(IconSelector);
