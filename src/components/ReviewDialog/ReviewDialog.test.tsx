import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import ReviewDialog from '.';

jest.mock('graphql-request');

describe('ReviewDialog', () => {
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
        verified: false,
        featured: false,
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
        const { getByText } = render(<ReviewDialog organization={organization} button={true} />);
        const button = getByText('Leave a Review');
        fireEvent.click(button);
        expect(getByText('Give a rating out of five.')).toBeTruthy();
    });

    it('should close the modal', async () => {
        const mockFn = jest.fn().mockName('onClose');
        const { getByText, getByTestId } = render(
            <ReviewDialog organization={organization} open={true} onClose={mockFn} />,
        );
        const closeButton = getByTestId('close');
        fireEvent.click(closeButton);
        await waitFor(() => expect(() => getByText('Give a rating out of five.')).toThrow());
        expect(mockFn).toHaveBeenCalled();
    });

    it('should allow review to be submitted', async () => {
        const mockFn = jest.fn().mockName('onClose');
        const { queryByText, getByText, getByTestId, getByLabelText, getByRole, rerender } = render(
            <ReviewDialog organization={organization} onClose={mockFn} button={true} />,
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
        expect(mockFn).toHaveBeenCalled();
        rerender(<ReviewDialog organization={organization} onClose={mockFn} open={true} button={true} />);
        expect(queryByText('Give a rating out of Five.')).not.toBeInTheDocument();
    });

    describe('open', () => {
        it('should pop up modal', () => {
            const { queryByText } = render(<ReviewDialog organization={organization} open={true} />);
            expect(queryByText('Give a rating out of five.')).toBeInTheDocument();
            expect(queryByText('It looks like you contacted a helpline! Leave a review.')).toBeInTheDocument();
        });

        it('should open modal if prop changes', () => {
            const { queryByText, rerender } = render(<ReviewDialog organization={organization} open={false} />);
            expect(queryByText('Give a rating out of five.')).not.toBeInTheDocument();
            rerender(<ReviewDialog organization={organization} open={true} />);
            expect(queryByText('Give a rating out of five.')).toBeInTheDocument();
        });
    });

    describe('button', () => {
        it('should show button', () => {
            const { queryByText } = render(<ReviewDialog organization={organization} button={true} />);
            expect(queryByText('Leave a Review')).toBeInTheDocument();
        });

        it('should hide button', () => {
            const { queryByText } = render(<ReviewDialog organization={organization} button={false} />);
            expect(queryByText('Leave a Review')).not.toBeInTheDocument();
        });
    });
});
