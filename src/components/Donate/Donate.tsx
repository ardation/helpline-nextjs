import { Button, ButtonProps, createStyles, makeStyles, SvgIcon } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import React, { ReactElement } from 'react';
import CallIcon from '../../assets/volunteer-activism-icon.svg';

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            textDecoration: 'underline',
        },
        svgIcon: {
            width: '0.9em',
            height: '0.9em',
        },
    }),
);

const Donate = (props: Partial<ButtonProps>): ReactElement => {
    const classes = useStyles();

    const handleClick = async (): Promise<void> => {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

        stripe.redirectToCheckout({
            lineItems: [
                {
                    price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            successUrl: `${window.location.protocol}//${window.location.host}/success`,
            cancelUrl: `${window.location.protocol}//${window.location.host}/cancel`,
        });
    };
    return (
        <Button
            onClick={handleClick}
            fullWidth
            startIcon={
                <SvgIcon className={classes.svgIcon}>
                    <CallIcon />
                </SvgIcon>
            }
            className={classes.button}
            {...props}
        >
            {props.children || 'Donate $1 to save lives'}
        </Button>
    );
};

export default Donate;
