import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import formData from '../HelplineForm/formData.json';
import InfluencerDialog from '.';

jest.mock('../../util/formium', () => {
    return {
        __esModule: true,
        default: { submitForm: jest.fn() },
    };
});

describe('InfluencerDialog', () => {
    beforeEach(() => {
        fetchMock.mockIf('/api/forms/find-a-helpline-landing-page', async () => JSON.stringify(formData));
    });

    const influencer = {
        name: 'Richie',
        message: 'You, I’m so stoked you’re here. Looking for help is brave, and I’m proud of you for reaching out!',
    };

    it('should show message and close dialog', async () => {
        const { getByRole, getByText, queryByText } = render(<InfluencerDialog influencer={influencer} />);
        expect(getByText('A Message from Richie')).toBeInTheDocument();
        expect(getByText(influencer.message)).toBeInTheDocument();
        fireEvent.click(getByRole('button', { name: 'Continue' }));
        await waitFor(() => expect(queryByText('A Message from Richie')).not.toBeInTheDocument());
    });

    it('should show form when user wants to get their own link', async () => {
        const { queryByRole, getByRole } = render(<InfluencerDialog influencer={influencer} />);
        fireEvent.click(getByRole('button', { name: 'Get a landing page like this' }));
        await waitFor(() => expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument());
        fireEvent.click(getByRole('button', { name: 'Submit' }));
        await waitFor(() => expect(queryByRole('button', { name: 'Submit' })).not.toBeInTheDocument());
    });
});
