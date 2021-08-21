import React, { ReactElement } from 'react';
import { request, gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
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
            <NextSeo description={`A message from ${influencer.name}: ${influencer.message}`} />
            <Chrome footer={true}>
                <Search countries={countries} topics={topics} />
                <InfluencerDialog influencer={influencer} />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const query = gql`
        query GetInfluencerSlugProps($influencerSlug: String!) {
            influencer(slug: $influencerSlug) {
                name
                message
            }
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
    const { influencer, countries, topics } = await request<GetInfluencerSlugProps>(
        'https://api.findahelpline.com',
        query,
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
    const { influencers } = await request<GetInfluencerSlugs>('https://api.findahelpline.com', query);

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
