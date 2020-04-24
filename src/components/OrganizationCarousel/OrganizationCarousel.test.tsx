import React from 'react';
import { render } from '@testing-library/react';
import { organizationData } from '../../context/organizationProviderMock';
import OrganizationCarousel from '.';

const organizations = Array(8).fill(organizationData[0]);

describe('OrganizationCarousel', () => {
    it('should render cards when organizations are in context ', () => {
        const { queryAllByText } = render(<OrganizationCarousel organizations={organizations} />);
        expect(queryAllByText('Youthline')).toBeTruthy();
    });
});
