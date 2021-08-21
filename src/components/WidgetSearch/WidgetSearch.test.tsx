import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import router from 'next/router';
import { LocalityEnum } from '../../../types/globalTypes';
import WidgetSearch from '.';

jest.mock('next/router', () => require('next-router-mock'));

describe('WidgetSearch', () => {
    const preselectedCountry = {
        code: 'NZ',
        name: 'New Zealand',
        subdivisions: [
            { name: 'Bay of Plenty', code: 'BOP' },
            { name: 'Auckland', code: 'AUK' },
        ],
        locality: LocalityEnum.LOCATION,
        region: 'Australia and New Zealand',
    };
    const countries = [
        {
            code: 'AU',
            name: 'Australia',
            subdivisions: [],
            locality: LocalityEnum.LOCATION,
            region: 'Australia and New Zealand',
        },
        {
            code: 'NZ',
            name: 'New Zealand',
            subdivisions: [
                { name: 'Bay of Plenty', code: 'BOP' },
                { name: 'Auckland', code: 'AUK' },
            ],
            locality: LocalityEnum.LOCATION,
            region: 'Australia and New Zealand',
        },
    ];

    it('should change search url after country select', () => {
        const { getByRole, getAllByRole } = render(
            <WidgetSearch preselectedCountry={preselectedCountry} countries={countries} />,
        );
        fireEvent.click(getAllByRole('button', { name: 'Open' })[0]);
        fireEvent.click(getByRole('option', { name: 'Australia' }));
        expect(router).toMatchObject({
            asPath: '/widget/au',
            pathname: '/widget/[countryCode]',
            query: {},
        });
    });

    it('should change search url after subdivision select', () => {
        const { getAllByRole, getByRole } = render(
            <WidgetSearch preselectedCountry={preselectedCountry} countries={countries} />,
        );
        fireEvent.click(getAllByRole('button', { name: 'Open' })[1]);
        fireEvent.click(getByRole('option', { name: 'Bay of Plenty' }));
        expect(router).toMatchObject({
            asPath: '/widget/nz/bop',
            pathname: '/widget/[countryCode]/[subdivisionCode]',
            query: {},
        });
    });
});
