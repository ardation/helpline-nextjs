import React, { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import Contact from '../src/components/Contact';
import Chrome from '../src/components/Chrome';

const ContactPage = (): ReactElement => {
    return (
        <>
            <NextSeo title="Contact" />
            <Chrome footer navBar>
                <Contact />
            </Chrome>
        </>
    );
};

export default ContactPage;
