import Head from 'next/head';
import React, { ReactElement } from 'react';
import Contact from '../src/components/Contact';
import Chrome from '../src/components/Chrome';

const ContactPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | Contact</title>
            </Head>
            <Chrome footer navBar>
                <Contact />
            </Chrome>
        </>
    );
};

export default ContactPage;
