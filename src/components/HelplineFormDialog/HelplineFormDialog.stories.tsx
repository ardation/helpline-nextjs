import { noop } from 'lodash/fp';
import React, { ReactElement } from 'react';
import HelplineFormDialog from '.';

export default {
    title: 'HelplineFormDialog',
};

export const Default = (): ReactElement => (
    <HelplineFormDialog slug="website-visit-feedback" open={true} onClose={noop} />
);
