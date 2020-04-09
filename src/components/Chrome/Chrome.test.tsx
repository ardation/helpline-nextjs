import React from 'react';
import { render } from '@testing-library/react';
import Chrome from '.';

describe('Chrome', () => {
    it('should contain privacy link', () => {
        const { getByText } = render(<Chrome>test</Chrome>);
        expect(getByText('test')).toBeTruthy();
    });

    describe('topbar', () => {
        it('should have topbar', () => {
            const { getByTestId } = render(<Chrome topbar={true}>test</Chrome>);
            expect(getByTestId('topbar')).toBeTruthy();
        });
    });

    describe('footer', () => {
        it('should have footer', () => {
            const { getByTestId } = render(<Chrome footer={true}>test</Chrome>);
            expect(getByTestId('copyright')).toBeTruthy();
        });
    });
});
