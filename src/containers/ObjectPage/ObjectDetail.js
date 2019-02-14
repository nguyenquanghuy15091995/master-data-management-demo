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
import ReduxCheckbox from 'components/ReduxCheckbox';
import CustomTable from 'components/CustomTable';
import ReduxField from 'components/ReduxField';
import ReduxSelect from 'components/ReduxSelect';

import {
  makeSelectCurrentObject,
} from 'containers/App/selectors';
import {
  setHeaderTitle,
} from 'containers/App/constants';
import {
  setCurrentObject,
  updateObjectData,
  deleteObjectData,
} from 'containers/App/actions';
import {
  ATTRIBUTE_TYPES,
} from 'containers/MasterPage/constants';

import { formStyles, validate } from './constants';

class ObjectDetail extends PureComponent {
  state = {
    updateOpen: false,
    deleteOpen: false,
  }

  componentDidMount() {
    const { currentMaster, doSetCurrentObject, match: { params } } = this.props;
    setHeaderTitle(currentMaster);
    doSetCurrentObject(params.masterId)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.initialized) {
      nextProps.initialize(nextProps.currentObject.data.find(obj => '' + obj.id === '' + nextProps.match.params.dataId));
    }
  }

  handleUpdateCancel = () => {
    this.setState({ updateOpen: false });
  }

  handleUpdateOpen = () => {
    this.setState({ updateOpen: true });
  }

  handleDeleteCancel = () => {
    this.setState({ deleteOpen: false });
  }

  handleDeleteOpen = () => {
    this.setState({ deleteOpen: true });
  }

  submitUpdate = (values) => {
    const { redirect, currentMaster, doUpdateObjectData, currentObject } = this.props;
    doUpdateObjectData(values, currentObject.id);
    this.setState({ updateOpen: false });
    redirect(`${currentMaster.url}/${currentMaster.id}`)
  }

  submitDelete = () => {
    const { redirect, currentMaster, match: { params }, doDeleteObjectData, currentObject } = this.props;
    doDeleteObjectData(params.dataId, currentObject.id);
    this.setState({ deleteOpen: false });
    redirect(`${currentMaster.url}/${currentMaster.id}`)
  }

  render() {
    const { currentMaster, currentObject, classes, redirect, invalid, pristine, handleSubmit } = this.props;

    if (currentMaster === null
      || currentMaster === undefined
      || currentObject === null
      || currentObject === undefined) {
      return (
        <Typography variant="h5" className={classes.viewTitle}>Waiting...</Typography>
      );
    }
    return (
      <Fade in timeout={700}>
        <form>
          <div className={classes.topControl}>
            <Typography variant="h5" className={classes.viewTitle}>{currentMaster.name} Detail Form</Typography>
            <Button
              variant="contained"
              onClick={() => redirect(`${currentMaster.url}/${currentMaster.id}`)}
            >
              <BackIcon className={classes.leftIcon} />
              Back
          </Button>
          </div>
          <div className={classes.formContent}>
            <Grid container spacing={24}>
              {
                currentMaster.attributes.map((attribute) => {
                  if (attribute.type === ATTRIBUTE_TYPES.longText) {
                    return (
                      <Grid key={attribute.id} item sm={12} md={12}>
                        <Field
                          required={attribute.required}
                          name={attribute.code}
                          variant="outlined"
                          component={ReduxField}
                          label={attribute.name}
                          fullWidth
                          multiline
                        />
                      </Grid>
                    );
                  }
                  return (
                    <Grid key={attribute.id} item sm={12} md={6}>
                      <Field
                        required={attribute.required}
                        name={attribute.code}
                        variant="outlined"
                        component={ReduxField}
                        label={attribute.name}
                        fullWidth
                      />
                    </Grid>
                  );
                })
              }
            </Grid>
          </div>
          <div className={classes.botControl}>
            <Button
              variant="contained"
              onClick={() => redirect(`${currentMaster.url}/${currentMaster.id}`)}
            >
              <BackIcon className={classes.leftIcon} />
              Back
          </Button>
            <div className={classes.rightActions}></div>
            <Button
              variant="contained"
              className={classes.deleteButton}
              style={{ minWidth: 100 }}
              onClick={this.handleDeleteOpen}
            >Delete</Button>
            <Button
              variant="contained"
              className={classes.addButton}
              style={{ minWidth: 100 }}
              onClick={this.handleUpdateOpen}
              disabled={invalid || pristine}
            >Update</Button>
          </div>
          <DialogConfirm
            title="Update Confirm"
            contentText="Do you want to UPDATE information?"
            open={this.state.updateOpen}
            handleCancel={this.handleUpdateCancel}
            handleConfirm={handleSubmit(this.submitUpdate)}
          />
          <DialogConfirm
            title="Delete Confirm"
            contentText="Do you want to DELETE information?"
            open={this.state.deleteOpen}
            handleCancel={this.handleDeleteCancel}
            handleConfirm={this.submitDelete}
          />
        </form>
      </Fade>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentObject: makeSelectCurrentObject(),
});

function mapDispatchToProps(dispatch) {
  return {
    doSetCurrentObject: bindActionCreators(setCurrentObject, dispatch),
    redirect: bindActionCreators(push, dispatch),
    doUpdateObjectData: bindActionCreators(updateObjectData, dispatch),
    doDeleteObjectData: bindActionCreators(deleteObjectData, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const connectStyles = withStyles(formStyles);

const connectForm = reduxForm({
  form: 'formObjectDetail',
  validate,
});

export default compose(connectForm, connectStyles, withConnect)(ObjectDetail);
