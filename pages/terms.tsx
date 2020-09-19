import Head from 'next/head';
import React, { ReactElement } from 'react';
import Legal from '../src/components/Legal';
import Chrome from '../src/components/Chrome';

const TermsPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | Terms of Service</title>
            </Head>
            <Chrome>
                <Legal tab="terms" />
            </Chrome>
        </>
    );
};

export default TermsPage;
