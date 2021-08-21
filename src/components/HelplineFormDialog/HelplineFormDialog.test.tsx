import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import formData from '../HelplineForm/formData.json';
import HelplineFormDialog from '.';

jest.mock('../../util/formium', () => {
    return {
        __esModule: true,
        default: { submitForm: jest.fn() },
    };
});

describe('HelplineFormDialog', () => {
    beforeEach(() => {
        fetchMock.mockIf('/api/forms/website-visit-feedback', async () => JSON.stringify(formData));
    });
    it('should contain correct text', async () => {
        const handleClose = jest.fn();
        const { getByRole, rerender } = render(
            <HelplineFormDialog slug="website-visit-feedback" open={false} onClose={handleClose} />,
        );
        expect(fetchMock.mock.calls.length).toEqual(0);
        rerender(<HelplineFormDialog slug="website-visit-feedback" open={true} onClose={handleClose} />);
        expect(fetchMock.mock.calls.length).toEqual(1);
        await waitFor(() => expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument());
        fireEvent.click(getByRole('button', { name: 'Submit' }));
        await waitFor(() => expect(handleClose).toHaveBeenCalledWith());
    });
});
