import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReactGA from 'react-ga';
import { mocked } from 'ts-jest/utils';
import OrganizationList from '.';

jest.mock('react-ga');

describe('OrganizationList', () => {
    let organizations, country, subdivision, topics;

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
        organizations = [
            {
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
                timezone: 'Pacific/Auckland',
                topics: [],
                rating: 5,
                reviewCount: 10,
            },
            {
                slug: 'kidscan',
                name: 'KidsCan',
                alwaysOpen: true,
                openingHours: [],
                humanSupportTypes: [],
                categories: [],
                timezone: 'Pacific/Auckland',
                topics: [],
                rating: 5,
                reviewCount: 10,
            },
        ];
        country = { name: 'New Zealand' };
        subdivision = { name: 'Auckland' };
        topics = [];
    });

    it('should display country name', () => {
        const { getByText } = render(
            <OrganizationList
                country={country}
                organizations={organizations}
                topics={topics}
                categories={[]}
                humanSupportTypes={[]}
                preselectedTopics={[]}
            />,
        );
        expect(getByText('Best helplines in New Zealand.')).toBeTruthy();
    });

    it('should display subdivision name', () => {
        const { getByText } = render(
            <OrganizationList
                country={country}
                subdivision={subdivision}
                organizations={organizations}
                topics={topics}
                categories={[]}
                humanSupportTypes={[]}
                preselectedTopics={[]}
            />,
        );
        expect(getByText('Best helplines in Auckland, New Zealand.')).toBeTruthy();
    });

    it('should render organization items', () => {
        const { getByTestId } = render(
            <OrganizationList
                country={country}
                organizations={organizations}
                topics={topics}
                categories={[]}
                humanSupportTypes={[]}
                preselectedTopics={[]}
            />,
        );
        expect(getByTestId('youthline') && getByTestId('kidscan')).toBeTruthy();
    });

    describe('filter', () => {
        it('should allow organizations to be filtered', () => {
            mocked(ReactGA.event).mockReturnValue();
            const { getByText, getByTestId } = render(
                <OrganizationList
                    country={country}
                    organizations={organizations}
                    topics={[]}
                    categories={[]}
                    humanSupportTypes={[]}
                    preselectedTopics={[]}
                />,
            );
            expect(getByTestId('youthline') && getByTestId('kidscan')).toBeTruthy();
            fireEvent.click(getByTestId('filter'));
            fireEvent.click(getByText('Phone'));
            fireEvent.click(getByText('Apply'));
            expect(getByTestId('backdrop')).toHaveStyle({ opacity: 0 });
            expect(() => getByText('KidsCan')).toThrow();
        });

        it('should hide filters when closed is clicked', () => {
            const { getByText, getByTestId } = render(
                <OrganizationList
                    country={country}
                    organizations={organizations}
                    topics={[]}
                    categories={[]}
                    humanSupportTypes={[]}
                    preselectedTopics={[]}
                />,
            );
            fireEvent.click(getByTestId('filter'));
            expect(getByTestId('backdrop')).toHaveStyle({ opacity: 1 });
            fireEvent.click(getByText('Close'));
            expect(getByTestId('backdrop')).toHaveStyle({ opacity: 0 });
        });

        it('should hide filters when backdrop is clicked', () => {
            const { getByTestId } = render(
                <OrganizationList
                    country={country}
                    organizations={organizations}
                    topics={[]}
                    categories={[]}
                    humanSupportTypes={[]}
                    preselectedTopics={[]}
                />,
            );
            fireEvent.click(getByTestId('filter'));
            expect(getByTestId('backdrop')).toHaveStyle({ opacity: 1 });
            fireEvent.click(getByTestId('backdrop'));
            expect(getByTestId('backdrop')).toHaveStyle({ opacity: 0 });
        });
    });

    describe('topics', () => {
        beforeEach(() => {
            topics = [{ name: 'Anxiety' }, { name: 'Bullying' }, { name: 'Depression' }];
        });

        it('should display preselectedTopics', () => {
            const { getByText } = render(
                <OrganizationList
                    country={country}
                    organizations={organizations}
                    topics={[]}
                    categories={[]}
                    humanSupportTypes={[]}
                    preselectedTopics={topics}
                />,
            );
            expect(getByText('Best helplines in New Zealand for anxiety, bullying, and depression.')).toBeTruthy();
        });

        it('should allow preselectedTopics to be updated', () => {
            const { getByText, rerender } = render(
                <OrganizationList
                    country={country}
                    organizations={organizations}
                    topics={[]}
                    categories={[]}
                    humanSupportTypes={[]}
                    preselectedTopics={[]}
                />,
            );
            expect(getByText('Best helplines in New Zealand.')).toBeTruthy();
            rerender(
                <OrganizationList
                    country={country}
                    organizations={organizations}
                    topics={[]}
                    categories={[]}
                    humanSupportTypes={[]}
                    preselectedTopics={topics}
                />,
            );
            expect(getByText('Best helplines in New Zealand for anxiety, bullying, and depression.')).toBeTruthy();
        });
    });
});
