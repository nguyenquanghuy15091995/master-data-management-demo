import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { Field, change } from 'redux-form/immutable';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddListIcon from '@material-ui/icons/LibraryAdd';
import MenuItem from '@material-ui/core/MenuItem';

import ReduxCheckbox from 'components/ReduxCheckbox';
import CustomTable from 'components/CustomTable';
import ReduxField from 'components/ReduxField';
import ReduxSelect from 'components/ReduxSelect';

import { ATTRIBUTE_LIST_HEADER, ATTRIBUTE_TYPES, MASTER_DATA_STATUS } from './constants';

function styles() {
  return {
    addButton: {
      marginLeft: 10,
      backgroundColor: '#009688',
      color: '#FFF',
      '&:hover': {
        backgroundColor: '#4db6ac',
      },
      '&:disabled': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
      },
    },
    totalRecord: {
      flexGrow: 1,
    },
    tfooter: {
      display: 'flex',
      padding: '15px 5px',
    },
    enableColor: {
      display: 'inline-block',
      backgroundColor: '#4caf50',
      padding: 6,
      marginRight: 10,
      borderRadius: '50%',
    },
    disableColor: {
      display: 'inline-block',
      backgroundColor: '#607d8b',
      padding: 6,
      marginRight: 10,
      borderRadius: '50%',
    },
    attCell: {
      padding: '4px 12px',
    },
  };
}

class AttributeTable extends Component {
  addRow = () => {
    this.props.fields.push({ id: '' + Date.now() + this.props.fields.length });
  }

  render() {
    const {
      fields,
      changeValue,
      meta,
      classes,
      disabled,
    } = this.props;
    return (
      <div>
        <Typography variant="h6">Attribute List</Typography>
        <CustomTable>
          <TableHead>
            <TableRow>
              {
                ATTRIBUTE_LIST_HEADER.map((item) => (
                  <TableCell
                    key={item.id}
                    component="th"
                    scope="row"
                    align={item.value === 'actions' || item.value === 'required' ? 'center' : 'left'}
                    style={{ padding: item.value === 'required' ? 0 : '4px 56px 4px 24px' }}
                  >
                    {item.name}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              fields.map((field, index) => (
                <TableRow key={field}>
                  {
                    ATTRIBUTE_LIST_HEADER.map(item => {
                      if (item.value === 'actions') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row" align="center">
                            <IconButton disabled={disabled} aria-label="Delete" onClick={() => fields.remove(index)}>
                              <DeleteIcon style={{ color: disabled ? 'rgba(0, 0, 0, 0.12)' : '#e53935', fontSize: 20 }} />
                            </IconButton>
                          </TableCell>
                        );
                      }
                      if (item.value === 'type') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                            <Field disabled={disabled} name={`${field}.${item.value}`} multiline component={ReduxSelect} fullWidth>
                              <MenuItem value={ATTRIBUTE_TYPES.text}>{ATTRIBUTE_TYPES.text}</MenuItem>
                              <MenuItem value={ATTRIBUTE_TYPES.longText}>{ATTRIBUTE_TYPES.longText}</MenuItem>
                              <MenuItem value={ATTRIBUTE_TYPES.number}>{ATTRIBUTE_TYPES.number}</MenuItem>
                            </Field>
                          </TableCell>
                        );
                      }
                      if (item.value === 'status') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                            <Field disabled={disabled} name={`${field}.${item.value}`} minWidth={120} multiline component={ReduxSelect} fullWidth>
                              <MenuItem value={MASTER_DATA_STATUS.ENABLE}><span className={classes.enableColor} /><span>{MASTER_DATA_STATUS.ENABLE}</span></MenuItem>
                              <MenuItem value={MASTER_DATA_STATUS.DISABLE}><span className={classes.disableColor} /><span>{MASTER_DATA_STATUS.DISABLE}</span></MenuItem>
                            </Field>
                          </TableCell>
                        );
                      }
                      if (item.value === 'description') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                            <Field disabled={disabled} name={`${field}.${item.value}`} style={{ minWidth: 250 }} multiline component={ReduxField} fullWidth />
                          </TableCell>
                        );
                      }
                      if (item.value === 'name') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                            <Field
                              disabled={disabled}
                              nonHelpText
                              name={`${field}.${item.value}`}
                              style={{ minWidth: 100 }}
                              component={ReduxField}
                              fullWidth
                              onChange={(event, newValue, previousValue, name) => {
                                let code = '';
                                if (newValue === null || newValue === undefined) {
                                  code = '';
                                } else {
                                  code = newValue.replace(/ /g, '_');
                                }
                                changeValue(meta.form, `${field}.code`, code);
                              }}
                            />
                          </TableCell>
                        );
                      }
                      if (item.value === 'code') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                            <Field nonHelpText disabled name={`${field}.${item.value}`} component={ReduxField} fullWidth />
                          </TableCell>
                        );
                      }
                      if (item.value === 'required') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} align="center" component="td" scope="row">
                            <Field nonHelpText disabled name={`${field}.${item.value}`} color="primary" component={ReduxCheckbox} style={{ margin: 0 }} />
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                          <Field nonHelpText name={`${field}.${item.value}`} component={ReduxField} fullWidth />
                        </TableCell>
                      );
                    })
                  }
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell component="td" scope="row" align="center" colSpan={ATTRIBUTE_LIST_HEADER.length}>
                <div className={classes.tfooter}>
                  <div className={classes.totalRecord}>
                    <Typography variant="h6">Total records: {fields.length}</Typography>
                  </div>
                  <Button disabled={disabled} id="btn-add-att" type="button" onClick={this.addRow} className={classes.addButton}>
                    <AddListIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </CustomTable>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeValue: bindActionCreators(change, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(AttributeTable));
