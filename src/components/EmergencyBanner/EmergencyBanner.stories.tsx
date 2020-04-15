import React, { ReactElement } from 'react';
import TopBar from '.';

export default {
    title: 'TopBar',
};

export const Default = (): ReactElement => <TopBar />;

Default.story = {
    name: 'default',
};

export const WithCountry = (): ReactElement => <TopBar country={{ emergencyNumber: '111' }} />;

WithCountry.story = {
    name: 'with country',
};
