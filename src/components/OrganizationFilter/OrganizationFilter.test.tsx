import React from 'react';
import { render } from '@testing-library/react';
import OrganizationFilter from '.';

describe('TopBar', () => {
    it('should contain correct text', () => {
        const { findByText } = render(<OrganizationFilter onChange={jest.fn()} />);
        expect(findByText('Need to leave quickly? Click to leave this site and open the weather.')).toBeTruthy();
    });
});
