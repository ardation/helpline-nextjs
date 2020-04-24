import React, { ReactElement, Fragment } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Head from 'next/head';
import EmbedInfo from '../src/components/EmbedInfo';
import Chrome from '../src/components/Chrome';
import { GetCountryCodesAndNames } from '../types/GetCountryCodesAndNames';

const EmbedPage = ({ countries }: GetCountryCodesAndNames): ReactElement => {
    return (
        <Fragment>
            <Head>
                <title>Find A Helpline</title>
            </Head>
            <Chrome footer={true}>
                <EmbedInfo countries={countries} />
            </Chrome>
        </Fragment>
    );
};

export const getStaticProps = async (): Promise<{ props: GetCountryCodesAndNames }> => {
    const query = gql`
        query GetCountryCodesAndNames {
            countries {
                code
                name
            }
        }
    `;
    const { countries } = await request('https://api.findahelpline.com', print(query));
    return {
        props: {
            countries,
        },
    };
};

export default EmbedPage;
