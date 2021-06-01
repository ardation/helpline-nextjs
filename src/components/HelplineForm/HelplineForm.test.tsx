import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Form } from '@formium/types';
import formData from './formData.json';
import HelplineForm from '.';

let submitForm: jest.Mock;

jest.mock('../../util/formium', () => {
    submitForm = jest.fn();
    return {
        __esModule: true,
        default: { submitForm },
    };
});

describe('HelplineForm', () => {
    it('should submit form correctly', async () => {
        const { getByRole, getByText } = render(<HelplineForm form={(formData as unknown) as Form} />);
        fireEvent.click(getByRole('button', { name: 'Submit' }));
        await waitFor(() =>
            expect(submitForm).toHaveBeenCalledWith('website-visit-feedback', {
                'info-wanted': '',
                'other-info-wanted': '',
                'about-info-wanted': '',
                contacted: '',
            }),
        );
        expect(getByText('Thank you! Your response has been recorded.')).toBeInTheDocument();
    });
});
