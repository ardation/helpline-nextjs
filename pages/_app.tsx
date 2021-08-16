import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import { hotjar } from 'react-hotjar';
import { DefaultSeo } from 'next-seo';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';
import theme from '../src/theme';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';
import '@fontsource/source-serif-pro/600.css';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        TagManager.initialize({ gtmId: 'GTM-TWF6HD4' });
        ReactGA.initialize(process.env.GA_ID, { standardImplementation: true });

        if (process.env.NODE_ENV === 'production') {
            hotjar.initialize(parseInt(process.env.HOTJAR_ID), 6);
        }
    }, []);

    return (
        <>
            <DefaultSeo
                defaultTitle="Find A Helpline | Free, confidential support. 24/7. Chat, text or phone."
                titleTemplate="%s | Find A Helpline"
                description="Global list of helplines, hotlines &amp; crisis lines. Get emotional support with suicidal thoughts, gender &amp; sexual identity, depression, loneliness, abuse &amp; domestic violence and more. No sign up or personal info required."
                openGraph={{
                    type: 'website',
                    locale: 'en',
                    images: [{ url: 'https://findahelpline.com/og.png' }],
                }}
                twitter={{
                    handle: '@livefortmw',
                    site: '@findahelpline',
                    cardType: 'summary_large_image',
                }}
            />
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
};

export default App;
