import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemSelect from '.';

describe('ItemSelect', () => {
    const items = [{ name: 'happy' }, { name: 'sad' }];
    const longItems = Array.from(Array(5).keys())
        .map((i) => ({
            name: 'Topic ' + i,
        }))
        .concat(items);

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

    it('should allow chip to be preselected', () => {
        const { getByText } = render(
            <ItemSelect items={items} preselectedItems={[{ name: 'happy' }]} onChange={jest.fn()} />,
        );
        expect(getByText('happy').parentElement.className).toContain('MuiChip-colorPrimary');
    });

    describe('hideUnselected', () => {
        it('should hide unselected items', () => {
            const { getByText } = render(
                <ItemSelect items={items} preselectedItems={[{ name: 'happy' }]} onChange={jest.fn()} hideUnselected />,
            );
            expect(() => getByText('sad')).toThrow();
        });

        it('should show more button', () => {
            const { getByText } = render(
                <ItemSelect items={items} preselectedItems={[{ name: 'happy' }]} onChange={jest.fn()} hideUnselected />,
            );
            expect(getByText('+1 more')).toBeTruthy();
        });

        it('should show hidden unselected items when more button is clicked', () => {
            const { getByText } = render(
                <ItemSelect items={items} preselectedItems={[{ name: 'happy' }]} onChange={jest.fn()} hideUnselected />,
            );
            fireEvent.click(getByText('+1 more'));
            expect(getByText('sad')).toBeTruthy();
        });
    });

    describe('showMax', () => {
        it('should hide unselected items', () => {
            const { getByText } = render(
                <ItemSelect
                    items={longItems}
                    preselectedItems={[{ name: 'happy' }]}
                    onChange={jest.fn()}
                    showMax={5}
                />,
            );
            expect(() => getByText('sad')).toThrow();
        });

        it('should show show more button', () => {
            const { getByTestId } = render(
                <ItemSelect
                    items={longItems}
                    preselectedItems={[{ name: 'happy' }]}
                    onChange={jest.fn()}
                    showMax={5}
                />,
            );
            expect(getByTestId('showMoreChip')).toBeTruthy();
            expect(getByTestId('showMoreChip').innerHTML).toContain('+2');
        });

        it('should show hidden unselected items when more button is clicked', () => {
            const { getByTestId, getByText } = render(
                <ItemSelect
                    items={longItems}
                    preselectedItems={[{ name: 'happy' }]}
                    onChange={jest.fn()}
                    showMax={5}
                />,
            );
            fireEvent.click(getByTestId('showMoreChip'));
            expect(getByText('sad')).toBeTruthy();
        });
    });

    describe('single', () => {
        it('should only allow single chip to be selected', () => {
            let counter = 0;
            const onChange = (items): void => {
                if (counter == 0) {
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
});
