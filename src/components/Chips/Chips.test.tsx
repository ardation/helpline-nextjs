import React from 'react';
import { render } from '@testing-library/react';
import Chips from '.';

describe('Chips', () => {
    const items = [{ name: 'happy' }, { name: 'sad' }];

    it('should contain multiple chips', () => {
        const { getAllByTestId } = render(<Chips items={items} />);
        const elements = getAllByTestId('chip');
        expect(elements).toHaveLength(2);
    });

    describe('max', () => {
        it('should hide unselected items', () => {
            const { getByText } = render(<Chips items={items} max={1} />);
            expect(() => getByText('sad')).toThrow();
        });

        it('should show more button', () => {
            const { getByText } = render(<Chips items={items} max={1} />);
            expect(getByText('+1 more')).toBeTruthy();
        });
    });
});
