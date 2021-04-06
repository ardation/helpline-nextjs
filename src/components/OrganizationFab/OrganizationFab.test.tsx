import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import OrganizationFab from '.';

describe('OrganizationFab', () => {
    let organization = {
        id: 'abc',
        rating: 5,
        reviewCount: 10,
        slug: 'youthline',
        name: 'Youthline',
        alwaysOpen: true,
        openingHours: [],
        humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
        categories: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }],
        smsNumber: '234',
        phoneNumber: '0800 376 633',
        url: 'https://youthline.co.nz/website',
        chatUrl: 'https://youthline.co.nz/chat',
        timezone: 'Pacific/Auckland',
        topics: [],
        featured: false,
        verified: false,
        reviews: [],
    };

    it('should contain smsNumberFab', async () => {
        const onLink = jest.fn();
        const { getByTestId } = render(<OrganizationFab organization={organization} onLink={onLink} />);
        const element = getByTestId('smsNumberFab');
        expect(element).toHaveAttribute('href', 'sms:234');
        fireEvent.click(element);
        await waitFor(() => expect(onLink).toHaveBeenCalled());
    });

    describe('no smsNumber', () => {
        beforeEach(() => {
            organization = { ...organization, smsNumber: undefined };
        });

        it('should not have smsNumber element', () => {
            const { getByTestId } = render(<OrganizationFab organization={organization} />);
            expect(() => getByTestId('smsNumberFab')).toThrow();
        });
    });

    it('should contain phoneNumberFab', async () => {
        const onLink = jest.fn();
        const { getByTestId } = render(<OrganizationFab organization={organization} onLink={onLink} />);
        const element = getByTestId('phoneNumberFab');
        expect(element).toHaveAttribute('href', 'tel:0800 376 633');
        fireEvent.click(element);
        await waitFor(() => expect(onLink).toHaveBeenCalled());
    });

    describe('no phoneNumber', () => {
        beforeEach(() => {
            organization = { ...organization, phoneNumber: undefined };
        });

        it('should not have phoneNumberFab element', () => {
            const { getByTestId } = render(<OrganizationFab organization={organization} />);
            expect(() => getByTestId('phoneNumberFab')).toThrow();
        });
    });

    it('should contain chatUrlFab', async () => {
        const onLink = jest.fn();
        const { getByTestId } = render(<OrganizationFab organization={organization} onLink={onLink} />);
        const element = getByTestId('chatUrlFab');
        expect(element).toHaveAttribute('href', 'https://youthline.co.nz/chat');
        fireEvent.click(element);
        await waitFor(() => expect(onLink).toHaveBeenCalled());
    });

    describe('no chatUrl', () => {
        beforeEach(() => {
            organization = { ...organization, chatUrl: undefined };
        });

        it('should not have chatUrlFab element', () => {
            const { getByTestId } = render(<OrganizationFab organization={organization} />);
            expect(() => getByTestId('chatUrlFab')).toThrow();
        });
    });

    describe('no fab related attributes', () => {
        beforeEach(() => {
            organization = { ...organization, smsNumber: undefined, phoneNumber: undefined, chatUrl: undefined };
        });

        it('should not have fabs element', () => {
            const { getByTestId } = render(<OrganizationFab organization={organization} />);
            expect(() => getByTestId('fabs')).toThrow();
        });
    });
});
