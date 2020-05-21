import React from 'react';
import { render } from '@testing-library/react';
import moment from 'moment-timezone';
import OrganizationItem from '.';

describe('OrganizationItem', () => {
    let organization;

    beforeEach(() => {
        organization = {
            id: 'abc',
            rating: 5,
            slug: 'youthline',
            name: 'Youthline',
            alwaysOpen: true,
            openingHours: [],
            humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
            categories: [{ name: 'For youth' }, { name: 'All issues' }],
            smsNumber: '234',
            phoneNumber: '0800 376 633',
            url: 'https://youthline.co.nz/website',
            chatUrl: 'https://chatyouthline.co.nz/chat',
            timezone: 'Pacific/Auckland',
            subdivisions: [{ name: 'Auckland' }, { name: 'Wellington' }],
            country: { name: 'New Zealand' },
            notes: 'abc',
            reviews: [
                {
                    rating: 5,
                    content: 'Leaving the first review!',
                    createdAt: moment().subtract(3, 'days').toISOString(),
                },
                { rating: 3, content: '', createdAt: moment().subtract(5, 'days').toISOString() },
                {
                    rating: 0,
                    content:
                        'The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.',
                    createdAt: moment().subtract(7, 'days').toISOString(),
                },
            ],
        };
    });

    it('should have open element', () => {
        const { getByText } = render(<OrganizationItem organization={organization} />);
        expect(getByText('24/7')).toBeTruthy();
    });

    it('should show country and subdivisions', () => {
        const { getByText } = render(<OrganizationItem organization={organization} />);
        expect(getByText('Auckland, Wellington, New Zealand')).toBeTruthy();
    });

    describe('no subdivisions', () => {
        beforeEach(() => {
            organization = { ...organization, subdivisions: [] };
        });

        it('should show country', () => {
            const { getByText } = render(<OrganizationItem organization={organization} />);
            expect(getByText('New Zealand')).toBeTruthy();
        });
    });

    describe('not alwaysOpen', () => {
        beforeEach(() => {
            organization = { ...organization, alwaysOpen: false };
        });

        it('should not have open element', () => {
            const { getByTestId } = render(<OrganizationItem organization={organization} />);
            expect(() => getByTestId('open')).toThrow();
        });
    });

    it('should contain comma separated HumanSupportTypes', () => {
        const { getByTestId } = render(<OrganizationItem organization={organization} />);
        expect(getByTestId('humanSupportTypes')).toHaveTextContent('Volunteers, Staff');
    });

    describe('no humanSupportTypes', () => {
        beforeEach(() => {
            organization = { ...organization, humanSupportTypes: [] };
        });

        it('should not have HumanSupportTypes element', () => {
            const { getByTestId } = render(<OrganizationItem organization={organization} />);
            expect(() => getByTestId('humanSupportTypes')).toThrow();
        });
    });

    it('should contain url', () => {
        const { getByTestId } = render(<OrganizationItem organization={organization} />);
        const element = getByTestId('url');
        expect(element).toHaveAttribute('href', 'https://youthline.co.nz/website');
        expect(element).toHaveTextContent('youthline.co.nz');
    });

    describe('no url', () => {
        beforeEach(() => {
            organization = { ...organization, url: undefined };
        });

        it('should not have url element', () => {
            const { getByTestId } = render(<OrganizationItem organization={organization} />);
            expect(() => getByTestId('url')).toThrow();
        });
    });

    it('should contain smsNumber', () => {
        const { getByTestId } = render(<OrganizationItem organization={organization} />);
        const element = getByTestId('smsNumber');
        expect(element).toHaveAttribute('href', 'sms:234');
        expect(element).toHaveTextContent('234');
    });

    describe('no smsNumber', () => {
        beforeEach(() => {
            organization = { ...organization, smsNumber: undefined };
        });

        it('should not have smsNumber element', () => {
            const { getByTestId } = render(<OrganizationItem organization={organization} />);
            expect(() => getByTestId('smsNumber')).toThrow();
        });
    });

    it('should contain phoneNumber', () => {
        const { getByTestId } = render(<OrganizationItem organization={organization} />);
        const element = getByTestId('phoneNumber');
        expect(element).toHaveAttribute('href', 'tel:0800 376 633');
        expect(element).toHaveTextContent('0800 376 633');
    });

    describe('no phoneNumber', () => {
        beforeEach(() => {
            organization = { ...organization, phoneNumber: undefined };
        });

        it('should not have phoneNumber element', () => {
            const { getByTestId } = render(<OrganizationItem organization={organization} />);
            expect(() => getByTestId('phoneNumber')).toThrow();
        });
    });

    it('should contain chatUrl', () => {
        const { getByTestId } = render(<OrganizationItem organization={organization} />);
        const element = getByTestId('chatUrl');
        expect(element).toHaveAttribute('href', 'https://chatyouthline.co.nz/chat');
        expect(element).toHaveTextContent('chatyouthline.co.nz');
    });

    describe('no chatUrl', () => {
        beforeEach(() => {
            organization = { ...organization, chatUrl: undefined };
        });

        it('should not have chatUrl element', () => {
            const { getByTestId } = render(<OrganizationItem organization={organization} />);
            expect(() => getByTestId('chatUrl')).toThrow();
        });
    });

    it('should contain categories', () => {
        const { getByTestId } = render(<OrganizationItem organization={organization} />);
        expect(getByTestId('categories')).toHaveTextContent('For youthAll issues');
    });

    describe('no categories', () => {
        beforeEach(() => {
            organization = { ...organization, categories: [] };
        });

        it('should not have categories element', () => {
            const { getByTestId } = render(<OrganizationItem organization={organization} />);
            expect(() => getByTestId('categories')).toThrow();
        });
    });

    it('should contain suggest an edit link', () => {
        const { getByText } = render(<OrganizationItem organization={organization} />);
        expect(getByText('Suggest an edit').parentElement).toHaveAttribute(
            'href',
            'https://zealnz.typeform.com/to/mMLYXV?remote_id=youthline',
        );
    });

    it('should show reviews', () => {
        const { getByText } = render(<OrganizationItem organization={organization} />);
        expect(getByText('Read reviews')).toBeTruthy();
    });

    describe('no reviews', () => {
        beforeEach(() => {
            organization = { ...organization, reviews: [] };
        });

        it('should not show reviews', () => {
            const { getByText } = render(<OrganizationItem organization={organization} />);
            expect(() => getByText('Read reviews')).toThrow();
        });
    });

    it('should show notes', () => {
        const { getByText } = render(<OrganizationItem organization={organization} />);
        expect(getByText('abc')).toBeTruthy();
    });

    describe('no notes', () => {
        beforeEach(() => {
            organization = { ...organization, notes: undefined };
        });

        it('should not show notes', () => {
            const { getByText } = render(<OrganizationItem organization={organization} />);
            expect(() => getByText('Accessibility Notes')).toThrow();
        });
    });
});
