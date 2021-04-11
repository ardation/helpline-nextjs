import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Faq from '.';

describe('Faq', () => {
    it('should render Faq', async () => {
        const { getByRole, getByText, queryByText } = render(<Faq />);
        const element = getByRole('button', { name: 'What do I say?' });
        fireEvent.click(element);
        const answer = 'Starting the conversation';
        await waitFor(() => expect(getByText(answer)).toBeInTheDocument());
        fireEvent.click(element);
        await waitFor(() => expect(queryByText(answer)).toBeInTheDocument());
    });
});
