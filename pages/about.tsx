import React, { ReactElement } from 'react';
import { request, gql } from 'graphql-request';
import { NextSeo } from 'next-seo';
import Chrome from '../src/components/Chrome';
import About from '../src/components/About';
import { GetAboutProps } from '../types/GetAboutProps';

const AboutPage = ({ countries }: GetAboutProps): ReactElement => {
    return (
        <>
            <NextSeo title="About" />
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
                region
            }
        }
    `;
    const { countries } = await request<GetAboutProps>('https://api.findahelpline.com', query);
    return {
        props: {
            countries,
        },
    };
};
export default AboutPage;
