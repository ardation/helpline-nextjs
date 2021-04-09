import { createStyles, makeStyles, Box } from '@material-ui/core';
import React, { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) =>
    createStyles({
        box: {
            '& a:link, & a:visited': {
                color: theme.palette.text.primary,
            },
        },
    }),
);

const Markdown = (props: ReactMarkdown.ReactMarkdownProps): ReactElement => {
    const classes = useStyles();
    return (
        <Box className={classes.box}>
            <ReactMarkdown escapeHtml={false} {...props} />
        </Box>
    );
};

export default Markdown;
