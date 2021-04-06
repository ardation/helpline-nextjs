import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReactGA from 'react-ga';
import { mocked } from 'ts-jest/utils';
import { LocalityEnum } from '../../../types/globalTypes';
import Widget from '.';

jest.mock('react-ga');

describe('Widget', () => {
    const organizations = [
        {
            id: 'youthline',
            slug: 'youthline',
            name: 'Youthline',
            alwaysOpen: true,
            openingHours: [],
            humanSupportTypes: [{ name: 'Volunteers' }, { name: 'Staff' }],
            categories: [{ name: 'For youth' }, { name: 'All issues' }],
            smsNumber: '234',
            phoneNumber: '0800 376 633',
            url: 'https://website.co.nz/website',
            chatUrl: 'https://website.co.nz/chat',
            timezone: 'Pacific/Auckland',
            topics: [],
            featured: false,
            verified: false,
            rating: 5,
            reviewCount: 10,
        },
        {
            id: 'kidscan',
            slug: 'kidscan',
            name: 'KidsCan',
            alwaysOpen: true,
            openingHours: [],
            humanSupportTypes: [],
            categories: [],
            timezone: 'Pacific/Auckland',
            topics: [{ name: 'Anxiety' }],
            featured: false,
            verified: false,
            rating: 5,
            reviewCount: 10,
        },
    ];
    const countries = [
        {
            code: 'NZ',
            name: 'New Zealand',
            emergencyNumber: '111',
            subdivisions: [
                { name: 'Bay of Plenty', code: 'BOP' },
                { name: 'Auckland', code: 'AUK' },
            ],
            locality: LocalityEnum.LOCATION,
        },
        { code: 'AU', name: 'Australia', emergencyNumber: '111', subdivisions: [], locality: LocalityEnum.LOCATION },
    ];
    const country = {
        code: 'NZ',
        name: 'New Zealand',
        emergencyNumber: '111',
        subdivisions: [
            { name: 'Bay of Plenty', code: 'BOP' },
            { name: 'Auckland', code: 'AUK' },
        ],
        locality: LocalityEnum.LOCATION,
    };
    const subdivision = { name: 'Bay of Plenty', code: 'BOP' };
    const topics = [{ name: 'Anxiety' }];

    it('should display country name', () => {
        const { getByTestId } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                preselectedTopics={[]}
                organizations={[]}
                organizationsWhenEmpty={[]}
                topics={topics}
                categories={[]}
                humanSupportTypes={[]}
            />,
        );
        expect(getByTestId('countryInput')).toHaveAttribute('value', 'New Zealand');
    });

    it('should display subdivision name', () => {
        const { getByTestId } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                preselectedSubdivision={subdivision}
                preselectedTopics={[]}
                organizations={[]}
                organizationsWhenEmpty={[]}
                topics={topics}
                categories={[]}
                humanSupportTypes={[]}
            />,
        );
        expect(getByTestId('subdivisionInput')).toHaveAttribute('value', 'Bay of Plenty');
    });

    it('should allow organizations to be filtered', () => {
        mocked(ReactGA.event).mockReturnValue();
        const createElement = document.createElement.bind(document);
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        document.createElement = (tagName: string) => {
            const element = createElement(tagName);
            if (tagName === 'canvas') {
                element.getContext = (): {} => ({});
            }
            return element;
        };

        const { getByText, getByTestId } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                preselectedTopics={[]}
                organizations={organizations}
                organizationsWhenEmpty={organizations}
                topics={[]}
                categories={[]}
                humanSupportTypes={[]}
            />,
        );
        expect(getByTestId('youthline') && getByTestId('kidscan')).toBeTruthy();
        fireEvent.click(getByTestId('filter'));
        fireEvent.click(getByText('Support Type'));
        fireEvent.click(getByText('Phone'));
        fireEvent.click(getByText('Apply'));
        expect(getByTestId('backdrop')).toHaveStyle({ opacity: 0 });
        expect(() => getByTestId('kidscan')).toThrow();
    });

    it('should hide filters when closed is clicked', () => {
        const { getByText, getByTestId } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                preselectedTopics={[]}
                organizations={[]}
                organizationsWhenEmpty={organizations}
                topics={[]}
                categories={[]}
                humanSupportTypes={[]}
            />,
        );
        fireEvent.click(getByTestId('filter'));
        expect(getByTestId('backdrop')).toHaveStyle({ opacity: 1 });
        fireEvent.click(getByText('Close'));
        expect(getByTestId('backdrop')).toHaveStyle({ opacity: 0 });
    });

    it('should hide filters when backdrop is clicked', () => {
        const { getByTestId } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                preselectedTopics={[]}
                organizations={[]}
                organizationsWhenEmpty={[]}
                topics={[]}
                categories={[]}
                humanSupportTypes={[]}
            />,
        );
        fireEvent.click(getByTestId('filter'));
        expect(getByTestId('backdrop')).toHaveStyle({ opacity: 1 });
        fireEvent.click(getByTestId('backdrop'));
        expect(getByTestId('backdrop')).toHaveStyle({ opacity: 0 });
    });

    it('should allow preselectedTopics to be updated', () => {
        const { getAllByTestId, rerender } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                organizations={organizations}
                organizationsWhenEmpty={organizations}
                topics={topics}
                categories={[]}
                humanSupportTypes={[]}
                preselectedTopics={[]}
            />,
        );
        expect(getAllByTestId('OrganizationCard').map((o) => o.textContent)).toEqual([
            'Open 24/7',
            'Open 24/7Volunteers, Staff2340800 376 633website.co.nzFor youthAll issuesTextCallWeb Chat',
        ]);
        rerender(
            <Widget
                countries={countries}
                preselectedCountry={country}
                organizations={organizations}
                organizationsWhenEmpty={organizations}
                topics={topics}
                categories={[]}
                humanSupportTypes={[]}
                preselectedTopics={[{ name: 'Anxiety' }]}
            />,
        );
        expect(getAllByTestId('OrganizationCard').map((o) => o.textContent)).toEqual(['Open 24/7']);
    });
});
