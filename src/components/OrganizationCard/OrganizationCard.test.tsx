import React from 'react';
import { render } from '@testing-library/react';
import OrganizationCard from '.';

describe('OrganizationCard', () => {
    let organization;

    beforeEach(() => {
        organization = {
            slug: 'youthline',
            name: 'Youthline',
            alwaysOpen: true,
            openingHours: [],
            humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
            categories: [{ name: 'For youth' }, { name: 'All issues' }],
            smsNumber: '234',
            phoneNumber: '0800 376 633',
            url: 'https://youthline.co.nz/website',
            chatUrl: 'https://youthline.co.nz/chat',
            timezone: 'Auckland',
        };
    });

    it('should have open element', () => {
        const { getByText } = render(<OrganizationCard organization={organization} />);
        expect(getByText('Available 24/7')).toBeTruthy();
    });

    describe('not alwaysOpen', () => {
        beforeEach(() => {
            organization = { ...organization, alwaysOpen: false };
        });

        it('should not have open element', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('open')).toThrow();
        });
    });

    it('should contain comma separated HumanSupportTypes', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        expect(getByTestId('humanSupportTypes')).toHaveTextContent('Volunteers, Staff');
    });

    describe('no humanSupportTypes', () => {
        beforeEach(() => {
            organization = { ...organization, humanSupportTypes: [] };
        });

        it('should not have HumanSupportTypes element', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('humanSupportTypes')).toThrow();
        });
    });

    it('should contain smsNumber', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('smsNumber');
        expect(element).toHaveAttribute('href', 'sms:234');
        expect(element).toHaveTextContent('234');
    });

    it('should contain smsNumberFab', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('smsNumberFab');
        expect(element).toHaveAttribute('href', 'sms:234');
    });

    describe('no smsNumber', () => {
        beforeEach(() => {
            organization = { ...organization, smsNumber: undefined };
        });

        it('should not have smsNumber element', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('smsNumber')).toThrow();
        });
    });

    it('should contain phoneNumber', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('phoneNumber');
        expect(element).toHaveAttribute('href', 'tel:0800 376 633');
        expect(element).toHaveTextContent('0800 376 633');
    });

    it('should contain phoneNumberFab', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('phoneNumberFab');
        expect(element).toHaveAttribute('href', 'tel:0800 376 633');
    });

    describe('no phoneNumber', () => {
        beforeEach(() => {
            organization = { ...organization, phoneNumber: undefined };
        });

        it('should not have phoneNumber element', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('phoneNumber')).toThrow();
        });
    });

    it('should contain url', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('url');
        expect(element).toHaveAttribute('href', 'https://youthline.co.nz/website');
        expect(element).toHaveTextContent('youthline.co.nz');
    });

    describe('no url', () => {
        beforeEach(() => {
            organization = { ...organization, url: undefined };
        });

        it('should not have url element', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('url')).toThrow();
        });
    });

    it('should contain categories', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        expect(getByTestId('categories')).toHaveTextContent('For youthAll issues');
    });

    describe('no categories', () => {
        beforeEach(() => {
            organization = { ...organization, categories: [] };
        });

        it('should not have categories element', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('categories')).toThrow();
        });
    });

    it('should contain chatUrlFab', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('chatUrlFab');
        expect(element).toHaveAttribute('href', 'https://youthline.co.nz/chat');
    });

    describe('no chatUrl', () => {
        beforeEach(() => {
            organization = { ...organization, chatUrl: undefined };
        });

        it('should not have chatUrlFab element', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('chatUrlFab')).toThrow();
        });
    });

    describe('no fab related attributes', () => {
        beforeEach(() => {
            organization = { ...organization, smsNumber: undefined, phoneNumber: undefined, chatUrl: undefined };
        });

        it('should not have fabs element', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('fabs')).toThrow();
        });
    });
});
