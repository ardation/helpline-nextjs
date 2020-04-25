import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Head from 'next/head';
import EmbedInfo from '../src/components/EmbedInfo';
import Chrome from '../src/components/Chrome';
import { GetEmbedProps } from '../types/GetEmbedProps';

const EmbedPage = ({ countries }: GetEmbedProps): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline</title>
            </Head>
            <Chrome footer={true}>
                <EmbedInfo countries={countries} />
            </Chrome>
        </>
    );
};

export const getStaticProps = async (): Promise<{ props: GetEmbedProps }> => {
    const query = gql`
        query GetEmbedProps {
            countries {
                code
                name
            }
        }
    `;
    const { countries } = (await request('https://api.findahelpline.com', print(query))) as GetEmbedProps;
    return {
        props: {
            countries,
        },
    };
};

export default EmbedPage;
