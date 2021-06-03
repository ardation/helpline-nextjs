import React, { ReactElement } from 'react';
import {
    FormControlLabel as MuiFormControlLabel,
    Radio as MuiRadio,
    Checkbox as MuiCheckbox,
    FormControl as MuiFormControl,
    Box,
    FormHelperText as MuiFormHelperText,
    FormLabel as MuiFormLabel,
    Input as MuiInput,
    Button as MuiButton,
    ButtonProps,
    Typography,
} from '@material-ui/core';
import { FormControlProps } from '@formium/react';
import { CheckboxProps, RadioProps, TextareaProps } from '@formium/react/dist/inputs';

export const Radio = ({ value, label, name, checked, onChange, id }: RadioProps): ReactElement => {
    return (
        <MuiFormControlLabel
            label={label}
            control={<MuiRadio id={id} checked={checked} value={value} name={name} onChange={onChange} />}
        />
    );
};

export const Checkbox = ({ value, label, name, checked, onChange, id }: CheckboxProps): ReactElement => {
    return (
        <MuiFormControlLabel
            label={label}
            control={<MuiCheckbox id={id} checked={checked} value={value} name={name} onChange={onChange} />}
        />
    );
};

export const FormControl = ({
    children,
    label,
    labelFor,
    error,
    disabled,
    required,
    description,
}: FormControlProps): ReactElement => {
    return (
        <Box my={2}>
            <MuiFormControl error={Boolean(error)} disabled={disabled} required={required} fullWidth={true}>
                <MuiFormLabel htmlFor={labelFor}>
                    <Typography gutterBottom color="textPrimary">
                        {label}
                    </Typography>
                </MuiFormLabel>
                {children}
                {error && (
                    <MuiFormHelperText id={labelFor} disabled={disabled} error={true}>
                        {error}
                    </MuiFormHelperText>
                )}
                {description && (
                    <MuiFormHelperText id={labelFor} disabled={disabled} error={false}>
                        {description}
                    </MuiFormHelperText>
                )}
            </MuiFormControl>
        </Box>
    );
};

export const SubmitButton = (props: ButtonProps): ReactElement => (
    <MuiButton variant="contained" color="primary" size="large" {...props} />
);

export const NextButton = (props: ButtonProps): ReactElement => (
    <MuiButton variant="contained" color="primary" size="large" {...props} />
);

export const PreviousButton = (props: ButtonProps): ReactElement => (
    <MuiButton variant="contained" color="secondary" size="large" {...props} />
);

export const Textarea = (props: TextareaProps): ReactElement => <MuiInput multiline={true} rows={5} {...props} />;

const FormiumComponents = {
    Radio,
    Checkbox,
    FormControl,
    SubmitButton,
    NextButton,
    PreviousButton,
    Textarea,
    TextInput: MuiInput,
};

export default FormiumComponents;
