import Head from 'next/head';
import React, { ReactElement } from 'react';
import Chrome from '../src/components/Chrome';
import Faq from '../src/components/Faq';

const FaqPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | What Can I expect?</title>
            </Head>
            <Chrome navBar footer>
                <Faq />
            </Chrome>
        </>
    );
};

export default FaqPage;
