import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import Chips from '.';

export default {
    title: 'Chips',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <Chips items={[{ name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }]} />
    </Box>
);

export const WhenMax = (): ReactElement => (
    <Box m={2}>
        <Chips items={[{ name: 'Anxiety' }, { name: 'Body image' }, { name: 'Bullying' }]} max={2} />
    </Box>
);
