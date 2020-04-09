import Head from 'next/head';
import React, { ReactElement, Fragment } from 'react';
import Chrome from '../src/components/Chrome';
import Placeholder from '../src/components/Placeholder';

const IndexPage = (): ReactElement => {
    return (
        <Fragment>
            <Head>
                <title>Find A Helpline</title>
            </Head>
            <Chrome topbar={true}>
                <Placeholder />
            </Chrome>
        </Fragment>
    );
};

export default IndexPage;
