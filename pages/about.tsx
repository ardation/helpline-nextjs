import Head from 'next/head';
import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../src/components/Chrome';
import About from '../src/components/About';
import { GetAboutProps } from '../types/GetAboutProps';

const AboutPage = ({ countries }: GetAboutProps): ReactElement => {
    return (
        <>
            <Head>
                <title>About | Find A Helpline</title>
            </Head>
            <Chrome navBar footer>
                <About countries={countries} isPage />
            </Chrome>
        </>
    );
};

export const getStaticProps = async (): Promise<{ props: GetAboutProps }> => {
    const query = gql`
        query GetAboutProps {
            countries {
                code
                name
            }
        }
    `;
    const { countries } = await request<GetAboutProps>('https://api.findahelpline.com', print(query));
    return {
        props: {
            countries,
        },
    };
};
export default AboutPage;
