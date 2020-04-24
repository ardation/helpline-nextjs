import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider, Box } from '@material-ui/core';
import theme from '../../theme';
import ItemSelect from '.';

const longList = Array.from(Array(20).keys()).map((i) => ({
    name: 'Topic ' + i,
}));

export default {
    title: 'ItemSelect',
};

export const Default = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <ItemSelect
                items={[{ name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }]}
                onChange={action('onChange')}
            />
        </Box>
    </ThemeProvider>
);

export const WithSingle = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <ItemSelect
                items={[{ name: 'A - Z' }, { name: 'Top Rated' }, { name: 'Open Now' }]}
                onChange={action('onChange')}
                single
            />
        </Box>
    </ThemeProvider>
);
export const WithHideUnselected = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <ItemSelect
                items={[{ name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }]}
                preselectedItems={[{ name: 'Anxiety' }]}
                onChange={action('onChange')}
                hideUnselected
            />
        </Box>
    </ThemeProvider>
);
export const WithShowMax = (): ReactElement => (
    <ThemeProvider theme={theme}>
        <Box m={2}>
            <ItemSelect items={longList} preselectedItems={[longList[0]]} onChange={action('onChange')} showMax={5} />
        </Box>
    </ThemeProvider>
);
