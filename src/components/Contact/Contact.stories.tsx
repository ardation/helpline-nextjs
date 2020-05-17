import React, { ReactElement } from 'react';
import stubContactCreate from '../../../tests/stubs/stubContactCreate';
import Contact from '.';

export default {
    title: 'Contact',
    decorators: [stubContactCreate],
};

export const Default = (): ReactElement => <Contact />;
