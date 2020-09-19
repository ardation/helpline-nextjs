import Head from 'next/head';
import React, { ReactElement } from 'react';
import Legal from '../src/components/Legal';
import Chrome from '../src/components/Chrome';

const PrivacyPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | Privacy Policy</title>
            </Head>
            <Chrome>
                <Legal tab="privacy" />
            </Chrome>
        </>
    );
};

export default PrivacyPage;
