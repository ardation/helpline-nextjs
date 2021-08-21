import React, { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import request, { gql } from 'graphql-request';
import Chrome from '../src/components/Chrome';
import Sitemap from '../src/components/Sitemap';
import { GetSitemapProps } from '../types/GetSitemapProps';

const SitemapPage = ({ countries, organizations, topics }: GetSitemapProps): ReactElement => {
    return (
        <>
            <NextSeo title="Sitemap" />
            <Chrome navBar footer>
                <Sitemap countries={countries} organizations={organizations.nodes} topics={topics} />
            </Chrome>
        </>
    );
};

export const getStaticProps = async (): Promise<{ props: GetSitemapProps }> => {
    const query = gql`
        query GetSitemapProps {
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
                slug
            }
            organizations {
                nodes {
                    name
                    slug
                }
            }
        }
    `;
    const { countries, organizations, topics } = await request<GetSitemapProps>('https://api.findahelpline.com', query);
    return {
        props: {
            countries,
            organizations,
            topics,
        },
    };
};

export default SitemapPage;
