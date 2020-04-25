import React, { ReactElement } from 'react';
import TopBar from '.';

export default {
    title: 'TopBar',
};

export const Default = (): ReactElement => <TopBar />;
export const WithCountry = (): ReactElement => <TopBar country={{ emergencyNumber: '111' }} />;
export const WithVariant = (): ReactElement => <TopBar variant="widget" />;
export const WithVariantAndCountry = (): ReactElement => (
    <TopBar variant="widget" country={{ emergencyNumber: '111' }} />
);
