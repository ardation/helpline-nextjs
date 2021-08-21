import React, { ReactElement } from 'react';
import { Box } from '@material-ui/core';
import fetchMock from 'fetch-mock';
import { StoryFn } from '@storybook/addons';
import formData from '../HelplineForm/formData.json';
import InfluencerDialog from '.';

const stubFormDataDecorator = (storyFn: StoryFn): ReactElement => {
    fetchMock.get('/api/forms/find-a-helpline-landing-page', formData);
    return <>{storyFn()}</>;
};

const influencer = {
    name: 'Richie',
    message: 'You, I’m so stoked you’re here. Looking for help is brave, and I’m proud of you for reaching out!',
};

export default {
    title: 'InfluencerDialog',
    decorators: [stubFormDataDecorator],
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <InfluencerDialog influencer={influencer} />
    </Box>
);
