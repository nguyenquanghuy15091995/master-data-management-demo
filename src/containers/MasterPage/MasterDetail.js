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

import ReduxField from 'components/ReduxField';
import ReduxSelect from 'components/ReduxSelect';
import IconSelector from 'components/IconSelector';

import { updateMasterItem, setCurrentMaster } from 'containers/App/actions';
import { makeSelectCurrentMaster } from 'containers/App/selectors';

import AttributeTable from './AttributeTable';
import { MASTER_DATA_STATUS, validate, formStyles } from './constants';

class MasterDetail extends PureComponent {
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

  submit = (values) => {
    const { doUpdateMasterItem, redirect } = this.props;
    doUpdateMasterItem(values);
    redirect('/master');
  }

  handleBackButton = () => {
    const { redirect } = this.props;
    redirect('/master');
  }

  render() {
    const { classes, handleSubmit, invalid, pristine } = this.props;
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
                <Field required name="name" variant="outlined" component={ReduxField} label="Name" fullWidth />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Grid item xs={12} sm={12} md={12}>
                  <Field
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
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Field required name="status" variant="outlined" multiline component={ReduxSelect} label="Status" fullWidth>
                  <MenuItem value={MASTER_DATA_STATUS.ENABLE}><span className={classes.enableColor} /><span>{MASTER_DATA_STATUS.ENABLE}</span></MenuItem>
                  <MenuItem value={MASTER_DATA_STATUS.DISABLE}><span className={classes.disableColor} /><span>{MASTER_DATA_STATUS.DISABLE}</span></MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Field required name="icon" variant="outlined" component={IconSelector} label="Icon" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Field name="description" variant="outlined" multiline component={ReduxField} label="Description" fullWidth />
              </Grid>
            </Grid>
          </div>
          <div className={classes.tableContent}>
            <FieldArray name="attributes" component={AttributeTable} />
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
              className={classes.addButton}
              style={{ minWidth: 100 }}
              onClick={handleSubmit(this.submit)}
              disabled={invalid || pristine}
            >
              Submit
            </Button>
          </div>
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
  };
}

const connectStyles = withStyles(formStyles);

const connectForm = reduxForm({
  form: 'formMasterDetail',
  validate,
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, connectStyles, connectForm)(MasterDetail);
