import Head from 'next/head';
import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import About from '../src/components/About';
import Search from '../src/components/Search';
import Chrome from '../src/components/Chrome';
import { GetSearchProps } from '../types/GetSearchProps';

const IndexPage = ({ topics, countries }: GetSearchProps): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline</title>
            </Head>
            <Chrome>
                <Search countries={countries} topics={topics} />
                <About countries={countries} />
            </Chrome>
        </>
    );
};

export const getStaticProps = async (): Promise<{ props: GetSearchProps }> => {
    const query = gql`
        query GetSearchProps {
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
    const { countries, topics } = await request<GetSearchProps>('https://api.findahelpline.com', print(query));
    return {
        props: {
            countries,
            topics,
        },
    };
};

export default IndexPage;
