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
  setHeaderTitle,
} from 'containers/App/constants';
import {
  setCurrentObject,
  createObjectData,
} from 'containers/App/actions';
import {
  ATTRIBUTE_TYPES,
} from 'containers/MasterPage/constants';

import { formStyles, validate } from './constants';

class ObjectCreate extends PureComponent {
  state = {
    createOpen: false,
  }

  componentDidMount() {
    const { currentMaster } = this.props;
    setHeaderTitle(currentMaster);
  }

  handleCreateCancel = () => {
    this.setState({ createOpen: false });
  }

  handleCreateOpen = () => {
    this.setState({ createOpen: true });
  }

  submit = (values) => {
    const { redirect, currentMaster, doCreateObjectData } = this.props;
    const temp = values.toJS();
    const idTemp = Date.now();
    const result = {
      ...temp,
      id: idTemp,
    };
    doCreateObjectData(result, currentMaster.id);
    redirect(`${currentMaster.url}/${currentMaster.id}`)
  }

  render() {
    const { currentMaster, classes, redirect, invalid, pristine, handleSubmit } = this.props;

    if (currentMaster === null || currentMaster === undefined) {
      return (
        <Typography variant="h5" className={classes.viewTitle}>Waiting...</Typography>
      );
    }

    return (
      <Fade in timeout={700}>
        <form>
          <div className={classes.topControl}>
            <Typography variant="h5" className={classes.viewTitle}>{currentMaster.name} Create Form</Typography>
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
                  if (attribute.type === ATTRIBUTE_TYPES.number) {
                    return (
                      <Grid key={attribute.id} item sm={12} md={6}>
                        <Field
                          required={attribute.required}
                          name={attribute.code}
                          variant="outlined"
                          component={ReduxField}
                          label={attribute.name}
                          fullWidth
                          type="number"
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
              className={classes.addButton}
              style={{ minWidth: 100 }}
              onClick={this.handleCreateOpen}
              disabled={invalid || pristine}
            >Submit</Button>
          </div>
          <DialogConfirm
            title="Create Confirm"
            contentText="Do you want to CREATE information?"
            open={this.state.createOpen}
            handleCancel={this.handleCreateCancel}
            handleConfirm={handleSubmit(this.submit)}
          />
        </form>
      </Fade>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doSetCurrentObject: bindActionCreators(setCurrentObject, dispatch),
    redirect: bindActionCreators(push, dispatch),
    doCreateObjectData: bindActionCreators(createObjectData, dispatch),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const connectStyles = withStyles(formStyles);

const connectForm = reduxForm({
  form: 'formObjectCreate',
  validate,
});

export default compose(connectForm, connectStyles, withConnect)(ObjectCreate);
