import React, { ReactElement } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from '../../theme';
import { OrganizationProvider } from '../../context/organizationContext';
import OrganizationCarousel from './OrganizationCarousel';

export default {
    title: 'OrganizationCarousel',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <OrganizationProvider
            allOrganizations={[
                {
                    slug: 'youthline',
                    name: 'Youthline',
                    alwaysOpen: true,
                    smsNumber: '234',
                    phoneNumber: '0800 376 633',
                    url: 'https://www.youthline.co.nz',
                    chatUrl: 'https://www.youthline.co.nz/web-chat-counselling.html',
                    timezone: 'Pacific/Auckland',
                    topics: [{ name: 'Topic 1' }],
                    categories: [{ name: 'Category 1' }],
                    humanSupportTypes: [],
                    openingHours: [
                        {
                            day: 'monday',
                            open: '2000-01-01T00:00:00Z',
                            close: '2000-01-01T23:59:00Z',
                        },
                    ],
                },
            ]}
            countries={[
                { code: 'AU', name: 'Australia', subdivisions: [] },
                {
                    code: 'NZ',
                    name: 'New Zealand',
                    subdivisions: [
                        { name: 'Bay of Plenty', code: 'BOP' },
                        { name: 'Auckland', code: 'AUK' },
                    ],
                },
            ]}
            filterOptions={{
                topics: [{ name: 'Topic 1' }, { name: 'Topic 2' }, { name: 'Topic 3' }],
                categories: [{ name: 'Category 1' }, { name: 'Category 2' }],
                humanSupportTypes: [],
            }}
        >
            <OrganizationCarousel />
        </OrganizationProvider>
    </ThemeProvider>
);

Default.story = {
    name: 'default',
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
