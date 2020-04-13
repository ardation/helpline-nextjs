import React, { ReactElement } from 'react';
import WidgetBar from '.';

export default {
    title: 'WidgetBar',
};

export const Default = (): ReactElement => <WidgetBar />;

Default.story = {
    name: 'default',
};

export const WithCountry = (): ReactElement => <WidgetBar country={{ emergencyNumber: '111' }} />;

WithCountry.story = {
    name: 'with country',
};
