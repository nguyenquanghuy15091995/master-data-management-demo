import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';

class ReduxSelect extends Component {
  render() {
    const {
      input,
      name,
      label,
      meta: { touched, error },
      children,
      fullWidth,
    } = this.props;
    return (
      <FormControl style={{ width: fullWidth ? '100%' : 'auto' }} variant="outlined" error={touched && error}>
        <InputLabel htmlFor={`outlined-select-${name}`}>{label}</InputLabel>
        <Select
          {...input}
          input={
            <OutlinedInput
              name={name}
              labelWidth={label ? label.length * 7.5 : 0}
              id={`outlined-select-${name}`}
            />
          }
        >
          {children}
        </Select>
      </FormControl>
    );
  }
}

export default ReduxSelect;
