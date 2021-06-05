import React, { ReactElement, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { FormiumForm, defaultComponents, FormiumComponents } from '@formium/react';
import { Form } from '@formium/types';
import NextLink from 'next/link';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import formium from '../../util/formium';
import CustomComponents from '../FormiumComponents';

type Props = {
    form?: Form;
    onSuccess?: () => void;
    components?: Partial<FormiumComponents>;
};

const HelplineForm = ({ form, onSuccess, components }: Props): ReactElement => {
    const [success, setSuccess] = useState(false);

    return success ? (
        <>
            <Typography variant="h5" gutterBottom>
                Thank you! Your response has been recorded.
            </Typography>

            <NextLink href="/" passHref prefetch={process.env.NODE_ENV === 'production'}>
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    size="large"
                    endIcon={<ArrowRightAltRoundedIcon />}
                >
                    Find a helpline
                </Button>
            </NextLink>
        </>
    ) : (
        <FormiumForm
            data={form}
            components={{
                ...defaultComponents,
                ...CustomComponents,
                ...components,
            }}
            onSubmit={async (values): Promise<void> => {
                await formium.submitForm(form.slug, values);
                setSuccess(true);
                onSuccess?.();
            }}
        />
    );
};

export default HelplineForm;
