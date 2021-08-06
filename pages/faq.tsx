import Head from 'next/head';
import React, { ReactElement } from 'react';
import Chrome from '../src/components/Chrome';
import Faq from '../src/components/Faq';

const FaqPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>What Can I expect? | Find A Helpline</title>
            </Head>
            <Chrome navBar footer>
                <Faq />
            </Chrome>
        </>
    );
};

export default FaqPage;
