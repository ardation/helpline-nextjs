import React, { ReactElement } from 'react';
import { request } from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import gql from 'graphql-tag';
import { print } from 'graphql';
import { flatten } from 'lodash/fp';
import Chrome from '../../../src/components/Chrome';
import { GetCountryCodeTopicSlugProps } from '../../../types/GetCountryCodeTopicSlugProps';
import OrganizationList from '../../../src/components/OrganizationList';
import { GetCountryCodeTopicSlugPaths } from '../../../types/GetCountryCodeTopicSlugPaths';

interface Props extends GetCountryCodeTopicSlugProps {
    key: string | string[];
}

const CountryCodeTopicSlugPage = ({
    country,
    topic,
    organizations,
    organizationsWhenEmpty,
    categories,
    humanSupportTypes,
    topics,
}: Props): ReactElement => {
    return (
        <>
            <Head>
                <title>Find A Helpline | {country.name}</title>
            </Head>
            <Chrome country={country} footer>
                <OrganizationList
                    organizations={organizations.nodes}
                    organizationsWhenEmpty={organizationsWhenEmpty.nodes}
                    country={country}
                    preselectedTopics={[topic]}
                    categories={categories}
                    humanSupportTypes={humanSupportTypes}
                    topics={topics}
                />
            </Chrome>
        </>
    );
};

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: Props }> => {
    const query = gql`
        query GetCountryCodeTopicSlugProps($countryCode: String!, $topicSlug: String!) {
            country(code: $countryCode) {
                code
                name
                emergencyNumber
                locality
            }
            topic(slug: $topicSlug) {
                name
                slug
            }
            organizations(countryCode: $countryCode, subdivisionCodes: []) {
                ...organizationConnectionFields
            }
            organizationsWhenEmpty: organizations(countryCode: $countryCode, subdivisionCodes: [], featured: true) {
                ...organizationConnectionFields
            }
            categories {
                name
            }
            humanSupportTypes {
                name
            }
            topics {
                name
            }
        }
        fragment organizationConnectionFields on OrganizationConnection {
            nodes {
                id
                slug
                name
                alwaysOpen
                smsNumber
                phoneNumber
                url
                chatUrl
                timezone
                featured
                verified
                rating
                reviewCount
                humanSupportTypes {
                    name
                }
                categories {
                    name
                }
                topics {
                    name
                }
                openingHours {
                    day
                    open
                    close
                }
            }
        }
    `;
    const {
        country,
        topic,
        organizations,
        organizationsWhenEmpty,
        categories,
        humanSupportTypes,
        topics,
    } = await request<GetCountryCodeTopicSlugProps>('https://api.findahelpline.com', print(query), {
        countryCode: context.params.countryCode,
        topicSlug: context.params.topicSlug,
    });
    return {
        props: {
            country,
            topic,
            organizations,
            organizationsWhenEmpty,
            categories,
            humanSupportTypes,
            topics,
            key: `${context.params.countryCode}-${context.params.topicSlug}`,
            // https://github.com/zeit/next.js/issues/9992
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = gql`
        query GetCountryCodeTopicSlugPaths {
            countries {
                code
            }
            topics {
                slug
            }
        }
    `;
    const { countries, topics } = await request<GetCountryCodeTopicSlugPaths>(
        'https://api.findahelpline.com',
        print(query),
    );

    return {
        paths: flatten(
            countries.map(({ code }) => {
                return topics.map(({ slug }) => {
                    return {
                        params: {
                            countryCode: code.toLowerCase(),
                            topicSlug: slug,
                        },
                    };
                });
            }),
        ),
        fallback: false,
    };
};

export default CountryCodeTopicSlugPage;
