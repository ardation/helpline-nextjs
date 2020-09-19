import React, { ReactElement } from 'react';
import TestRouter from '../../../tests/TestRouter';
import Legal from '.';

export default {
    title: 'Legal',
};

export const Privacy = (): ReactElement => (
    <TestRouter>
        <Legal tab="privacy" />
    </TestRouter>
);
export const Terms = (): ReactElement => (
    <TestRouter>
        <Legal tab="terms" />
    </TestRouter>
);
