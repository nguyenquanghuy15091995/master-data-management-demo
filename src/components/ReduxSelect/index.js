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
      disabled,
      variant,
      minWidth,
      required,
    } = this.props;
    return (
      <FormControl disabled={disabled} required={required} style={{ width: fullWidth ? '100%' : 'auto', minWidth: minWidth ? minWidth : 100 }} variant="outlined" error={touched && error}>
        {label ? <InputLabel htmlFor={`outlined-select-${name}`}>{label}</InputLabel> : null}
        {
          variant === 'outlined' ? (
            <Select
              {...input}
              input={
                <OutlinedInput
                  name={name}
                  labelWidth={label ? (label.length + (required ? 1.5 : 0)) * 7.5 : 0}
                  id={`outlined-select-${name}`}
                />
              }
            >
              {children}
            </Select>
          ) : (
              <Select
                {...input}
                name={name}
                id={`outlined-select-${name}`}
              >
                {children}
              </Select>
            )
        }
      </FormControl>
    );
  }
}

export default ReduxSelect;
