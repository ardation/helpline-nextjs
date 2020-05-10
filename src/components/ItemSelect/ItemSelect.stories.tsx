import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { Box } from '@material-ui/core';
import ItemSelect from '.';

export default {
    title: 'ItemSelect',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <ItemSelect
            items={[{ name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }]}
            onChange={action('onChange')}
        />
    </Box>
);

export const WithSingle = (): ReactElement => (
    <Box m={2}>
        <ItemSelect
            items={[{ name: 'A - Z' }, { name: 'Top Rated' }, { name: 'Open Now' }]}
            onChange={action('onChange')}
            single
        />
    </Box>
);

export const WithMax = (): ReactElement => (
    <Box m={2}>
        <ItemSelect
            items={[{ name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }]}
            preselectedItems={[{ name: 'Bullying' }]}
            onChange={action('onChange')}
            max={2}
        />
    </Box>
);

export const WithPreselectedItemsAndMax = (): ReactElement => (
    <Box m={2}>
        <ItemSelect
            items={[{ name: 'Abuse' }, { name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }]}
            preselectedItems={[{ name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }]}
            onChange={action('onChange')}
            max={2}
        />
    </Box>
);
