import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { Field } from 'redux-form/immutable';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddListIcon from '@material-ui/icons/LibraryAdd';
import MenuItem from '@material-ui/core/MenuItem';

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
      backgroundColor: '#2962ff',
      padding: 5,
      marginRight: 10,
      borderRadius: '50%',
    },
    disableColor: {
      display: 'inline-block',
      backgroundColor: '#f50057',
      padding: 5,
      marginRight: 10,
      borderRadius: '50%',
    },
    attCell: {
      padding: '4px 24px',
    },
  };
}

class AttributeTable extends Component {
  addRow = () => {
    this.props.fields.push({ id: this.props.fields.length + 1 });
  }

  render() {
    const {
      fields,
      classes,
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
                    align={item.value === 'actions' ? 'center' : 'left'}
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
                            <IconButton aria-label="Delete" onClick={() => fields.remove(index)}>
                              <DeleteIcon style={{ color: '#e53935' }} size={20} />
                            </IconButton>
                          </TableCell>
                        );
                      }
                      if (item.value === 'type') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                            <Field name={`${field}.${item.value}`} multiline component={ReduxSelect} fullWidth>
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
                            <Field name={`${field}.${item.value}`} minWidth={120} multiline component={ReduxSelect} fullWidth>
                              <MenuItem value={MASTER_DATA_STATUS.ENABLE}><span className={classes.enableColor} /><span>{MASTER_DATA_STATUS.ENABLE}</span></MenuItem>
                              <MenuItem value={MASTER_DATA_STATUS.DISABLE}><span className={classes.disableColor} /><span>{MASTER_DATA_STATUS.DISABLE}</span></MenuItem>
                            </Field>
                          </TableCell>
                        );
                      }
                      if (item.value === 'description') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                            <Field name={`${field}.${item.value}`} style={{ minWidth: 250 }} multiline component={ReduxField} fullWidth />
                          </TableCell>
                        );
                      }
                      if (item.value === 'name') {
                        return (
                          <TableCell className={classes.attCell} key={`${field}.${item.value}-${item.id}`} component="td" scope="row">
                            <Field nonHelpText name={`${field}.${item.value}`} style={{ minWidth: 100 }} component={ReduxField} fullWidth />
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
                    <Typography variant="h6">Total record: {fields.length}</Typography>
                  </div>
                  <Button id="btn-add-att" type="button" onClick={this.addRow} className={classes.addButton}>
                    <AddListIcon size={30} />
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

export default withStyles(styles)(AttributeTable);
