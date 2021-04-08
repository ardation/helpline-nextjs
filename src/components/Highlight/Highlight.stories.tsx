import React, { ReactElement } from 'react';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Highlight from '.';

export default {
    title: 'Highlight',
};

export const Default = (): ReactElement => (
    <Highlight
        title="Quick"
        description="Match with a helpline, ready to support you today"
        Icon={FastForwardRoundedIcon}
    />
);
