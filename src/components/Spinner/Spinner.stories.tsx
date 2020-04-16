import React, { ReactElement } from 'react';
import Spinner from '.';

export default {
    title: 'Spinner',
};

export const Default = (): ReactElement => <Spinner />;

Default.story = {
    name: 'default',
};
