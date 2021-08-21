import { createStyles, makeStyles, Box, Container, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const useStyles = makeStyles((theme) =>
    createStyles({
        box: {
            padding: theme.spacing(2, 0),
            backgroundColor: theme.palette.background.paper,
            '& a:link, & a:visited': {
                color: theme.palette.text.primary,
            },
            '& h1, & h2, & h3': {
                marginBottom: 0,
            },
            '& h1 + p, & h2 + p, & h3 + p': {
                marginTop: 0,
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

const Markdown = (props: ReactMarkdownOptions): ReactElement => {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <Container maxWidth="sm">
                <Typography component="div">
                    <ReactMarkdown {...props} remarkPlugins={[remarkGfm]} />
                </Typography>
            </Container>
        </Box>
    );
};

export default Markdown;
