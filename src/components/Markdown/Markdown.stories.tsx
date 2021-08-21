import React, { ReactElement } from 'react';
import gratitude from '../../../docs/gratitude.md';
import Markdown from '.';

export default {
    title: 'Markdown',
};

export const Default = (): ReactElement => <Markdown>{gratitude}</Markdown>;
