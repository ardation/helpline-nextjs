import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
import FilterSort from '.';

export default {
    title: 'FilterSort',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <FilterSort
                filterOptions={{ topics: [{ name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }] }}
                onApply={action('onClick')}
            />
        </Box>
    </ThemeProvider>
);

Default.story = {
    name: 'default',
};
