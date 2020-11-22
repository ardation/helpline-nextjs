import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Head from 'next/head';
import Embed from '../src/components/Embed';
import Chrome from '../src/components/Chrome';
import { GetEmbedProps } from '../types/GetEmbedProps';

const EmbedPage = ({ countries, topics }: GetEmbedProps): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline</title>
            </Head>
            <Chrome>
                <Embed countries={countries} topics={topics} />
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
                locality
                subdivisions {
                    code
                    name
                }
            }
            topics {
                name
            }
        }
    `;
    const { countries, topics } = await request<GetEmbedProps>('https://api.findahelpline.com', print(query));
    return {
        props: {
            countries,
            topics,
        },
    };
};

export default EmbedPage;
