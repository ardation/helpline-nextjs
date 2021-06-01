import Head from 'next/head';
import React, { ReactElement } from 'react';
import Chrome from '../../src/components/Chrome';
import DonateSuccess from '../../src/components/DonateSuccess';

const DonateSuccessPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | Donation Success</title>
            </Head>
            <Chrome navBar footer>
                <DonateSuccess />
            </Chrome>
        </>
    );
};

export default DonateSuccessPage;
