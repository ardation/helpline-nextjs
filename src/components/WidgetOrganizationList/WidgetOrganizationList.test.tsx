import React from 'react';
import { render } from '@testing-library/react';
import { organizationData } from '../../context/organizationProviderMock';
import WidgetOrganizationList from './WidgetOrganizationList';

const organizations = Array(8).fill(organizationData[0]);

describe('WidgetOrganizationList', () => {
    it('should render cards when organizations are in context ', () => {
        const { queryAllByText } = render(<WidgetOrganizationList organizations={organizations} />);
        expect(queryAllByText('Youthline')).toBeTruthy();
    });
});
