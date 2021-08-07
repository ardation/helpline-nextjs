import React, { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import Chrome from '../src/components/Chrome';
import Gratitude from '../src/components/Gratitude';

const GratitudePage = (): ReactElement => {
    return (
        <>
            <NextSeo title="Gratitude" />
            <Chrome navBar footer>
                <Gratitude />
            </Chrome>
        </>
    );
};

export default GratitudePage;
