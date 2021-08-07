import React, { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import Legal from '../src/components/Legal';
import Chrome from '../src/components/Chrome';

const TermsPage = (): ReactElement => {
    return (
        <>
            <NextSeo title="Terms of Service" />
            <Chrome navBar footer>
                <Legal tab="terms" />
            </Chrome>
        </>
    );
};

export default TermsPage;
