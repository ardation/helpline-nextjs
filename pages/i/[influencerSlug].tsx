import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import Chrome from '../../src/components/Chrome';
import Search from '../../src/components/Search';
import { GetInfluencerSlugProps } from '../../types/GetInfluencerSlugProps';
import { GetInfluencerSlugs } from '../../types/GetInfluencerSlugs';
import InfluencerDialog from '../../src/components/InfluencerDialog';

interface Props extends GetInfluencerSlugProps {
    key: string | string[];
}

const InfluencerSlugPage = ({ influencer, topics, countries }: Props): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | {influencer.name}</title>
            </Head>
            <Chrome footer={true}>
                <Search countries={countries} topics={topics} />
                <InfluencerDialog influencer={influencer} />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: Props }> => {
    const query = gql`
        query GetInfluencerSlugProps($influencerSlug: String!) {
            influencer(slug: $influencerSlug) {
                name
                message
            }
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
    const { influencer, countries, topics } = await request<GetInfluencerSlugProps>(
        'https://api.findahelpline.com',
        print(query),
        {
            influencerSlug: context.params.influencerSlug,
        },
    );
    return {
        props: {
            influencer,
            countries,
            topics,
            key: context.params.influencerSlug, // https://github.com/zeit/next.js/issues/9992
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetInfluencerSlugs {
            influencers {
                slug
            }
        }
    `;
    const { influencers } = await request<GetInfluencerSlugs>('https://api.findahelpline.com', print(query));

    return {
        paths: influencers.map((influencer) => {
            return {
                params: {
                    influencerSlug: influencer.slug.toLowerCase(),
                },
            };
        }),
        fallback: false,
    };
};

export default InfluencerSlugPage;
