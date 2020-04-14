import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterSort from '.';

describe('FilterSort', () => {
    let topics;
    let categories;
    const mocks = { onApply: jest.fn() };

    beforeEach(() => {
        topics = [
            {
                name: 'Anxiety Bullying',
            },
        ];
        categories = [
            {
                name: 'All Issues',
            },
            {
                name: 'LGBTQ+',
            },
        ];
    });

    it('should contain correct heading text', async () => {
        const { findByText } = render(<FilterSort topics={topics} onApply={mocks.onApply} />);
        expect(await findByText('Filter & Sort')).toBeTruthy();
    });

    it('should contain correct subheading text', async () => {
        const { findByText } = render(<FilterSort topics={topics} categories={categories} onApply={mocks.onApply} />);
        expect(await findByText('Topics')).toBeTruthy();
        expect(await findByText('Categories')).toBeTruthy();
    });

    it('should contain multiple chips', () => {
        const { getAllByTestId } = render(
            <FilterSort topics={topics} categories={categories} onApply={mocks.onApply} />,
        );
        const elements = getAllByTestId('filterChip');
        expect(elements).toHaveLength(3);
    });

    it('should pass the selected filters on apply', () => {
        const { getAllByTestId } = render(<FilterSort topics={topics} onApply={mocks.onApply} />);
        const elements = getAllByTestId('filterChip');
        const applyButton = getAllByTestId('applyButton');
        fireEvent.click(elements[0]);
        fireEvent.click(applyButton[0]);
        expect(mocks.onApply).toBeCalledWith(
            expect.objectContaining({
                topics: [
                    {
                        name: 'Anxiety Bullying',
                    },
                ],
            }),
        );
    });

    it('should allow chips to be toggled', () => {
        const { getAllByTestId } = render(<FilterSort topics={topics} onApply={mocks.onApply} />);
        const elements = getAllByTestId('filterChip');
        const applyButton = getAllByTestId('applyButton');
        fireEvent.click(elements[0]);
        fireEvent.click(applyButton[0]);
        expect(mocks.onApply).toBeCalledWith(
            expect.not.objectContaining({
                topics: [],
            }),
        );
        fireEvent.click(elements[0]);
        fireEvent.click(applyButton[0]);
        expect(mocks.onApply).toBeCalledWith(
            expect.objectContaining({
                topics: [],
            }),
        );
    });

    // it('should show more filters when the show more button is clicked', () => {});
});
