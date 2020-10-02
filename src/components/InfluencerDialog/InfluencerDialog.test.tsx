import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import InfluencerDialog from '.';

describe('InfluencerDialog', () => {
    const influencer = {
        name: 'Richie',
        message: 'You, I’m so stoked you’re here. Looking for help is brave, and I’m proud of you for reaching out!',
    };

    it('should contain multiple chips', async () => {
        const { getByRole, getByText, queryByText } = render(<InfluencerDialog influencer={influencer} />);
        expect(getByText('A Message from Richie')).toBeInTheDocument();
        expect(getByText(influencer.message)).toBeInTheDocument();
        fireEvent.click(getByRole('button', { name: 'Continue' }));
        await waitFor(() => expect(queryByText('A Message from Richie')).not.toBeInTheDocument());
    });
});
