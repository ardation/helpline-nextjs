import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Topic from '.';

describe('Topic', () => {
    it('should render topic', () => {
        const { getByRole } = render(
            <Topic
                countries={[{ code: 'NZ', name: 'New Zealand', region: 'Australia and New Zealand' }]}
                topic={{ name: 'Anxiety', slug: 'anxiety' }}
            />,
        );
        expect(getByRole('link', { name: 'Find a helpline' })).toHaveAttribute('href', '#top');
        fireEvent.click(getByRole('button', { name: 'Australia and New Zealand' }));
        expect(getByRole('link', { name: 'New Zealand' })).toHaveAttribute('href', '/nz/topics/anxiety');
        expect(getByRole('heading', { name: 'Anxiety helplines' })).toBeInTheDocument();
        expect(getByRole('heading', { name: 'Finding a helpline for Anxiety' })).toBeInTheDocument();
    });
    it('should render suicidal thoughts', () => {
        const { getByRole } = render(
            <Topic
                countries={[{ code: 'NZ', name: 'New Zealand', region: 'Australia and New Zealand' }]}
                topic={{ name: 'Suicidal Thoughts', slug: 'suicidal-thoughts' }}
            />,
        );
        expect(getByRole('link', { name: 'Find a helpline' })).toHaveAttribute('href', '#top');
        fireEvent.click(getByRole('button', { name: 'Australia and New Zealand' }));
        expect(getByRole('link', { name: 'New Zealand' })).toHaveAttribute('href', '/nz/topics/suicidal-thoughts');
        expect(getByRole('heading', { name: 'Suicide hotlines' })).toBeInTheDocument();
        expect(getByRole('heading', { name: 'Finding a suicide hotline' })).toBeInTheDocument();
    });

    it('should render markdown', () => {
        const { getByRole } = render(
            <Topic
                countries={[]}
                topic={{ name: 'Suicidal Thoughts', slug: 'suicidal-thoughts', markdown: '# hello world' }}
            />,
        );
        expect(getByRole('heading', { name: 'hello world' })).toBeInTheDocument();
    });
});
