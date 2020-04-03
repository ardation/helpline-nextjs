import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from '.';

describe('Search', () => {
    const countries = [
        { code: 'AU', name: 'Australia' },
        { code: 'NZ', name: 'New Zealand' },
    ];
    const topics = [{ name: 'happy' }, { name: 'sad' }];

    it('should show correct text', () => {
        const { getByText, getByRole } = render(<Search countries={countries} topics={topics} />);
        expect(getByText("Struggling? Talk to a real person about what's going on, for free.")).toBeTruthy();
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        expect(getByText('What would you like help with?')).toBeTruthy();
    });

    it('should change display after country select', () => {
        const { getByTestId, getByRole } = render(<Search countries={countries} topics={topics} />);
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au');
    });

    it('should change search url after topic select', () => {
        const { getByTestId, getByRole, getAllByTestId } = render(<Search countries={countries} topics={topics} />);
        const element = getByRole('textbox');
        fireEvent.click(element);
        fireEvent.click(getByRole('listbox').children[0]);
        const elements = getAllByTestId('topicChip');
        fireEvent.click(elements[0]);
        expect(getByTestId('searchButton')).toHaveAttribute('href', '/au?topics=happy');
    });
});
