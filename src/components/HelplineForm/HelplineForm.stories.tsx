import React, { ReactElement } from 'react';
import { Form } from '@formium/types';
import formData from './formData.json';
import HelplineForm from '.';

export default {
    title: 'HelplineForm',
};

export const Default = (): ReactElement => <HelplineForm form={formData as unknown as Form} />;
