import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import ReviewModal from '.';

jest.mock('graphql-request');

describe('ReviewModal', () => {
    const organization = {
        id: 'c1d74c09-ecb0-46f3-902e-1feb22aad7ad',
        slug: 'youthline',
        name: 'Youthline',
        alwaysOpen: true,
        openingHours: [],
        humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
        categories: [{ name: 'For youth' }, { name: 'All issues' }],
        smsNumber: '234',
        phoneNumber: '0800 376 633',
        url: 'https://www.youthline.co.nz/learn-and-grow.html',
        chatUrl: 'https://youthline.co.nz',
        timezone: 'Pacific/Auckland',
        country: {
            name: 'New Zealand',
        },
        rating: 5,
        reviewCount: 5,
        reviews: [],
        subdivisions: [],
    };
    const query = gql`
        mutation OrganizationReviewCreate(
            $organizationId: ID!
            $rating: Int!
            $responseTime: Int!
            $content: String
            $recaptchaToken: String!
        ) {
            organizationReviewCreate(
                input: {
                    organizationId: $organizationId
                    rating: $rating
                    responseTime: $responseTime
                    content: $content
                    recaptchaToken: $recaptchaToken
                }
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

    it('should pop up modal when button clicked', () => {
        const { getByText } = render(<ReviewModal organization={organization} />);
        const button = getByText('Leave a Review');
        fireEvent.click(button);
        expect(getByText('Give a rating out of five.')).toBeTruthy();
    });

    it('should close the modal', async () => {
        const { getByText, getByTestId } = render(<ReviewModal organization={organization} open={true} />);
        const closeButton = getByTestId('close');
        fireEvent.click(closeButton);
        await waitFor(() => expect(() => getByText('Give a rating out of five.')).toThrow());
    });

    it('should allow review to be submitted', async () => {
        const { getByText, getByTestId, getByLabelText, getByRole } = render(
            <ReviewModal organization={organization} />,
        );
        fireEvent.click(getByText('Leave a Review'));
        fireEvent.click(getByLabelText('3 Stars'));
        fireEvent.change(getByTestId('content'), { target: { value: 'content' } });
        const thumb = getByRole('slider');
        thumb.focus();
        fireEvent.keyDown(thumb, { key: 'End' });
        const submitButton = getByText('Submit Review');
        fireEvent.click(submitButton);
        await waitFor(() =>
            expect(mock).toHaveBeenCalledWith('https://api.findahelpline.com', print(query), {
                content: 'content',
                organizationId: 'c1d74c09-ecb0-46f3-902e-1feb22aad7ad',
                rating: 3,
                recaptchaToken: undefined,
                responseTime: 30,
            }),
        );
        expect(getByText('Thanks for your review! It will appear here shortly.')).toBeTruthy();
    });

    describe('open', () => {
        it('should not show button', () => {
            const { getByText } = render(<ReviewModal organization={organization} open={true} />);
            expect(() => getByText('Leave a Review')).toThrow();
        });

        it('should pop up modal', () => {
            const { getByText } = render(<ReviewModal organization={organization} open={true} />);
            expect(getByText('Give a rating out of five.')).toBeTruthy();
        });
    });

    describe('notice', () => {
        it('should show notice', () => {
            const { getByText } = render(<ReviewModal organization={organization} open={true} notice={true} />);
            expect(getByText('It looks like you contacted a helpline! Leave a review.')).toBeTruthy();
        });
    });
});
