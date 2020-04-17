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
        const { findByText } = render(<FilterSort filterOptions={{ topics }} onApply={mocks.onApply} />);
        expect(await findByText('Filter & Sort')).toBeTruthy();
    });

    it('should contain correct subheading text', async () => {
        const { findByText } = render(<FilterSort filterOptions={{ topics, categories }} onApply={mocks.onApply} />);
        expect(await findByText('Topics')).toBeTruthy();
        expect(await findByText('Categories')).toBeTruthy();
    });

    it('should contain multiple chips', () => {
        const { getAllByTestId } = render(
            <FilterSort filterOptions={{ topics, categories }} onApply={mocks.onApply} />,
        );
        const chips = getAllByTestId('filterChip');
        expect(chips).toHaveLength(3);
    });

    it('should pass the selected filters on apply', () => {
        const { getAllByTestId } = render(<FilterSort filterOptions={{ topics }} onApply={mocks.onApply} />);
        const chips = getAllByTestId('filterChip');
        const applyButton = getAllByTestId('applyButton')[0];
        fireEvent.click(chips[0]);
        fireEvent.click(applyButton);
        expect(mocks.onApply).toBeCalledWith(
            expect.objectContaining({
                topics: [
                    {
                        active: true,
                        name: 'Anxiety Bullying',
                    },
                ],
            }),
        );
    });

    it('should allow chips to be toggled', () => {
        const { getAllByTestId } = render(<FilterSort filterOptions={{ topics }} onApply={mocks.onApply} />);
        const chips = getAllByTestId('filterChip');
        const applyButton = getAllByTestId('applyButton')[0];
        fireEvent.click(chips[0]);
        fireEvent.click(applyButton);
        expect(mocks.onApply).toBeCalledWith(
            expect.objectContaining({
                topics: [
                    {
                        active: true,
                        name: 'Anxiety Bullying',
                    },
                ],
            }),
        );
        fireEvent.click(chips[0]);
        fireEvent.click(applyButton);
        expect(mocks.onApply).toBeCalledWith(
            expect.objectContaining({
                topics: [
                    {
                        active: false,
                        name: 'Anxiety Bullying',
                    },
                ],
            }),
        );
    });

    it('should not show all of the filters if more than the max (default 10)', () => {
        topics = Array.from({ length: 20 }, (v, k) => k + 1).map((i) => ({ name: 'topic' + i }));
        const { getAllByTestId } = render(<FilterSort filterOptions={{ topics }} onApply={mocks.onApply} />);
        const chips = getAllByTestId('filterChip');
        expect(chips).toHaveLength(10);
    });

    it('should show a show more button with a number if there are hidden tags', () => {
        topics = Array.from({ length: 20 }, (v, k) => k + 1).map((i) => ({ name: 'topic' + i }));
        const { getAllByTestId } = render(
            <FilterSort filterOptions={{ topics }} showMax={7} onApply={mocks.onApply} />,
        );
        const showMoreButton = getAllByTestId('showMoreChip')[0];
        expect(showMoreButton.innerHTML).toContain('13');
    });

    it('should not display the show more button if under max', () => {
        const { queryByTestId } = render(<FilterSort filterOptions={{ topics }} showMax={3} onApply={mocks.onApply} />);
        expect(queryByTestId('showMoreChip')).toBeNull();
    });

    it('should show all filters when the show more button is clicked', () => {
        topics = Array.from({ length: 10 }, (v, k) => k + 1).map((i) => ({ name: 'topic' + i }));
        const { getAllByTestId } = render(
            <FilterSort filterOptions={{ topics }} showMax={3} onApply={mocks.onApply} />,
        );
        const showMoreButtons = getAllByTestId('showMoreChip');
        fireEvent.click(showMoreButtons[0]);
        const chips = getAllByTestId('filterChip');
        expect(chips).toHaveLength(10);
    });
});
