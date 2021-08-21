import React from 'react';
import { render } from '@testing-library/react';
import Sitemap from '.';

describe('Sitemap', () => {
    it('should contain correct links', () => {
        const { getByText } = render(
            <Sitemap
                countries={[{ code: 'NZ', name: 'New Zealand', subdivisions: [{ code: 'AUK', name: 'Auckland' }] }]}
                topics={[{ slug: 'depression', name: 'Depression' }]}
                organizations={[{ slug: 'youthline', name: 'Youthline' }]}
            />,
        );
        expect(getByText('Helplines in New Zealand')).toHaveAttribute('href', '/nz');
        expect(getByText('Depression Helplines in New Zealand')).toHaveAttribute('href', '/nz/topics/depression');
        expect(getByText('Helplines in Auckland, New Zealand')).toHaveAttribute('href', '/nz/auk');
        expect(getByText('Depression Helplines in Auckland, New Zealand')).toHaveAttribute(
            'href',
            '/nz/auk/topics/depression',
        );
        expect(getByText('Youthline')).toHaveAttribute('href', '/organizations/youthline');
        expect(getByText('Depression Helplines')).toHaveAttribute('href', '/topics/depression');
    });
});
