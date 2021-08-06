import Head from 'next/head';
import React, { ReactElement } from 'react';
import Legal from '../src/components/Legal';
import Chrome from '../src/components/Chrome';

const TermsPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Terms of Service | Find A Helpline</title>
            </Head>
            <Chrome navBar footer>
                <Legal tab="terms" />
            </Chrome>
        </>
    );
};

export default TermsPage;
