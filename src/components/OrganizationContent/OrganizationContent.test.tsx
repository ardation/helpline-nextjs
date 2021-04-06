import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import OrganizationCard from '.';

describe('OrganizationCard', () => {
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

    beforeEach(() => {
        const createElement = document.createElement.bind(document);
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        document.createElement = (tagName: string) => {
            const element = createElement(tagName);
            if (tagName === 'canvas') {
                element.getContext = (): {} => ({});
            }
            return element;
        };
    });

    it('should have open element', () => {
        const { getByText } = render(<OrganizationCard organization={organization} />);
        expect(getByText('24/7')).toBeTruthy();
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

    it('should contain smsNumber', async () => {
        const { getByTestId, queryByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('smsNumber');
        expect(element).toHaveAttribute('href', 'sms:234');
        expect(element).toHaveTextContent('234');
        fireEvent.click(element);
        const closeElement = getByTestId('close');
        expect(closeElement).toBeInTheDocument();
        fireEvent.click(closeElement);
        await waitFor(() => expect(queryByTestId('close')).not.toBeInTheDocument());
    });

    it('should contain smsNumberFab', async () => {
        const { getByTestId, queryByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('smsNumberFab');
        expect(element).toHaveAttribute('href', 'sms:234');
        fireEvent.click(element);
        const closeElement = getByTestId('close');
        expect(closeElement).toBeInTheDocument();
        fireEvent.click(closeElement);
        await waitFor(() => expect(queryByTestId('close')).not.toBeInTheDocument());
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

    it('should contain phoneNumber', async () => {
        const { getByTestId, queryByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('phoneNumber');
        expect(element).toHaveAttribute('href', 'tel:0800 376 633');
        expect(element).toHaveTextContent('0800 376 633');
        fireEvent.click(element);
        const closeElement = getByTestId('close');
        expect(closeElement).toBeInTheDocument();
        fireEvent.click(closeElement);
        await waitFor(() => expect(queryByTestId('close')).not.toBeInTheDocument());
    });

    it('should contain phoneNumberFab', async () => {
        const { getByTestId, queryByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('phoneNumberFab');
        expect(element).toHaveAttribute('href', 'tel:0800 376 633');
        fireEvent.click(element);
        const closeElement = getByTestId('close');
        expect(closeElement).toBeInTheDocument();
        fireEvent.click(closeElement);
        await waitFor(() => expect(queryByTestId('close')).not.toBeInTheDocument());
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

    it('should contain url', async () => {
        const { getByTestId, queryByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('url');
        expect(element).toHaveAttribute('href', 'https://youthline.co.nz/website');
        expect(element).toHaveTextContent('youthline.co.nz');
        fireEvent.click(element);
        const closeElement = getByTestId('close');
        expect(closeElement).toBeInTheDocument();
        fireEvent.click(closeElement);
        await waitFor(() => expect(queryByTestId('close')).not.toBeInTheDocument());
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
        expect(getByTestId('categories')).toHaveTextContent('123+2 more');
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

    it('should contain chatUrlFab', async () => {
        const { getByTestId, queryByTestId } = render(<OrganizationCard organization={organization} />);
        const element = getByTestId('chatUrlFab');
        expect(element).toHaveAttribute('href', 'https://youthline.co.nz/chat');
        fireEvent.click(element);
        const closeElement = getByTestId('close');
        expect(closeElement).toBeInTheDocument();
        fireEvent.click(closeElement);
        await waitFor(() => expect(queryByTestId('close')).not.toBeInTheDocument());
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

    it('should have href', () => {
        const { getByTestId } = render(<OrganizationCard organization={organization} />);
        expect(getByTestId('headingLink')).toHaveAttribute('href', `/organizations/${organization.slug}`);
    });

    describe('variant is widget', () => {
        it('should not have href', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} variant="widget" />);
            expect(getByTestId('headingLink')).not.toHaveAttribute('href');
        });
    });

    describe('featured', () => {
        beforeEach(() => {
            organization = { ...organization, featured: true };
        });

        it('should have featured icon', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(getByTestId('featured')).toBeTruthy();
        });
    });

    describe('verified', () => {
        beforeEach(() => {
            organization = { ...organization, featured: true, verified: true };
        });

        it('should have verfied icon but not featured icon', () => {
            const { getByTestId } = render(<OrganizationCard organization={organization} />);
            expect(() => getByTestId('featured')).toThrow();
            expect(getByTestId('verified')).toBeTruthy();
        });
    });
});
