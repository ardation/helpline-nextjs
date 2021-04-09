import { createStyles, makeStyles, Box, Container, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) =>
    createStyles({
        box: {
            padding: theme.spacing(2, 0),
            backgroundColor: theme.palette.background.paper,
            '& a:link, & a:visited': {
                color: theme.palette.text.primary,
            },
            '& table': {
                width: '100%',
                '& td': {
                    verticalAlign: 'top',
                    width: '50%',
                },
            },
        },
    }),
);

const Markdown = (props: ReactMarkdown.ReactMarkdownProps): ReactElement => {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Container maxWidth="sm">
                <Typography component="div">
                    <ReactMarkdown escapeHtml={false} {...props} />
                </Typography>
            </Container>
        </Box>
    );
};

export default Markdown;
