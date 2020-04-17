import React, { ReactElement } from 'react';
import WidgetBar from '.';

export default {
    title: 'WidgetBar',
};

export const Default = (): ReactElement => <WidgetBar />;

Default.story = {
    name: 'default',
};

export const WithEmergency = (): ReactElement => <WidgetBar emergencyNumber="111" />;

WithEmergency.story = {
    name: 'with emergency',
};
