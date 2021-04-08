import React, { ReactElement, useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Chip, Box } from '@material-ui/core';
import { compact, differenceBy, find, xorBy } from 'lodash/fp';

type Item = {
    name: string;
};

type Props = {
    items: Item[];
    onChange: (items: Item[]) => void;
    preselectedItems?: Item[];
    single?: boolean;
    max?: number;
    center?: boolean;
};

const useStyles = makeStyles((theme) =>
    createStyles({
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                marginRight: theme.spacing(1),
                marginBottom: theme.spacing(1),
            },
        },
        chipsCenter: {
            justifyContent: 'center',
        },
        chipRoot: {
            borderRadius: 6,
            fontWeight: 400,
        },
        text: {
            fontSize: '0.8rem',
            fontWeight: 400,
        },
    }),
);

const ItemSelect = ({ items, preselectedItems, onChange, single, max, center }: Props): ReactElement => {
    const classes = useStyles();
    const [selectedItems, setSelectedItems] = useState(preselectedItems || []);
    const [hide, setHide] = useState(max && true);

    const setVisibleItems = (): Item[] => {
        if (max && selectedItems.length > max) {
            return selectedItems;
        } else if (max) {
            return [
                ...selectedItems,
                ...differenceBy('name', items, selectedItems).slice(0, max - selectedItems.length),
            ];
        } else {
            return items;
        }
    };

    const [visibleItems] = useState(setVisibleItems());

    const onClick = (item: Item): void => {
        const items = single ? [item] : xorBy('name', [item], selectedItems);
        setSelectedItems(items);
        onChange(items);
    };

    useEffect(() => {
        if (preselectedItems && preselectedItems !== selectedItems) setSelectedItems(preselectedItems);
    }, [preselectedItems]);

    return (
        <Box className={compact([classes.chips, center && classes.chipsCenter]).join(' ')}>
            {(hide ? visibleItems : items).map((item) => (
                <Chip
                    color={find(item, selectedItems) ? 'secondary' : 'default'}
                    key={item.name}
                    label={item.name}
                    onClick={(): void => onClick(item)}
                    data-testid="itemChip"
                    classes={{
                        root: classes.chipRoot,
                    }}
                />
            ))}
            {hide && differenceBy('name', items, visibleItems).length > 0 && (
                <Chip
                    onClick={(): void => setHide(false)}
                    label={`+${differenceBy('name', items, visibleItems).length} more`}
                    data-testid="moreChips"
                    classes={{
                        root: classes.chipRoot,
                    }}
                />
            )}
        </Box>
    );
};

export default ItemSelect;
