import React, { ReactElement, useState } from 'react';
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
    hideUnselected?: boolean;
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

const ItemSelect = ({ items, preselectedItems, onChange, single, hideUnselected }: Props): ReactElement => {
    const classes = useStyles();
    const [selectedItems, setSelectedItems] = useState(preselectedItems || []);
    const [hide, setHide] = useState(hideUnselected);

    const onClick = (item: Item): void => {
        const items = single ? [item] : xorBy('name', [item], selectedItems);
        setSelectedItems(items);
        onChange(items);
    };

    return (
        <Box className={classes.chips}>
            {items.map((item) => {
                if (hide && !find(item, selectedItems)) {
                } else {
                    return (
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
                    );
                }
            })}
            {hide && differenceBy('name', items, selectedItems).length > 0 && (
                <Chip
                    onClick={(): void => setHide(false)}
                    label={`+${differenceBy('name', items, selectedItems).length} more`}
                />
            )}
        </Box>
    );
};

export default ItemSelect;
