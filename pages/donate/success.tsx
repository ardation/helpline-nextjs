import React, { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import Chrome from '../../src/components/Chrome';
import DonateSuccess from '../../src/components/DonateSuccess';

const DonateSuccessPage = (): ReactElement => {
    return (
        <>
            <NextSeo title="Donation Success" />
            <Chrome navBar footer>
                <DonateSuccess />
            </Chrome>
        </>
    );
};

export default DonateSuccessPage;
