import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Donate from '.';

let redirectToCheckout: jest.Mock;
let loadStripe: jest.Mock;

jest.mock('@stripe/stripe-js', () => {
    redirectToCheckout = jest.fn();
    loadStripe = jest.fn().mockResolvedValue({ redirectToCheckout });

    return {
        loadStripe,
    };
});

describe('Donate', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = {
            NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'publishable_key',
            NEXT_PUBLIC_STRIPE_PRICE_ID: 'price_id',
            ...OLD_ENV,
        };
    });

    afterAll(() => {
        process.env = OLD_ENV;
    });
    it('should call stripe.redirectToCheckout on click', async () => {
        const { getByRole } = render(<Donate />);
        fireEvent.click(getByRole('button', { name: 'Donate $1 to save lives' }));
        expect(loadStripe).toHaveBeenCalledWith('publishable_key');
        await waitFor(() =>
            expect(redirectToCheckout).toHaveBeenCalledWith({
                cancelUrl: 'http://localhost/donate/cancel',
                lineItems: [
                    {
                        price: 'price_id',
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                successUrl: 'http://localhost/donate/success',
            }),
        );
    });
});
