import Head from 'next/head';
import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Search from '../src/components/Search';
import Chrome from '../src/components/Chrome';
import { GetSearchProps } from '../types/GetSearchProps';

const SearchPage = ({ topics, countries }: GetSearchProps): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline</title>
            </Head>
            <Chrome footer={true}>
                <Search countries={countries} topics={topics} />
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
    const { countries, topics } = (await request('https://api.findahelpline.com', print(query))) as GetSearchProps;
    return {
        props: {
            countries,
            topics,
        },
    };
};

export default SearchPage;
