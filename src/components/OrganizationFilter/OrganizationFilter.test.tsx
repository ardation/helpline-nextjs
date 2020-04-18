import React from 'react';
import { render } from '@testing-library/react';
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

describe('TopBar', () => {
    it('should contain correct text', () => {
        const { getByText } = render(<OrganizationFilter onChange={jest.fn()} />);
        expect(getByText('Filter & Sort')).toBeTruthy();
    });

    describe('topics', () => {});
});
