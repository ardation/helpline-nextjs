import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { withHumanSupportTypes } from '../OrganizationFilter/OrganizationFilter.stories';
import FilterSort from '.';

describe('FilterSort', () => {
    let filters;
    let topics;
    let categories;
    const mocks = { onApply: jest.fn() };

    beforeEach(() => {
        filters = {
            topics: [],
            categories: [],
            humanSupportTypes: [],
            contactMethods: [],
            sorts: [],
        };
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
        const { findByText } = render(<FilterSort filterOptions={{ ...filters, topics }} onApply={mocks.onApply} />);
        expect(await findByText('Filter & Sort')).toBeTruthy();
    });

    it('should contain correct subheading text', async () => {
        const { findByText } = render(
            <FilterSort filterOptions={{ ...filters, topics, categories }} onApply={mocks.onApply} />,
        );
        expect(await findByText('Topics')).toBeTruthy();
        expect(await findByText('Categories')).toBeTruthy();
    });

    it('should contain multiple chips', () => {
        const { getAllByTestId } = render(
            <FilterSort filterOptions={{ ...filters, topics, categories }} onApply={mocks.onApply} />,
        );
        const chips = getAllByTestId('itemChip');
        expect(chips).toHaveLength(3);
    });

    it('should pass the selected filters on apply', () => {
        const { getAllByTestId } = render(
            <FilterSort filterOptions={{ ...filters, topics }} onApply={mocks.onApply} />,
        );
        const chips = getAllByTestId('itemChip');
        const applyButton = getAllByTestId('applyButton')[0];
        fireEvent.click(chips[0]);
        fireEvent.click(applyButton);
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
});
