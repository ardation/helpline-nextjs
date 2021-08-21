import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LocalityEnum } from '../../../types/globalTypes';
import Search from '.';

describe('Search', () => {
    const countries = [
        { code: 'AU', name: 'Australia', subdivisions: [], locality: LocalityEnum.LOCATION },
        {
            code: 'NZ',
            name: 'New Zealand',
            subdivisions: [
                { name: 'Bay of Plenty', code: 'BOP' },
                { name: 'Auckland', code: 'AUK' },
            ],
            locality: LocalityEnum.LOCATION,
        },
    ];
    const topics = [{ name: 'happy' }, { name: 'sad' }];

    it('should show correct text', () => {
        const { getByText, getByRole } = render(<Search countries={countries} topics={topics} />);
        expect(
            getByText('Struggling? Get free, confidential support from a real human over phone, text or webchat.'),
        ).toBeTruthy();
        expect(getByRole('link', { name: 'What can I expect when contacting a helpline?' })).toHaveAttribute(
            'href',
            '/faq',
        );
        fireEvent.click(getByRole('button', { name: 'Open' }));
        fireEvent.click(getByRole('option', { name: 'Australia' }));
        expect(getByText('What would you like help with?')).toBeInTheDocument();
    });

    it('should change search url after country select', () => {
        const { getByTestId, getByRole, queryByRole } = render(<Search countries={countries} topics={topics} />);
        fireEvent.click(getByRole('button', { name: 'Open' }));
        fireEvent.click(getByRole('option', { name: 'Australia' }));
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au');
        expect(queryByRole('button', { name: 'A note from our founder' })).not.toBeInTheDocument();
        expect(queryByRole('button', { name: 'Hear when we launch in your country' })).not.toBeInTheDocument();
    });

    it('should change search url after country and subdivision select', () => {
        const handleChange = jest.fn();
        const { getByTestId, getByRole, getAllByRole, getByText } = render(
            <Search countries={countries} topics={topics} onChange={handleChange} />,
        );
        fireEvent.click(getByRole('button', { name: 'Open' }));
        fireEvent.click(getByRole('option', { name: 'New Zealand' }));
        fireEvent.click(getAllByRole('button', { name: 'Open' })[1]);
        fireEvent.click(getByRole('option', { name: 'Auckland' }));
        fireEvent.click(getByText('happy'));
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/nz/auk?topics=happy');
        expect(handleChange).toHaveBeenCalledWith(
            [{ name: 'happy' }],
            {
                code: 'NZ',
                name: 'New Zealand',
                subdivisions: [
                    { name: 'Bay of Plenty', code: 'BOP' },
                    { name: 'Auckland', code: 'AUK' },
                ],
                locality: LocalityEnum.LOCATION,
            },
            { name: 'Auckland', code: 'AUK' },
        );
    });

    it('should change search url after topic select', () => {
        const { getByTestId, getByRole, getAllByTestId } = render(<Search countries={countries} topics={topics} />);
        fireEvent.click(getByRole('button', { name: 'Open' }));
        fireEvent.click(getByRole('option', { name: 'Australia' }));
        const elements = getAllByTestId('itemChip');
        fireEvent.click(elements[0]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au?topics=happy');
    });

    describe('variant is embed', () => {
        it('should hide content', () => {
            const { queryByText, queryByRole } = render(
                <Search countries={countries} topics={topics} variant="embed" />,
            );
            expect(
                queryByText(
                    'Struggling? Get free, confidential support from a real human over phone, text or webchat.',
                ),
            ).not.toBeInTheDocument();
            expect(queryByRole('button', { name: 'A note from our founder' })).not.toBeInTheDocument();
            expect(queryByRole('button', { name: 'Hear when we launch in your country' })).not.toBeInTheDocument();
        });
    });
});
