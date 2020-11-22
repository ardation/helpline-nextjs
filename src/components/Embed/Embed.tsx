import React, { ReactElement, useState } from 'react';
import { Container, Box, Typography, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { isUndefined, omitBy } from 'lodash/fp';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { GetEmbedProps, GetEmbedProps_topics as Topic } from '../../../types/GetEmbedProps';
import Search from '../Search';
import { LocalityEnum } from '../../../types/globalTypes';
import Footer from '../Footer';
import NavBar from '../NavBar';
import SideBar from '../SideBar';

type Subdivision = {
    code: string;
    name: string;
};

type Country = {
    code: string;
    name: string;
    subdivisions: Subdivision[];
    locality: LocalityEnum;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(1),
        },
        box: {
            display: 'grid',
            gridGap: theme.spacing(2),
        },
        code: {
            margin: 0,
            padding: theme.spacing(2),
        },
        steps: {
            fontWeight: 'bold',
        },
        button: {
            borderRadius: '1000px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            textTransform: 'none',
        },
    }),
);

const Embed = ({ countries, topics }: GetEmbedProps): ReactElement => {
    const classes = useStyles();
    const [snippet, setSnippet] = useState('');
    const [copied, setCopied] = useState(false);

    const handleChange = (topics: Topic[], country?: Country, subdivision?: Subdivision): void => {
        if (country) {
            let host = window.location.host;
            if (host.includes('chromatic')) {
                host = 'findahelpline.com';
            }
            const attributes = omitBy(isUndefined, {
                countryCode: country.code.toLowerCase(),
                subdivisionCode: subdivision?.code?.toLowerCase(),
                topics: topics.length === 0 ? undefined : topics.map(({ name }) => name),
            });
            setSnippet(
                `<div id="fah-widget"></div>\n<script src="${
                    window.location.protocol
                }//${host}/widget.min.js"></script>\n<script type="text/javascript">\nWidget.default(${JSON.stringify(
                    attributes,
                    null,
                    2,
                )}).render('#fah-widget');\n</script>`,
            );
        } else {
            setSnippet('');
        }
    };

    const handleCopy = (): void => setCopied(true);

    return (
        <>
            <NavBar>
                <SideBar />
            </NavBar>
            <Container maxWidth="sm" className={classes.container}>
                <Box className={classes.box}>
                    <Typography component="div">
                        <p>We’re putting every free mental health helpline in the world at your fingertips.</p>
                        <p>Quick. Easy. Reliable.</p>
                        <h3>Embed the Find A Helpline widget</h3>
                        <span className={classes.steps}>Step 1:</span> Select default country, subdivision and topics
                        for your widget.
                    </Typography>
                    <Search countries={countries} topics={topics} variant="embed" onChange={handleChange} />
                    <Typography component="div" color={snippet === '' ? 'textSecondary' : 'textPrimary'}>
                        <span className={classes.steps}>Step 2:</span> Simply copy the code snippet and paste it in your
                        page’s HTML where you want the widget to appear.
                    </Typography>
                    {snippet !== '' && (
                        <>
                            <SyntaxHighlighter
                                language="html"
                                style={monokai}
                                className={classes.code}
                                data-testid="EmbedSyntaxHighlighter"
                            >
                                {snippet}
                            </SyntaxHighlighter>
                            {copied && <Alert severity="success">Copied to clipboard!</Alert>}
                            <CopyToClipboard text={snippet} onCopy={handleCopy}>
                                <Button className={classes.button} color="primary" variant="contained" size="large">
                                    Copy to clipboard
                                </Button>
                            </CopyToClipboard>
                        </>
                    )}
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Embed;
