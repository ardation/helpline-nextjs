import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemSelect from '.';

describe('ItemSelect', () => {
    const items = [{ name: 'happy' }, { name: 'sad' }, { name: 'angry' }];

    it('should contain multiple chips', () => {
        const { getAllByTestId } = render(<ItemSelect items={items} onChange={jest.fn()} />);
        const elements = getAllByTestId('itemChip');
        expect(elements).toHaveLength(3);
    });

    it('should allow chip to be toggled', () => {
        let counter = 0;
        const onChange = (items): void => {
            if (counter === 0) {
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

    it('should allow chip to be preselected', () => {
        const { getByText } = render(
            <ItemSelect items={items} preselectedItems={[{ name: 'happy' }]} onChange={jest.fn()} />,
        );
        expect(getByText('happy').parentElement.className).toContain('MuiChip-colorPrimary');
    });

    it('should allow preselectedItems to be updated', () => {
        const { getByText, rerender } = render(
            <ItemSelect items={items} preselectedItems={[{ name: 'happy' }]} onChange={jest.fn()} />,
        );
        rerender(<ItemSelect items={items} preselectedItems={[{ name: 'angry' }]} onChange={jest.fn()} />);
        expect(getByText('angry').parentElement.className).toContain('MuiChip-colorPrimary');
    });

    describe('single', () => {
        it('should only allow single chip to be selected', () => {
            let counter = 0;
            const onChange = (items): void => {
                if (counter === 0) {
                    expect(items).toEqual([{ name: 'happy' }]);
                } else {
                    expect(items).toEqual([{ name: 'sad' }]);
                }
                counter += 1;
            };

            const { getAllByTestId } = render(<ItemSelect items={items} onChange={onChange} single />);
            const elements = getAllByTestId('itemChip');
            fireEvent.click(elements[0]);
            fireEvent.click(elements[1]);
        });
    });

    describe('max', () => {
        it('should show mix of items and preselected items up to max', () => {
            const { baseElement } = render(
                <ItemSelect items={items} preselectedItems={[{ name: 'angry' }]} max={2} onChange={jest.fn()} />,
            );
            expect(baseElement).toHaveTextContent('angryhappy+1 more');
        });

        it('should show all selected items if they exceed max', () => {
            const { baseElement } = render(
                <ItemSelect
                    items={items}
                    preselectedItems={[{ name: 'happy' }, { name: 'sad' }]}
                    max={1}
                    onChange={jest.fn()}
                />,
            );
            expect(baseElement).toHaveTextContent('happysad+1 more');
        });

        it('should expand to show all chips when clicked', () => {
            const { getByTestId, baseElement } = render(
                <ItemSelect items={items} preselectedItems={[{ name: 'angry' }]} max={2} onChange={jest.fn()} />,
            );
            fireEvent.click(getByTestId('moreChips'));
            expect(baseElement).toHaveTextContent('happysadangry');
        });
    });
});
