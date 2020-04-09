import Head from 'next/head';
import React, { ReactElement, Fragment } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Search from '../src/components/Search';
import Chrome from '../src/components/Chrome';
import { GetCountriesAndTopics } from '../types/GetCountriesAndTopics';

const SearchPage = ({ topics, countries }: GetCountriesAndTopics): ReactElement => {
    return (
        <Fragment>
            <Head>
                <title>Find A Helpline</title>
            </Head>
            <Chrome topbar={true} footer={true}>
                <Search countries={countries} topics={topics} />
            </Chrome>
        </Fragment>
    );
};

export const getStaticProps = async (): Promise<{ props: GetCountriesAndTopics }> => {
    const query = gql`
        query GetCountriesAndTopics {
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
    const { countries, topics } = await request('https://api.findahelpline.com', print(query));
    return {
        props: {
            countries,
            topics,
        },
    };
};

export default SearchPage;
