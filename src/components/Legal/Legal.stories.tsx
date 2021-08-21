import React, { ReactElement } from 'react';
import Legal from '.';

export default {
    title: 'Legal',
};

export const Privacy = (): ReactElement => <Legal tab="privacy" />;
export const Terms = (): ReactElement => <Legal tab="terms" />;
