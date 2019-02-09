import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { push } from 'connected-react-router';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Map as iMap } from 'immutable';

import ReduxField from 'components/ReduxField';
import ReduxSelect from 'components/ReduxSelect';
import IconSelector from 'components/IconSelector';

import { createMasterItem } from 'containers/App/actions';

import AttributeTable from './AttributeTable';
import { MASTER_DATA_STATUS } from './constants';

function styles() {
  return {
    topControl: {
      padding: '5px 0px 20px 0px',
      display: 'flex',
      borderBottom: '1px solid #ccc',
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
    formContent: {
      padding: '40px 40px 30px 40px',
    },
    tableContent: {
      padding: '10px 20px 30px 20px',
    },
    rightActions: {
      flexGrow: 1,
    },
    addButton: {
      marginLeft: 10,
      backgroundColor: '#1e88e5',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#2196f3',
      },
    },
    enableColor: {
      display: 'inline-block',
      backgroundColor: '#2962ff',
      padding: 10,
      marginRight: 10,
      borderRadius: '50%',
    },
    disableColor: {
      display: 'inline-block',
      backgroundColor: '#f50057',
      padding: 10,
      marginRight: 10,
      borderRadius: '50%',
    },
  };
}

class MasterCreate extends PureComponent {
  componentDidMount() {
    this.props.initialize({
      status: MASTER_DATA_STATUS.ENABLE,
    });
  }

  submit = (values) => {
    const { doCreateMasterItem } = this.props;
    const temp = values.toJS();
    const urlTemp = '/' + temp.url.split('/').join('');
    const idTemp = Date.now();
    const result = iMap({
      ...temp,
      id: idTemp,
      url: urlTemp,
    });
    doCreateMasterItem(result);
  }

  render() {
    const { classes, redirect, handleSubmit } = this.props;
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
          <div className={classes.formContent}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12} md={6}><Field name="name" variant="outlined" component={ReduxField} label="Name" fullWidth /></Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Grid item xs={12} sm={12} md={12}>
                  <Field
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
                <Field name="status" variant="outlined" multiline component={ReduxSelect} label="Status" fullWidth>
                  <MenuItem value={MASTER_DATA_STATUS.ENABLE}><span className={classes.enableColor} /><span>{MASTER_DATA_STATUS.ENABLE}</span></MenuItem>
                  <MenuItem value={MASTER_DATA_STATUS.DISABLE}><span className={classes.disableColor} /><span>{MASTER_DATA_STATUS.DISABLE}</span></MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Field name="icon" variant="outlined" component={IconSelector} label="Icon" />
              </Grid>
              <Grid item xs={12} sm={12} md={12}><Field name="description" variant="outlined" multiline component={ReduxField} label="Description" fullWidth /></Grid>
            </Grid>
          </div>
          <div className={classes.tableContent}>
            <FieldArray name="attributes" component={AttributeTable} />
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
              onClick={handleSubmit(this.submit)}
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
    doCreateMasterItem: bindActionCreators(createMasterItem, dispatch),
  };
}

const connectStyles = withStyles(styles);
const connectForm = reduxForm({
  form: 'formMasterCreate',
});
const withConnect = connect(null, mapDispatchToProps);


export default compose(withConnect, connectStyles, connectForm)(MasterCreate);
