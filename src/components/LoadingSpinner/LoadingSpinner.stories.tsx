import React, { ReactElement } from 'react';
import LoadingSpinner from '.';

export default {
    title: 'LoadingSpinner',
};

export const Default = (): ReactElement => <LoadingSpinner />;

Default.story = {
    name: 'default',
};
