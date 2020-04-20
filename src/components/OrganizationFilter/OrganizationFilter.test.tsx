import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrganizationFilter from '.';

const topics = [{ name: 'Anxiety' }, { name: 'Bullying' }, { name: 'Depression' }, { name: 'School' }];
const preselectedTopics = [{ name: 'Anxiety' }, { name: 'Depression' }];
const humanSupportTypes = [{ name: 'Volunteers' }, { name: 'Counsellors' }, { name: 'Peers' }];
const categories = [
    { name: 'LGBTQ+ Friendly' },
    { name: 'All ages' },
    { name: 'All issues' },
    { name: 'For youth' },
    { name: 'For men' },
    { name: 'For women' },
    { name: 'For parents' },
];

describe('OrganizationFilter', () => {
    it('should contain correct text', () => {
        const { getByText } = render(<OrganizationFilter onChange={jest.fn()} />);
        expect(getByText('Filter & Sort')).toBeTruthy();
    });

    it('should allow topics to be changed', () => {
        const onChange = ({ topics }): void => {
            expect(topics).toEqual([{ name: 'Bullying' }, { name: 'Anxiety' }, { name: 'Depression' }]);
        };
        const { getByText } = render(
            <OrganizationFilter topics={topics} preselectedTopics={preselectedTopics} onChange={onChange} />,
        );
        fireEvent.click(getByText('+2 more'));
        fireEvent.click(getByText('Bullying'));
        fireEvent.click(getByText('Apply'));
    });

    it('should allow contactMethods to be changed', () => {
        const onChange = ({ contactMethods }): void => {
            expect(contactMethods).toEqual([{ name: 'Text' }, { name: 'Phone' }]);
        };
        const { getByText } = render(<OrganizationFilter onChange={onChange} />);
        fireEvent.click(getByText('Phone'));
        fireEvent.click(getByText('Text'));
        fireEvent.click(getByText('Apply'));
    });

    it('should allow humanSupportTypes to be changed', () => {
        const onChange = ({ humanSupportTypes }): void => {
            expect(humanSupportTypes).toEqual([{ name: 'Counsellors' }, { name: 'Volunteers' }]);
        };
        const { getByText } = render(<OrganizationFilter humanSupportTypes={humanSupportTypes} onChange={onChange} />);
        fireEvent.click(getByText('Volunteers'));
        fireEvent.click(getByText('Counsellors'));
        fireEvent.click(getByText('Apply'));
    });

    it('should allow categories to be changed', () => {
        const onChange = ({ categories }): void => {
            expect(categories).toEqual([{ name: 'All issues' }, { name: 'All ages' }]);
        };
        const { getByText } = render(<OrganizationFilter categories={categories} onChange={onChange} />);
        fireEvent.click(getByText('All ages'));
        fireEvent.click(getByText('All issues'));
        fireEvent.click(getByText('Apply'));
    });

    it('should allow sorts to be changed', () => {
        const onChange = ({ sorts }): void => {
            expect(sorts).toEqual([{ name: 'Open now' }]);
        };
        const { getByText } = render(<OrganizationFilter onChange={onChange} />);
        fireEvent.click(getByText('A – Z'));
        fireEvent.click(getByText('Open now'));
        fireEvent.click(getByText('Apply'));
    });

    it('should allow preselectedTopics to be updated', () => {
        const { getByText, rerender } = render(
            <OrganizationFilter topics={topics} preselectedTopics={[]} onChange={jest.fn()} />,
        );
        expect(() => getByText('+2 more')).toThrow();
        rerender(<OrganizationFilter topics={topics} preselectedTopics={preselectedTopics} onChange={jest.fn()} />);
        expect(getByText('+2 more')).toBeTruthy();
    });
});
