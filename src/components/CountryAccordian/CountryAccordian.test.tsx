import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import CountryAccordian from '.';

describe('CountryAccordian', () => {
    it('should break countries into subregions', async () => {
        const { getByRole, queryByRole } = render(
            <CountryAccordian
                countries={[
                    { code: 'AU', name: 'Australia', subregion: 'Australia and New Zealand' },
                    { code: 'NZ', name: 'New Zealand', subregion: 'Australia and New Zealand' },
                    { code: 'US', name: 'United States', subregion: 'Northern America' },
                ]}
            />,
        );
        fireEvent.click(getByRole('button', { name: 'Australia and New Zealand' }));
        expect(getByRole('link', { name: 'New Zealand' })).toHaveAttribute('href', '/nz');
        expect(getByRole('link', { name: 'Australia' })).toHaveAttribute('href', '/au');
        expect(queryByRole('link', { name: 'United States' })).not.toBeInTheDocument();
        fireEvent.click(getByRole('button', { name: 'Northern America' }));
        expect(getByRole('link', { name: 'United States' })).toHaveAttribute('href', '/us');
        await waitFor(() => expect(queryByRole('link', { name: 'New Zealand' })).not.toBeInTheDocument());
    });
});
