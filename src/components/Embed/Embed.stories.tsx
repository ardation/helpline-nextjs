import React, { ReactElement } from 'react';
import { LocalityEnum } from '../../../types/globalTypes';
import Embed from '.';

export default {
    title: 'Embed',
};

export const Default = (): ReactElement => (
    <Embed
        countries={[
            { code: 'AU', name: 'Australia', subdivisions: [], locality: LocalityEnum.LOCATION },
            {
                code: 'NZ',
                name: 'New Zealand',
                subdivisions: [
                    { name: 'Bay of Plenty', code: 'BOP' },
                    { name: 'Auckland', code: 'AUK' },
                ],
                locality: LocalityEnum.LOCATION,
            },
        ]}
        topics={[{ name: 'Anxiety' }]}
    />
);
