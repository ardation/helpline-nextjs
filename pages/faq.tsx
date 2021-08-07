import React, { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import Chrome from '../src/components/Chrome';
import Faq from '../src/components/Faq';

const FaqPage = (): ReactElement => {
    return (
        <>
            <NextSeo title="What Can I expect when contacting a helpline?" />
            <Chrome navBar footer>
                <Faq />
            </Chrome>
        </>
    );
};

export default FaqPage;
