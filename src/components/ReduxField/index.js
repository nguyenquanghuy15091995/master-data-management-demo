import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class ReduxField extends Component {
  render() {
    const {
      label,
      input,
      meta: { touched, invalid, error },
      nonHelpText,
      ...custom
    } = this.props;
    const help = nonHelpText ? !nonHelpText : true;
    return (
      <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && help && error}
        {...input}
        {...custom}
      />
    );
  }
}

export default ReduxField;
