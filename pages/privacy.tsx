import Head from 'next/head';
import React, { ReactElement } from 'react';
import Legal from '../src/components/Legal';
import Chrome from '../src/components/Chrome';

const PrivacyPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Privacy Policy | Find A Helpline</title>
            </Head>
            <Chrome navBar footer>
                <Legal tab="privacy" />
            </Chrome>
        </>
    );
};

export default PrivacyPage;
