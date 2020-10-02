import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import InfluencerDialog from '.';

const influencer = {
    name: 'Richie',
    message: 'You, I’m so stoked you’re here. Looking for help is brave, and I’m proud of you for reaching out!',
};

export default {
    title: 'InfluencerDialog',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <InfluencerDialog influencer={influencer} />
    </Box>
);
