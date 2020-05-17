import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Contact from '.';

jest.mock('graphql-request');

describe('Contact', () => {
    const query = gql`
        mutation ContactCreate($subject: String!, $email: String!, $message: String!, $recaptchaToken: String!) {
            contactCreate(
                input: { subject: $subject, email: $email, message: $message, recaptchaToken: $recaptchaToken }
            ) {
                clientMutationId
            }
        }
    `;

    let mock;

    beforeEach(() => {
        mock = mocked(request).mockReturnValue(
            Promise.resolve({
                data: {
                    organizationReviewCreate: {
                        clientMutationId: null,
                    },
                },
            }),
        );
    });

    it('should allow contact to be submitted', async () => {
        const { getByText, getByTestId } = render(<Contact />);
        fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByTestId('subject'), { target: { value: 'subject' } });
        fireEvent.change(getByTestId('message'), { target: { value: 'message' } });
        const submitButton = getByText('Send Message');
        fireEvent.click(submitButton);
        await waitFor(() =>
            expect(mock).toHaveBeenCalledWith('https://api.findahelpline.com', print(query), {
                email: 'test@example.com',
                message: 'message',
                subject: 'subject',
                recaptchaToken: undefined,
            }),
        );
        expect(getByText("We'll be in touch shortly.")).toBeTruthy();
    });
});
