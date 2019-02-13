import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import DialogConfirm from 'components/DialogConfirm';
import ReduxField from 'components/ReduxField';
import ReduxSelect from 'components/ReduxSelect';
import IconSelector from 'components/IconSelector';

import {
  updateMasterItem,
  setCurrentMaster,
  deleteMasterItem,
  restoreMasterItem,
} from 'containers/App/actions';
import { makeSelectCurrentMaster } from 'containers/App/selectors';

import AttributeTable from './AttributeTable';
import { MASTER_DATA_STATUS, validate, formStyles } from './constants';

class MasterDetail extends PureComponent {
  state = {
    deleteRestoreOpen: false,
    updateOpen: false,
  }

  componentDidMount() {
    const { match: { params }, doSetCurrentMaster } = this.props;
    doSetCurrentMaster(params.masterId);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.initialized && this.props.currentMaster === null) {
      nextProps.initialize(nextProps.currentMaster);
    }
  }

  componentWillUnmount() {
    this.props.doSetCurrentMaster(null);
  }

  handleDeleteRestoreCancel = () => {
    this.setState({ deleteRestoreOpen: false });
  }

  handleDeleteRestoreOpen = () => {
    this.setState({ deleteRestoreOpen: true });
  }

  handleDeleteRestoreConfirm = () => {
    const { doDeleteMasterItem, doRestoreMasterItem, currentMaster, match: { params } } = this.props;
    this.setState({ deleteRestoreOpen: false });
    if (currentMaster !== null) {
      if (currentMaster.active) {
        doDeleteMasterItem(params.masterId);
      } else {
        doRestoreMasterItem(params.masterId);
      }
    }
  }

  handleUpdateCancel = () => {
    this.setState({ updateOpen: false });
  }

  handleUpdateOpen = () => {
    this.setState({ updateOpen: true });
  }

  submit = (values) => {
    const { doUpdateMasterItem, redirect } = this.props;
    this.setState({ updateOpen: false });
    doUpdateMasterItem(values);
    redirect('/master');
  }

  handleBackButton = () => {
    const { redirect } = this.props;
    redirect('/master');
  }

  render() {
    const { classes, handleSubmit, invalid, pristine, currentMaster } = this.props;

    if (currentMaster === null) {
      return (
        <Fade in timeout={700}>
          <Typography variant="h5" className={classes.viewTitle}>Waiting...</Typography>
        </Fade>
      );
    }

    return (
      <Fade in timeout={700}>
        <form>
          <div className={classes.topControl}>
            <Typography variant="h5" className={classes.viewTitle}>Master Data Detail Form</Typography>
            <Button
              variant="contained"
              onClick={this.handleBackButton}
            >
              <BackIcon className={classes.leftIcon} />
              Back
            </Button>
          </div>
          <div className={classes.formContent}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={6}>
                <Field required disabled={!currentMaster.active} name="name" variant="outlined" component={ReduxField} label="Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  disabled={!currentMaster.active}
                  required
                  name="url"
                  variant="outlined"
                  component={ReduxField}
                  label="URL (/)"
                  fullWidth
                  normalize={(value) => {
                    if (value) return value.replace(/ /g, '-');
                    return value;
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Field disabled={!currentMaster.active} required name="status" variant="outlined" multiline component={ReduxSelect} label="Status" fullWidth>
                  <MenuItem value={MASTER_DATA_STATUS.ENABLE}><span className={classes.enableColor} /><span>{MASTER_DATA_STATUS.ENABLE}</span></MenuItem>
                  <MenuItem value={MASTER_DATA_STATUS.DISABLE}><span className={classes.disableColor} /><span>{MASTER_DATA_STATUS.DISABLE}</span></MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Field disabled={!currentMaster.active} required name="icon" variant="outlined" component={IconSelector} label="Icon" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Field disabled={!currentMaster.active} name="description" variant="outlined" multiline component={ReduxField} label="Description" fullWidth />
              </Grid>
            </Grid>
          </div>
          <div className={classes.tableContent}>
            <FieldArray disabled={!currentMaster.active} name="attributes" component={AttributeTable} />
          </div>
          <div className={classes.botControl}>
            <Button
              variant="contained"
              onClick={this.handleBackButton}
            >
              <BackIcon className={classes.leftIcon} />
              Back
            </Button>
            <div className={classes.rightActions}></div>
            <Button
              variant="contained"
              style={{ minWidth: 90 }}
              className={currentMaster.active ? classes.deleteButton : classes.restoreButton}
              onClick={this.handleDeleteRestoreOpen}
            >{currentMaster.active ? 'Delete' : 'Restore'}</Button>
            {
              currentMaster.active ? (
                <Button
                  variant="contained"
                  className={classes.addButton}
                  style={{ minWidth: 100 }}
                  onClick={this.handleUpdateOpen}
                  disabled={invalid || pristine || !currentMaster.active}
                >Update</Button>
              ) : null
            }

          </div>
          <DialogConfirm
            title={`${currentMaster.active ? 'Delete' : 'Restore'} Confirm`}
            contentText={`Do you want to ${currentMaster.active ? 'DELETE' : 'RESTORE'}?`}
            open={this.state.deleteRestoreOpen}
            handleCancel={this.handleDeleteRestoreCancel}
            handleConfirm={this.handleDeleteRestoreConfirm}
          />
          <DialogConfirm
            title="Update Confirm"
            contentText="Do you want to UPDATE information?"
            open={this.state.updateOpen}
            handleCancel={this.handleUpdateCancel}
            handleConfirm={handleSubmit(this.submit)}
          />
        </form>
      </Fade>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentMaster: makeSelectCurrentMaster(),
});

function mapDispatchToProps(dispatch) {
  return {
    redirect: bindActionCreators(push, dispatch),
    doUpdateMasterItem: bindActionCreators(updateMasterItem, dispatch),
    doSetCurrentMaster: bindActionCreators(setCurrentMaster, dispatch),
    doDeleteMasterItem: bindActionCreators(deleteMasterItem, dispatch),
    doRestoreMasterItem: bindActionCreators(restoreMasterItem, dispatch),
  };
}

const connectStyles = withStyles(formStyles);

const connectForm = reduxForm({
  form: 'formMasterDetail',
  validate,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, connectStyles, connectForm)(MasterDetail);
