import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';

import ReduxField from 'components/ReduxField';

function styles() {
  return {
    topControl: {
      padding: '5px 0px',
      display: 'flex',
    },
    viewTitle: {
      flexGrow: 1,
    },
    leftIcon: {
      marginRight: 5,
    },
    botControl: {
      padding: '5px 0px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    rightActions: {
      flexGrow: 1,
    },
    addButton: {
      marginLeft: 10,
      backgroundColor: '#009688',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#4db6ac',
      },
    },
  };
}

class MasterCreate extends PureComponent {
  render() {
    const { classes, redirect } = this.props;
    return (
      <Fade in timeout={700}>
        <form>
          <div className={classes.topControl}>
            <Typography variant="h5" className={classes.viewTitle}>Master Data Create Form</Typography>
            <Button
              variant="contained"
              onClick={() => redirect('/master')}
            >
              <BackIcon className={classes.leftIcon} />
              Back
            </Button>
          </div>
          <div className={classes.botControl}>
            <Button
              variant="contained"
              onClick={() => redirect('/master')}
            >
              <BackIcon className={classes.leftIcon} />
              Back
            </Button>
            <div className={classes.rightActions}></div>
            <Button
              variant="contained"
              className={classes.addButton}
              style={{ minWidth: 100 }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Fade>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    redirect: bindActionCreators(push, dispatch),
  };
}

const connectStyles = withStyles(styles);
const connectForm = reduxForm({
  form: 'formMasterCreate',
});
const withConnect = connect(null, mapDispatchToProps);


export default compose(withConnect, connectStyles, connectForm)(MasterCreate);
