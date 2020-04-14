import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemSelect from '.';

describe('ItemSelect', () => {
    const items = [{ name: 'happy' }, { name: 'sad' }];

    it('should contain correct text', () => {
        const { findByText } = render(<ItemSelect items={items} onChange={jest.fn()} />);
        expect(findByText('Select items (optional)')).toBeTruthy();
    });

    it('should contain multiple chips', () => {
        const { getAllByTestId } = render(<ItemSelect items={items} onChange={jest.fn()} />);
        const elements = getAllByTestId('itemChip');
        expect(elements).toHaveLength(2);
    });

    it('should allow chip to be toggled', () => {
        let counter = 0;
        const onChange = (items): void => {
            if (counter == 0) {
                expect(items).toEqual([{ name: 'happy' }]);
            } else {
                expect(items).toEqual([]);
            }
            counter += 1;
        };

        const { getAllByTestId } = render(<ItemSelect items={items} onChange={onChange} />);
        const elements = getAllByTestId('itemChip');
        fireEvent.click(elements[0]);
        fireEvent.click(elements[0]);
    });
});
