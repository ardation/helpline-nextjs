import React, { ReactElement } from 'react';
import WidgetSearch from '.';

export default {
    title: 'WidgetSearch',
};

export const Default = (): ReactElement => (
    <WidgetSearch
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
        preselectedCountry={{
            code: 'NZ',
            name: 'New Zealand',
            subdivisions: [
                { name: 'Bay of Plenty', code: 'BOP' },
                { name: 'Auckland', code: 'AUK' },
            ],
        }}
    />
);

Default.story = {
    parameters: { chromatic: { diffThreshold: 0.7 } },
};
