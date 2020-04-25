import Head from 'next/head';
import React, { ReactElement } from 'react';
import Chrome from '../src/components/Chrome';
import Placeholder from '../src/components/Placeholder';

const IndexPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline</title>
            </Head>
            <Chrome>
                <Placeholder />
            </Chrome>
        </>
    );
};

export default IndexPage;
