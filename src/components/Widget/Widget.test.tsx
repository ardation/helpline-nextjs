import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Widget from '.';

describe('Widget', () => {
    const organizations = [
        {
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
            featured: false,
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
        },
        { code: 'AU', name: 'Australia', emergencyNumber: '111', subdivisions: [] },
    ];
    const country = {
        code: 'NZ',
        name: 'New Zealand',
        emergencyNumber: '111',
        subdivisions: [
            { name: 'Bay of Plenty', code: 'BOP' },
            { name: 'Auckland', code: 'AUK' },
        ],
    };
    const subdivision = { name: 'Bay of Plenty', code: 'BOP' };
    const topics = [];

    it('should display country name', () => {
        const { getByTestId } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                organizations={[]}
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
                organizations={[]}
                topics={topics}
                categories={[]}
                humanSupportTypes={[]}
            />,
        );
        expect(getByTestId('subdivisionInput')).toHaveAttribute('value', 'Bay of Plenty');
    });

    it('should allow organizations to be filtered', () => {
        const { getByText, getByTestId } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                organizations={organizations}
                topics={[]}
                categories={[]}
                humanSupportTypes={[]}
            />,
        );
        expect(getByText('Youthline') && getByText('KidsCan')).toBeTruthy();
        fireEvent.click(getByTestId('filter'));
        fireEvent.click(getByText('Phone'));
        fireEvent.click(getByText('Apply'));
        expect(getByTestId('backdrop')).toHaveStyle({ opacity: 0 });
        expect(() => getByText('KidsCan')).toThrow();
    });

    it('should hide filters when closed is clicked', () => {
        const { getByText, getByTestId } = render(
            <Widget
                countries={countries}
                preselectedCountry={country}
                organizations={[]}
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
                organizations={[]}
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
});
