import Head from 'next/head';
import React, { ReactElement } from 'react';
import Chrome from '../src/components/Chrome';
import Gratitude from '../src/components/Gratitude';

const GratitudePage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | Gratitude</title>
            </Head>
            <Chrome>
                <Gratitude />
            </Chrome>
        </>
    );
};

export default GratitudePage;
