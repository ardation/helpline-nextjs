import React, { ReactElement, Fragment, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Divider, ListItemIcon } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import EmailIcon from '@material-ui/icons/Email';
import Link from 'next/link';

const useStyles = makeStyles(() =>
    createStyles({
        list: {
            width: 250,
        },
    }),
);

const SideBar = (): ReactElement => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <IconButton onClick={(): void => setOpen(true)} size="small" data-testid="menuButton">
                <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={(): void => setOpen(false)}>
                <div className={classes.list} onClick={(): void => setOpen(false)}>
                    <List>
                        <Link href="/" passHref>
                            <ListItem button component="a">
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                        </Link>
                        <Link href="/about" passHref>
                            <ListItem button component="a">
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About" />
                            </ListItem>
                        </Link>
                        <Link href="/contact" passHref>
                            <ListItem button component="a">
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link href="/privacy" passHref>
                            <ListItem button component="a">
                                <ListItemText primary="Privacy" primaryTypographyProps={{ variant: 'body2' }} />
                            </ListItem>
                        </Link>
                        <Link href="/terms" passHref>
                            <ListItem button component="a">
                                <ListItemText
                                    primary="Terms of Service"
                                    primaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                        </Link>
                        <Link href="/volunteer" passHref>
                            <ListItem button component="a">
                                <ListItemText
                                    primary="Help Crowdsource"
                                    primaryTypographyProps={{ variant: 'body2' }}
                                />
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
        </Fragment>
    );
};

export default SideBar;
