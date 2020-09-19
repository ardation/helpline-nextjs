import Head from 'next/head';
import React, { ReactElement } from 'react';
import Chrome from '../src/components/Chrome';
import WidgetPartners from '../src/components/WidgetPartners';

const GetTheWidgetPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | Get the Widget</title>
            </Head>
            <Chrome>
                <WidgetPartners />
            </Chrome>
        </>
    );
};

export default GetTheWidgetPage;
