import React, { ReactElement } from 'react';
import stubContactCreateDecorator from '../../../tests/stubs/stubContactCreateDecorator';
import Contact from '.';

export default {
    title: 'Contact',
    decorators: [stubContactCreateDecorator],
};

export const Default = (): ReactElement => <Contact />;
