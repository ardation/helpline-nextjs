import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { LocalityEnum } from '../../../types/globalTypes';
import Embed from '.';

jest.mock('copy-to-clipboard', () => jest.fn());

describe('Embed', () => {
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

    beforeEach(() => {
        document.execCommand = jest.fn();
    });

    it('should render correct code snippet', async () => {
        const { getByRole, getByText, getByTestId } = render(
            <Embed countries={countries} topics={[{ name: 'Anxiety' }]} />,
        );
        fireEvent.click(getByRole('combobox', { name: 'country' }));
        fireEvent.click(getByText('New Zealand'));
        fireEvent.click(getByRole('combobox', { name: 'subdivision' }));
        fireEvent.click(getByText('Auckland'));
        fireEvent.click(getByText('Anxiety'));
        expect(getByTestId('EmbedSyntaxHighlighter').textContent).toEqual(
            `<div id="fah-widget"></div>
<script src="http://localhost/widget.min.js"></script>
<script type="text/javascript">
Widget.default({
  "countryCode": "nz",
  "subdivisionCode": "auk",
  "topics": [
    "Anxiety"
  ]
}).render('#fah-widget');
</script>`,
        );
        fireEvent.click(getByRole('button', { name: 'Copy to clipboard' }));
        await waitFor(() => expect(getByText('Copied to clipboard!')).toBeInTheDocument());
    });
});
