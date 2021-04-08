import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Faq from '.';

describe('Faq', () => {
    it('should render Faq', async () => {
        const { getByRole, getByText, queryByText } = render(<Faq />);
        expect(getByRole('heading', { name: 'What can I expect when contacting a helpline?' })).toBeInTheDocument();
        const element = getByRole('button', { name: 'Who will I talk to?' });
        fireEvent.click(element);
        const answer =
            'Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.';
        await waitFor(() => expect(getByText(answer)).toBeInTheDocument());
        fireEvent.click(element);
        await waitFor(() => expect(queryByText(answer)).toBeInTheDocument());
    });
});
