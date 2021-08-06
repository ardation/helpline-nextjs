import Head from 'next/head';
import React, { ReactElement } from 'react';
import Chrome from '../../src/components/Chrome';
import DonateCancel from '../../src/components/DonateCancel';

const DonateCancelPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Donation Cancelled | Find A Helpline</title>
            </Head>
            <Chrome navBar footer>
                <DonateCancel />
            </Chrome>
        </>
    );
};

export default DonateCancelPage;
