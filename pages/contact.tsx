import Head from 'next/head';
import React, { ReactElement } from 'react';
import Contact from '../src/components/Contact';
import Chrome from '../src/components/Chrome';

const ContactPage = (): ReactElement => {
    return (
        <>
            <Head>
                <title>Contact | Find A Helpline</title>
            </Head>
            <Chrome footer navBar>
                <Contact />
            </Chrome>
        </>
    );
};

export default ContactPage;
