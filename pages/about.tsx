import Head from 'next/head';
import React, { ReactElement, Fragment } from 'react';
import Chrome from '../src/components/Chrome';
import About from '../src/components/About';

const AboutPage = (): ReactElement => {
    return (
        <Fragment>
            <Head>
                <title>Find A Helpline | About</title>
            </Head>
            <Chrome>
                <About />
            </Chrome>
        </Fragment>
    );
};

export default AboutPage;
