import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TopicSelect from '.';

describe('TopicSelect', () => {
    const topics = [{ name: 'happy' }, { name: 'sad' }];

    it('should contain correct text', () => {
        const { getByText } = render(<TopicSelect topics={topics} onChange={jest.fn()} />);
        expect(getByText('Select topic or topics (optional)')).toBeInTheDocument();
    });

    it('should contain multiple chips', () => {
        const { getAllByTestId } = render(<TopicSelect topics={topics} onChange={jest.fn()} />);
        const elements = getAllByTestId('itemChip');
        expect(elements).toHaveLength(2);
    });

    it('should allow chip to be toggled', () => {
        let counter = 0;
        const onChange = (topics): void => {
            if (counter == 0) {
                expect(topics).toEqual([{ name: 'happy' }]);
            } else {
                expect(topics).toEqual([]);
            }
            counter += 1;
        };

        const { getAllByTestId } = render(<TopicSelect topics={topics} onChange={onChange} />);
        const elements = getAllByTestId('itemChip');
        fireEvent.click(elements[0]);
        fireEvent.click(elements[0]);
    });
});
