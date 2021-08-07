import React, { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import Legal from '../src/components/Legal';
import Chrome from '../src/components/Chrome';

const PrivacyPage = (): ReactElement => {
    return (
        <>
            <NextSeo title="Privacy Policy" />
            <Chrome navBar footer>
                <Legal tab="privacy" />
            </Chrome>
        </>
    );
};

export default PrivacyPage;
