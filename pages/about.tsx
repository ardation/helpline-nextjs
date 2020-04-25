import Head from 'next/head';
import React, { ReactElement } from 'react';
import Chrome from '../src/components/Chrome';
import About from '../src/components/About';

const AboutPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | About</title>
            </Head>
            <Chrome>
                <About />
            </Chrome>
        </>
    );
};

export default AboutPage;
