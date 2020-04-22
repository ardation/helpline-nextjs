import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.5),
        },
        codeIcon: {
            color: '#FFF',
            backgroundColor: '#202020',
            borderRadius: '1000px',
            paddingTop: theme.spacing(0.1),
            paddingBottom: theme.spacing(0.1),
        },
        buttonRoot: {
            color: '#202020',
            textDecoration: 'underline',
            textTransform: 'none',
            textAlign: 'left',
            '&:hover': {
                textDecoration: 'underline',
                color: theme.palette.primary.main,
            },
        },
        link: {
            color: '#000',
        },
    }),
);

const EmbedLink = (): ReactElement => {
    const domainUrl = process.env.NOW_URL
        ? JSON.stringify(`https://${process.env.NOW_URL}/embed`)
        : 'http://localhost:3000/embed';
    const classes = useStyles();

    return (
        <Box className={classes.box} data-testid="embedContainer">
            <Button
                startIcon={<CodeIcon className={classes.codeIcon} />}
                classes={{ root: classes.buttonRoot, label: classes.link }}
                href={domainUrl}
                target="_blank"
                color="primary"
                data-testid="embedHelplineWidget"
            >
                Embed Find A Helpline on your website
            </Button>
        </Box>
    );
};

export default EmbedLink;
