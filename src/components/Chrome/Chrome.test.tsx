import React from 'react';
import { render } from '@testing-library/react';
import Chrome from '.';

describe('Chrome', () => {
    it('should contain children', () => {
        const { getByText } = render(<Chrome>test</Chrome>);
        expect(getByText('test')).toBeTruthy();
    });

    describe('footer', () => {
        it('should have footer', () => {
            const { getByTestId } = render(<Chrome footer={true}>test</Chrome>);
            expect(getByTestId('about')).toBeInTheDocument();
        });
    });
});
