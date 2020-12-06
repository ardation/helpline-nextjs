import React, { ReactElement, useState, useRef } from 'react';
import { Button, Typography, Link, TextField, Grid, Container, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import ReCAPTCHA from 'react-google-recaptcha';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { request } from 'graphql-request';
import { Formik } from 'formik';
import NextLink from 'next/link';
import * as Yup from 'yup';
import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer';

type Props = {
    grecaptcha?: object;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@global': {
            '.grecaptcha-badge': {
                visibility: 'hidden',
            },
        },
        container: {
            padding: theme.spacing(6, 2),
            [theme.breakpoints.down('sm')]: {
                padding: theme.spacing(2),
            },
        },
        submit: {
            borderRadius: '1000px',
            width: '100%',
        },
        recaptcha: {
            fontSize: '12px',
            color: '#AAAAAA',
            textAlign: 'center',
            '& > a': {
                color: '#AAAAAA',
            },
        },
        title: {
            fontWeight: 'bold',
        },
        link: {
            color: theme.palette.text.primary,
            textDecoration: 'underline',
        },
    }),
);

const ContactSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
    email: Yup.string().email('Email must be properly formatted').required('Email is required'),
});

const Contact = ({ grecaptcha }: Props): ReactElement => {
    const classes = useStyles();
    const [contactReceived, setContactReceived] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const onSubmit = async ({ subject, email, message }): Promise<void> => {
        const recaptchaToken = await recaptchaRef.current.execute();
        const query = gql`
            mutation ContactCreate($subject: String!, $email: String!, $message: String!, $recaptchaToken: String!) {
                contactCreate(
                    input: { subject: $subject, email: $email, message: $message, recaptchaToken: $recaptchaToken }
                ) {
                    clientMutationId
                }
            }
        `;

        await request('https://api.findahelpline.com', print(query), {
            subject,
            email,
            message,
            recaptchaToken,
        });

        setContactReceived(true);
    };

    return (
        <>
            <NavBar>
                <SideBar />
            </NavBar>
            <Container maxWidth="xs" className={classes.container}>
                <Formik
                    initialValues={{ email: '', subject: '', message: '' }}
                    onSubmit={onSubmit}
                    validationSchema={ContactSchema}
                >
                    {({
                        values: { email, subject, message },
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        isValid,
                        errors,
                        touched,
                    }): ReactElement => (
                        <form onSubmit={handleSubmit}>
                            <Grid container wrap="nowrap" direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant="h6" className={classes.title}>
                                        Have a question? Let us know.
                                    </Typography>
                                </Grid>
                                {contactReceived && (
                                    <Grid item>
                                        <Alert severity="success">
                                            <AlertTitle>Thanks for your message!</AlertTitle>
                                            We&apos;ll be in touch shortly.
                                        </Alert>
                                    </Grid>
                                )}
                                <Grid item>
                                    <TextField
                                        name="email"
                                        value={email}
                                        label="Your Email Address"
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                        inputProps={{ 'data-testid': 'email', readOnly: contactReceived }}
                                        error={errors.email && touched.email && true}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        name="subject"
                                        value={subject}
                                        label="Subject"
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                        inputProps={{ 'data-testid': 'subject', readOnly: contactReceived }}
                                        error={errors.subject && touched.subject && true}
                                        helperText={touched.subject && errors.subject}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        name="message"
                                        value={message}
                                        label="Your Message"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={isSubmitting}
                                        inputProps={{ 'data-testid': 'message', readOnly: contactReceived }}
                                        error={errors.message && touched.message && true}
                                        helperText={touched.message && errors.message}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        Note: Messages aren’t monitored by a counselor. Find a helpline{' '}
                                        <NextLink href="/" passHref prefetch={process.env.NODE_ENV === 'production'}>
                                            <Link className={classes.link}>here</Link>
                                        </NextLink>
                                        .
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        type="submit"
                                        className={classes.submit}
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        disabled={isSubmitting || !isValid || contactReceived}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <CircularProgress size={20} />
                                                &nbsp; Submitting
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <ReCAPTCHA
                                        ref={recaptchaRef}
                                        size="invisible"
                                        sitekey={process.env.RECAPTCHA_KEY}
                                        grecaptcha={grecaptcha}
                                    />
                                    <Typography className={classes.recaptcha}>
                                        This site is protected by reCAPTCHA and the Google{' '}
                                        <a
                                            href="https://policies.google.com/privacy"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            Privacy Policy
                                        </a>{' '}
                                        and{' '}
                                        <a
                                            href="https://policies.google.com/terms"
                                            target="_blank"
                                            rel="noreferrer noopener"
                                        >
                                            Terms of Service
                                        </a>{' '}
                                        apply.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Container>
            <Footer />
        </>
    );
};

export default Contact;
