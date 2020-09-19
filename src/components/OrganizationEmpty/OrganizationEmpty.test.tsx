import React from 'react';
import { render } from '@testing-library/react';
import OrganizationEmpty from '.';

describe('OrganizationEmpty', () => {
    it('should have open element', () => {
        const { getByText } = render(<OrganizationEmpty />);
        expect(
            getByText("We've searched high and low and can't find a helpline in your area matching that criteria."),
        ).toBeTruthy();
    });
});
