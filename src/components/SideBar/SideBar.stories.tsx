import React, { ReactElement } from 'react';
import NavBar from '../NavBar';
import SideBar from '.';

export default {
    title: 'SideBar',
};

export const Default = (): ReactElement => (
    <NavBar>
        <SideBar />
    </NavBar>
);
