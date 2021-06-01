import React, { ReactElement, useState } from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { FormiumForm, defaultComponents } from '@formium/react';
import { Form } from '@formium/types';
import NextLink from 'next/link';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import formium from '../../util/formium';
import FormiumComponents from '../FormiumComponents';

type Props = {
    form?: Form;
};

const HelplineForm = ({ form }: Props): ReactElement => {
    const [success, setSuccess] = useState(false);

    return (
        <Box bgcolor="background.paper" py={5}>
            <Container maxWidth="sm">
                {success ? (
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
                            ...FormiumComponents,
                        }}
                        onSubmit={async (values): Promise<void> => {
                            await formium.submitForm(form.slug, values);
                            setSuccess(true);
                        }}
                    />
                )}
            </Container>
        </Box>
    );
};

export default HelplineForm;
