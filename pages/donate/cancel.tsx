import React, { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import Chrome from '../../src/components/Chrome';
import DonateCancel from '../../src/components/DonateCancel';

const DonateCancelPage = (): ReactElement => {
    return (
        <>
            <NextSeo title="Donation Cancelled" />
            <Chrome navBar footer>
                <DonateCancel />
            </Chrome>
        </>
    );
};

export default DonateCancelPage;
