import React, { ReactElement } from 'react';
import { Button } from '@material-ui/core';
import NavBar from '.';

export default {
    title: 'NavBar',
};

export const Default = (): ReactElement => <NavBar />;
export const WithChildren = (): ReactElement => (
    <NavBar>
        <Button>Test Button</Button>
    </NavBar>
);
