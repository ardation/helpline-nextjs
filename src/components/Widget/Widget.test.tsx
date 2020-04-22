import React from 'react';
import { render } from '@testing-library/react';
import withMockOrganizationProvider, { organizationData } from '../../context/organizationProviderMock';
import Widget from './Widget';

const organizations = Array(8).fill(organizationData[0]);

describe('Widget', () => {
    it('should contain correct text', () => {
        const { findByText } = render(withMockOrganizationProvider(<Widget />, { organizations }));
        expect(findByText('Are you or someone else in immediate danger?')).toBeTruthy();
    });
});
