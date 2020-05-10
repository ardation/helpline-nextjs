import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { Box } from '@material-ui/core';
import TopicSelect from '.';

export default {
    title: 'TopicSelect',
};

export const Default = (): ReactElement => (
    <Box m={2}>
        <TopicSelect
            topics={[
                { name: 'Anxiety' },
                { name: 'Body image' },
                { name: 'Bullying' },
                { name: 'Eating' },
                { name: 'Body Image' },
                { name: 'Abuse' },
                { name: 'Domestic Violence' },
                { name: 'Dementia' },
                { name: 'Self-harm' },
                { name: 'Stress' },
                { name: 'Parenting' },
            ]}
            onChange={action('onChange')}
        />
    </Box>
);
