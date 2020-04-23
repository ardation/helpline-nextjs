import React, { ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Chip, Box } from '@material-ui/core';
import { intersectionBy, differenceBy, find, xorBy } from 'lodash/fp';

type Item = {
    name: string;
};

type Props = {
    items: Item[];
    onChange: (items: Item[]) => void;
    preselectedItems?: Item[];
    single?: boolean;
    hideUnselected?: boolean;
    showMax?: number;
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
            [theme.breakpoints.down(420)]: {
                fontSize: '10px',
                height: '24px',
            },
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

const ItemSelect = ({ items, preselectedItems, onChange, single, hideUnselected, showMax }: Props): ReactElement => {
    const classes = useStyles();
    const [selectedItems, setSelectedItems] = useState(preselectedItems || []);
    const [hide, setHide] = useState(hideUnselected || !!showMax);
    const showAmount = hideUnselected ? intersectionBy('name', items, selectedItems).length : showMax || null;

    const onClick = (item: Item): void => {
        const items = single ? [item] : xorBy('name', [item], selectedItems);
        setSelectedItems(items);
        onChange(items);
    };

    const itemsBySelected = selectedItems.concat(differenceBy('name', items, selectedItems));

    return (
        <Box className={classes.chips}>
            {itemsBySelected.map(
                (item, index) =>
                    (!hide || index < showAmount) && (
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
                    ),
            )}
            {hide && items.length - showAmount > 0 && (
                <Chip
                    onClick={(): void => setHide(false)}
                    label={`+${items.length - showAmount} more`}
                    data-testid="showMoreChip"
                    classes={{
                        root: classes.chipRoot,
                    }}
                />
            )}
        </Box>
    );
};

export default ItemSelect;
