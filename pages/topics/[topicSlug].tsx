import React, { ReactElement } from 'react';
import { request, gql } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Chrome from '../../src/components/Chrome';
import Search from '../../src/components/Search';
import { GetTopicSlugProps } from '../../types/GetTopicSlugProps';
import { GetTopicSlugPaths } from '../../types/GetTopicSlugPaths';
import Topic from '../../src/components/Topic';

interface Props extends GetTopicSlugProps {
    key: string | string[];
}

const SubdivisionCodeTopicSlugPage = ({ countries, topics, topic }: Props): ReactElement => {
    return (
        <>
            <NextSeo
                title={topic.slug === 'suicidal-thoughts' ? 'Suicide hotlines' : `${topic.name} helplines`}
                description={`Need to talk? Get free, confidential support with ${topic.name} from a real human. Web chat, text and phone helplines. No sign up or personal info required.`}
            />
            <Chrome footer>
                <Search countries={countries} topics={topics} topic={topic} />
                <Topic countries={countries} topic={topic} />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const query = gql`
        query GetTopicSlugProps($topicSlug: String!) {
            countries {
                code
                name
                locality
                region
                subdivisions {
                    code
                    name
                }
            }
            topics {
                name
                slug
            }
            topic(slug: $topicSlug) {
                name
                slug
                markdown
            }
        }
    `;
    const { countries, topics, topic } = await request<GetTopicSlugProps>('https://api.findahelpline.com', query, {
        topicSlug: context.params.topicSlug,
    });
    return {
        props: {
            countries,
            topics,
            topic,
            key: `${context.params.topicSlug}`,
            // https://github.com/zeit/next.js/issues/9992
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetTopicSlugPaths {
            topics {
                slug
            }
        }
    `;
    const { topics } = await request<GetTopicSlugPaths>('https://api.findahelpline.com', query);

    const paths = topics.slice(0, 4).map(({ slug }) => ({
        params: {
            topicSlug: slug,
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export default SubdivisionCodeTopicSlugPage;
