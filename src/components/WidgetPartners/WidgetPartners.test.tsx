import React from 'react';
import { render } from '@testing-library/react';
import WidgetPartners from '.';

describe('WidgetPartners', () => {
    it('should contain Get in touch link', () => {
        const { getByText } = render(<WidgetPartners />);
        expect(getByText('Get in touch').parentElement).toHaveAttribute('href', '/contact');
    });
});
