import { noop } from 'lodash/fp';
import React, { ReactElement } from 'react';
import fetchMock from 'fetch-mock';
import formData from '../HelplineForm/formData.json';
import HelplineFormDialog from '.';

const stubFormDataDecorator = (storyFn): ReactElement => {
    fetchMock.get('/api/forms/website-visit-feedback', formData);
    return <>{storyFn()}</>;
};

export default {
    title: 'HelplineFormDialog',
    decorators: [stubFormDataDecorator],
};

export const Default = (): ReactElement => (
    <HelplineFormDialog slug="website-visit-feedback" open={true} onClose={noop} />
);
