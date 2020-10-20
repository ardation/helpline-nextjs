import React, { ReactElement, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Chip, Box } from '@material-ui/core';
import { differenceBy, find, xorBy } from 'lodash/fp';

type Item = {
    name: string;
};

type Props = {
    items: Item[];
    onChange: (items: Item[]) => void;
    preselectedItems?: Item[];
    single?: boolean;
    max?: number;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chips: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            '& > *': {
                marginRight: theme.spacing(0.5),
                marginBottom: theme.spacing(0.5),
            },
        },
        chipRoot: {
            fontWeight: 600,
        },
        chipColorPrimary: {
            backgroundColor: '#000000',
            '&:hover, &:focus': {
                backgroundColor: '#000000',
            },
        },
        text: {
            fontSize: '0.8rem',
            fontWeight: 'bold',
        },
    }),
);

const ItemSelect = ({ items, preselectedItems, onChange, single, max }: Props): ReactElement => {
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
        <Box className={classes.chips}>
            {(hide ? visibleItems : items).map((item) => (
                <Chip
                    color={find(item, selectedItems) ? 'primary' : 'default'}
                    key={item.name}
                    label={item.name}
                    onClick={(): void => onClick(item)}
                    data-testid="itemChip"
                    classes={{
                        root: classes.chipRoot,
                        colorPrimary: classes.chipColorPrimary,
                        clickableColorPrimary: classes.chipColorPrimary,
                    }}
                />
            ))}
            {hide && differenceBy('name', items, visibleItems).length > 0 && (
                <Chip
                    onClick={(): void => setHide(false)}
                    label={`+${differenceBy('name', items, visibleItems).length} more`}
                    data-testid="moreChips"
                />
            )}
        </Box>
    );
};

export default ItemSelect;
