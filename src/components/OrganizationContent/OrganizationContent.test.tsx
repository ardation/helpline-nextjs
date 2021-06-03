import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import formData from '../HelplineForm/formData.json';
import OrganizationContent from '.';

let submitForm;
jest.mock('../../util/formium', () => {
    submitForm = jest.fn();
    return {
        __esModule: true,
        default: { submitForm },
    };
});

describe('OrganizationContent', () => {
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

    it('should have open element', () => {
        const { getByText } = render(<OrganizationContent organization={organization} />);
        expect(getByText('24/7')).toBeTruthy();
    });

    describe('not alwaysOpen', () => {
        beforeEach(() => {
            organization = { ...organization, alwaysOpen: false };
        });

        it('should not have open element', () => {
            const { getByTestId } = render(<OrganizationContent organization={organization} />);
            expect(() => getByTestId('open')).toThrow();
        });
    });

    it('should contain comma separated HumanSupportTypes', () => {
        const { getByTestId } = render(<OrganizationContent organization={organization} />);
        expect(getByTestId('humanSupportTypes')).toHaveTextContent('Volunteers, Staff');
    });

    describe('no humanSupportTypes', () => {
        beforeEach(() => {
            organization = { ...organization, humanSupportTypes: [] };
        });

        it('should not have HumanSupportTypes element', () => {
            const { getByTestId } = render(<OrganizationContent organization={organization} />);
            expect(() => getByTestId('humanSupportTypes')).toThrow();
        });
    });

    it('should contain smsNumber', async () => {
        const onLink = jest.fn();
        const { getByTestId } = render(<OrganizationContent organization={organization} onLink={onLink} />);
        const element = getByTestId('smsNumber');
        expect(element).toHaveAttribute('href', 'sms:234');
        expect(element).toHaveTextContent('234');
        fireEvent.click(element);
        await waitFor(() => expect(onLink).toHaveBeenCalled());
    });

    describe('no smsNumber', () => {
        beforeEach(() => {
            organization = { ...organization, smsNumber: undefined };
        });

        it('should not have smsNumber element', () => {
            const { getByTestId } = render(<OrganizationContent organization={organization} />);
            expect(() => getByTestId('smsNumber')).toThrow();
        });
    });

    it('should contain phoneNumber', async () => {
        const onLink = jest.fn();
        const { getByTestId } = render(<OrganizationContent organization={organization} onLink={onLink} />);
        const element = getByTestId('phoneNumber');
        expect(element).toHaveAttribute('href', 'tel:0800 376 633');
        expect(element).toHaveTextContent('0800 376 633');
        fireEvent.click(element);
        await waitFor(() => expect(onLink).toHaveBeenCalled());
    });

    describe('no phoneNumber', () => {
        beforeEach(() => {
            organization = { ...organization, phoneNumber: undefined };
        });

        it('should not have phoneNumber element', () => {
            const { getByTestId } = render(<OrganizationContent organization={organization} />);
            expect(() => getByTestId('phoneNumber')).toThrow();
        });
    });

    describe('url', () => {
        beforeEach(() => {
            fetchMock.mockIf('/api/forms/website-visit-feedback', async () => JSON.stringify(formData));
        });

        it('should contain url', async () => {
            const onLink = jest.fn();
            const { getByTestId, getByRole } = render(
                <OrganizationContent organization={organization} onLink={onLink} />,
            );
            const element = getByTestId('url');
            expect(element).toHaveAttribute('href', 'https://youthline.co.nz/website');
            expect(element).toHaveTextContent('youthline.co.nz');
            fireEvent.click(element);
            await waitFor(() => expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument());
            fireEvent.click(getByRole('button', { name: 'Submit' }));
            await waitFor(() => expect(submitForm).toHaveBeenCalled());
        });
    });

    describe('no url', () => {
        beforeEach(() => {
            organization = { ...organization, url: undefined };
        });

        it('should not have url element', () => {
            const { getByTestId } = render(<OrganizationContent organization={organization} />);
            expect(() => getByTestId('url')).toThrow();
        });
    });

    it('should contain categories', () => {
        const { getByTestId } = render(<OrganizationContent organization={organization} />);
        expect(getByTestId('categories')).toHaveTextContent('123+2 more');
    });

    describe('no categories', () => {
        beforeEach(() => {
            organization = { ...organization, categories: [] };
        });

        it('should not have categories element', () => {
            const { getByTestId } = render(<OrganizationContent organization={organization} />);
            expect(() => getByTestId('categories')).toThrow();
        });
    });
});
